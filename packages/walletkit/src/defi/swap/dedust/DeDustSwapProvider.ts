/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Factory, MAINNET_FACTORY_ADDR, PoolType, ReadinessStatus, VaultJetton, JettonRoot } from '@dedust/sdk';
import { Address, beginCell } from '@ton/core';
import type { OpenedContract } from '@ton/core';
import { TonClient4 } from '@ton/ton';

import type { DeDustQuoteMetadata, DeDustSwapProviderConfig, DeDustProviderOptions } from './types';
import { SwapProvider } from '../SwapProvider';
import type { SwapQuoteParams, SwapQuote, SwapParams } from '../../../api/models';
import { SwapError } from '../errors';
import { globalLogger } from '../../../core/Logger';
import { tokenToAsset, isNativeTon, validateNetwork, calculateMinOutput, isDeDustQuoteMetadata } from './utils';
import type { TransactionRequest } from '../../../api/models';
import { Uint8ArrayToBase64, asBase64 } from '../../../utils';

const log = globalLogger.createChild('DeDustSwapProvider');

/**
 * Default gas amount for TON swaps (0.25 TON)
 */
const DEFAULT_GAS_AMOUNT = '250000000';

/**
 * Default gas amount for Jetton swaps (0.3 TON)
 */
const DEFAULT_JETTON_GAS_AMOUNT = '300000000';

/**
 * Default forward amount for Jetton transfers (0.25 TON)
 */
const DEFAULT_FORWARD_AMOUNT = '250000000';

/**
 * Swap provider implementation for DeDust protocol
 *
 * Uses the DeDust SDK to get quotes and build swap transactions
 * on TON blockchain.
 *
 * @example
 * ```typescript
 * // Import from separate entry point to avoid bundling DeDust SDK
 * import { DeDustSwapProvider } from '@ton/walletkit/swap/dedust';
 *
 * const provider = new DeDustSwapProvider({
 *   defaultSlippageBps: 100, // 1%
 *   endpoint: 'https://mainnet-v4.tonhubapi.com'
 * });
 *
 * kit.swap.registerProvider('dedust', provider);
 * ```
 */
export class DeDustSwapProvider extends SwapProvider<DeDustProviderOptions> {
    private readonly endpoint: string;
    private readonly defaultSlippageBps: number;
    private readonly gasAmount: string;
    private readonly jettonGasAmount: string;
    private readonly forwardAmount: string;
    private tonClient$?: TonClient4;
    private factory$?: OpenedContract<Factory>;

    readonly providerId: string;

    constructor(config?: DeDustSwapProviderConfig) {
        super();
        this.providerId = config?.providerId ?? 'dedust';
        this.endpoint = config?.endpoint ?? 'https://mainnet-v4.tonhubapi.com';
        this.defaultSlippageBps = config?.defaultSlippageBps ?? 100; // 1% default
        this.gasAmount = config?.gasAmount ?? DEFAULT_GAS_AMOUNT;
        this.jettonGasAmount = config?.jettonGasAmount ?? DEFAULT_JETTON_GAS_AMOUNT;
        this.forwardAmount = config?.forwardAmount ?? DEFAULT_FORWARD_AMOUNT;

        log.info('DeDustSwapProvider initialized', {
            endpoint: this.endpoint,
            defaultSlippageBps: this.defaultSlippageBps,
        });
    }

    private get tonClient(): TonClient4 {
        if (!this.tonClient$) {
            this.tonClient$ = new TonClient4({ endpoint: this.endpoint });
        }
        return this.tonClient$;
    }

    private get factory(): OpenedContract<Factory> {
        if (!this.factory$) {
            this.factory$ = this.tonClient.open(Factory.createFromAddress(MAINNET_FACTORY_ADDR));
        }
        return this.factory$;
    }

    async getQuote(params: SwapQuoteParams<DeDustProviderOptions>): Promise<SwapQuote> {
        log.debug('Getting DeDust quote', {
            fromToken: params.fromToken,
            toToken: params.toToken,
            amount: params.amount,
            isReverseSwap: params.isReverseSwap,
        });

        // Validate network (DeDust only supports mainnet)
        validateNetwork(params.network);

        if (params.isReverseSwap) {
            throw new SwapError(
                'DeDust does not support reverse swaps (specifying output amount)',
                SwapError.INVALID_PARAMS,
            );
        }

        try {
            const fromAsset = tokenToAsset(params.fromToken);
            const toAsset = tokenToAsset(params.toToken);
            const slippageBps = params.slippageBps ?? this.defaultSlippageBps;
            const poolType = params.providerOptions?.poolType ?? PoolType.VOLATILE;

            // Get pool
            const pool = this.tonClient.open(await this.factory.getPool(poolType, [fromAsset, toAsset]));

            // Check if pool exists and is ready
            const poolStatus = await pool.getReadinessStatus();
            if (poolStatus !== ReadinessStatus.READY) {
                throw new SwapError(
                    `Pool for ${params.fromToken.type}/${params.toToken.type} does not exist or is not ready`,
                    SwapError.INSUFFICIENT_LIQUIDITY,
                );
            }

            // Get vault for source token
            const isNativeSwap = isNativeTon(params.fromToken);
            let vaultAddress: Address;

            if (isNativeSwap) {
                const tonVault = this.tonClient.open(await this.factory.getNativeVault());
                const vaultStatus = await tonVault.getReadinessStatus();
                if (vaultStatus !== ReadinessStatus.READY) {
                    throw new SwapError('Native TON vault is not ready', SwapError.INSUFFICIENT_LIQUIDITY);
                }
                vaultAddress = tonVault.address;
            } else {
                if (params.fromToken.type !== 'jetton') {
                    throw new SwapError('Invalid token type', SwapError.INVALID_PARAMS);
                }
                const jettonAddress = Address.parse(params.fromToken.value);
                const jettonVault = this.tonClient.open(await this.factory.getJettonVault(jettonAddress));
                const vaultStatus = await jettonVault.getReadinessStatus();
                if (vaultStatus !== ReadinessStatus.READY) {
                    throw new SwapError(
                        `Jetton vault for ${params.fromToken.value} is not ready`,
                        SwapError.INSUFFICIENT_LIQUIDITY,
                    );
                }
                vaultAddress = jettonVault.address;
            }

            // Get estimated output from pool
            const amountIn = BigInt(params.amount);
            const { amountOut: estimatedOutput } = await pool.getEstimatedSwapOut({
                assetIn: fromAsset,
                amountIn,
            });
            const minOutput = calculateMinOutput(estimatedOutput.toString(), slippageBps);

            // Build metadata
            const metadata: DeDustQuoteMetadata = {
                poolAddress: pool.address.toString(),
                poolType,
                vaultAddress: vaultAddress.toString(),
                isNativeSwap,
                estimatedOutput: estimatedOutput.toString(),
                minOutput,
                slippageBps,
            };

            // If it's a jetton swap, we need the user's jetton wallet address
            // This will be determined at build time when we have the user address

            const swapQuote: SwapQuote = {
                metadata,
                providerId: this.providerId,
                fromToken: params.fromToken,
                toToken: params.toToken,
                fromAmount: params.amount,
                toAmount: estimatedOutput.toString(),
                minReceived: minOutput,
                network: params.network,
            };

            log.debug('Received DeDust quote', {
                poolAddress: pool.address.toString(),
                estimatedOutput: estimatedOutput.toString(),
                minOutput,
            });

            return swapQuote;
        } catch (error) {
            log.error('Failed to get DeDust quote', { error, params });

            if (error instanceof SwapError) {
                throw error;
            }

            throw new SwapError(
                `DeDust quote request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                SwapError.NETWORK_ERROR,
                error,
            );
        }
    }

    async buildSwapTransaction(params: SwapParams): Promise<TransactionRequest> {
        log.debug('Building DeDust swap transaction', params);

        const metadata = params.quote.metadata;

        if (!metadata || !isDeDustQuoteMetadata(metadata)) {
            throw new SwapError('Invalid quote: missing DeDust quote data', SwapError.INVALID_QUOTE);
        }

        try {
            const userAddress = Address.parse(params.userAddress);
            const poolAddress = Address.parse(metadata.poolAddress);
            const vaultAddress = Address.parse(metadata.vaultAddress);

            // Use custom slippage if provided, otherwise use quote slippage
            const slippageBps = params.slippageBps ?? metadata.slippageBps;
            const minOutput =
                params.slippageBps !== undefined
                    ? calculateMinOutput(metadata.estimatedOutput, slippageBps)
                    : metadata.minOutput;

            const destinationAddress = params.destinationAddress
                ? Address.parse(params.destinationAddress)
                : userAddress;

            if (metadata.isNativeSwap) {
                // Native TON swap
                return this.buildNativeSwapTransaction(
                    userAddress,
                    poolAddress,
                    vaultAddress,
                    BigInt(params.quote.fromAmount),
                    BigInt(minOutput),
                    destinationAddress,
                    params.quote.network,
                );
            } else {
                // Jetton swap
                if (params.quote.fromToken.type !== 'jetton') {
                    throw new SwapError('Invalid token type for jetton swap', SwapError.INVALID_PARAMS);
                }
                const jettonAddress = Address.parse(params.quote.fromToken.value);
                return this.buildJettonSwapTransaction(
                    userAddress,
                    poolAddress,
                    vaultAddress,
                    jettonAddress,
                    BigInt(params.quote.fromAmount),
                    BigInt(minOutput),
                    destinationAddress,
                    params.quote.network,
                );
            }
        } catch (error) {
            log.error('Failed to build DeDust swap transaction', { error, params });

            if (error instanceof SwapError) {
                throw error;
            }

            throw new SwapError(
                `Failed to build DeDust transaction: ${error instanceof Error ? error.message : 'Unknown error'}`,
                SwapError.BUILD_TX_FAILED,
                error,
            );
        }
    }

    /**
     * Build transaction for native TON swap
     */
    private buildNativeSwapTransaction(
        userAddress: Address,
        poolAddress: Address,
        vaultAddress: Address,
        amountIn: bigint,
        minOutput: bigint,
        destinationAddress: Address,
        network: SwapQuote['network'],
    ): TransactionRequest {
        // Build swap params ref (required by DeDust protocol)
        // Format: deadline (32 bits) + recipient (address) + referral (address) + fulfillPayload (maybe ref) + rejectPayload (maybe ref)
        const swapParams = beginCell()
            .storeUint(0, 32) // deadline (0 = no deadline)
            .storeAddress(destinationAddress) // recipient address
            .storeAddress(null) // referral address (none)
            .storeMaybeRef(null) // fulfill payload
            .storeMaybeRef(null) // reject payload
            .endCell();

        // Build swap payload for native TON vault
        // Format: op (32) + query_id (64) + amount (coins) + pool_address + reserved (1 bit) + limit (coins) + next (maybe ref) + swap_params (ref)
        const swapPayload = beginCell()
            .storeUint(0xea06185d, 32) // swap op
            .storeUint(0, 64) // query_id
            .storeCoins(amountIn) // amount to swap
            .storeAddress(poolAddress) // pool address
            .storeUint(0, 1) // reserved
            .storeCoins(minOutput) // limit (minimum output)
            .storeMaybeRef(null) // next (for multi-hop)
            .storeRef(swapParams) // swap params (required)
            .endCell();

        const gasAmount = BigInt(this.gasAmount);
        const totalAmount = amountIn + gasAmount;

        return {
            fromAddress: userAddress.toString(),
            messages: [
                {
                    address: vaultAddress.toString(),
                    amount: totalAmount.toString(),
                    payload: asBase64(Uint8ArrayToBase64(swapPayload.toBoc())),
                },
            ],
            network,
        };
    }

    /**
     * Build transaction for Jetton swap
     */
    private async buildJettonSwapTransaction(
        userAddress: Address,
        poolAddress: Address,
        vaultAddress: Address,
        jettonAddress: Address,
        amountIn: bigint,
        minOutput: bigint,
        destinationAddress: Address,
        network: SwapQuote['network'],
    ): Promise<TransactionRequest> {
        // Get user's jetton wallet address
        const jettonRoot = this.tonClient.open(JettonRoot.createFromAddress(jettonAddress));
        const jettonWallet = this.tonClient.open(await jettonRoot.getWallet(userAddress));

        // Build forward payload for jetton transfer using SDK
        const forwardPayload = VaultJetton.createSwapPayload({
            poolAddress,
            limit: minOutput,
            swapParams: {
                recipientAddress: destinationAddress,
            },
        });

        // Build jetton transfer message
        const forwardAmount = BigInt(this.forwardAmount);
        const transferPayload = beginCell()
            .storeUint(0xf8a7ea5, 32) // transfer op
            .storeUint(0, 64) // query_id
            .storeCoins(amountIn) // amount
            .storeAddress(vaultAddress) // destination
            .storeAddress(userAddress) // response_destination
            .storeMaybeRef(null) // custom_payload
            .storeCoins(forwardAmount) // forward_ton_amount
            .storeMaybeRef(forwardPayload) // forward_payload
            .endCell();

        return {
            fromAddress: userAddress.toString(),
            messages: [
                {
                    address: jettonWallet.address.toString(),
                    amount: this.jettonGasAmount,
                    payload: asBase64(Uint8ArrayToBase64(transferPayload.toBoc())),
                },
            ],
            network,
        };
    }
}

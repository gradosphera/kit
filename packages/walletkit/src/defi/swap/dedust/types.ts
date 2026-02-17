/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { PoolType } from '@dedust/sdk';

/**
 * Configuration options for DeDustSwapProvider
 */
export interface DeDustSwapProviderConfig {
    /**
     * Custom provider ID (defaults to 'dedust')
     */
    providerId?: string;

    /**
     * Default slippage tolerance in basis points (1 bp = 0.01%)
     * @default 100 (1%)
     */
    defaultSlippageBps?: number;

    /**
     * Gas amount for TON swaps (in nanotons)
     * @default 250000000 (0.25 TON)
     */
    gasAmount?: string;

    /**
     * Gas amount for Jetton swaps (in nanotons)
     * @default 300000000 (0.3 TON)
     */
    jettonGasAmount?: string;

    /**
     * Forward amount for Jetton transfers (in nanotons)
     * @default 250000000 (0.25 TON)
     */
    forwardAmount?: string;

    /**
     * TonClient4 endpoint URL
     * @default 'https://mainnet-v4.tonhubapi.com'
     */
    endpoint?: string;
}

/**
 * Metadata stored in SwapQuote for DeDust provider
 */
export interface DeDustQuoteMetadata {
    /**
     * Pool address for the swap
     */
    poolAddress: string;

    /**
     * Pool type (volatile or stable)
     */
    poolType: PoolType;

    /**
     * Vault address for the source token
     */
    vaultAddress: string;

    /**
     * Is the source token native TON
     */
    isNativeSwap: boolean;

    /**
     * Jetton wallet address for source token (only for jetton swaps)
     */
    jettonWalletAddress?: string;

    /**
     * Estimated output amount from pool
     */
    estimatedOutput: string;

    /**
     * Minimum output amount after slippage
     */
    minOutput: string;

    /**
     * Slippage used for the quote in basis points
     */
    slippageBps: number;
}

/**
 * Provider-specific options for DeDust swap operations
 */
export interface DeDustProviderOptions {
    /**
     * Pool type to use for the swap
     * @default PoolType.VOLATILE
     */
    poolType?: PoolType;

    /**
     * Custom gas amount for the swap (in nanotons)
     */
    gasAmount?: string;

    /**
     * Custom forward amount for jetton transfers (in nanotons)
     */
    forwardAmount?: string;
}

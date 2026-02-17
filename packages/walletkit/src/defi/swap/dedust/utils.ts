/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Address } from '@ton/core';
import { Asset } from '@dedust/sdk';

import { Network } from '../../../api/models';
import type { DeDustQuoteMetadata } from './types';
import type { SwapToken } from '../../../api/models';

/**
 * Native TON address used by DeDust protocol
 */
export const NATIVE_TON_ADDRESS = 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c';

/**
 * Convert SwapToken to DeDust Asset
 */
export const tokenToAsset = (token: SwapToken): Asset => {
    if (token.type === 'ton') {
        return Asset.native();
    }
    return Asset.jetton(Address.parse(token.value));
};

/**
 * Convert SwapToken to address string
 */
export const tokenToAddress = (token: SwapToken): string => {
    if (token.type === 'ton') {
        return NATIVE_TON_ADDRESS;
    }
    return Address.parse(token.value).toRawString();
};

/**
 * Convert address string to SwapToken
 */
export const addressToToken = (address: string): SwapToken => {
    if (address === NATIVE_TON_ADDRESS) {
        return { type: 'ton' };
    }

    try {
        return { type: 'jetton', value: Address.parseRaw(address).toString() };
    } catch {
        return { type: 'jetton', value: address };
    }
};

/**
 * Check if token is native TON
 */
export const isNativeTon = (token: SwapToken): boolean => {
    return token.type === 'ton';
};

/**
 * Validate network is supported (mainnet only for DeDust)
 */
export const validateNetwork = (network: Network): void => {
    if (network.chainId !== Network.mainnet().chainId) {
        throw new Error(`DeDust only supports mainnet. Got chainId: ${network.chainId}`);
    }
};

/**
 * Calculate minimum output amount with slippage
 * @param amount - Amount in raw units (string)
 * @param slippageBps - Slippage in basis points (100 = 1%)
 * @returns Minimum output amount as string
 */
export const calculateMinOutput = (amount: string, slippageBps: number): string => {
    const amountBigInt = BigInt(amount);
    const slippageMultiplier = BigInt(10000 - slippageBps);
    const minOutput = (amountBigInt * slippageMultiplier) / BigInt(10000);
    return minOutput.toString();
};

/**
 * Type guard for DeDustQuoteMetadata
 */
export const isDeDustQuoteMetadata = (metadata: unknown): metadata is DeDustQuoteMetadata => {
    if (!metadata || typeof metadata !== 'object') {
        return false;
    }

    const meta = metadata as Record<string, unknown>;

    return (
        typeof meta.poolAddress === 'string' &&
        typeof meta.vaultAddress === 'string' &&
        typeof meta.isNativeSwap === 'boolean' &&
        typeof meta.estimatedOutput === 'string' &&
        typeof meta.minOutput === 'string' &&
        typeof meta.slippageBps === 'number'
    );
};

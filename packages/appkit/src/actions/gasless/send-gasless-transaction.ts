/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { GaslessEstimateResult, TokenAmount } from '@ton/walletkit';

import { GaslessError, GaslessErrorCode } from '../../gasless';
import type { Base64String } from '../../types/primitives';
import type { AppKit } from '../../core/app-kit';
import { getSelectedWallet } from '../wallets/get-selected-wallet';

export interface SendGaslessTransactionParameters {
    /** Pre-computed estimate obtained via `getGaslessEstimate` */
    estimate: GaslessEstimateResult;
    /** Gasless provider id. Uses the default provider when omitted. */
    providerId?: string;
}

export interface SendGaslessTransactionReturnType {
    /** Signed internal BoC that was submitted to the relayer */
    internalBoc: Base64String;
    /** Relayer fee in fee-jetton nanounits (mirrors the estimate) */
    fee: TokenAmount;
}

export type SendGaslessTransactionErrorType = Error;

/**
 * Sign a previously computed gasless estimate and submit the resulting BoC
 * to the relayer.
 *
 * Estimate freshness is owned by the query layer (`getGaslessEstimateQueryOptions`
 * sets a 2-minute `staleTime` matching the relayer `validUntil` window). If a
 * stale estimate is submitted anyway, the relayer rejects it and the error
 * surfaces through `gaslessManager.send`.
 *
 * @throws GaslessError(SIGN_MESSAGE_NOT_SUPPORTED) when the wallet does not
 *         advertise the `SignMessage` feature.
 * @throws GaslessError(TOO_MANY_MESSAGES) when the estimate carries more
 *         messages than the wallet's advertised `maxMessages` cap.
 */
export const sendGaslessTransaction = async (
    appKit: AppKit,
    parameters: SendGaslessTransactionParameters,
): Promise<SendGaslessTransactionReturnType> => {
    const { estimate, providerId } = parameters;

    const wallet = getSelectedWallet(appKit);

    if (!wallet) {
        throw new Error('Wallet not connected');
    }

    const features = wallet.getSupportedFeatures();
    if (features !== undefined) {
        const signMessageFeature = features.find((f) => typeof f === 'object' && f.name === 'SignMessage');
        if (!signMessageFeature) {
            throw new GaslessError(
                'Connected wallet does not support the SignMessage feature required for gasless transactions.',
                GaslessErrorCode.SignMessageNotSupported,
            );
        }
        const { maxMessages } = signMessageFeature as { maxMessages: number };
        if (estimate.messages.length > maxMessages) {
            throw new GaslessError(
                `Estimate has ${estimate.messages.length} messages but the wallet only supports up to ${maxMessages}.`,
                GaslessErrorCode.TooManyMessages,
                { messages: estimate.messages.length, maxMessages },
            );
        }
    }

    const { internalBoc } = await wallet.signMessage({
        messages: estimate.messages,
        validUntil: estimate.validUntil,
    });

    await appKit.gaslessManager.send(
        {
            walletPublicKey: wallet.getPublicKey(),
            internalBoc,
        },
        providerId,
    );

    return {
        internalBoc,
        fee: estimate.fee,
    };
};

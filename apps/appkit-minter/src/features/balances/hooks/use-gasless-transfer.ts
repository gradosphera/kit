/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useCallback } from 'react';
import {
    useGaslessJettonTransferQuote,
    useGaslessTonTransferQuote,
    useJettonInfo,
    useSendGaslessTransaction,
} from '@ton/appkit-react';
import { formatUnits } from '@ton/appkit';
import type { GaslessSendResponse, UserFriendlyAddress } from '@ton/appkit';

interface UseGaslessTransferParams {
    /** Only quote/send while the gasless toggle is on. */
    enabled: boolean;
    tokenType: 'TON' | 'JETTON';
    jettonAddress?: string;
    recipientAddress: string;
    amount: string;
    comment?: string;
    feeAsset: UserFriendlyAddress | null;
}

/**
 * Drives the gasless quote → send flow for the transfer modal. Quotes the
 * jetton or TON transfer (depending on `tokenType`) and exposes a formatted fee
 * plus a `send` that relays the signed quote.
 */
export const useGaslessTransfer = ({
    enabled,
    tokenType,
    jettonAddress,
    recipientAddress,
    amount,
    comment,
    feeAsset,
}: UseGaslessTransferParams) => {
    const hasInputs = Boolean(recipientAddress && amount && feeAsset);

    const jettonQuote = useGaslessJettonTransferQuote({
        jettonAddress: jettonAddress ?? '',
        recipientAddress,
        amount,
        comment,
        feeAsset: feeAsset ?? undefined,
        query: { enabled: enabled && tokenType === 'JETTON' && hasInputs && Boolean(jettonAddress) },
    });

    const tonQuote = useGaslessTonTransferQuote({
        recipientAddress,
        amount,
        comment,
        feeAsset: feeAsset ?? undefined,
        query: { enabled: enabled && tokenType === 'TON' && hasInputs },
    });

    const { data: quote, isFetching: isQuoting, error: quoteError } = tokenType === 'JETTON' ? jettonQuote : tonQuote;

    const { data: feeAssetInfo } = useJettonInfo({
        address: feeAsset ?? undefined,
        query: { enabled: enabled && Boolean(feeAsset) },
    });

    const fee =
        quote && feeAssetInfo?.decimals != null
            ? `${formatUnits(quote.fee, feeAssetInfo.decimals)} ${feeAssetInfo.symbol || ''}`.trim()
            : null;

    const { mutateAsync, isPending: isSending } = useSendGaslessTransaction();

    const send = useCallback(async (): Promise<GaslessSendResponse | undefined> => {
        if (!quote) return undefined;
        return mutateAsync({ quote });
    }, [quote, mutateAsync]);

    return { quote, quoteError, isQuoting, fee, send, isSending };
};

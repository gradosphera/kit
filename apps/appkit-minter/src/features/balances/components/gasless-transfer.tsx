/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useCallback, useEffect } from 'react';
import type { FC } from 'react';
import {
    Input,
    useGaslessJettonTransferQuote,
    useGaslessSupportedAssets,
    useGaslessTonTransferQuote,
    useJettonInfo,
    useSendGaslessTransaction,
} from '@ton/appkit-react';
import { asAddressFriendly, compareAddress, formatUnits } from '@ton/appkit';
import type { GaslessSendResponse, UserFriendlyAddress } from '@ton/appkit';

const USDT_MASTER_MAINNET = 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';

const truncateAddress = (address: string): string => `${address.slice(0, 6)}…${address.slice(-4)}`;

/**
 * Renders one fee-asset `<option>`; shows the token's address until its jetton
 * info loads, then the ticker. Each instance owns its own `useJettonInfo` query
 * so labels resolve independently — React Query dedupes identical addresses.
 */
const FeeAssetOption: FC<{ address: UserFriendlyAddress }> = ({ address }) => {
    const { data } = useJettonInfo({ address });
    return <option value={address}>{data?.symbol || truncateAddress(address)}</option>;
};

interface FeeAssetSelectProps {
    value: UserFriendlyAddress | null;
    onChange: (address: UserFriendlyAddress) => void;
    disabled?: boolean;
}

/**
 * Fee-asset picker for gasless transfers. Lists the relayer-accepted assets and
 * preselects USDT (or the first asset) once they load. Uses a native `<select>`
 * styled with the app's design tokens — the browser-rendered dropdown handles
 * its own viewport clamping/scroll.
 */
export const FeeAssetSelect: FC<FeeAssetSelectProps> = ({ value, onChange, disabled }) => {
    const { data: supportedAssets, isLoading } = useGaslessSupportedAssets();

    useEffect(() => {
        if (!value && supportedAssets?.length) {
            const preferred = supportedAssets.find((asset) => compareAddress(asset.address, USDT_MASTER_MAINNET));
            onChange(preferred?.address ?? supportedAssets[0].address);
        }
    }, [value, supportedAssets, onChange]);

    const isDisabled = disabled || isLoading || !supportedAssets?.length;

    return (
        <Input size="s" disabled={isDisabled}>
            <Input.Header>
                <Input.Title>Fee asset</Input.Title>
            </Input.Header>
            <Input.Field>
                {/* Native select inside `Input.Field`: the container owns the
                    field background / border / focus state, so the select itself
                    only needs the transparent inner styling that mirrors
                    `Input.Input`. */}
                <select
                    className="flex-1 min-w-0 w-full bg-transparent border-none outline-none text-foreground p-0 cursor-pointer"
                    style={{
                        // Match `Input size="s"` typography exactly — Tailwind's
                        // text-sm (14px) differs from the design token (16px).
                        fontFamily: 'var(--ta-font-family)',
                        fontSize: 'var(--ta-input-s-size)',
                        fontWeight: 'var(--ta-input-s-weight)',
                        lineHeight: 'var(--ta-input-s-line-height)',
                    }}
                    value={value ?? ''}
                    onChange={(event) => onChange(asAddressFriendly(event.target.value))}
                    disabled={isDisabled}
                >
                    {!value && (
                        <option value="" disabled>
                            Select fee asset
                        </option>
                    )}
                    {supportedAssets?.map((asset) => (
                        <FeeAssetOption key={asset.address} address={asset.address} />
                    ))}
                </select>
            </Input.Field>
        </Input>
    );
};

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

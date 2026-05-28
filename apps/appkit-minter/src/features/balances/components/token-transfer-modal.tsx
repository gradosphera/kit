/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useMemo, useState } from 'react';
import type { Jetton, UserFriendlyAddress } from '@ton/appkit';
import { getFormattedJettonInfo, getErrorMessage } from '@ton/appkit';
import {
    SendTonButton,
    SendJettonButton,
    Button,
    Input,
    Modal,
    useAddress,
    useSelectedWallet,
} from '@ton/appkit-react';
import { Gem } from 'lucide-react';

import { FeeAssetSelect, useGaslessTransfer } from './gasless-transfer';

import { TransactionStatus } from '@/features/transaction';

interface TokenTransferModalProps {
    tokenType: 'TON' | 'JETTON';
    jetton?: Jetton;
    tonBalance: string;
    isOpen: boolean;
    onClose: () => void;
}

export const TokenTransferModal: React.FC<TokenTransferModalProps> = ({
    tokenType,
    jetton,
    tonBalance,
    isOpen,
    onClose,
}) => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [transferError, setTransferError] = useState<string | null>(null);
    const [txBoc, setTxBoc] = useState<string | null>(null);
    const [gaslessEnabled, setGaslessEnabled] = useState(false);
    const [feeAsset, setFeeAsset] = useState<UserFriendlyAddress | null>(null);

    const address = useAddress();
    const [selectedWallet] = useSelectedWallet();
    const supportsSignMessage = useMemo(() => {
        const features = selectedWallet?.getSupportedFeatures();
        if (features === undefined) return true;
        return features.some((feature) => typeof feature === 'object' && feature.name === 'SignMessage');
    }, [selectedWallet]);

    const gasless = useGaslessTransfer({
        enabled: gaslessEnabled,
        tokenType,
        jettonAddress: jetton?.address,
        recipientAddress,
        amount,
        comment,
        feeAsset,
    });

    const tokenInfo = useMemo(() => {
        if (tokenType === 'TON') {
            return {
                name: 'Toncoin',
                symbol: 'TON',
                decimals: 9,
                balance: tonBalance,
                image: './ton.png',
                address: null,
            };
        }

        if (!jetton) {
            throw new Error('Jetton not found');
        }

        const jettonInfo = getFormattedJettonInfo(jetton);

        return {
            name: jettonInfo.name,
            symbol: jettonInfo.symbol,
            decimals: jettonInfo.decimals,
            balance: jettonInfo.balance,
            image: jettonInfo.image,
            address: jettonInfo.address,
        };
    }, [tokenType, tonBalance, jetton]);

    const handleClose = () => {
        setRecipientAddress('');
        setAmount('');
        setComment('');
        setTransferError(null);
        setTxBoc(null);
        setGaslessEnabled(false);
        setFeeAsset(null);
        onClose();
    };

    const handleGaslessSubmit = async () => {
        setTransferError(null);
        try {
            const result = await gasless.send();
            if (result) setTxBoc(result.boc);
        } catch (error) {
            setTransferError(getErrorMessage(error));
        }
    };

    if (!tokenInfo.decimals) return null;

    return (
        <Modal title={`Transfer ${tokenInfo.name}`} open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center overflow-hidden">
                    {tokenInfo.image ? (
                        <img src={tokenInfo.image} alt={tokenInfo.name} className="w-full h-full object-cover" />
                    ) : tokenType === 'TON' ? (
                        <Gem className="w-6 h-6 text-primary" />
                    ) : (
                        <span className="text-sm font-bold text-tertiary-foreground">
                            {tokenInfo.symbol?.slice(0, 2)}
                        </span>
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">Available Balance</p>
                    <p className="text-xs text-tertiary-foreground">
                        {tokenInfo.balance} {tokenInfo.symbol}
                    </p>
                </div>
            </div>

            {txBoc ? (
                <div className="space-y-6">
                    <TransactionStatus boc={txBoc} />
                    <Button fullWidth onClick={handleClose}>
                        Close
                    </Button>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        <Input size="s">
                            <Input.Header>
                                <Input.Title>Recipient Address</Input.Title>
                                {address && (
                                    <button
                                        type="button"
                                        onClick={() => setRecipientAddress(address)}
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Use my address
                                    </button>
                                )}
                            </Input.Header>
                            <Input.Field>
                                <Input.Input
                                    type="text"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                    placeholder="Enter TON address"
                                />
                            </Input.Field>
                        </Input>

                        <Input size="s">
                            <Input.Header>
                                <Input.Title>Amount</Input.Title>
                            </Input.Header>
                            <Input.Field>
                                <Input.Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    step="any"
                                    min="0"
                                />
                            </Input.Field>
                        </Input>

                        <Input size="s">
                            <Input.Header>
                                <Input.Title>Comment (optional)</Input.Title>
                            </Input.Header>
                            <Input.Field>
                                <Input.Input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add a comment"
                                />
                            </Input.Field>
                        </Input>

                        <div className="space-y-2">
                            <label className="inline-flex items-center gap-2 text-sm text-foreground">
                                <input
                                    type="checkbox"
                                    checked={gaslessEnabled}
                                    disabled={!supportsSignMessage}
                                    onChange={(e) => setGaslessEnabled(e.target.checked)}
                                />
                                <span>Gasless — pay the gas fee in another token</span>
                            </label>

                            {!supportsSignMessage && (
                                <p className="text-xs text-tertiary-foreground">
                                    Connected wallet does not support gasless (no SignMessage feature).
                                </p>
                            )}

                            {gaslessEnabled && (
                                <>
                                    <FeeAssetSelect value={feeAsset} onChange={setFeeAsset} />
                                    {gasless.fee && (
                                        <p className="text-xs text-tertiary-foreground">Gas fee: {gasless.fee}</p>
                                    )}
                                    {gasless.quoteError && (
                                        <p className="text-xs text-error">{getErrorMessage(gasless.quoteError)}</p>
                                    )}
                                </>
                            )}
                        </div>

                        {transferError && (
                            <div className="p-3 bg-error/10 border border-error/30 rounded-lg">
                                <p className="text-sm text-error">{transferError}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex mt-6 gap-3">
                        {!gaslessEnabled && tokenType === 'TON' && (
                            <SendTonButton
                                recipientAddress={recipientAddress}
                                amount={amount}
                                comment={comment}
                                onError={(error) => setTransferError(getErrorMessage(error))}
                                onSuccess={(data) => setTxBoc(data.boc)}
                            >
                                {({ isLoading, onSubmit, disabled, text }) => (
                                    <Button
                                        loading={isLoading}
                                        onClick={onSubmit}
                                        disabled={disabled}
                                        className="flex-1"
                                    >
                                        {text}
                                    </Button>
                                )}
                            </SendTonButton>
                        )}

                        {!gaslessEnabled && tokenType === 'JETTON' && jetton?.address && (
                            <SendJettonButton
                                jetton={{
                                    address: jetton.address,
                                    symbol: jetton.info?.symbol || 'Jetton',
                                    decimals: tokenInfo.decimals,
                                }}
                                recipientAddress={recipientAddress}
                                amount={amount}
                                comment={comment}
                                onError={(error) => setTransferError(getErrorMessage(error))}
                                onSuccess={(data) => setTxBoc(data.boc)}
                            >
                                {({ isLoading, onSubmit, disabled, text }) => (
                                    <Button
                                        loading={isLoading}
                                        onClick={onSubmit}
                                        disabled={disabled}
                                        className="flex-1"
                                    >
                                        {text}
                                    </Button>
                                )}
                            </SendJettonButton>
                        )}

                        {gaslessEnabled && (
                            <Button
                                loading={gasless.isSending}
                                onClick={handleGaslessSubmit}
                                disabled={
                                    !recipientAddress ||
                                    !amount ||
                                    !feeAsset ||
                                    !gasless.quote ||
                                    gasless.isQuoting ||
                                    gasless.isSending
                                }
                                className="flex-1"
                            >
                                {gasless.isSending ? 'Sending…' : gasless.isQuoting ? 'Quoting…' : 'Send Gasless'}
                            </Button>
                        )}

                        <Button variant="secondary" onClick={handleClose} className="flex-1">
                            Cancel
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    );
};

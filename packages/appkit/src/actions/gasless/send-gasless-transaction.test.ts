/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GaslessErrorCode } from '@ton/walletkit';
import type { Feature, GaslessEstimateResult } from '@ton/walletkit';

import type { AppKit } from '../../core/app-kit';
import type { Base64String } from '../../types/primitives';
import type { WalletInterface } from '../../types/wallet';
import { sendGaslessTransaction } from './send-gasless-transaction';

const TEST_ADDRESS = 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';
const FAKE_INTERNAL_BOC = 'te6cckEBAQEAAgAAAA==' as Base64String;

const makeEstimate = (overrides: Partial<GaslessEstimateResult> = {}): GaslessEstimateResult => ({
    messages: [{ address: TEST_ADDRESS, amount: '60000000' }],
    fee: '1234',
    validUntil: Math.floor(Date.now() / 1000) + 60,
    relayAddress: TEST_ADDRESS,
    from: TEST_ADDRESS,
    ...overrides,
});

const SIGN_MESSAGE_FEATURE: Feature = { name: 'SignMessage', maxMessages: 4 };

const makeWallet = (overrides: Partial<WalletInterface> = {}): WalletInterface => {
    return {
        connectorId: 'tonconnect',
        getAddress: () => TEST_ADDRESS,
        getPublicKey: () => '0xabc' as never,
        getNetwork: () => ({ chainId: '-239' }) as never,
        getWalletId: () => 'wallet-1',
        getSupportedFeatures: () => [SIGN_MESSAGE_FEATURE],
        sendTransaction: vi.fn(),
        signData: vi.fn(),
        signMessage: vi.fn().mockResolvedValue({ internalBoc: FAKE_INTERNAL_BOC }),
        ...overrides,
    } as WalletInterface;
};

const makeAppKit = (wallet: WalletInterface | null) => {
    const send = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);

    const appKit = {
        walletsManager: { selectedWallet: wallet },
        gaslessManager: { send },
    } as unknown as AppKit;

    return { appKit, send };
};

describe('sendGaslessTransaction', () => {
    let wallet: WalletInterface;

    beforeEach(() => {
        wallet = makeWallet();
    });

    it('signs the estimate and submits the resulting BoC to the relayer', async () => {
        const { appKit, send } = makeAppKit(wallet);
        const estimate = makeEstimate();

        const result = await sendGaslessTransaction(appKit, { estimate });

        expect(wallet.signMessage).toHaveBeenCalledWith({
            messages: estimate.messages,
            validUntil: estimate.validUntil,
        });
        expect(send).toHaveBeenCalledWith({ walletPublicKey: '0xabc', internalBoc: FAKE_INTERNAL_BOC }, undefined);
        expect(result.internalBoc).toBe(FAKE_INTERNAL_BOC);
        expect(result.fee).toBe(estimate.fee);
    });

    it('forwards providerId to gaslessManager.send', async () => {
        const { appKit, send } = makeAppKit(wallet);

        await sendGaslessTransaction(appKit, { estimate: makeEstimate(), providerId: 'custom' });

        expect(send).toHaveBeenCalledWith(expect.anything(), 'custom');
    });

    it('throws plain Error when no wallet is connected', async () => {
        const { appKit } = makeAppKit(null);

        await expect(sendGaslessTransaction(appKit, { estimate: makeEstimate() })).rejects.toThrow(
            'Wallet not connected',
        );
    });

    it('throws GaslessError(SIGN_MESSAGE_NOT_SUPPORTED) when wallet lacks SignMessage feature', async () => {
        const walletWithoutFeature = makeWallet({
            getSupportedFeatures: () => [{ name: 'SignData' } as never],
        });
        const { appKit } = makeAppKit(walletWithoutFeature);

        await expect(sendGaslessTransaction(appKit, { estimate: makeEstimate() })).rejects.toMatchObject({
            name: 'GaslessError',
            code: GaslessErrorCode.SignMessageNotSupported,
        });
        expect(walletWithoutFeature.signMessage).not.toHaveBeenCalled();
    });

    it('throws GaslessError(TOO_MANY_MESSAGES) when estimate exceeds wallet maxMessages', async () => {
        const walletWithCap = makeWallet({
            getSupportedFeatures: () => [{ name: 'SignMessage', maxMessages: 1 }],
        });
        const { appKit } = makeAppKit(walletWithCap);
        const estimate = makeEstimate({
            messages: [
                { address: TEST_ADDRESS, amount: '1' },
                { address: TEST_ADDRESS, amount: '2' },
            ],
        });

        await expect(sendGaslessTransaction(appKit, { estimate })).rejects.toMatchObject({
            name: 'GaslessError',
            code: GaslessErrorCode.TooManyMessages,
        });
        expect(walletWithCap.signMessage).not.toHaveBeenCalled();
    });

    it('proceeds when wallet returns undefined features (unknown capabilities)', async () => {
        const walletWithUnknown = makeWallet({ getSupportedFeatures: () => undefined });
        const { appKit, send } = makeAppKit(walletWithUnknown);

        await sendGaslessTransaction(appKit, { estimate: makeEstimate() });

        expect(walletWithUnknown.signMessage).toHaveBeenCalled();
        expect(send).toHaveBeenCalled();
    });

    it('propagates errors from gaslessManager.send', async () => {
        const { appKit, send } = makeAppKit(wallet);
        send.mockRejectedValueOnce(new Error('relayer offline'));

        await expect(sendGaslessTransaction(appKit, { estimate: makeEstimate() })).rejects.toThrow('relayer offline');
    });
});

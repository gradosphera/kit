/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Address, beginCell, internal, storeMessageRelaxed } from '@ton/core';
import type { TonApiClient } from '@ton-api/client';

import type { Base64String } from '../../../api/models';
import { Network } from '../../../api/models';
import { GaslessError, GaslessErrorCode } from '../errors';
import { TonApiGaslessProvider, createTonApiGaslessProvider } from './TonApiGaslessProvider';

const TEST_ADDRESS = 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';
const TEST_PUBKEY = '0x' + 'a'.repeat(64);

const buildSignedInternalBoc = (): Base64String => {
    const msg = internal({
        to: Address.parse(TEST_ADDRESS),
        value: 0n,
        body: beginCell().storeUint(1, 32).endCell(),
        bounce: false,
    });
    const cell = beginCell().store(storeMessageRelaxed(msg)).endCell();
    return cell.toBoc().toString('base64') as Base64String;
};

const makeClient = (
    overrides: Partial<TonApiClient['gasless']> = {},
): {
    client: TonApiClient;
    gasless: {
        gaslessConfig: ReturnType<typeof vi.fn>;
        gaslessEstimate: ReturnType<typeof vi.fn>;
        gaslessSend: ReturnType<typeof vi.fn>;
    };
} => {
    const gasless = {
        gaslessConfig: vi.fn(),
        gaslessEstimate: vi.fn(),
        gaslessSend: vi.fn(),
        ...overrides,
    } as unknown as TonApiClient['gasless'];
    const client = { gasless } as unknown as TonApiClient;
    return { client, gasless: gasless as never };
};

describe('TonApiGaslessProvider configuration', () => {
    it('defaults providerId to "tonapi"', () => {
        const { client } = makeClient();
        const provider = new TonApiGaslessProvider({ client });
        expect(provider.providerId).toBe('tonapi');
    });

    it('respects providerId override', () => {
        const { client } = makeClient();
        const provider = new TonApiGaslessProvider({ client, providerId: 'custom' });
        expect(provider.providerId).toBe('custom');
    });

    it('defaults supported networks to [mainnet]', () => {
        const { client } = makeClient();
        const provider = new TonApiGaslessProvider({ client });
        expect(provider.getSupportedNetworks()).toEqual([Network.mainnet()]);
    });

    it('accepts custom networks list', () => {
        const { client } = makeClient();
        const provider = new TonApiGaslessProvider({
            client,
            networks: [Network.mainnet(), Network.testnet()],
        });
        expect(provider.getSupportedNetworks()).toEqual([Network.mainnet(), Network.testnet()]);
    });

    it('exposes "gasless" provider type', () => {
        const { client } = makeClient();
        const provider = new TonApiGaslessProvider({ client });
        expect(provider.type).toBe('gasless');
    });
});

describe('createTonApiGaslessProvider', () => {
    it('returns a factory producing a TonApiGaslessProvider', () => {
        const { client } = makeClient();
        const factory = createTonApiGaslessProvider({ client });
        const provider = factory({} as never);
        expect(provider).toBeInstanceOf(TonApiGaslessProvider);
    });
});

describe('TonApiGaslessProvider.getConfig', () => {
    let provider: TonApiGaslessProvider;
    let gasless: ReturnType<typeof makeClient>['gasless'];

    beforeEach(() => {
        const c = makeClient();
        provider = new TonApiGaslessProvider({ client: c.client });
        gasless = c.gasless;
    });

    it('maps the TonApi response to GaslessConfig', async () => {
        const relayAddress = Address.parse(TEST_ADDRESS);
        const masterAddress = Address.parse(TEST_ADDRESS);
        gasless.gaslessConfig.mockResolvedValueOnce({
            relayAddress,
            gasJettons: [{ masterId: masterAddress }],
        });

        const cfg = await provider.getConfig();

        expect(cfg.relayAddress).toBe(relayAddress.toString({ bounceable: true }));
        expect(cfg.supportedGasJettons).toHaveLength(1);
        expect(cfg.supportedGasJettons[0].jettonMaster).toBe(masterAddress.toString({ bounceable: true }));
    });

    it('wraps client errors in GaslessError(CONFIG_FAILED)', async () => {
        gasless.gaslessConfig.mockRejectedValueOnce(new Error('boom'));

        await expect(provider.getConfig()).rejects.toMatchObject({
            name: 'GaslessError',
            code: GaslessErrorCode.ConfigFailed,
        });
    });
});

describe('TonApiGaslessProvider.estimate', () => {
    let provider: TonApiGaslessProvider;
    let gasless: ReturnType<typeof makeClient>['gasless'];

    beforeEach(() => {
        const c = makeClient();
        provider = new TonApiGaslessProvider({ client: c.client });
        gasless = c.gasless;
    });

    it('maps relayer response to GaslessEstimateResult', async () => {
        const relayAddress = Address.parse(TEST_ADDRESS);
        const fromAddress = Address.parse(TEST_ADDRESS);
        const msgAddress = Address.parse(TEST_ADDRESS);
        const payloadCell = beginCell().storeUint(99, 32).endCell();

        gasless.gaslessEstimate.mockResolvedValueOnce({
            messages: [{ address: msgAddress, amount: '60000000', payload: payloadCell }],
            commission: 1234n,
            validUntil: 999999,
            relayAddress,
            from: fromAddress,
        });

        const result = await provider.estimate({
            feeJettonMaster: TEST_ADDRESS,
            walletAddress: TEST_ADDRESS,
            walletPublicKey: TEST_PUBKEY,
            messages: [{ address: TEST_ADDRESS, amount: '0' }],
        });

        expect(result.fee).toBe('1234');
        expect(result.validUntil).toBe(999999);
        expect(result.messages).toHaveLength(1);
        expect(result.messages[0].payload).toBeDefined();
    });

    it('strips 0x prefix from walletPublicKey before calling the relayer', async () => {
        const relayAddress = Address.parse(TEST_ADDRESS);
        gasless.gaslessEstimate.mockResolvedValueOnce({
            messages: [],
            commission: 0n,
            validUntil: 0,
            relayAddress,
            from: relayAddress,
        });

        await provider.estimate({
            feeJettonMaster: TEST_ADDRESS,
            walletAddress: TEST_ADDRESS,
            walletPublicKey: TEST_PUBKEY,
            messages: [{ address: TEST_ADDRESS, amount: '0' }],
        });

        const callArg = gasless.gaslessEstimate.mock.calls[0][1] as { walletPublicKey: string };
        expect(callArg.walletPublicKey).not.toMatch(/^0x/);
        expect(callArg.walletPublicKey).toBe('a'.repeat(64));
    });

    it('wraps client errors in GaslessError(ESTIMATE_FAILED)', async () => {
        gasless.gaslessEstimate.mockRejectedValueOnce(new Error('relayer down'));

        await expect(
            provider.estimate({
                feeJettonMaster: TEST_ADDRESS,
                walletAddress: TEST_ADDRESS,
                walletPublicKey: TEST_PUBKEY,
                messages: [{ address: TEST_ADDRESS, amount: '0' }],
            }),
        ).rejects.toMatchObject({
            name: 'GaslessError',
            code: GaslessErrorCode.EstimateFailed,
        });
    });
});

describe('TonApiGaslessProvider.send', () => {
    it('forwards a parsed external BoC to the relayer', async () => {
        const { client, gasless } = makeClient();
        const provider = new TonApiGaslessProvider({ client, sendRetries: 1, sendRetryDelayMs: 0 });
        gasless.gaslessSend.mockResolvedValueOnce(undefined);

        await provider.send({ walletPublicKey: TEST_PUBKEY, internalBoc: buildSignedInternalBoc() });

        expect(gasless.gaslessSend).toHaveBeenCalledTimes(1);
        const args = gasless.gaslessSend.mock.calls[0][0];
        expect(args.walletPublicKey).toBe('a'.repeat(64));
        expect(args.boc).toBeDefined();
    });

    it('retries on transient failure up to sendRetries', async () => {
        const { client, gasless } = makeClient();
        const provider = new TonApiGaslessProvider({ client, sendRetries: 3, sendRetryDelayMs: 0 });

        gasless.gaslessSend
            .mockRejectedValueOnce(new Error('transient'))
            .mockRejectedValueOnce(new Error('transient'))
            .mockResolvedValueOnce(undefined);

        await provider.send({ walletPublicKey: TEST_PUBKEY, internalBoc: buildSignedInternalBoc() });

        expect(gasless.gaslessSend).toHaveBeenCalledTimes(3);
    });

    it('wraps persistent send errors in GaslessError(SEND_FAILED)', async () => {
        const { client, gasless } = makeClient();
        const provider = new TonApiGaslessProvider({ client, sendRetries: 1, sendRetryDelayMs: 0 });
        gasless.gaslessSend.mockRejectedValue(new Error('boom'));

        await expect(
            provider.send({ walletPublicKey: TEST_PUBKEY, internalBoc: buildSignedInternalBoc() }),
        ).rejects.toMatchObject({
            name: 'GaslessError',
            code: GaslessErrorCode.SendFailed,
        });
    });
});

// Reference: imported for assertions
void GaslessError;

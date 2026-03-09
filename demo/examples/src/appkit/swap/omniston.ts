/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AppKit, Network, registerProvider } from '@ton/appkit';
import { DeDustSwapProvider } from '@ton/appkit/swap/dedust';
import { OmnistonSwapProvider } from '@ton/appkit/swap/omniston';

export const swapProviderInitExample = async () => {
    // SAMPLE_START: SWAP_PROVIDER_INIT
    // Initialize AppKit with swap providers
    const appKit = new AppKit({
        networks: {
            [Network.mainnet().chainId]: {
                apiClient: {
                    url: 'https://toncenter.com',
                    key: 'your-key',
                },
            },
        },
        providers: [
            new OmnistonSwapProvider({
                apiUrl: 'https://api.ston.fi',
                defaultSlippageBps: 100, // 1%
            }),
            new DeDustSwapProvider({
                defaultSlippageBps: 100,
                referralAddress: 'EQ...', // Optional
            }),
        ],
    });
    // SAMPLE_END: SWAP_PROVIDER_INIT

    return appKit;
};

export const swapProviderRegisterExample = async () => {
    // SAMPLE_START: SWAP_PROVIDER_REGISTER
    // 1. Initialize AppKit
    const appKit = new AppKit({
        networks: {
            [Network.mainnet().chainId]: {
                apiClient: {
                    url: 'https://toncenter.com',
                    key: 'your-key',
                },
            },
        },
    });

    // 2. Register swap providers
    registerProvider(appKit, new OmnistonSwapProvider({ defaultSlippageBps: 100 }));
    registerProvider(appKit, new DeDustSwapProvider({ defaultSlippageBps: 100 }));
    // SAMPLE_END: SWAP_PROVIDER_REGISTER

    return appKit;
};

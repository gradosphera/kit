import { AppKit, Network, createTonCenterStreamingProvider, createTonConnectConnector } from '@ton/appkit';
import { createOmnistonProvider } from '@ton/appkit/swap/omniston';
import { createDeDustProvider } from '@ton/appkit/swap/dedust';
import { createTonstakersProvider } from '@ton/appkit/staking/tonstakers';

const TONCENTER_API_KEY = import.meta.env.VITE_TONCENTER_API_KEY as string | undefined;

const TONCONNECT_MANIFEST_URL =
    (import.meta.env.VITE_TONCONNECT_MANIFEST_URL as string | undefined) ??
    `${window.location.origin}/tonconnect-manifest.json`;

export const appKit = new AppKit({
    networks: {
        [Network.mainnet().chainId]: {
            apiClient: { url: 'https://toncenter.com', key: TONCENTER_API_KEY },
        },
        [Network.testnet().chainId]: {
            apiClient: { url: 'https://testnet.toncenter.com', key: TONCENTER_API_KEY },
        },
    },
    defaultNetwork: Network.mainnet(),
    connectors: [
        createTonConnectConnector({
            tonConnectOptions: { manifestUrl: TONCONNECT_MANIFEST_URL },
        }),
    ],
    providers: [
        createTonCenterStreamingProvider({ network: Network.mainnet(), apiKey: TONCENTER_API_KEY }),
        createTonCenterStreamingProvider({ network: Network.testnet(), apiKey: TONCENTER_API_KEY }),
        createOmnistonProvider(),
        createDeDustProvider(),
        createTonstakersProvider(),
    ],
});

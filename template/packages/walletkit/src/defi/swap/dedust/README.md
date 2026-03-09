---
target: packages/walletkit/src/defi/swap/dedust/README.md
---

# DeDust Swap Provider

DeDust Router v2 is a DEX aggregator that finds the best swap rates across multiple pools and protocols on TON blockchain.

For detailed information about DeDust Router, see the [official documentation](https://hub.dedust.io/apis/router-v2/overview/).

## Quick Start

```typescript
import { DeDustSwapProvider } from '@ton/walletkit/swap/dedust';

const provider = new DeDustSwapProvider({
    defaultSlippageBps: 100, // 1%
    referralAddress: 'EQ...',
    referralFeeBps: 50, // 0.5%
});

kit.swap.registerProvider(provider);
```

## Configuration Options

```typescript
interface DeDustSwapProviderConfig {
    providerId?: string;          // Default: 'dedust'
    apiUrl?: string;              // Default: 'https://api-mainnet.dedust.io'
    defaultSlippageBps?: number;  // Default: 100 (1%)
    referralAddress?: string;     // Optional referral address
    referralFeeBps?: number;      // Referral fee in bps (max 100 = 1%)
    onlyVerifiedPools?: boolean;  // Default: true
    maxSplits?: number;           // Default: 4
    maxLength?: number;            // Default: 3 (max route hops)
    minPoolUsdTvl?: string;       // Default: '5000'
}

interface SwapQuoteParams {
    fromToken: SwapToken;
    toToken: SwapToken;
    amount: string;
    network: Network;
    slippageBps?: number;
    isReverseSwap?: boolean;
    providerOptions?: DeDustProviderOptions;
}
```

**Note:** DeDust Router only supports mainnet. Requests on other networks will fail.

## Protocol Routing

DeDust routes across multiple protocols. You can customize which protocols to use:

```typescript
import type { DeDustProviderOptions } from '@ton/walletkit/swap/dedust';

const quote = await kit.swap.getQuote({
    fromToken: { address: 'ton', decimals: 9 },
    toToken: { address: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs', decimals: 6 },
    amount: '1000000000',
    network: Network.mainnet(),
    providerOptions: {
        protocols: ['dedust', 'dedust_v3', 'stonfi_v1', 'stonfi_v2', 'tonco'],
        excludeProtocols: ['memeslab'],
        onlyVerifiedPools: true,
        maxSplits: 4,
        maxLength: 3,
        excludeVolatilePools: true,
    } as DeDustProviderOptions,
});
```

## Referral Fees

Pass referral options via `providerOptions` to earn fees on swaps:

```typescript
import type { DeDustProviderOptions } from '@ton/walletkit/swap/dedust';

const quote = await kit.swap.getQuote({
    fromToken: { address: 'ton', decimals: 9 },
    toToken: { address: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs', decimals: 6 },
    amount: '1000000000',
    network: Network.mainnet(),
    providerOptions: {
        referralAddress: 'EQ...',
        referralFeeBps: 50, // 0.5%
    } as DeDustProviderOptions,
});
```

### Overriding Referral Settings

You can set a global referrer in provider config and override it for specific requests:

```typescript
// Global referrer in config
const provider = new DeDustSwapProvider({
    referralAddress: 'EQ...global',
    referralFeeBps: 50,
});

// Override for specific quote
const quote = await kit.swap.getQuote({
    fromToken: { address: 'ton', decimals: 9 },
    toToken: { address: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs', decimals: 6 },
    amount: '1000000000',
    network: Network.mainnet(),
    providerOptions: {
        referralAddress: 'EQ...different', // Uses this instead of global
        referralFeeBps: 75,
    } as DeDustProviderOptions,
});

// Or use global settings by omitting providerOptions
const quote2 = await kit.swap.getQuote({
    fromToken: { address: 'ton', decimals: 9 },
    toToken: { address: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs', decimals: 6 },
    amount: '1000000000',
    network: Network.mainnet(),
    // Uses global referrer from config
});
```

## Resources

- [DeDust Router v2 Documentation](https://hub.dedust.io/apis/router-v2/overview/) - API overview
- [Quote API](https://hub.dedust.io/apis/router-v2/quote/) - Get swap quotes
- [Swap API](https://hub.dedust.io/apis/router-v2/swap/) - Build swap transactions
- [Demo Implementation](https://github.com/ton-connect/kit/blob/main/apps/demo-wallet/src/pages/Swap.tsx) - Working example

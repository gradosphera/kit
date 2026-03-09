---
target: packages/walletkit/src/defi/swap/dedust/README.md
---

# DeDust Swap Provider

DeDust Router v2 is a DEX aggregator that finds the best swap rates across multiple pools and protocols on TON blockchain.

For detailed information about DeDust Router, see the [official documentation](https://hub.dedust.io/apis/router-v2/overview/).

## Quick Start

%%demo/examples/src/appkit/swap#DEDUST_QUICK_START%%

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
    from: SwapToken;
    to: SwapToken;
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

%%demo/examples/src/appkit/swap#DEDUST_PROTOCOL_ROUTING%%

## Referral Fees

Pass referral options via `providerOptions` to earn fees on swaps:

%%demo/examples/src/appkit/swap#DEDUST_REFERRAL_FEES%%

### Overriding Referral Settings

You can set a global referrer in provider config and override it for specific requests:

%%demo/examples/src/appkit/swap#DEDUST_OVERRIDING_REFERRAL%%

## Resources

- [DeDust Router v2 Documentation](https://hub.dedust.io/apis/router-v2/overview/) - API overview
- [Quote API](https://hub.dedust.io/apis/router-v2/quote/) - Get swap quotes
- [Swap API](https://hub.dedust.io/apis/router-v2/swap/) - Build swap transactions
- [Demo Implementation](https://github.com/ton-connect/kit/blob/main/apps/demo-wallet/src/pages/Swap.tsx) - Working example

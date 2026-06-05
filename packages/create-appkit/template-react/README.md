# TON AppKit Template

Minimal Vite + React + TypeScript template that showcases the core capabilities of `@ton/appkit-react`:

- TonConnect wallet connection — `<TonConnectButton />`
- Live TON balance over WebSocket — `useBalance()` + `useWatchBalance()`
- Send TON (safe self-transfer demo) — `<SendTonButton />`
- Jetton list with icons + balances — `useJettons()`
- NFT grid — `useNfts()` + `<NftItem />`
- Full DEX swap UI (Omniston + DeDust fallback) — `<SwapWidget />`
- Liquid staking UI (Tonstakers) — `<StakingWidget />`

## Run

```bash
pnpm install
cp .env.example .env   # add VITE_TONCENTER_API_KEY
pnpm dev
```

Other scripts: `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm preview`.

## Configure

All runtime config is in `.env` (see `.env.example`) and `src/appKit.ts`.

- **`VITE_TONCENTER_API_KEY`** — free key at <https://docs.ton.org/applications/api/toncenter/get-api-key>. Required for
  Tonstakers (polls ~1×/sec); recommended for everything else.
- **`VITE_TONCONNECT_MANIFEST_URL`** — optional override. Defaults to
  `${origin}/tonconnect-manifest.json`. For prod, update the placeholder in `public/tonconnect-manifest.json`.

## Project layout

```
src/
  main.tsx                    # entry, mounts <App />
  App.tsx                     # root component with Providers
  Providers.tsx               # QueryClientProvider + AppKitProvider + styles.css
  appKit.ts                   # AppKit config: networks, connectors, providers
  components/
    Header.tsx                # app header with TonConnectButton
    BalanceCard.tsx            # TON balance display + send button
    JettonsCard.tsx            # jetton list
    NftsCard.tsx               # NFT grid
    SwapCard.tsx               # swap widget with error handling
    StakingCard.tsx            # staking widget
  polyfills.ts                # Buffer polyfill for @ton/core
```

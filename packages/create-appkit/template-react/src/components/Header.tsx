import { TonConnectButton } from '@ton/appkit-react';

export function Header() {
    return (
        <header className="app-header">
            <div className="app-title">
                <img src="/favicon.svg" alt="" className="app-logo" />
                <h1>TON AppKit Template</h1>
            </div>
            <TonConnectButton />
        </header>
    );
}

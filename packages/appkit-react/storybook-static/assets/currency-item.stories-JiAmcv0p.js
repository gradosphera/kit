import{i as e}from"./preload-helper-xPQekRTU.js";import{Nn as t}from"./iframe-CbKJG4TV.js";import{n,t as r}from"./currency-item-C719btgg.js";var i,a,o,s,c,l,u,d,f,p;e((()=>{n(),i=t(),{fn:a}=__STORYBOOK_MODULE_TEST__,o={title:`Features/Balances/CurrencyItem`,component:r,tags:[`autodocs`],args:{onClick:a()}},s={args:{ticker:`TON`,name:`Toncoin`,balance:`55`,icon:`https://ton.org/download/ton_symbol.png`,isVerified:!0}},c={args:{ticker:`USDT`,name:`Tether USD`,balance:`10`,isVerified:!0}},l={args:{ticker:`MEME`,name:`Meme Token`,balance:`10000`,isVerified:!1}},u={args:{ticker:`TON`,name:`Toncoin`,balance:`0`,icon:`https://ton.org/download/ton_symbol.png`,isVerified:!0}},d={args:{ticker:`TON`,name:`Toncoin`,icon:`https://ton.org/download/ton_symbol.png`,isVerified:!0}},f={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`4px`,width:`320px`},children:[(0,i.jsx)(r,{ticker:`TON`,name:`Toncoin`,balance:`55`,icon:`https://ton.org/download/ton_symbol.png`,isVerified:!0,onClick:a()}),(0,i.jsx)(r,{ticker:`USDT`,name:`Tether USD`,balance:`10`,isVerified:!0,onClick:a()}),(0,i.jsx)(r,{ticker:`NOT`,name:`Notcoin`,balance:`500`,isVerified:!0,onClick:a()})]})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ticker: 'TON',
    name: 'Toncoin',
    balance: '55',
    icon: 'https://ton.org/download/ton_symbol.png',
    isVerified: true
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ticker: 'USDT',
    name: 'Tether USD',
    balance: '10',
    isVerified: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ticker: 'MEME',
    name: 'Meme Token',
    balance: '10000',
    isVerified: false
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ticker: 'TON',
    name: 'Toncoin',
    balance: '0',
    icon: 'https://ton.org/download/ton_symbol.png',
    isVerified: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ticker: 'TON',
    name: 'Toncoin',
    icon: 'https://ton.org/download/ton_symbol.png',
    isVerified: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '320px'
  }}>
            <CurrencyItem ticker="TON" name="Toncoin" balance="55" icon="https://ton.org/download/ton_symbol.png" isVerified={true} onClick={fn()} />
            <CurrencyItem ticker="USDT" name="Tether USD" balance="10" isVerified={true} onClick={fn()} />
            <CurrencyItem ticker="NOT" name="Notcoin" balance="500" isVerified={true} onClick={fn()} />
        </div>
}`,...f.parameters?.docs?.source}}},p=[`TON`,`USDT`,`Unverified`,`ZeroBalance`,`NoBalance`,`CurrencyList`]}))();export{f as CurrencyList,d as NoBalance,s as TON,c as USDT,l as Unverified,u as ZeroBalance,p as __namedExportsOrder,o as default};
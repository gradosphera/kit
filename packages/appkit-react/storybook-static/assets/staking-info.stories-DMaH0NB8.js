import{i as e}from"./preload-helper-xPQekRTU.js";import{F as t,xn as n,yn as r}from"./iframe-CbKJG4TV.js";import{n as i,t as a}from"./staking-info-DCOWEsst.js";var o,s,c,l,u,d,f,p;e((()=>{t(),i(),o={title:`Features/Staking/Internal/StakingInfo`,component:a},s={providerId:`tonstakers`,name:`Tonstakers`,description:`Staking provider`,image:`https://asset.ston.fi/img/EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav/38f530facb209e4696b8aef17af51df94d16bd879926c517b07d25841da287b7`,stakeToken:{symbol:`TON`,ticker:`TON`,decimals:9,address:`ton`},receiveToken:{symbol:`tsTON`,ticker:`tsTON`,decimals:9,address:`EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav`},supportedUnstakeModes:[r.INSTANT,r.ROUND_END],supportsReversedQuote:!1},c={apy:4.5,exchangeRate:`0.909090909`,instantUnstakeAvailable:`10000000000`},l={amountIn:`1000000000`,amountOut:`950000000`,rawAmountIn:`1000000000`,rawAmountOut:`950000000`,providerId:`tonstakers`,direction:`stake`,network:n.mainnet()},u={args:{quote:l,isQuoteLoading:!1,providerInfo:c,providerMetadata:s,isProviderInfoLoading:!1,direction:`stake`}},d={args:{...u.args,direction:`unstake`}},f={args:{...u.args,isQuoteLoading:!0,isProviderInfoLoading:!0}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    quote: mockQuote,
    isQuoteLoading: false,
    providerInfo: mockProviderInfo,
    providerMetadata: mockMetadata,
    isProviderInfoLoading: false,
    direction: 'stake'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    direction: 'unstake'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    isQuoteLoading: true,
    isProviderInfoLoading: true
  }
}`,...f.parameters?.docs?.source}}},p=[`Default`,`Unstake`,`Loading`]}))();export{u as Default,f as Loading,d as Unstake,p as __namedExportsOrder,o as default};
import{i as e}from"./preload-helper-xPQekRTU.js";import{F as t,yn as n}from"./iframe-CbKJG4TV.js";import{n as r,t as i}from"./select-unstake-mode--hy6beO_.js";var a,o,s,c,l,u;e((()=>{t(),r(),a={title:`Features/Staking/Internal/SelectUnstakeMode`,component:i},o={name:`Tonstakers`,providerId:`tonstakers`,stakeToken:{symbol:`TON`,ticker:`TON`,decimals:9,address:`ton`},supportedUnstakeModes:[n.INSTANT,n.ROUND_END,n.WHEN_AVAILABLE],supportsReversedQuote:!1},s={instantUnstakeAvailable:`10000000000`,exchangeRate:`0.909090909`,apy:4.5},c={args:{value:n.INSTANT,onValueChange:()=>{},providerInfo:s,providerMetadata:o}},l={args:{...c.args,providerMetadata:{...o,supportedUnstakeModes:[n.INSTANT]}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: UnstakeMode.INSTANT,
    onValueChange: () => {},
    providerInfo: mockProviderInfo,
    providerMetadata: mockMetadata
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    providerMetadata: {
      ...mockMetadata,
      supportedUnstakeModes: [UnstakeMode.INSTANT]
    }
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`,`LimitedModes`]}))();export{c as Default,l as LimitedModes,u as __namedExportsOrder,a as default};
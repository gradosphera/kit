import{i as e}from"./preload-helper-xPQekRTU.js";import{F as t,yn as n}from"./iframe-CbKJG4TV.js";import{n as r,t as i}from"./staking-balance-block-DyrMWs5W.js";var a,o,s,c,l,u;e((()=>{t(),r(),a={title:`Features/Staking/Internal/StakingBalanceBlock`,component:i},o={providerId:`tonstakers`,name:`Tonstakers`,description:`Staking provider`,image:`https://asset.ston.fi/img/EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav/38f530facb209e4696b8aef17af51df94d16bd879926c517b07d25841da287b7`,stakeToken:{symbol:`TON`,ticker:`TON`,decimals:9,address:`ton`},receiveToken:{symbol:`tsTON`,ticker:`tsTON`,decimals:9,address:`EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav`},supportedUnstakeModes:[n.INSTANT,n.ROUND_END],supportsReversedQuote:!1},s={args:{direction:`stake`,providerMetadata:o,balance:`10000000000`,isBalanceLoading:!1}},c={args:{direction:`unstake`,providerMetadata:o,stakedBalance:`5000000000`,isStakedBalanceLoading:!1}},l={args:{direction:`stake`,providerMetadata:o,isBalanceLoading:!0}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    direction: 'stake',
    providerMetadata: mockMetadata,
    balance: '10000000000',
    // 10 TON
    isBalanceLoading: false
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    direction: 'unstake',
    providerMetadata: mockMetadata,
    stakedBalance: '5000000000',
    // 5 tsTON
    isStakedBalanceLoading: false
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    direction: 'stake',
    providerMetadata: mockMetadata,
    isBalanceLoading: true
  }
}`,...l.parameters?.docs?.source}}},u=[`Stake`,`Unstake`,`Loading`]}))();export{l as Loading,s as Stake,c as Unstake,u as __namedExportsOrder,a as default};
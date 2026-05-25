import{i as e}from"./preload-helper-xPQekRTU.js";import{n as t,t as n}from"./tokens-B80LVgAq.js";import{n as r,t as i}from"./swap-field-BKP1Li1h.js";var a,o,s,c,l,u;e((()=>{t(),r(),a={title:`Features/Swap/Internal/SwapField`,component:i},o={args:{type:`pay`,token:n[0],amount:`10`,balance:`100000000000`,onAmountChange:()=>{},isWalletConnected:!0}},s={args:{type:`receive`,token:n[1],amount:`25`,balance:`500000000`,isWalletConnected:!0}},c={args:{...s.args,loading:!0}},l={args:{...o.args,isWalletConnected:!1}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'pay',
    token: STORY_TOKENS[0],
    // TON
    amount: '10',
    balance: '100000000000',
    onAmountChange: () => {},
    isWalletConnected: true
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'receive',
    token: STORY_TOKENS[1],
    // USDT
    amount: '25',
    balance: '500000000',
    isWalletConnected: true
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...Receive.args,
    loading: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...Pay.args,
    isWalletConnected: false
  }
}`,...l.parameters?.docs?.source}}},u=[`Pay`,`Receive`,`Loading`,`NoWallet`]}))();export{c as Loading,l as NoWallet,o as Pay,s as Receive,u as __namedExportsOrder,a as default};
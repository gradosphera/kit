import{i as e}from"./preload-helper-xPQekRTU.js";import{n as t,t as n}from"./swap-info-DNFN3d-g.js";var r,i,a,o,s,c,l;e((()=>{t(),r={title:`Features/Swap/Internal/SwapInfo`,component:n},i={address:`EQB-MPwrd1G6WKNkLz_VnV6WqBDd142KMQv-g1O-8QUA3728`,symbol:`USDT`,name:`Tether USD`,decimals:6,imageUrl:``},a={minReceived:`24900000`,providerId:`stonfi`},o={getMetadata:()=>({name:`STON.fi`})},s={args:{quote:a,provider:o,toToken:i,slippage:100,isQuoteLoading:!1}},c={args:{toToken:null,slippage:100,isQuoteLoading:!0}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    quote,
    provider,
    toToken,
    slippage: 100,
    isQuoteLoading: false
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    toToken: null,
    slippage: 100,
    isQuoteLoading: true
  }
}`,...c.parameters?.docs?.source}}},l=[`Default`,`Loading`]}))();export{s as Default,c as Loading,l as __namedExportsOrder,r as default};
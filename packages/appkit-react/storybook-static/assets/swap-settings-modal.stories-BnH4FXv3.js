import{i as e}from"./preload-helper-xPQekRTU.js";import{n as t,t as n}from"./swap-settings-modal-DL98SUpo.js";var r,i,a,o,s,c,l,u;e((()=>{t(),r=(e,t)=>({providerId:e,type:`swap`,getMetadata:()=>({name:t})}),i=r(`stonfi`,`STON.fi`),a=r(`dedust`,`DeDust`),o={title:`Features/Swap/Internal/SwapSettingsModal`,component:n},s={args:{open:!0,slippage:50,provider:i,providers:[i,a],onClose:()=>{},onSlippageChange:()=>{},onProviderChange:()=>{}}},c={args:{open:!0,slippage:100,provider:i,providers:[i],onClose:()=>{},onSlippageChange:()=>{},onProviderChange:()=>{}}},l={args:{open:!0,slippage:600,provider:a,providers:[i,a],onClose:()=>{},onSlippageChange:()=>{},onProviderChange:()=>{}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    slippage: 50,
    provider: stonfi,
    providers: [stonfi, dedust],
    onClose: () => {},
    onSlippageChange: () => {},
    onProviderChange: () => {}
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    slippage: 100,
    provider: stonfi,
    providers: [stonfi],
    onClose: () => {},
    onSlippageChange: () => {},
    onProviderChange: () => {}
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    slippage: 600,
    provider: dedust,
    providers: [stonfi, dedust],
    onClose: () => {},
    onSlippageChange: () => {},
    onProviderChange: () => {}
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`,`SingleProvider`,`HighSlippage`]}))();export{s as Default,l as HighSlippage,c as SingleProvider,u as __namedExportsOrder,o as default};
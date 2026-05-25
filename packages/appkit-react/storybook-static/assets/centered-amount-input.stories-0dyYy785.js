import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Nn as n,tr as r}from"./iframe-CbKJG4TV.js";import{n as i,t as a}from"./centered-amount-input-jgveeewu.js";var o,s,c,l,u,d,f,p,m;e((()=>{o=t(r(),1),i(),s=n(),c={title:`Components/UI/CenteredAmountInput`,component:a,tags:[`autodocs`]},l=e=>{let[t,n]=(0,o.useState)(``);return(0,s.jsx)(`div`,{style:{width:e.width??370},children:(0,s.jsx)(a,{value:t,onValueChange:n,symbol:e.symbol,ticker:e.ticker,placeholder:e.placeholder})})},u={render:()=>(0,s.jsx)(l,{symbol:`$`})},d={render:()=>(0,s.jsx)(l,{ticker:`TON`})},f={render:()=>(0,s.jsx)(l,{symbol:`$`,ticker:`USD`})},p={render:()=>(0,s.jsx)(l,{symbol:`€`,ticker:`EUR`,width:200})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Template symbol="$" />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Template ticker="TON" />
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Template symbol="$" ticker="USD" />
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Template symbol="€" ticker="EUR" width={200} />
}`,...p.parameters?.docs?.source}}},m=[`WithSymbol`,`WithTicker`,`WithSymbolAndTicker`,`NarrowContainer`]}))();export{p as NarrowContainer,u as WithSymbol,f as WithSymbolAndTicker,d as WithTicker,m as __namedExportsOrder,c as default};
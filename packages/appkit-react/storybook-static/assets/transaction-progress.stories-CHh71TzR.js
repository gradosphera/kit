import{i as e}from"./preload-helper-xPQekRTU.js";import{Dn as t,En as n,Nn as r}from"./iframe-CbKJG4TV.js";import{i,n as a,r as o,t as s}from"./transaction-progress-B1SCBZ4d.js";var c,l,u,d,f,p,m,h,g;e((()=>{t(),i(),a(),c=r(),l=({status:e=`pending`,totalMessages:t=0,onchainMessages:r=0,pendingMessages:i=0,error:a=null})=>{let l={status:e,totalMessages:t,onchainMessages:r,pendingMessages:i,isFetching:e===`pending`,error:a,boc:`te6cc...`};return(0,c.jsx)(n,{children:(0,c.jsx)(o.Provider,{value:l,children:(0,c.jsx)(`div`,{style:{width:`400px`,display:`flex`,justifyContent:`center`},children:(0,c.jsx)(s,{})})})})},u={title:`Features/Transaction/TransactionProgress`,component:l,tags:[`autodocs`]},d={args:{status:`pending`,totalMessages:0,onchainMessages:0}},f={args:{status:`pending`,totalMessages:5,onchainMessages:3,pendingMessages:2}},p={args:{status:`completed`,totalMessages:5,onchainMessages:5,pendingMessages:0}},m={args:{status:`failed`}},h={args:{status:`pending`,error:Error(`Simulation failed or transaction rejected`)}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'pending',
    totalMessages: 0,
    onchainMessages: 0
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'pending',
    totalMessages: 5,
    onchainMessages: 3,
    pendingMessages: 2
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'completed',
    totalMessages: 5,
    onchainMessages: 5,
    pendingMessages: 0
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'failed'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'pending',
    error: new Error('Simulation failed or transaction rejected')
  }
}`,...h.parameters?.docs?.source}}},g=[`PendingInitial`,`PendingWithProgress`,`Completed`,`Failed`,`ErrorState`]}))();export{p as Completed,h as ErrorState,m as Failed,d as PendingInitial,f as PendingWithProgress,g as __namedExportsOrder,u as default};
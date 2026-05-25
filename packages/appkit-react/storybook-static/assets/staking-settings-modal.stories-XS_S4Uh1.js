import{i as e}from"./preload-helper-xPQekRTU.js";import{n as t,t as n}from"./staking-settings-modal-BQR6TuVw.js";var r,i,a,o,s,c,l;e((()=>{t(),r=(e,t)=>({providerId:e,type:`staking`,getStakingProviderMetadata:()=>({name:t})}),i=r(`tonstakers`,`Tonstakers`),a=r(`bemo`,`bemo`),o={title:`Features/Staking/Internal/StakingSettingsModal`,component:n},s={args:{open:!0,provider:i,providers:[i,a],onClose:()=>{},onProviderChange:()=>{}}},c={args:{open:!0,provider:i,providers:[i],onClose:()=>{},onProviderChange:()=>{}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    provider: tonstakers,
    providers: [tonstakers, bemo],
    onClose: () => {},
    onProviderChange: () => {}
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    provider: tonstakers,
    providers: [tonstakers],
    onClose: () => {},
    onProviderChange: () => {}
  }
}`,...c.parameters?.docs?.source}}},l=[`Default`,`SingleProvider`]}))();export{s as Default,c as SingleProvider,l as __namedExportsOrder,o as default};
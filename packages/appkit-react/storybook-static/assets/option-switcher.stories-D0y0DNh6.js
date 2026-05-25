import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Nn as n,tr as r}from"./iframe-CbKJG4TV.js";import{n as i,t as a}from"./option-switcher-D-AnihHu.js";var o,s,c,l,u,d,f,p,m,h;e((()=>{o=t(r(),1),i(),s=n(),{fn:c}=__STORYBOOK_MODULE_TEST__,l={title:`Components/Shared/OptionSwitcher`,component:a,tags:[`autodocs`]},u=[{value:`stonfi`,label:`STON.fi`},{value:`dedust`,label:`DeDust`},{value:`omniston`,label:`Omniston`}],d=[{value:`50`,label:`0.50%`},{value:`100`,label:`1.00%`},{value:`200`,label:`2.00%`}],f={render:()=>(0,s.jsx)(()=>{let[e,t]=(0,o.useState)(`stonfi`);return(0,s.jsx)(a,{value:e,options:u,onChange:t})},{})},p={args:{value:`stonfi`,options:u,onChange:c(),disabled:!0}},m={render:()=>(0,s.jsx)(()=>{let[e,t]=(0,o.useState)(`50`);return(0,s.jsx)(a,{value:e,options:d,onChange:t})},{})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('stonfi');
      return <OptionSwitcher value={value} options={PROVIDER_OPTIONS} onChange={setValue} />;
    };
    return <Wrapper />;
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'stonfi',
    options: PROVIDER_OPTIONS,
    onChange: fn(),
    disabled: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('50');
      return <OptionSwitcher value={value} options={SLIPPAGE_OPTIONS} onChange={setValue} />;
    };
    return <Wrapper />;
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Disabled`,`Slippage`]}))();export{f as Default,p as Disabled,m as Slippage,h as __namedExportsOrder,l as default};
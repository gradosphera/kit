import{i as e}from"./preload-helper-xPQekRTU.js";import{Nn as t}from"./iframe-CbKJG4TV.js";import{n,t as r}from"./clsx-BIo1m4C3.js";import{t as i}from"./button-C5tENOoY.js";import{t as a}from"./button-ERzuLl8S.js";var o,s,c,l=e((()=>{o=`_container_1yxqc_1`,s=`_preset_1yxqc_10`,c={container:o,preset:s}})),u,d,f=e((()=>{n(),a(),l(),u=t(),d=({presets:e,currencySymbol:t,onPresetSelect:n,className:a,...o})=>(0,u.jsx)(`div`,{className:r(c.container,a),...o,children:e.map(e=>(0,u.jsxs)(i,{size:`s`,variant:`secondary`,className:c.preset,onClick:()=>e.onSelect?e.onSelect():n(e.amount),children:[t,e.label]},e.label))}),d.__docgenInfo={description:``,methods:[],displayName:`AmountPresets`,props:{presets:{required:!0,tsType:{name:`Array`,elements:[{name:`AmountPreset`}],raw:`AmountPreset[]`},description:``},currencySymbol:{required:!1,tsType:{name:`string`},description:``},onPresetSelect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``}},composes:[`ComponentProps`]}})),p,m,h,g,_;e((()=>{f(),{fn:p}=__STORYBOOK_MODULE_TEST__,m={title:`Components/Shared/AmountPresets`,component:d,tags:[`autodocs`]},h={args:{presets:[{label:`10%`,amount:`10`},{label:`50%`,amount:`50`},{label:`75%`,amount:`75`},{label:`MAX`,amount:`100`}],onPresetSelect:p()}},g={args:{presets:[{label:`10`,amount:`10`},{label:`50`,amount:`50`},{label:`100`,amount:`100`},{label:`500`,amount:`500`}],currencySymbol:`$`,onPresetSelect:p()}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    presets: [{
      label: '10%',
      amount: '10'
    }, {
      label: '50%',
      amount: '50'
    }, {
      label: '75%',
      amount: '75'
    }, {
      label: 'MAX',
      amount: '100'
    }],
    onPresetSelect: fn()
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    presets: [{
      label: '10',
      amount: '10'
    }, {
      label: '50',
      amount: '50'
    }, {
      label: '100',
      amount: '100'
    }, {
      label: '500',
      amount: '500'
    }],
    currencySymbol: '$',
    onPresetSelect: fn()
  }
}`,...g.parameters?.docs?.source}}},_=[`Default`,`WithCurrencySymbol`]}))();export{h as Default,g as WithCurrencySymbol,_ as __namedExportsOrder,m as default};
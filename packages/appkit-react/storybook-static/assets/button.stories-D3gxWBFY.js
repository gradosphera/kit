import{i as e}from"./preload-helper-xPQekRTU.js";import{Nn as t}from"./iframe-CbKJG4TV.js";import{n,t as r}from"./button-C5tENOoY.js";var i,a,o,s,c,l,u,d,f,p;e((()=>{n(),i=t(),a={title:`Components/UI/Button`,component:r,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`s`,`m`,`l`,`unset`]},borderRadius:{control:`select`,options:[`s`,`m`,`l`,`xl`,`2xl`,`full`]},variant:{control:`select`,options:[`fill`,`secondary`,`bezeled`,`gray`,`ghost`,`unstyled`]},disabled:{control:`boolean`},loading:{control:`boolean`},fullWidth:{control:`boolean`}}},o={args:{children:`Action`,variant:`fill`,size:`l`}},s={args:{children:`Action`,variant:`bezeled`,size:`l`}},c={args:{children:`Action`,variant:`gray`,size:`l`}},l={render:e=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,i.jsx)(r,{...e,size:`l`,children:`Large Button`}),(0,i.jsx)(r,{...e,size:`m`,children:`Medium Button`}),(0,i.jsx)(r,{...e,size:`s`,children:`Small Button`})]}),args:{variant:`fill`}},u={render:e=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,i.jsx)(r,{...e,variant:`fill`,children:`Fill Button`}),(0,i.jsx)(r,{...e,variant:`bezeled`,children:`Bezeled Button`}),(0,i.jsx)(r,{...e,variant:`gray`,children:`Gray Button`})]}),args:{size:`l`}},d={args:{children:`Loading Button`,loading:!0}},f={args:{children:`Bare button`,variant:`unstyled`,size:`unset`}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Action',
    variant: 'fill',
    size: 'l'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Action',
    variant: 'bezeled',
    size: 'l'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Action',
    variant: 'gray',
    size: 'l'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
            <Button {...args} size="l">
                Large Button
            </Button>
            <Button {...args} size="m">
                Medium Button
            </Button>
            <Button {...args} size="s">
                Small Button
            </Button>
        </div>,
  args: {
    variant: 'fill'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
            <Button {...args} variant="fill">
                Fill Button
            </Button>
            <Button {...args} variant="bezeled">
                Bezeled Button
            </Button>
            <Button {...args} variant="gray">
                Gray Button
            </Button>
        </div>,
  args: {
    size: 'l'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Loading Button',
    loading: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Bare button',
    variant: 'unstyled',
    size: 'unset'
  }
}`,...f.parameters?.docs?.source}}},p=[`Fill`,`Bezeled`,`Gray`,`Sizes`,`Variants`,`Loading`,`Unstyled`]}))();export{s as Bezeled,o as Fill,c as Gray,d as Loading,l as Sizes,f as Unstyled,u as Variants,p as __namedExportsOrder,a as default};
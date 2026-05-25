import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Nn as n,tr as r}from"./iframe-CbKJG4TV.js";import{t as i}from"./button-C5tENOoY.js";import{t as a}from"./button-ERzuLl8S.js";import{n as o,t as s}from"./tokens-B80LVgAq.js";import{n as c,t as l}from"./token-select-modal-BUpOUNZI.js";var u,d,f,p,m,h;e((()=>{u=t(r(),1),o(),a(),c(),d=n(),f={title:`Components/Shared/TokenSelectModal`,component:l,tags:[`autodocs`]},p={render:()=>{let[e,t]=(0,u.useState)(!1),[n,r]=(0,u.useState)(null);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i,{onClick:()=>t(!0),children:n?`Selected: ${n.symbol}`:`Select Token`}),(0,d.jsx)(l,{open:e,onClose:()=>t(!1),tokens:s,onSelect:r,title:`Select Token`,searchPlaceholder:`Search by name or symbol`})]})}},m={render:()=>{let[e,t]=(0,u.useState)(!1);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i,{onClick:()=>t(!0),children:`Open Empty List`}),(0,d.jsx)(l,{open:e,onClose:()=>t(!1),tokens:[],onSelect:()=>{},title:`Select Token`,searchPlaceholder:`Search by name or symbol`})]})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<AppkitUIToken | null>(null);
    return <>
                <Button onClick={() => setOpen(true)}>
                    {selected ? \`Selected: \${selected.symbol}\` : 'Select Token'}
                </Button>
                <TokenSelectModal open={open} onClose={() => setOpen(false)} tokens={STORY_TOKENS} onSelect={setSelected} title="Select Token" searchPlaceholder="Search by name or symbol" />
            </>;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
                <Button onClick={() => setOpen(true)}>Open Empty List</Button>
                <TokenSelectModal open={open} onClose={() => setOpen(false)} tokens={[]} onSelect={() => {}} title="Select Token" searchPlaceholder="Search by name or symbol" />
            </>;
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Empty`]}))();export{p as Default,m as Empty,h as __namedExportsOrder,f as default};
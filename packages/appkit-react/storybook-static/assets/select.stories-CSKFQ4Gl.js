import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Nn as n,tr as r}from"./iframe-CbKJG4TV.js";import{S as i}from"./verified-icon-YdkPPOhN.js";import{t as a}from"./icons-BcBpGi-T.js";import{n as o,t as s}from"./select-oiKxEwmg.js";var c,l,u,d,f,p,m,h,g,_,v;e((()=>{c=t(r(),1),a(),o(),l=n(),{fn:u}=__STORYBOOK_MODULE_TEST__,d={title:`Components/UI/Select`,component:s.Root},f=[{value:`stonfi`,label:`STON.fi`},{value:`dedust`,label:`DeDust`},{value:`omniston`,label:`Omniston`}],p={render:()=>(0,l.jsxs)(s.Root,{defaultValue:`stonfi`,onValueChange:u(),children:[(0,l.jsxs)(s.Trigger,{variant:`gray`,size:`m`,borderRadius:`l`,children:[`STON.fi`,(0,l.jsx)(i,{size:16})]}),(0,l.jsx)(s.Content,{children:f.map(e=>(0,l.jsx)(s.Item,{value:e.value,children:e.label},e.value))})]})},m={render:()=>(0,l.jsx)(()=>{let[e,t]=(0,c.useState)(`stonfi`),n=f.find(t=>t.value===e);return(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,l.jsxs)(s.Root,{value:e,onValueChange:t,children:[(0,l.jsxs)(s.Trigger,{variant:`gray`,size:`m`,borderRadius:`l`,children:[n?.label??e,(0,l.jsx)(i,{size:16})]}),(0,l.jsx)(s.Content,{children:f.map(e=>(0,l.jsx)(s.Item,{value:e.value,children:e.label},e.value))})]}),(0,l.jsxs)(`span`,{style:{fontSize:12,color:`var(--ta-color-text-secondary)`},children:[`Selected: `,e]})]})},{})},h={render:()=>(0,l.jsx)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,width:320},children:(0,l.jsxs)(s.Root,{defaultValue:`dedust`,children:[(0,l.jsxs)(s.Trigger,{variant:`gray`,size:`m`,borderRadius:`l`,children:[`DeDust`,(0,l.jsx)(i,{size:16})]}),(0,l.jsx)(s.Content,{align:`end`,children:f.map(e=>(0,l.jsx)(s.Item,{value:e.value,children:e.label},e.value))})]})})},g={render:()=>(0,l.jsxs)(s.Root,{defaultValue:`stonfi`,disabled:!0,children:[(0,l.jsxs)(s.Trigger,{variant:`gray`,size:`m`,borderRadius:`l`,children:[`STON.fi`,(0,l.jsx)(i,{size:16})]}),(0,l.jsx)(s.Content,{children:f.map(e=>(0,l.jsx)(s.Item,{value:e.value,children:e.label},e.value))})]})},_={render:()=>(0,l.jsxs)(s.Root,{defaultValue:`stonfi`,children:[(0,l.jsxs)(s.Trigger,{variant:`ghost`,size:`s`,children:[`STON.fi`,(0,l.jsx)(i,{size:16})]}),(0,l.jsx)(s.Content,{align:`end`,children:f.map(e=>(0,l.jsx)(s.Item,{value:e.value,children:e.label},e.value))})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Select.Root defaultValue="stonfi" onValueChange={fn()}>
            <Select.Trigger variant="gray" size="m" borderRadius="l">
                STON.fi
                <ChevronDownIcon size={16} />
            </Select.Trigger>
            <Select.Content>
                {PROVIDERS.map(p => <Select.Item key={p.value} value={p.value}>
                        {p.label}
                    </Select.Item>)}
            </Select.Content>
        </Select.Root>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('stonfi');
      const current = PROVIDERS.find(p => p.value === value);
      return <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
                    <Select.Root value={value} onValueChange={setValue}>
                        <Select.Trigger variant="gray" size="m" borderRadius="l">
                            {current?.label ?? value}
                            <ChevronDownIcon size={16} />
                        </Select.Trigger>
                        <Select.Content>
                            {PROVIDERS.map(p => <Select.Item key={p.value} value={p.value}>
                                    {p.label}
                                </Select.Item>)}
                        </Select.Content>
                    </Select.Root>
                    <span style={{
          fontSize: 12,
          color: 'var(--ta-color-text-secondary)'
        }}>Selected: {value}</span>
                </div>;
    };
    return <Wrapper />;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    justifyContent: 'flex-end',
    width: 320
  }}>
            <Select.Root defaultValue="dedust">
                <Select.Trigger variant="gray" size="m" borderRadius="l">
                    DeDust
                    <ChevronDownIcon size={16} />
                </Select.Trigger>
                <Select.Content align="end">
                    {PROVIDERS.map(p => <Select.Item key={p.value} value={p.value}>
                            {p.label}
                        </Select.Item>)}
                </Select.Content>
            </Select.Root>
        </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Select.Root defaultValue="stonfi" disabled>
            <Select.Trigger variant="gray" size="m" borderRadius="l">
                STON.fi
                <ChevronDownIcon size={16} />
            </Select.Trigger>
            <Select.Content>
                {PROVIDERS.map(p => <Select.Item key={p.value} value={p.value}>
                        {p.label}
                    </Select.Item>)}
            </Select.Content>
        </Select.Root>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Select.Root defaultValue="stonfi">
            <Select.Trigger variant="ghost" size="s">
                STON.fi
                <ChevronDownIcon size={16} />
            </Select.Trigger>
            <Select.Content align="end">
                {PROVIDERS.map(p => <Select.Item key={p.value} value={p.value}>
                        {p.label}
                    </Select.Item>)}
            </Select.Content>
        </Select.Root>
}`,..._.parameters?.docs?.source}}},v=[`Uncontrolled`,`Controlled`,`AlignedEnd`,`Disabled`,`GhostTrigger`]}))();export{h as AlignedEnd,m as Controlled,g as Disabled,_ as GhostTrigger,p as Uncontrolled,v as __namedExportsOrder,d as default};
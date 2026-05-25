import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Nn as n,tr as r}from"./iframe-CbKJG4TV.js";import{n as i,t as a}from"./collapsible-na7wbC_0.js";var o,s,c,l,u;e((()=>{o=t(r(),1),i(),s=n(),c={title:`Components/UI/Collapsible`,component:a,tags:[`autodocs`]},l={render:()=>{let[e,t]=(0,o.useState)(!1);return(0,s.jsxs)(`div`,{style:{maxWidth:320},children:[(0,s.jsx)(`button`,{type:`button`,onClick:()=>t(e=>!e),children:e?`Collapse`:`Expand`}),(0,s.jsx)(a,{open:e,children:(0,s.jsxs)(`div`,{style:{padding:16},children:[(0,s.jsx)(`p`,{children:`This content is collapsible.`}),(0,s.jsx)(`p`,{children:`It animates from zero height to its natural height.`})]})})]})}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <div style={{
      maxWidth: 320
    }}>
                <button type="button" onClick={() => setOpen(v => !v)}>
                    {open ? 'Collapse' : 'Expand'}
                </button>
                <Collapsible open={open}>
                    <div style={{
          padding: 16
        }}>
                        <p>This content is collapsible.</p>
                        <p>It animates from zero height to its natural height.</p>
                    </div>
                </Collapsible>
            </div>;
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`]}))();export{l as Default,u as __namedExportsOrder,c as default};
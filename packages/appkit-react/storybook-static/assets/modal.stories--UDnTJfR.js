import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Nn as n,tr as r}from"./iframe-CbKJG4TV.js";import{t as i}from"./button-C5tENOoY.js";import{t as a}from"./button-ERzuLl8S.js";import{n as o,t as s}from"./modal-SSgyk2gh.js";var c,l,u,d,f,p;e((()=>{c=t(r(),1),o(),a(),l=n(),u={title:`Components/UI/Modal`,component:s,tags:[`autodocs`]},d={render:()=>{let[e,t]=(0,c.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i,{onClick:()=>t(!0),children:`Open Modal`}),(0,l.jsx)(s,{open:e,onOpenChange:t,title:`Modal Title`,children:(0,l.jsx)(`p`,{children:`This is a simple modal window content.`})})]})}},f={render:()=>{let[e,t]=(0,c.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i,{onClick:()=>t(!0),children:`Open Scrollable Modal`}),(0,l.jsx)(s,{open:e,onOpenChange:t,title:`Scrollable Content`,children:(0,l.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:Array.from({length:20}).map((e,t)=>(0,l.jsxs)(`p`,{children:[`This is paragraph `,t+1,` of a very long text. Modals should be scrollable when the content exceeds the screen height.`]},t))})})]})}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
                <Button onClick={() => setOpen(true)}>Open Modal</Button>
                <Modal open={open} onOpenChange={setOpen} title="Modal Title">
                    <p>This is a simple modal window content.</p>
                </Modal>
            </>;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
                <Button onClick={() => setOpen(true)}>Open Scrollable Modal</Button>
                <Modal open={open} onOpenChange={setOpen} title="Scrollable Content">
                    <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
                        {Array.from({
            length: 20
          }).map((_, i) => <p key={i}>
                                This is paragraph {i + 1} of a very long text. Modals should be scrollable when the
                                content exceeds the screen height.
                            </p>)}
                    </div>
                </Modal>
            </>;
  }
}`,...f.parameters?.docs?.source}}},p=[`Default`,`LargeContent`]}))();export{d as Default,f as LargeContent,p as __namedExportsOrder,u as default};
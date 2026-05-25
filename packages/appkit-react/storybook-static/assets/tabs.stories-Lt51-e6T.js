import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Nn as n,tr as r}from"./iframe-CbKJG4TV.js";import{a as i,i as a,n as o,r as s,t as c}from"./tabs-BV1Dw5In.js";var l,u,d,f,p,m;e((()=>{l=t(r(),1),i(),u=n(),d={title:`Components/UI/Tabs`,component:c,tags:[`autodocs`]},f={render:()=>(0,u.jsxs)(c,{defaultValue:`stake`,style:{maxWidth:440},children:[(0,u.jsxs)(s,{children:[(0,u.jsx)(a,{value:`stake`,children:`Stake`}),(0,u.jsx)(a,{value:`unstake`,children:`Unstake`})]}),(0,u.jsx)(o,{value:`stake`,children:(0,u.jsx)(`div`,{style:{padding:16},children:`Stake content`})}),(0,u.jsx)(o,{value:`unstake`,children:(0,u.jsx)(`div`,{style:{padding:16},children:`Unstake content`})})]})},p={render:()=>{let[e,t]=(0,l.useState)(`tab1`);return(0,u.jsxs)(c,{value:e,onValueChange:t,style:{maxWidth:440},children:[(0,u.jsxs)(s,{children:[(0,u.jsx)(a,{value:`tab1`,children:`First`}),(0,u.jsx)(a,{value:`tab2`,children:`Second`}),(0,u.jsx)(a,{value:`tab3`,children:`Third`})]}),(0,u.jsx)(o,{value:`tab1`,children:(0,u.jsx)(`div`,{style:{padding:16},children:`First tab content`})}),(0,u.jsx)(o,{value:`tab2`,children:(0,u.jsx)(`div`,{style:{padding:16},children:`Second tab content`})}),(0,u.jsx)(o,{value:`tab3`,children:(0,u.jsx)(`div`,{style:{padding:16},children:`Third tab content`})})]})}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="stake" style={{
    maxWidth: 440
  }}>
            <TabsList>
                <TabsTrigger value="stake">Stake</TabsTrigger>
                <TabsTrigger value="unstake">Unstake</TabsTrigger>
            </TabsList>
            <TabsContent value="stake">
                <div style={{
        padding: 16
      }}>Stake content</div>
            </TabsContent>
            <TabsContent value="unstake">
                <div style={{
        padding: 16
      }}>Unstake content</div>
            </TabsContent>
        </Tabs>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('tab1');
    return <Tabs value={value} onValueChange={setValue} style={{
      maxWidth: 440
    }}>
                <TabsList>
                    <TabsTrigger value="tab1">First</TabsTrigger>
                    <TabsTrigger value="tab2">Second</TabsTrigger>
                    <TabsTrigger value="tab3">Third</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                    <div style={{
          padding: 16
        }}>First tab content</div>
                </TabsContent>
                <TabsContent value="tab2">
                    <div style={{
          padding: 16
        }}>Second tab content</div>
                </TabsContent>
                <TabsContent value="tab3">
                    <div style={{
          padding: 16
        }}>Third tab content</div>
                </TabsContent>
            </Tabs>;
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Controlled`]}))();export{p as Controlled,f as Default,m as __namedExportsOrder,d as default};
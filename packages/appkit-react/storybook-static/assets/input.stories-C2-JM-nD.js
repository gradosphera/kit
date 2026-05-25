import{i as e}from"./preload-helper-xPQekRTU.js";import{Nn as t}from"./iframe-CbKJG4TV.js";import{n,t as r}from"./input-CaokLZV-.js";var i,a,o,s,c,l,u,d,f;e((()=>{n(),i=t(),a={title:`Components/UI/Input`,component:r,tags:[`autodocs`]},o={render:e=>(0,i.jsxs)(r.Container,{...e,style:{width:`400px`},children:[(0,i.jsx)(r.Header,{children:(0,i.jsx)(r.Title,{children:`Title`})}),(0,i.jsx)(r.Field,{children:(0,i.jsx)(r.Input,{placeholder:`Placeholder`})}),(0,i.jsx)(r.Caption,{children:`Caption text`})]})},s={render:()=>(0,i.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`,width:`400px`},children:[`s`,`m`,`l`].map(e=>(0,i.jsxs)(r.Container,{size:e,children:[(0,i.jsx)(r.Header,{children:(0,i.jsxs)(r.Title,{children:[`Size `,e.toUpperCase()]})}),(0,i.jsx)(r.Field,{children:(0,i.jsx)(r.Input,{placeholder:`Input size ${e}`})})]},e))})},c={render:()=>(0,i.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`,width:`400px`},children:[`s`,`m`,`l`].map(e=>(0,i.jsx)(r.Container,{size:e,variant:`unstyled`,children:(0,i.jsx)(r.Field,{children:(0,i.jsx)(r.Input,{placeholder:`Unstyled size ${e}`})})},e))})},l={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`,width:`400px`},children:[(0,i.jsxs)(r.Container,{error:!0,children:[(0,i.jsx)(r.Header,{children:(0,i.jsx)(r.Title,{children:`Error State`})}),(0,i.jsx)(r.Field,{children:(0,i.jsx)(r.Input,{defaultValue:`Invalid value`})}),(0,i.jsx)(r.Caption,{children:`This is an error message`})]}),(0,i.jsxs)(r.Container,{disabled:!0,children:[(0,i.jsx)(r.Header,{children:(0,i.jsx)(r.Title,{children:`Disabled State`})}),(0,i.jsx)(r.Field,{children:(0,i.jsx)(r.Input,{defaultValue:`Locked value`})})]}),(0,i.jsxs)(r.Container,{loading:!0,children:[(0,i.jsx)(r.Header,{children:(0,i.jsx)(r.Title,{children:`Loading State`})}),(0,i.jsx)(r.Field,{children:(0,i.jsx)(r.Input,{placeholder:`Fetching data...`})})]})]})},u={render:()=>(0,i.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`,width:`400px`},children:(0,i.jsxs)(r.Container,{size:`l`,children:[(0,i.jsx)(r.Header,{children:(0,i.jsx)(r.Title,{children:`You swap`})}),(0,i.jsxs)(r.Field,{children:[(0,i.jsx)(r.Input,{defaultValue:`100`}),(0,i.jsx)(r.Slot,{side:`right`,children:(0,i.jsx)(`div`,{style:{background:`var(--ta-color-background)`,padding:`4px 8px`,borderRadius:`20px`,display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`14px`,fontWeight:600},children:`TON ▾`})})]}),(0,i.jsx)(r.Caption,{children:`$ 144.74`})]})})},d={render:()=>(0,i.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`,width:`400px`},children:(0,i.jsxs)(r.Container,{size:`l`,resizable:!0,children:[(0,i.jsx)(r.Header,{children:(0,i.jsx)(r.Title,{children:`Resizable (starts at L)`})}),(0,i.jsxs)(r.Field,{children:[(0,i.jsx)(r.Input,{placeholder:`Type a long number...`}),(0,i.jsx)(r.Slot,{side:`right`,children:(0,i.jsx)(`div`,{style:{background:`var(--ta-color-background)`,padding:`4px 8px`,borderRadius:`20px`,display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`14px`,fontWeight:600},children:`TON ▾`})})]}),(0,i.jsx)(r.Caption,{children:`Font shrinks L → M → S as you type`})]})})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <Input.Container {...args} style={{
    width: '400px'
  }}>
            <Input.Header>
                <Input.Title>Title</Input.Title>
            </Input.Header>
            <Input.Field>
                <Input.Input placeholder="Placeholder" />
            </Input.Field>
            <Input.Caption>Caption text</Input.Caption>
        </Input.Container>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '400px'
  }}>
            {(['s', 'm', 'l'] as const).map(size => <Input.Container key={size} size={size}>
                    <Input.Header>
                        <Input.Title>Size {size.toUpperCase()}</Input.Title>
                    </Input.Header>
                    <Input.Field>
                        <Input.Input placeholder={\`Input size \${size}\`} />
                    </Input.Field>
                </Input.Container>)}
        </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '400px'
  }}>
            {(['s', 'm', 'l'] as const).map(size => <Input.Container key={size} size={size} variant="unstyled">
                    <Input.Field>
                        <Input.Input placeholder={\`Unstyled size \${size}\`} />
                    </Input.Field>
                </Input.Container>)}
        </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '400px'
  }}>
            <Input.Container error>
                <Input.Header>
                    <Input.Title>Error State</Input.Title>
                </Input.Header>
                <Input.Field>
                    <Input.Input defaultValue="Invalid value" />
                </Input.Field>
                <Input.Caption>This is an error message</Input.Caption>
            </Input.Container>

            <Input.Container disabled>
                <Input.Header>
                    <Input.Title>Disabled State</Input.Title>
                </Input.Header>
                <Input.Field>
                    <Input.Input defaultValue="Locked value" />
                </Input.Field>
            </Input.Container>

            <Input.Container loading>
                <Input.Header>
                    <Input.Title>Loading State</Input.Title>
                </Input.Header>
                <Input.Field>
                    <Input.Input placeholder="Fetching data..." />
                </Input.Field>
            </Input.Container>
        </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '400px'
  }}>
            <Input.Container size="l">
                <Input.Header>
                    <Input.Title>You swap</Input.Title>
                </Input.Header>
                <Input.Field>
                    <Input.Input defaultValue="100" />
                    <Input.Slot side="right">
                        <div style={{
            background: 'var(--ta-color-background)',
            padding: '4px 8px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
            fontWeight: 600
          }}>
                            TON ▾
                        </div>
                    </Input.Slot>
                </Input.Field>
                <Input.Caption>$ 144.74</Input.Caption>
            </Input.Container>
        </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '400px'
  }}>
            <Input.Container size="l" resizable>
                <Input.Header>
                    <Input.Title>Resizable (starts at L)</Input.Title>
                </Input.Header>
                <Input.Field>
                    <Input.Input placeholder="Type a long number..." />
                    <Input.Slot side="right">
                        <div style={{
            background: 'var(--ta-color-background)',
            padding: '4px 8px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
            fontWeight: 600
          }}>
                            TON ▾
                        </div>
                    </Input.Slot>
                </Input.Field>
                <Input.Caption>Font shrinks L → M → S as you type</Input.Caption>
            </Input.Container>
        </div>
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Sizes`,`Unstyled`,`States`,`Advanced`,`Resizable`]}))();export{u as Advanced,o as Default,d as Resizable,s as Sizes,l as States,c as Unstyled,f as __namedExportsOrder,a as default};
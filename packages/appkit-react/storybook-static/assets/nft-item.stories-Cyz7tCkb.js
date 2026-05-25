import{i as e}from"./preload-helper-xPQekRTU.js";import{Nn as t}from"./iframe-CbKJG4TV.js";import{n,t as r}from"./clsx-BIo1m4C3.js";import{m as i}from"./verified-icon-YdkPPOhN.js";import{t as a}from"./icons-BcBpGi-T.js";var o,s,c,l,u,d,f,p,m,h=e((()=>{o=`_nftItem_uwtw4_1`,s=`_imageWrapper_uwtw4_13`,c=`_image_uwtw4_13`,l=`_placeholderIcon_uwtw4_29`,u=`_info_uwtw4_35`,d=`_name_uwtw4_40 _labelSemibold_wlm0m_62`,f=`_collectionName_uwtw4_50 _footnoteRegular_wlm0m_77`,p=`_saleBadge_uwtw4_60 _captionSemibold_wlm0m_93`,m={nftItem:o,imageWrapper:s,image:c,placeholderIcon:l,info:u,name:d,collectionName:f,saleBadge:p}})),g,_,v,y,b,x,S,C,w,T;e((()=>{n(),a(),h(),g=t(),{fn:_}=__STORYBOOK_MODULE_TEST__,v=({name:e,collectionName:t,image:n,isOnSale:a=!1,onClick:o,className:s})=>(0,g.jsxs)(`button`,{onClick:o,className:r(m.nftItem,s),children:[(0,g.jsxs)(`div`,{className:m.imageWrapper,children:[n?(0,g.jsx)(`img`,{src:n,alt:e,className:m.image}):(0,g.jsx)(i,{className:m.placeholderIcon}),a&&(0,g.jsx)(`span`,{className:m.saleBadge,children:`On Sale`})]}),(0,g.jsxs)(`div`,{className:m.info,children:[(0,g.jsx)(`h4`,{className:m.name,children:e}),(0,g.jsx)(`p`,{className:m.collectionName,children:t})]})]}),y={title:`Features/NFT/NftItem`,component:v,tags:[`autodocs`],parameters:{layout:`centered`},args:{onClick:_()}},b={args:{name:`TON Diamond #1234`,collectionName:`TON Diamonds`,image:`https://picsum.photos/200`}},x={args:{name:`Mystery NFT`,collectionName:`Unknown Collection`}},S={args:{name:`Rare NFT #001`,collectionName:`Rare Collection`,image:`https://picsum.photos/201`,isOnSale:!0}},C={args:{name:`Very Long NFT Name That Might Overflow The Container`,collectionName:`Long Collection Name Here`,image:`https://picsum.photos/202`}},w={render:()=>(0,g.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,gap:`16px`},children:[(0,g.jsx)(v,{name:`TON Diamond #1`,collectionName:`TON Diamonds`,image:`https://picsum.photos/200`,onClick:_()}),(0,g.jsx)(v,{name:`TON Diamond #2`,collectionName:`TON Diamonds`,image:`https://picsum.photos/201`,isOnSale:!0,onClick:_()}),(0,g.jsx)(v,{name:`Mystery NFT`,collectionName:`Unknown`,onClick:_()}),(0,g.jsx)(v,{name:`Rare Item #123`,collectionName:`Rare Items`,image:`https://picsum.photos/203`,onClick:_()})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'TON Diamond #1234',
    collectionName: 'TON Diamonds',
    image: 'https://picsum.photos/200'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'Mystery NFT',
    collectionName: 'Unknown Collection'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'Rare NFT #001',
    collectionName: 'Rare Collection',
    image: 'https://picsum.photos/201',
    isOnSale: true
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'Very Long NFT Name That Might Overflow The Container',
    collectionName: 'Long Collection Name Here',
    image: 'https://picsum.photos/202'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  }}>
            <NftItemPreview name="TON Diamond #1" collectionName="TON Diamonds" image="https://picsum.photos/200" onClick={fn()} />
            <NftItemPreview name="TON Diamond #2" collectionName="TON Diamonds" image="https://picsum.photos/201" isOnSale onClick={fn()} />
            <NftItemPreview name="Mystery NFT" collectionName="Unknown" onClick={fn()} />
            <NftItemPreview name="Rare Item #123" collectionName="Rare Items" image="https://picsum.photos/203" onClick={fn()} />
        </div>
}`,...w.parameters?.docs?.source}}},T=[`WithImage`,`WithoutImage`,`OnSale`,`LongName`,`NftGrid`]}))();export{C as LongName,w as NftGrid,S as OnSale,b as WithImage,x as WithoutImage,T as __namedExportsOrder,y as default};
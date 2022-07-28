"use strict";(self.webpackChunkscsaver_docs=self.webpackChunkscsaver_docs||[]).push([[838],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),d=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=d(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=d(n),m=a,h=u["".concat(l,".").concat(m)]||u[m]||p[m]||o;return n?r.createElement(h,s(s({ref:t},c),{},{components:n})):r.createElement(h,s({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var d=2;d<o;d++)s[d]=n[d];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4039:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_label:"Methods",sidebar_position:4,title:"Methods | Scsaver.js Documents",keywords:["scsaver.js","Methods"]},s="Methods",i={unversionedId:"methods",id:"methods",title:"Methods | Scsaver.js Documents",description:"A description of the method.",source:"@site/docs/methods.md",sourceDirName:".",slug:"/methods",permalink:"/scsaver/docs/methods",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/methods.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_label:"Methods",sidebar_position:4,title:"Methods | Scsaver.js Documents",keywords:["scsaver.js","Methods"]},sidebar:"tutorialSidebar",previous:{title:"Options",permalink:"/scsaver/docs/options"},next:{title:"Events",permalink:"/scsaver/docs/events"}},l={},d=[{value:"How to use",id:"how-to-use",level:2},{value:"Method List",id:"method-list",level:2},{value:"<code>enabled()</code>",id:"enabled",level:3},{value:"<code>disabled()</code>",id:"disabled",level:3},{value:"<code>on(event, callback)</code>",id:"onevent-callback",level:3}],c={toc:d};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"methods"},"Methods"),(0,a.kt)("p",null,"A description of the method."),(0,a.kt)("h2",{id:"how-to-use"},"How to use"),(0,a.kt)("p",null,"Instantiate it once and then use it:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const scsaver = new Scsaver('.scsaver');\nscsaver.disabled();\n")),(0,a.kt)("h2",{id:"method-list"},"Method List"),(0,a.kt)("p",null,"From the outside, it is basically assumed that only ",(0,a.kt)("inlineCode",{parentName:"p"},"enabled()")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"disabled()")," are used.",(0,a.kt)("br",{parentName:"p"}),"\n","This is expected to work with external scripts."),(0,a.kt)("h3",{id:"enabled"},(0,a.kt)("inlineCode",{parentName:"h3"},"enabled()")),(0,a.kt)("p",null,"Scsaver state change to enabled state.",(0,a.kt)("br",{parentName:"p"}),"\n","Used if the option is ",(0,a.kt)("a",{parentName:"p",href:"/scsaver/docs/options?id=autoStart"},(0,a.kt)("inlineCode",{parentName:"a"},"autoStart: false"))," or if the state is disabled by the ",(0,a.kt)("inlineCode",{parentName:"p"},"disabled()")," method."),(0,a.kt)("h3",{id:"disabled"},(0,a.kt)("inlineCode",{parentName:"h3"},"disabled()")),(0,a.kt)("p",null,"Scsaver state change to disabled state.",(0,a.kt)("br",{parentName:"p"}),"\n","The cancel event will be unregistered, the wait state will be canceled, and the screen saver will fade out if it is displayed.",(0,a.kt)("br",{parentName:"p"}),"\n","Scsaver will not work unless you execute ",(0,a.kt)("inlineCode",{parentName:"p"},"enabled()")," again."),(0,a.kt)("h3",{id:"onevent-callback"},(0,a.kt)("inlineCode",{parentName:"h3"},"on(event, callback)")),(0,a.kt)("p",null,"Event list is here: ",(0,a.kt)("a",{parentName:"p",href:"/scsaver/docs/events?id=eventlist"},"Event list")))}p.isMDXComponent=!0}}]);
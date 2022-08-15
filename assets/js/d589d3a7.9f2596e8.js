"use strict";(self.webpackChunkscsaver_docs=self.webpackChunkscsaver_docs||[]).push([[162],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>m});var n=r(7294);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var c=n.createContext({}),o=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},d=function(e){var t=o(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,s=e.mdxType,a=e.originalType,c=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=o(r),m=s,v=u["".concat(c,".").concat(m)]||u[m]||p[m]||a;return r?n.createElement(v,i(i({ref:t},d),{},{components:r})):n.createElement(v,i({ref:t},d))}));function m(e,t){var r=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var a=r.length,i=new Array(a);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:s,i[1]=l;for(var o=2;o<a;o++)i[o]=r[o];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},9390:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>o});var n=r(7462),s=(r(7294),r(3905));const a={sidebar_label:"Getting Started",sidebar_position:2,title:"Getting Started | Scsaver.js Documents",description:"How to getting started with Scsaver.js.",keywords:["Scsaver.js","Getting Started"]},i="Getting Started",l={unversionedId:"getting-started",id:"getting-started",title:"Getting Started | Scsaver.js Documents",description:"How to getting started with Scsaver.js.",source:"@site/docs/getting-started.md",sourceDirName:".",slug:"/getting-started",permalink:"/docs/getting-started",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/getting-started.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_label:"Getting Started",sidebar_position:2,title:"Getting Started | Scsaver.js Documents",description:"How to getting started with Scsaver.js.",keywords:["Scsaver.js","Getting Started"]},sidebar:"tutorialSidebar",previous:{title:"Scsaver.js",permalink:"/docs/"},next:{title:"Options",permalink:"/docs/options"}},c={},o=[{value:"Step0: Build the file",id:"step0-build-the-file",level:2},{value:"Step1: Load the required files",id:"step1-load-the-required-files",level:2},{value:"Step2: Added Scsaver element",id:"step2-added-scsaver-element",level:2},{value:"Step3: Init Scsaver",id:"step3-init-scsaver",level:2}],d={toc:o};function p(e){let{components:t,...r}=e;return(0,s.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"getting-started"},"Getting Started"),(0,s.kt)("h2",{id:"step0-build-the-file"},"Step0: Build the file"),(0,s.kt)("p",null,"Build with the following command:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"npm install\nor \nyarn install\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"npm run build\n")),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"scsaver.min.js")," is output to the ",(0,s.kt)("inlineCode",{parentName:"p"},"dist")," folder.",(0,s.kt)("br",{parentName:"p"}),"\n","The CSS file is in the ",(0,s.kt)("inlineCode",{parentName:"p"},"src")," directory."),(0,s.kt)("p",null,"Alternatively, you can use a CDN."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"https://cdn.jsdelivr.net/npm/scsaver@latest/dist/scsaver.min.js\nhttps://cdn.jsdelivr.net/npm/scsaver@latest/src/scsaver.css\n")),(0,s.kt)("h2",{id:"step1-load-the-required-files"},"Step1: Load the required files"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},'<link rel="stylesheet" href="src/scsaver.css">\n<script src="dist/scsaver.min.js"><\/script>\n')),(0,s.kt)("h2",{id:"step2-added-scsaver-element"},"Step2: Added Scsaver element"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},'<div id="scsaver" class="scsaver">\n  <div class="scsaver-inner">\n    <p>Hello, Scsaver.</p>\n    \x3c!-- Customize: Place images and videos and customize them to your liking. --\x3e\n  </div>\n</div>\n')),(0,s.kt)("h2",{id:"step3-init-scsaver"},"Step3: Init Scsaver"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},"<script>\n  const scsaver = new Scsaver('#scsaver');\n<\/script>\n")))}p.isMDXComponent=!0}}]);
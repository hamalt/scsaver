"use strict";(self.webpackChunkscsaver_docs=self.webpackChunkscsaver_docs||[]).push([[141],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>v});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(n),v=r,h=u["".concat(l,".").concat(v)]||u[v]||d[v]||o;return n?a.createElement(h,s(s({ref:t},p),{},{components:n})):a.createElement(h,s({ref:t},p))}));function v(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4606:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const o={sidebar_label:"Events",sidebar_position:5,title:"Events | Scsaver.js Documents",description:"About events in Scsaver.js.",keywords:["Scsaver.js","Events"]},s="Events",i={unversionedId:"events",id:"events",title:"Events | Scsaver.js Documents",description:"About events in Scsaver.js.",source:"@site/docs/events.md",sourceDirName:".",slug:"/events",permalink:"/scsaver/docs/events",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/events.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_label:"Events",sidebar_position:5,title:"Events | Scsaver.js Documents",description:"About events in Scsaver.js.",keywords:["Scsaver.js","Events"]},sidebar:"tutorialSidebar",previous:{title:"Methods",permalink:"/scsaver/docs/methods"}},l={},c=[{value:"How to use",id:"how-to-use",level:2},{value:"Set as an option",id:"set-as-an-option",level:3},{value:"Method using <code>on()</code>",id:"method-using-on",level:3},{value:"Event list",id:"event-list",level:2},{value:"<code>waitStart</code>",id:"waitstart",level:3},{value:"<code>showStart</code>",id:"showstart",level:3},{value:"<code>showFadeInComplete</code>",id:"showfadeincomplete",level:3},{value:"<code>hideStart</code>",id:"hidestart",level:3},{value:"<code>HideFadeOutComplete</code>",id:"hidefadeoutcomplete",level:3},{value:"Other events",id:"other-events",level:2}],p={toc:c};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"events"},"Events"),(0,r.kt)("p",null,"A description of the event."),(0,r.kt)("h2",{id:"how-to-use"},"How to use"),(0,r.kt)("p",null,"There are two ways:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Set as an option"),(0,r.kt)("li",{parentName:"ol"},"Method using ",(0,r.kt)("inlineCode",{parentName:"li"},"on()"))),(0,r.kt)("h3",{id:"set-as-an-option"},"Set as an option"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const option = {\n  on: {\n      waitStart: function() {\n          console.log('Wait start.');\n      },\n      showStart: function() {\n          console.log('Show start.');\n      },\n  }\n}\nconst scsaver = new Scsaver('.scsaver', option);\n")),(0,r.kt)("h3",{id:"method-using-on"},"Method using ",(0,r.kt)("inlineCode",{parentName:"h3"},"on()")),(0,r.kt)("p",null,"Instantiate it once and then use it:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const scsaver = new Scsaver('.scsaver');\n\nscsaver.on('waitStart', function() {\n    console.log('Wait start.');\n});\n")),(0,r.kt)("h2",{id:"event-list"},"Event list"),(0,r.kt)("h3",{id:"waitstart"},(0,r.kt)("inlineCode",{parentName:"h3"},"waitStart")),(0,r.kt)("p",null,"Fires when the wait state is started.",(0,r.kt)("br",{parentName:"p"}),"\n","Next, wait with ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise",title:":target=_blank"},(0,r.kt)("inlineCode",{parentName:"a"},"Promise"))," until the screen saver is displayed, and when the wait is completed, use ",(0,r.kt)("inlineCode",{parentName:"p"},"show()")," to fade in the screen saver."),(0,r.kt)("h3",{id:"showstart"},(0,r.kt)("inlineCode",{parentName:"h3"},"showStart")),(0,r.kt)("p",null,"Fires when the show state is started.",(0,r.kt)("br",{parentName:"p"}),"\n","Fade-in will start, and after it is completed, it will move to the ",(0,r.kt)("inlineCode",{parentName:"p"},"ShowFadeInComplete")," state."),(0,r.kt)("h3",{id:"showfadeincomplete"},(0,r.kt)("inlineCode",{parentName:"h3"},"showFadeInComplete")),(0,r.kt)("p",null,"Fires after the screen saver fades in.",(0,r.kt)("br",{parentName:"p"}),"\n","This state will continue unless a cancel event occurs."),(0,r.kt)("h3",{id:"hidestart"},(0,r.kt)("inlineCode",{parentName:"h3"},"hideStart")),(0,r.kt)("p",null,"Fires when the screen saver cancel event occurs.",(0,r.kt)("br",{parentName:"p"}),"\n","Fade-out will start, and after it is completed, it will move to the ",(0,r.kt)("inlineCode",{parentName:"p"},"HideFadeOutComplete")," state."),(0,r.kt)("h3",{id:"hidefadeoutcomplete"},(0,r.kt)("inlineCode",{parentName:"h3"},"HideFadeOutComplete")),(0,r.kt)("p",null,"Fires after the screen saver fades out.",(0,r.kt)("br",{parentName:"p"}),"\n","Immediately after completion, it will be in Wait state and fire the ",(0,r.kt)("inlineCode",{parentName:"p"},"waitStart")," event."),(0,r.kt)("h2",{id:"other-events"},"Other events"),(0,r.kt)("p",null,"If you want an event that is not here, please create a ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/hamalt/scsaver/pulls",title:":target=_blank"},"pull request")," or ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/hamalt/scsaver/issues",title:":target=_blank"},"issue"),"."))}d.isMDXComponent=!0}}]);
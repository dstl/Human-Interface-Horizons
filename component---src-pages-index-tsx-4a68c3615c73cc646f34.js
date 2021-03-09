(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"7hMc":function(e,t,n){},QeBL:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return f}));var r=n("q1tI"),a=n.n(r),i=n("Wbzz"),o=n("YECO"),s=n("RyyV"),l=n("x+Gp"),c=n("tkFw"),u=(n("7hMc"),n("n3bB")),d=n("yAX2");function f(e){var t=e.data.allLandingPageCsv.edges,n=Object(s.e)(e.data.landingImagesSmall);return a.a.createElement(l.a,{mainContainerClassName:"main-container-index-page"},a.a.createElement(c.a,{title:"Home"}),a.a.createElement(u.a,{hasNavbar:!1}),a.a.createElement("div",{className:"landing__text-content-block"}),a.a.createElement("div",{className:"landing__images-grid"},a.a.createElement("div",{className:"landing__center-text-block"},a.a.createElement("p",null,"This tool aims to help users understand potential impacts and developments relating to human-machine interfaces (HMIs) over the next 20 years from a Defence perspective. There are a number of different visualisations and resources which are designed to help you explore different aspects of future HMI technologies. These can be selected using the surrounding tiles."),a.a.createElement("p",null,"The best place to start is probably the HMI Technology Catalogue, which will provide you with an introduction to the different technologies that were analysed. The other tiles on the left cover potential cognitive challenges associated with the future operating environment. The tiles below and to the right allow you to explore how HMI technologies might develop over time, how they might be categorised and how they could end up being used in the future.")),t.map((function(e){var t=e.node,r=t.id,s=t.imageAltTxt,l=t.imageName,c=t.name,u=t.title,f=t.subtitle,m=n.find((function(e){return e.name===l})),g=Object(o.i)(m);return a.a.createElement("div",{key:r,className:"landing__"+c},a.a.createElement(i.Link,{to:"/"+c},"technology-selector"===c&&a.a.createElement(a.a.Fragment,null,a.a.createElement("img",{src:d,alt:s}),a.a.createElement("p",null)),"technology-selector"!==c&&a.a.createElement(o.a,{image:g,alt:s}),a.a.createElement("div",{className:"landing__image-title"},u)),a.a.createElement("div",{className:"landing__image-subtitle"},f))}))),a.a.createElement(u.a,{hasNavbar:!1}))}},RyyV:function(e,t,n){"use strict";function r(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e){return e.edges?e.edges.map((function(e){return e.node})):e||[]}function o(e){var t={};if(!e.edges)return e||{};if(e.edges[0].node.challenge){for(var n=0;n<e.edges.length;n++)t[e.edges[n].node.id]=e.edges[n].node;return t}}function s(e,t){var n={};if(e.edges&&t.edges)for(var a,o=i(e),s=i(t),l=r(o);!(a=l()).done;){var c=a.value,u=s.filter((function(e){return e.family===c.family})).map((function(e){return e.id}));n[c.family]={family:c.family,familyName:c.familyName,challenges:u||[]}}return n}function l(e,t,n){e[t].associatedTech||(e[t].associatedTech=[]),e[t].associatedTech.includes(n)||e[t].associatedTech.push(n)}n.d(t,"e",(function(){return i})),n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return c}));var c=function(e){return{summary:{title:"Summary",text:e.summary,timetoeffect_optimistic:e.timetoeffect_optimistic,timetoeffect_likely:e.timetoeffect_likely,timetoeffect_pessimistic:e.timetoeffect_pessimistic,exampleApplications:e.example_applications,references:e.references},tabs:[{id:"overview",title:"Overview",content:e.overview},{id:"implicationsDefenceSecurity",title:"Implications for Defence & Security",content:e.implicationsDefenceSecurity},{id:"softwareAndAiRequirements",title:"Software / AI Requirements",content:e.softwareAndAiRequirements},{id:"legalEthicalImplications",title:"Legal/Ethical Implications",content:e.legalEthicalImplications},{id:"strategicImpactAssessment",title:"Strategic DLOD Impact Assessment",content:e.strategicImpactAssessment},{id:"typeOfTechnology",title:"Type of Technology",content:e.typeOfTechnology},{id:"prominentDevelopers",title:"Prominent Developers",content:e.prominentDevelopers}]}}},YECO:function(e,t,n){"use strict";n.d(t,"a",(function(){return L})),n.d(t,"b",(function(){return z})),n.d(t,"c",(function(){return C})),n.d(t,"d",(function(){return l})),n.d(t,"e",(function(){return x})),n.d(t,"f",(function(){return s})),n.d(t,"g",(function(){return T})),n.d(t,"h",(function(){return I})),n.d(t,"i",(function(){return k})),n.d(t,"j",(function(){return O})),n.d(t,"k",(function(){return R}));n("E9XD");var r=n("q1tI"),a=n.n(r),i=n("17x9"),o=n.n(i);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function l(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(n=i[r])>=0||(a[n]=e[n]);return a}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=Object.freeze(Object.defineProperties(["",""],{raw:{value:Object.freeze(["",""])}}));function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var f=function(){function e(){for(var t=this,n=arguments.length,r=Array(n),a=0;a<n;a++)r[a]=arguments[a];return d(this,e),this.tag=function(e){for(var n=arguments.length,r=Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];return"function"==typeof e?t.interimTag.bind(t,e):"string"==typeof e?t.transformEndResult(e):(e=e.map(t.transformString.bind(t)),t.transformEndResult(e.reduce(t.processSubstitutions.bind(t,r))))},r.length>0&&Array.isArray(r[0])&&(r=r[0]),this.transformers=r.map((function(e){return"function"==typeof e?e():e})),this.tag}return c(e,[{key:"interimTag",value:function(e,t){for(var n=arguments.length,r=Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];return this.tag(u,e.apply(void 0,[t].concat(r)))}},{key:"processSubstitutions",value:function(e,t,n){var r=this.transformSubstitution(e.shift(),t);return"".concat(t,r,n)}},{key:"transformString",value:function(e){return this.transformers.reduce((function(e,t){return t.onString?t.onString(e):e}),e)}},{key:"transformSubstitution",value:function(e,t){return this.transformers.reduce((function(e,n){return n.onSubstitution?n.onSubstitution(e,t):e}),e)}},{key:"transformEndResult",value:function(e){return this.transformers.reduce((function(e,t){return t.onEndResult?t.onEndResult(e):e}),e)}}]),e}(),m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return{onEndResult:function(t){if(""===e)return t.trim();if("start"===(e=e.toLowerCase())||"left"===e)return t.replace(/^\s*/,"");if("end"===e||"right"===e)return t.replace(/\s*$/,"");throw new Error("Side not supported: "+e)}}};function g(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"initial";return{onEndResult:function(t){if("initial"===e){var n=t.match(/^[^\S\n]*(?=\S)/gm),r=n&&Math.min.apply(Math,g(n.map((function(e){return e.length}))));if(r){var a=new RegExp("^.{"+r+"}","gm");return t.replace(a,"")}return t}if("all"===e)return t.replace(/^[^\S\n]+/gm,"");throw new Error("Unknown type: "+e)}}},h=function(e,t){return{onEndResult:function(n){if(null==e||null==t)throw new Error("replaceResultTransformer requires at least 2 arguments.");return n.replace(e,t)}}},y=function(e,t){return{onSubstitution:function(n,r){if(null==e||null==t)throw new Error("replaceSubstitutionTransformer requires at least 2 arguments.");return null==n?n:n.toString().replace(e,t)}}},v={separator:"",conjunction:"",serial:!1},b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v;return{onSubstitution:function(t,n){if(Array.isArray(t)){var r=t.length,a=e.separator,i=e.conjunction,o=e.serial,s=n.match(/(\n?[^\S\n]+)$/);if(t=t.join(s?a+s[1]:a+" "),i&&r>1){var l=t.lastIndexOf(a);t=t.slice(0,l)+(o?a:"")+" "+i+t.slice(l+1)}}return t}}},w=function(e){return{onSubstitution:function(t,n){if(null==e||"string"!=typeof e)throw new Error("You need to specify a string character to split by.");return"string"==typeof t&&t.includes(e)&&(t=t.split(e)),t}}},E=function(e){return null!=e&&!Number.isNaN(e)&&"boolean"!=typeof e};new f(b({separator:","}),p,m),new f(b({separator:",",conjunction:"and"}),p,m),new f(b({separator:",",conjunction:"or"}),p,m),new f(w("\n"),(function(){return{onSubstitution:function(e){return Array.isArray(e)?e.filter(E):E(e)?e:""}}}),b,p,m),new f(w("\n"),b,p,m,y(/&/g,"&amp;"),y(/</g,"&lt;"),y(/>/g,"&gt;"),y(/"/g,"&quot;"),y(/'/g,"&#x27;"),y(/`/g,"&#x60;")),new f(h(/(?:\n(?:\s*))+/g," "),m),new f(h(/(?:\n\s*)/g,""),m),new f(b({separator:","}),h(/(?:\s+)/g," "),m),new f(b({separator:",",conjunction:"or"}),h(/(?:\s+)/g," "),m),new f(b({separator:",",conjunction:"and"}),h(/(?:\s+)/g," "),m),new f(b,p,m),new f(b,h(/(?:\s+)/g," "),m),new f(p,m);new f(p("all"),m);var S=new Set,O=function(){return"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype};function j(e){e&&S.add(e)}function x(e){return S.has(e)}var k=function(e){var t;return null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function R(e,t,n,r,a,i,o,l){return void 0===l&&(l={}),s({},n,{loading:r,shouldLoad:e,"data-main-image":"",style:s({},l,{opacity:t?1:0}),onLoad:function(e){if(!t){j(i);var n=e.currentTarget,r=new Image;r.src=n.currentSrc,r.decode?r.decode().catch((function(){})).then((function(){a(!0)})):a(!0)}},ref:o})}function I(e,t,n,r,a,i){var o={};return i&&(o.backgroundColor=i,"fixed"===n?(o.width=r,o.height=a,o.backgroundColor=i,o.position="relative"):("constrained"===n||"fullWidth"===n)&&(o.position="absolute",o.top=0,o.left=0,o.bottom=0,o.right=0)),s({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:s({opacity:t?0:1,transition:"opacity 500ms linear"},o)})}var T=function(e){var t=e.layout,n=e.width,i=e.height,o=e.children,s=null;return"fullWidth"===t&&(s=a.a.createElement("div",{"aria-hidden":!0,style:{paddingTop:i/n*100+"%"}})),"constrained"===t&&(s=a.a.createElement("div",{style:{maxWidth:n,display:"block"}},a.a.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+i+"' width='"+n+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}}))),a.a.createElement(r.Fragment,null,s,o,!1)},A=function(e){var t=e.as,i=void 0===t?"div":t,o=e.style,c=e.className,u=e.class,d=e.onStartLoad,f=e.image,m=e.onLoad,g=e.backgroundColor,p=l(e,["as","style","className","class","onStartLoad","image","onLoad","backgroundColor"]);if(!f)return null;u&&(c=u);var h=f.width,y=f.height,v=f.layout,b=f.images,w=Object(r.useRef)(),E=Object(r.useRef)(!1),S=Object(r.useRef)(null),x=Object(r.useRef)(null),k=Object(r.useRef)(),R=Object(r.useState)(O()),I=R[0],T=R[1],A=Object(r.useState)(!1),L=A[0],N=A[1],_=function(e,t,n){var r={position:"relative",overflow:"hidden"};return"fixed"===n?(r.width=e,r.height=t):"constrained"===n&&(r.display="inline-block"),{className:"gatsby-image-wrapper","data-gatsby-image-wrapper":"",style:r}}(h,y,v),q=_.style,C=_.className,z=l(_,["style","className"]);Object(r.useEffect)((function(){if(w.current){var e=w.current.querySelector("[data-gatsby-image-ssr]");if(O()&&e)return null==d||d({wasCached:!1}),void(e.complete?(null==m||m(),j(JSON.stringify(b))):e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==m||m(),j(JSON.stringify(b))})));n.e(21).then(n.bind(null,"vJ1Z")).then((function(e){var t=(0,e.createIntersectionObserver)((function(){w.current&&(null==d||d({wasCached:!1}),T(!0))}));w.current&&(S.current=t(w))}))}return function(){S.current&&(S.current(w),E.current&&x.current&&x.current())}}),[]),Object(r.useEffect)((function(){if(w.current){var e=w.current.querySelector("[data-gatsby-image-ssr]");if(O()&&e&&!E.current)return void(E.current=!0);n.e(5).then(n.bind(null,"ELcI")).then((function(e){x.current=(0,e.lazyHydrate)(s({image:f,isLoading:I,isLoaded:L,toggleIsLoaded:function(){null==m||m(),N(!0)},ref:k},p),w,E)}))}}),[h,y,v,b,I,L,N,k,p]);var D=function(e,t,n){var r=null;return"fullWidth"===e&&(r='<div aria-hidden="true" style="padding-top: '+n/t*100+'%;"></div>'),"constrained"===e&&(r='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+n+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),r}(v,h,y);return a.a.createElement(i,Object.assign({},z,{style:s({},q,o,{backgroundColor:g}),className:C+(c?" "+c:""),ref:w,dangerouslySetInnerHTML:{__html:D},suppressHydrationWarning:!0}))},L=function(e){return a.a.createElement(A,Object.assign({},e))};L.displayName="GatsbyImage";var N,_=function(e){var t=e.src,n=e.srcSet,r=e.loading,i=e.alt,o=void 0===i?"":i,s=e.shouldLoad,c=e.innerRef,u=l(e,["src","srcSet","loading","alt","shouldLoad","innerRef"]);return a.a.createElement("img",Object.assign({},u,{decoding:"async",loading:r,src:s?t:void 0,"data-src":s?void 0:t,srcSet:s?n:void 0,"data-srcset":s?void 0:n,alt:o,ref:c}))},q=Object(r.forwardRef)((function(e,t){var n=e.fallback,r=e.sources,i=void 0===r?[]:r,o=e.shouldLoad,s=void 0===o||o,c=e.sizes,u=l(e,["fallback","sources","shouldLoad","sizes"]),d=a.a.createElement(_,Object.assign({sizes:c},u,n,{shouldLoad:s,innerRef:t}));return i.length?a.a.createElement("picture",null,i.map((function(e){var t=e.media,n=e.srcSet,r=e.type;return a.a.createElement("source",{key:t+"-"+r+"-"+n,type:r,media:t,srcSet:n,sizes:c})})),d):d}));_.propTypes={src:i.string.isRequired,alt:i.string.isRequired,sizes:i.string,srcSet:i.string,shouldLoad:i.bool},q.displayName="Picture",q.propTypes={alt:i.string.isRequired,shouldLoad:i.bool,fallback:Object(i.exact)({src:i.string.isRequired,srcSet:i.string,sizes:i.string}),sources:Object(i.arrayOf)(Object(i.oneOfType)([Object(i.exact)({media:i.string.isRequired,type:i.string,sizes:i.string,srcSet:i.string.isRequired}),Object(i.exact)({media:i.string,type:i.string.isRequired,sizes:i.string,srcSet:i.string.isRequired})]))};var C=function(e){var t=e.fallback,n=l(e,["fallback"]);return t?a.a.createElement(q,Object.assign({},n,{fallback:{src:t},"aria-hidden":!0,alt:""})):a.a.createElement("div",Object.assign({},n))};C.displayName="Placeholder",C.propTypes={fallback:i.string,sources:null==(N=q.propTypes)?void 0:N.sources,alt:function(e,t,n){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+n+"`. Validation failed."):null}};var z=Object(r.forwardRef)((function(e,t){return a.a.createElement(a.a.Fragment,null,a.a.createElement(q,Object.assign({ref:t},e)),a.a.createElement("noscript",null,a.a.createElement(q,Object.assign({},e,{shouldLoad:!0}))))}));z.displayName="MainImage",z.propTypes=q.propTypes;var D,M=function(e,t){return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?o.a.number.apply(o.a,[e,t].concat([].slice.call(arguments,2))):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},W=new Set(["fixed","fullWidth","constrained"]),H={src:o.a.string.isRequired,alt:o.a.string.isRequired,width:M,height:M,sizes:o.a.string,layout:function(e){if(void 0!==e.layout&&!W.has(e.layout.toLowerCase()))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "fixed". Valid values are "fixed", "fullWidth" or "constrained".')}},P=(D=L,function(e){var t=e.src,n=e.__imageData,r=e.__error,i=l(e,["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions"]);return r&&console.warn(r),n?a.a.createElement(D,Object.assign({image:n},i)):(console.warn("Image not loaded",t),null)});P.displayName="StaticImage",P.propTypes=H},n3bB:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("q1tI"),a=n.n(r),i=function(e){var t=e.hasNavbar;return a.a.createElement("div",{className:t?"fixed-header-offset-with-navbar":"fixed-header-offset"})}},yAX2:function(e,t,n){e.exports=n.p+"static/comparison-timelines-b-20da5a107461fc91383191a8edebdedc.svg"}}]);
//# sourceMappingURL=component---src-pages-index-tsx-4a68c3615c73cc646f34.js.map
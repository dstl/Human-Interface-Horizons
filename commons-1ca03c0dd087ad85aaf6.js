(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"8+s/":function(t,e,n){"use strict";var r,i=n("q1tI"),u=(r=i)&&"object"==typeof r&&"default"in r?r.default:r;function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var o=!("undefined"==typeof window||!window.document||!window.document.createElement);t.exports=function(t,e,n){if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof e)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var s,c=[];function L(){s=t(c.map((function(t){return t.props}))),M.canUseDOM?e(s):n&&(s=n(s))}var M=function(t){var e,n;function i(){return t.apply(this,arguments)||this}n=t,(e=i).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n,i.peek=function(){return s},i.rewind=function(){if(i.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var t=s;return s=void 0,c=[],t};var a=i.prototype;return a.UNSAFE_componentWillMount=function(){c.push(this),L()},a.componentDidUpdate=function(){L()},a.componentWillUnmount=function(){var t=c.indexOf(this);c.splice(t,1),L()},a.render=function(){return u.createElement(r,this.props)},i}(i.PureComponent);return a(M,"displayName","SideEffect("+function(t){return t.displayName||t.name||"Component"}(r)+")"),a(M,"canUseDOM",o),M}}},DTbp:function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4Ig0KICB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MTUuNCA3My4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MTUuNCA3My4yOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICAgLnN0MCB7DQogICAgICBmaWxsOiAjRkZGRkZGOw0KICAgIH0NCg0KICAgIC5zdDEgew0KICAgICAgZmlsbDogI0NFMjM1NjsNCiAgICB9DQogIDwvc3R5bGU+DQogIDxnPg0KICAgIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MC4zLDQ3LjZjLTEuNiwxLjUtMy45LDIuNC02LjEsMi40Yy00LjUsMC03LTMuNC03LTkuN2MwLTYuMSwyLjgtMTAuMSw3LTEwLjFjMi4xLDAsNC4xLDAuOCw2LjEsMi41VjQ3LjZ6DQoJCSBNNDguNyw1NS43VjExLjFoLTguNXYxNS44aC0wLjFjLTIuMy0yLjEtNC45LTMuMS04LTMuMWMtOC42LDAtMTMuOSw2LjMtMTMuOSwxNi42YzAsMTAuMSw0LjksMTYuMiwxMi44LDE2LjINCgkJYzMuNSwwLDYuOS0xLjUsOS44LTQuNWgwLjF2My42SDQ4Ljd6IiAvPg0KICAgIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03NS43LDQ2LjdjMC0xMC42LTEzLjItOC40LTEzLjItMTMuOGMwLTIuMiwyLTMuMSw0LjYtMy4xYzIuMiwwLDQuNywwLjYsNi45LDEuOHYtNi4zYy0xLjgtMC43LTQuNy0xLjUtOC0xLjUNCgkJYy02LjYsMC0xMS43LDIuOC0xMS43LDkuNmMwLDEwLjksMTMsOC40LDEzLDEzLjhjMCwyLjUtMiwzLjQtNSwzLjRjLTIuOSwwLTUuNC0wLjktOC0yLjFWNTVjMi45LDEuMiw2LjQsMS43LDguOSwxLjcNCgkJQzcwLjIsNTYuNiw3NS43LDUzLjcsNzUuNyw0Ni43IiAvPg0KICAgIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05My4yLDQ2LjZWMzAuNWg4LjR2LTYuMWgtOC40di04LjdoLTguNXY4LjdoLTUuMXY2LjFoNS4xdjE2LjJjMCw2LjgsMy42LDkuOSwxMCw5LjljMi44LDAsNS43LTAuNiw3LTF2LTYuNA0KCQljLTEuMiwwLjQtMi44LDAuOC00LjYsMC44Qzk1LDUwLDkzLjIsNDkuMyw5My4yLDQ2LjYiIC8+DQogICAgPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwNy4xLDExLjF2MzljMCwzLjYsMi4yLDYuNCw3LjcsNi40YzEuNywwLDMuOS0wLjIsNi4xLTAuOXYtNS44Yy0xLDAuMi0xLjksMC4zLTIuNSwwLjMNCgkJYy0xLjUsMC0yLjgtMC40LTIuOC0yLjNWMTEuMUgxMDcuMXoiIC8+DQogIDwvZz4NCiAgPGc+DQogICAgPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMjMuNCwwIDEyMy40LDkuNyAxMzIsOS43IDEzMiw2My40IDEyMy40LDYzLjQgMTIzLjQsNzMuMiAxNDEuNyw3My4yIDE0MS43LDAgCSIgLz4NCiAgICA8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjAsNzMuMiAxOC40LDczLjIgMTguNCw2My40IDkuNyw2My40IDkuNyw5LjcgMTguNCw5LjcgMTguNCwwIDAsMCAJIiAvPg0KICA8L2c+DQogIDxnPg0KICAgIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MDguOCw0Mi44YzEuOCwwLDIuNiwxLjQsMi42LDMuNGgtNS43QzQwNS44LDQ0LjIsNDA2LjgsNDIuOCw0MDguOCw0Mi44IE00MDguNywzOS41Yy00LjcsMC03LjMsMy41LTcuMyw4LjINCgkJYzAsNS44LDMuNSw4LjMsOCw4LjNjMi4yLDAsNC4yLTAuNiw1LjQtMS4xdi0zLjJjLTEuNCwwLjYtMi45LDEuMS00LjcsMS4xYy0yLjcsMC00LjMtMS4yLTQuNC0zLjhoOS42di0xLjgNCgkJQzQxNS40LDQyLjYsNDEzLjIsMzkuNSw0MDguNywzOS41IE0zODcuNCw0Ny45YzAtMy4xLDEuNC01LjEsMy41LTUuMWMxLjEsMCwyLjEsMC40LDMuMSwxLjJ2Ny41Yy0wLjgsMC44LTIsMS4yLTMuMSwxLjINCgkJQzM4OC42LDUyLjgsMzg3LjQsNTEsMzg3LjQsNDcuOSBNMzgyLjksNDcuOWMwLDUuMSwyLjQsOC4yLDYuNSw4LjJjMS44LDAsMy41LTAuOCw0LjktMi4zaDB2MS44aDMuOVYzMy4xSDM5NHY4aDANCgkJYy0xLjItMS4xLTIuNS0xLjYtNC4xLTEuNkMzODUuNiwzOS41LDM4Mi45LDQyLjcsMzgyLjksNDcuOSBNMzc1LjUsNTUuNmg0LjNWMzkuOWgtNC4zVjU1LjZ6IE0zNzkuOCwzMy40aC00LjN2NGg0LjNWMzMuNHoNCgkJIE0zNzIuNSw1MS4xYzAtNS4zLTYuNy00LjItNi43LTYuOWMwLTEuMSwxLTEuNiwyLjMtMS42YzEuMSwwLDIuNCwwLjMsMy41LDAuOXYtMy4yYy0wLjktMC40LTIuNC0wLjctNC4xLTAuNw0KCQljLTMuMywwLTUuOSwxLjQtNS45LDQuOGMwLDUuNSw2LjUsNC4yLDYuNSw3YzAsMS4zLTEsMS43LTIuNSwxLjdjLTEuNSwwLTIuNy0wLjUtNC0xLjF2My4zYzEuNSwwLjYsMy4yLDAuOCw0LjUsMC44DQoJCUMzNjkuNyw1Ni4xLDM3Mi41LDU0LjYsMzcyLjUsNTEuMSBNMzU0LjMsNTUuNmg0LjNWNDUuNWMwLTQtMS42LTYtNS02Yy0yLjMsMC00LjEsMC45LTUuNSwyLjNoLTAuMXYtMS45aC0zLjl2MTUuOGg0LjNWNDQNCgkJYzAuOC0wLjcsMi0xLjEsMy4yLTEuMWMxLjksMCwyLjgsMC45LDIuOCwyLjdWNTUuNnogTTMzNS40LDU1LjZoNC40di0yMWgtNC40VjU1LjZ6IE0zMTYuOSw0Mi44YzEuOCwwLDIuNiwxLjQsMi42LDMuNGgtNS43DQoJCUMzMTMuOSw0NC4yLDMxNC45LDQyLjgsMzE2LjksNDIuOCBNMzE2LjgsMzkuNWMtNC43LDAtNy4zLDMuNS03LjMsOC4yYzAsNS44LDMuNSw4LjMsOCw4LjNjMi4yLDAsNC4yLTAuNiw1LjQtMS4xdi0zLjINCgkJYy0xLjQsMC42LTIuOSwxLjEtNC43LDEuMWMtMi43LDAtNC4zLTEuMi00LjQtMy44aDkuNnYtMS44QzMyMy41LDQyLjYsMzIxLjMsMzkuNSwzMTYuOCwzOS41IE0zMDcuOCw1NS4zVjUyDQoJCWMtMS4zLDAuNS0yLjYsMC44LTMuOCwwLjhjLTIuNywwLTQuNC0xLjQtNC40LTVjMC0zLjYsMS44LTQuOSw0LjUtNC45YzEuMSwwLDIuMywwLjIsMy40LDAuNlY0MGMtMS4yLTAuMy0yLjUtMC41LTMuOC0wLjUNCgkJYy00LjcsMC04LjYsMi41LTguNiw4LjRjMCw1LjYsMy42LDguMiw4LjEsOC4yQzMwNC43LDU2LjEsMzA2LjIsNTUuOCwzMDcuOCw1NS4zIE0yODcuOCw1NS42aDQuM1Y0NS41YzAtNC0xLjYtNi01LTYNCgkJYy0yLjMsMC00LjEsMC45LTUuNSwyLjNoLTAuMXYtMS45aC0zLjl2MTUuOGg0LjNWNDRjMC44LTAuNywyLTEuMSwzLjItMS4xYzEuOSwwLDIuOCwwLjksMi44LDIuN1Y1NS42eiBNMjY3LjcsNDIuOA0KCQljMS44LDAsMi42LDEuNCwyLjYsMy40aC01LjdDMjY0LjcsNDQuMiwyNjUuNyw0Mi44LDI2Ny43LDQyLjggTTI2Ny42LDM5LjVjLTQuNywwLTcuMywzLjUtNy4zLDguMmMwLDUuOCwzLjUsOC4zLDgsOC4zDQoJCWMyLjIsMCw0LjItMC42LDUuNC0xLjF2LTMuMmMtMS40LDAuNi0yLjksMS4xLTQuNywxLjFjLTIuNywwLTQuMy0xLjItNC40LTMuOGg5LjZ2LTEuOEMyNzQuMyw0Mi42LDI3Mi4xLDM5LjUsMjY3LjYsMzkuNQ0KCQkgTTI1Mi45LDU1LjZoNC4zVjM5LjloLTQuM1Y1NS42eiBNMjU3LjIsMzMuNGgtNC4zdjRoNC4zVjMzLjR6IE0yNTAsNTUuM1Y1MmMtMS4zLDAuNS0yLjYsMC44LTMuOCwwLjhjLTIuNywwLTQuNC0xLjQtNC40LTUNCgkJYzAtMy42LDEuOC00LjksNC41LTQuOWMxLjEsMCwyLjMsMC4yLDMuNCwwLjZWNDBjLTEuMi0wLjMtMi41LTAuNS0zLjgtMC41Yy00LjcsMC04LjYsMi41LTguNiw4LjRjMCw1LjYsMy42LDguMiw4LjEsOC4yDQoJCUMyNDYuOSw1Ni4xLDI0OC40LDU1LjgsMjUwLDU1LjMgTTIzNC4yLDM1LjFjLTEuNi0wLjYtMy40LTAuOS01LjItMC45Yy0zLjksMC03LjQsMS42LTcuNCw2LjJjMCw3LjMsOS4xLDUuMyw5LjEsOS42DQoJCWMwLDEuOC0xLjQsMi40LTMuMiwyLjRjLTEuOCwwLTQuMS0wLjYtNS45LTEuNnY0LjFjMS44LDAuOCwzLjksMS4yLDUuOSwxLjJjNCwwLDcuNy0xLjgsNy43LTYuNWMwLTcuNC05LjEtNS4zLTkuMS05LjUNCgkJYzAtMS42LDEuMy0yLjIsMy0yLjJjMS42LDAsMy41LDAuNSw1LjEsMS4xVjM1LjF6IE0yMDMuOSw0Mi44YzEuOCwwLDIuNiwxLjQsMi42LDMuNGgtNS43QzIwMC45LDQ0LjIsMjAxLjksNDIuOCwyMDMuOSw0Mi44DQoJCSBNMjAzLjgsMzkuNWMtNC43LDAtNy4zLDMuNS03LjMsOC4yYzAsNS44LDMuNSw4LjMsOCw4LjNjMi4yLDAsNC4yLTAuNiw1LjQtMS4xdi0zLjJjLTEuNCwwLjYtMi45LDEuMS00LjcsMS4xDQoJCWMtMi43LDAtNC4zLTEuMi00LjQtMy44aDkuNnYtMS44QzIxMC41LDQyLjYsMjA4LjMsMzkuNSwyMDMuOCwzOS41IE0xODkuMiw1NS42aDQuM1Y0NS41YzAtNC4yLTEuNi02LTUuMy02DQoJCWMtMS41LDAtMy40LDAuNy00LjksMS45di04LjNIMTc5djIyLjVoNC4zVjQ0YzAuOC0wLjcsMi0xLjEsMy4yLTEuMWMxLjksMCwyLjgsMC45LDIuOCwyLjdWNTUuNnogTTE3MC42LDM4LjVoNnYtMy44aC0xNi42djMuOA0KCQloNi4xdjE3LjJoNC40VjM4LjV6IiAvPg0KICA8L2c+DQo8L3N2Zz4NCg=="},Xagz:function(t,e,n){},ZPGm:function(t,e,n){t.exports=n.p+"static/AI-logo-text-light-bgTransparent-withoutTrim-06b8e071af4bf03022b8b003933a0f37.svg"},bmMU:function(t,e){var n="undefined"!=typeof Element,r="function"==typeof Map,i="function"==typeof Set,u="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;t.exports=function(t,e){try{return function t(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){if(e.constructor!==a.constructor)return!1;var o,s,c,L;if(Array.isArray(e)){if((o=e.length)!=a.length)return!1;for(s=o;0!=s--;)if(!t(e[s],a[s]))return!1;return!0}if(r&&e instanceof Map&&a instanceof Map){if(e.size!==a.size)return!1;for(L=e.entries();!(s=L.next()).done;)if(!a.has(s.value[0]))return!1;for(L=e.entries();!(s=L.next()).done;)if(!t(s.value[1],a.get(s.value[0])))return!1;return!0}if(i&&e instanceof Set&&a instanceof Set){if(e.size!==a.size)return!1;for(L=e.entries();!(s=L.next()).done;)if(!a.has(s.value[0]))return!1;return!0}if(u&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(a)){if((o=e.length)!=a.length)return!1;for(s=o;0!=s--;)if(e[s]!==a[s])return!1;return!0}if(e.constructor===RegExp)return e.source===a.source&&e.flags===a.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===a.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===a.toString();if((o=(c=Object.keys(e)).length)!==Object.keys(a).length)return!1;for(s=o;0!=s--;)if(!Object.prototype.hasOwnProperty.call(a,c[s]))return!1;if(n&&e instanceof Element)return!1;for(s=o;0!=s--;)if(("_owner"!==c[s]&&"__v"!==c[s]&&"__o"!==c[s]||!e.$$typeof)&&!t(e[c[s]],a[c[s]]))return!1;return!0}return e!=e&&a!=a}(t,e)}catch(a){if((a.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw a}}},goLZ:function(t,e,n){},pfZt:function(t,e,n){},qhky:function(t,e,n){"use strict";(function(t){n("E9XD");var r,i,u,a,o=n("17x9"),s=n.n(o),c=n("8+s/"),L=n.n(c),M=n("bmMU"),l=n.n(M),y=n("q1tI"),j=n.n(y),N=n("YVoz"),w=n.n(N),f="bodyAttributes",C="htmlAttributes",d="titleAttributes",T={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},p=(Object.keys(T).map((function(t){return T[t]})),"charset"),g="cssText",m="href",S="http-equiv",D="innerHTML",I="itemprop",h="name",A="property",O="rel",E="src",b="target",z={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},v="defaultTitle",x="defer",Y="encodeSpecialCharacters",k="onChangeClientState",Q="titleTemplate",U=Object.keys(z).reduce((function(t,e){return t[z[e]]=e,t}),{}),P=[T.NOSCRIPT,T.SCRIPT,T.STYLE],J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},W=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},B=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),R=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},G=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},Z=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},F=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===e?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},H=function(t){var e=q(t,T.TITLE),n=q(t,Q);if(n&&e)return n.replace(/%s/g,(function(){return Array.isArray(e)?e.join(""):e}));var r=q(t,v);return e||r||void 0},X=function(t){return q(t,k)||function(){}},V=function(t,e){return e.filter((function(e){return void 0!==e[t]})).map((function(e){return e[t]})).reduce((function(t,e){return R({},t,e)}),{})},K=function(t,e){return e.filter((function(t){return void 0!==t[T.BASE]})).map((function(t){return t[T.BASE]})).reverse().reduce((function(e,n){if(!e.length)for(var r=Object.keys(n),i=0;i<r.length;i++){var u=r[i].toLowerCase();if(-1!==t.indexOf(u)&&n[u])return e.concat(n)}return e}),[])},_=function(t,e,n){var r={};return n.filter((function(e){return!!Array.isArray(e[t])||(void 0!==e[t]&&rt("Helmet: "+t+' should be of type "Array". Instead found type "'+J(e[t])+'"'),!1)})).map((function(e){return e[t]})).reverse().reduce((function(t,n){var i={};n.filter((function(t){for(var n=void 0,u=Object.keys(t),a=0;a<u.length;a++){var o=u[a],s=o.toLowerCase();-1===e.indexOf(s)||n===O&&"canonical"===t[n].toLowerCase()||s===O&&"stylesheet"===t[s].toLowerCase()||(n=s),-1===e.indexOf(o)||o!==D&&o!==g&&o!==I||(n=o)}if(!n||!t[n])return!1;var c=t[n].toLowerCase();return r[n]||(r[n]={}),i[n]||(i[n]={}),!r[n][c]&&(i[n][c]=!0,!0)})).reverse().forEach((function(e){return t.push(e)}));for(var u=Object.keys(i),a=0;a<u.length;a++){var o=u[a],s=w()({},r[o],i[o]);r[o]=s}return t}),[]).reverse()},q=function(t,e){for(var n=t.length-1;n>=0;n--){var r=t[n];if(r.hasOwnProperty(e))return r[e]}return null},$=(r=Date.now(),function(t){var e=Date.now();e-r>16?(r=e,t(e)):setTimeout((function(){$(t)}),0)}),tt=function(t){return clearTimeout(t)},et="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||$:t.requestAnimationFrame||$,nt="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||tt:t.cancelAnimationFrame||tt,rt=function(t){return console&&"function"==typeof console.warn&&console.warn(t)},it=null,ut=function(t,e){var n=t.baseTag,r=t.bodyAttributes,i=t.htmlAttributes,u=t.linkTags,a=t.metaTags,o=t.noscriptTags,s=t.onChangeClientState,c=t.scriptTags,L=t.styleTags,M=t.title,l=t.titleAttributes;st(T.BODY,r),st(T.HTML,i),ot(M,l);var y={baseTag:ct(T.BASE,n),linkTags:ct(T.LINK,u),metaTags:ct(T.META,a),noscriptTags:ct(T.NOSCRIPT,o),scriptTags:ct(T.SCRIPT,c),styleTags:ct(T.STYLE,L)},j={},N={};Object.keys(y).forEach((function(t){var e=y[t],n=e.newTags,r=e.oldTags;n.length&&(j[t]=n),r.length&&(N[t]=y[t].oldTags)})),e&&e(),s(t,j,N)},at=function(t){return Array.isArray(t)?t.join(""):t},ot=function(t,e){void 0!==t&&document.title!==t&&(document.title=at(t)),st(T.TITLE,e)},st=function(t,e){var n=document.getElementsByTagName(t)[0];if(n){for(var r=n.getAttribute("data-react-helmet"),i=r?r.split(","):[],u=[].concat(i),a=Object.keys(e),o=0;o<a.length;o++){var s=a[o],c=e[s]||"";n.getAttribute(s)!==c&&n.setAttribute(s,c),-1===i.indexOf(s)&&i.push(s);var L=u.indexOf(s);-1!==L&&u.splice(L,1)}for(var M=u.length-1;M>=0;M--)n.removeAttribute(u[M]);i.length===u.length?n.removeAttribute("data-react-helmet"):n.getAttribute("data-react-helmet")!==a.join(",")&&n.setAttribute("data-react-helmet",a.join(","))}},ct=function(t,e){var n=document.head||document.querySelector(T.HEAD),r=n.querySelectorAll(t+"[data-react-helmet]"),i=Array.prototype.slice.call(r),u=[],a=void 0;return e&&e.length&&e.forEach((function(e){var n=document.createElement(t);for(var r in e)if(e.hasOwnProperty(r))if(r===D)n.innerHTML=e.innerHTML;else if(r===g)n.styleSheet?n.styleSheet.cssText=e.cssText:n.appendChild(document.createTextNode(e.cssText));else{var o=void 0===e[r]?"":e[r];n.setAttribute(r,o)}n.setAttribute("data-react-helmet","true"),i.some((function(t,e){return a=e,n.isEqualNode(t)}))?i.splice(a,1):u.push(n)})),i.forEach((function(t){return t.parentNode.removeChild(t)})),u.forEach((function(t){return n.appendChild(t)})),{oldTags:i,newTags:u}},Lt=function(t){return Object.keys(t).reduce((function(e,n){var r=void 0!==t[n]?n+'="'+t[n]+'"':""+n;return e?e+" "+r:r}),"")},Mt=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,n){return e[z[n]||n]=t[n],e}),e)},lt=function(t,e,n){switch(t){case T.TITLE:return{toComponent:function(){return t=e.title,n=e.titleAttributes,(r={key:t})["data-react-helmet"]=!0,i=Mt(n,r),[j.a.createElement(T.TITLE,i,t)];var t,n,r,i},toString:function(){return function(t,e,n,r){var i=Lt(n),u=at(e);return i?"<"+t+' data-react-helmet="true" '+i+">"+F(u,r)+"</"+t+">":"<"+t+' data-react-helmet="true">'+F(u,r)+"</"+t+">"}(t,e.title,e.titleAttributes,n)}};case f:case C:return{toComponent:function(){return Mt(e)},toString:function(){return Lt(e)}};default:return{toComponent:function(){return function(t,e){return e.map((function(e,n){var r,i=((r={key:n})["data-react-helmet"]=!0,r);return Object.keys(e).forEach((function(t){var n=z[t]||t;if(n===D||n===g){var r=e.innerHTML||e.cssText;i.dangerouslySetInnerHTML={__html:r}}else i[n]=e[t]})),j.a.createElement(t,i)}))}(t,e)},toString:function(){return function(t,e,n){return e.reduce((function(e,r){var i=Object.keys(r).filter((function(t){return!(t===D||t===g)})).reduce((function(t,e){var i=void 0===r[e]?e:e+'="'+F(r[e],n)+'"';return t?t+" "+i:i}),""),u=r.innerHTML||r.cssText||"",a=-1===P.indexOf(t);return e+"<"+t+' data-react-helmet="true" '+i+(a?"/>":">"+u+"</"+t+">")}),"")}(t,e,n)}}}},yt=function(t){var e=t.baseTag,n=t.bodyAttributes,r=t.encode,i=t.htmlAttributes,u=t.linkTags,a=t.metaTags,o=t.noscriptTags,s=t.scriptTags,c=t.styleTags,L=t.title,M=void 0===L?"":L,l=t.titleAttributes;return{base:lt(T.BASE,e,r),bodyAttributes:lt(f,n,r),htmlAttributes:lt(C,i,r),link:lt(T.LINK,u,r),meta:lt(T.META,a,r),noscript:lt(T.NOSCRIPT,o,r),script:lt(T.SCRIPT,s,r),style:lt(T.STYLE,c,r),title:lt(T.TITLE,{title:M,titleAttributes:l},r)}},jt=L()((function(t){return{baseTag:K([m,b],t),bodyAttributes:V(f,t),defer:q(t,x),encode:q(t,Y),htmlAttributes:V(C,t),linkTags:_(T.LINK,[O,m],t),metaTags:_(T.META,[h,p,S,A,I],t),noscriptTags:_(T.NOSCRIPT,[D],t),onChangeClientState:X(t),scriptTags:_(T.SCRIPT,[E,D],t),styleTags:_(T.STYLE,[g],t),title:H(t),titleAttributes:V(d,t)}}),(function(t){it&&nt(it),t.defer?it=et((function(){ut(t,(function(){it=null}))})):(ut(t),it=null)}),yt)((function(){return null})),Nt=(i=jt,a=u=function(t){function e(){return W(this,e),Z(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.shouldComponentUpdate=function(t){return!l()(this.props,t)},e.prototype.mapNestedChildrenToProps=function(t,e){if(!e)return null;switch(t.type){case T.SCRIPT:case T.NOSCRIPT:return{innerHTML:e};case T.STYLE:return{cssText:e}}throw new Error("<"+t.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},e.prototype.flattenArrayTypeChildren=function(t){var e,n=t.child,r=t.arrayTypeChildren,i=t.newChildProps,u=t.nestedChildren;return R({},r,((e={})[n.type]=[].concat(r[n.type]||[],[R({},i,this.mapNestedChildrenToProps(n,u))]),e))},e.prototype.mapObjectTypeChildren=function(t){var e,n,r=t.child,i=t.newProps,u=t.newChildProps,a=t.nestedChildren;switch(r.type){case T.TITLE:return R({},i,((e={})[r.type]=a,e.titleAttributes=R({},u),e));case T.BODY:return R({},i,{bodyAttributes:R({},u)});case T.HTML:return R({},i,{htmlAttributes:R({},u)})}return R({},i,((n={})[r.type]=R({},u),n))},e.prototype.mapArrayTypeChildrenToProps=function(t,e){var n=R({},e);return Object.keys(t).forEach((function(e){var r;n=R({},n,((r={})[e]=t[e],r))})),n},e.prototype.warnOnInvalidChildren=function(t,e){return!0},e.prototype.mapChildrenToProps=function(t,e){var n=this,r={};return j.a.Children.forEach(t,(function(t){if(t&&t.props){var i=t.props,u=i.children,a=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,n){return e[U[n]||n]=t[n],e}),e)}(G(i,["children"]));switch(n.warnOnInvalidChildren(t,u),t.type){case T.LINK:case T.META:case T.NOSCRIPT:case T.SCRIPT:case T.STYLE:r=n.flattenArrayTypeChildren({child:t,arrayTypeChildren:r,newChildProps:a,nestedChildren:u});break;default:e=n.mapObjectTypeChildren({child:t,newProps:e,newChildProps:a,nestedChildren:u})}}})),e=this.mapArrayTypeChildrenToProps(r,e)},e.prototype.render=function(){var t=this.props,e=t.children,n=G(t,["children"]),r=R({},n);return e&&(r=this.mapChildrenToProps(e,r)),j.a.createElement(i,r)},B(e,null,[{key:"canUseDOM",set:function(t){i.canUseDOM=t}}]),e}(j.a.Component),u.propTypes={base:s.a.object,bodyAttributes:s.a.object,children:s.a.oneOfType([s.a.arrayOf(s.a.node),s.a.node]),defaultTitle:s.a.string,defer:s.a.bool,encodeSpecialCharacters:s.a.bool,htmlAttributes:s.a.object,link:s.a.arrayOf(s.a.object),meta:s.a.arrayOf(s.a.object),noscript:s.a.arrayOf(s.a.object),onChangeClientState:s.a.func,script:s.a.arrayOf(s.a.object),style:s.a.arrayOf(s.a.object),title:s.a.string,titleAttributes:s.a.object,titleTemplate:s.a.string},u.defaultProps={defer:!0,encodeSpecialCharacters:!0},u.peek=i.peek,u.rewind=function(){var t=i.rewind();return t||(t=yt({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},a);Nt.renderStatic=Nt.rewind,e.a=Nt}).call(this,n("eKGF"))},tkFw:function(t,e,n){"use strict";var r=n("q1tI"),i=n.n(r),u=n("qhky"),a=n("Wbzz");function o(t){var e=t.description,n=t.lang,r=t.meta,o=t.title,s=Object(a.useStaticQuery)("3000541721").site,c=e||s.siteMetadata.description;return i.a.createElement(u.a,{htmlAttributes:{lang:n},title:o,titleTemplate:"%s | "+s.siteMetadata.title,meta:[{name:"description",content:c},{property:"og:title",content:o},{property:"og:description",content:c},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:s.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:c}].concat(r)})}o.defaultProps={lang:"en",meta:[],description:""},e.a=o},"x+Gp":function(t,e,n){"use strict";var r=n("q1tI"),i=n.n(r),u=(n("pfZt"),n("ZPGm")),a=n("DTbp"),o=function(t){var e=t.siteTitle,n=t.PageHeader;return i.a.createElement("header",null,i.a.createElement("div",{className:"nav-container"},i.a.createElement("div",{className:"nav-logo-left"},i.a.createElement("img",{className:"ai-header-logo",alt:"Aleph Insights Logo",src:u})),i.a.createElement("div",{className:"nav-title-center"},e),i.a.createElement("div",{className:"nav-logo-right"},i.a.createElement("img",{className:"dstl-header-logo",alt:"DSTL Logo",src:a}))),n)},s=n("Wbzz"),c=(n("goLZ"),function(){return i.a.createElement("footer",null,i.a.createElement("div",{className:"footer-left"},i.a.createElement(s.Link,{className:"footer-links",to:"/about"},"About")),i.a.createElement("div",{className:"footer-center"},"© Crown copyright (2021), Dstl."),i.a.createElement("div",{className:"footer-right"},i.a.createElement(s.Link,{className:"footer-links",to:"/privacy"},"Privacy")))}),L=function(t){return i.a.createElement("div",{className:"main-title"},i.a.createElement("div",{className:"main-title__home"},i.a.createElement(s.Link,{to:"/"},"Home"),t.breadcrumb&&i.a.createElement("span",null," > ",i.a.createElement(s.Link,{to:t.breadcrumb.link},t.breadcrumb.label))),i.a.createElement("div",{className:"main-title__header"},t.text),i.a.createElement("div",{className:"main-title__right"}))};n("Xagz"),e.a=function(t){var e=t.title,n=t.breadcrumb,u=t.children,a=t.pageHeader,M=t.className,l=Object(s.useStaticQuery)("3000541721").site;return i.a.createElement("div",{className:M||" layout-grid"},i.a.createElement(o,{siteTitle:e||l.siteMetadata.title,PageHeader:a?i.a.createElement(L,{text:a,breadcrumb:n}):i.a.createElement(r.Fragment,null)}),i.a.createElement("div",{className:"main-container"},u),i.a.createElement(c,null))}}}]);
//# sourceMappingURL=commons-1ca03c0dd087ad85aaf6.js.map
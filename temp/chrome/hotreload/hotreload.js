!function(t){var r={};function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(n,e){if(1&e&&(n=o(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)o.d(t,r,function(e){return n[e]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=25)}({25:function(e,n){function r(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var o=function(e){return function t(e){return new Promise(function(n){return e.createReader().readEntries(function(e){return Promise.all(e.filter(function(e){return"."!==e.name[0]}).map(function(n){return n.isDirectory?t(n):new Promise(function(e){return n.file(e)})})).then(function(e){var n;return(n=[]).concat.apply(n,r(e))}).then(n)})})}(e).then(function(e){return e.map(function(e){return e.name+e.lastModifiedDate}).join()})},t=function n(t,r){o(t).then(function(e){r&&r!==e?chrome.tabs.query({active:!0,currentWindow:!0},function(e){e[0]&&chrome.tabs.reload(e[0].id),chrome.runtime.reload()}):setTimeout(function(){return n(t,e)},1e3)})};chrome&&chrome.management.getSelf(function(e){"development"===e.installType&&chrome.runtime.getPackageDirectoryEntry(function(e){return t(e)})})}});
// ==UserScript==
// @name         YouTube Short Remover
// @namespace    https://github.com/CHooverShrimp
// @version      1.0
// @description  Removing brainrot automatically just for (You)!
// @author       Hoover
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    let css = `
     #dismissible.ytd-rich-shelf-renderer{
      display:none;
     }
    `;
    if (typeof GM_addStyle !== "undefined") {
        GM_addStyle(css);
    } else {
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(css));
        (document.querySelector("head") || document.documentElement).appendChild(styleNode);
    }
})();


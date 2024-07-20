// ==UserScript==
// @name         Custom Image for Youtube Background
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Replace the old boring flat background with whatever picture you like
// @author       Hoover
// @match        *://*.youtube.com/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @license      MIT
// ==/UserScript==


// Only tested on dark mode. If you're using light mode, you're a lunatic.

(function () {
    'use strict';

    // Fill the array up with URLs to pictures
    const bgSources = [
        "https://i.kym-cdn.com/photos/images/original/000/581/296/c09.jpg",
        "https://i.kym-cdn.com/photos/images/original/000/581/296/c09.jpg"
    ]

    function getRandomImageUrl(images) {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }

    // Select only one image from the array
    let bgImage = getRandomImageUrl(bgSources);

    // Overriding and adding css styles
    let css = `
    ytd-app {
        background-image: url(${bgImage});
        background-attachment: fixed;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    html[dark],
    [dark] {
        --yt-spec-base-background:#0f0f0fbf;
    }
    #cinematics-container{
        display: none;
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

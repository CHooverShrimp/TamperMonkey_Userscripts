// ==UserScript==
// @name         YouTube Short Remover
// @namespace    https://github.com/CHooverShrimp
// @version      0.1
// @description  Removing brainrot automatically just for (You)!
// @author       Hoover
// @match        *://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    // Function to remove elements by class name
    function removeElementsByClassName(className) {
        var elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    // Initial removal on page load
    removeElementsByClassName('ytd-rich-section-renderer');

    // Mutation observer to catch dynamically loaded content
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                removeElementsByClassName('ytd-rich-section-renderer');
            }
        });
    });

    // Observe changes in the body
    observer.observe(document.body, { childList: true, subtree: true });
})();


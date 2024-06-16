// ==UserScript==
// @name         Custom Image for Youtube Background
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replace the old boring flat background with whatever picture you like
// @author       Hoover
// @match        *://*.youtube.com/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @license      MIT
// ==/UserScript==

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

    function applyBackground() {
        var primaryElement = document.getElementById('content');
        if (primaryElement) {
            primaryElement.style.backgroundImage = `url(${bgImage})`;
            primaryElement.style.backgroundAttachment = 'fixed';
            primaryElement.style.backgroundSize = 'cover';
            primaryElement.style.backgroundRepeat = 'no-repeat';
            primaryElement.style.backgroundPosition = 'center';
        }
    }
    
    // Function to add transparency to some divs
    function applyTransparency(divName) {
        var divElem = document.getElementById(divName);
        if (divElem) {
            divElem.style.opacity = 0.9;
        }
    }

    // Repackaged for quick calling
    function applyTransparentElems() {
        applyTransparency('guide');
        applyTransparency('chips-wrapper');
    }

    // Function to remove elements by class name
    function removeElementsByID(id) {
        var element = document.getElementById(id);
        if (element) {
            element.parentNode.removeChild(element);
        }
    }


    // Must remove cinematic container (the glowing effect when video plays)
    removeElementsByID('cinematics-container');

    applyTransparentElems();

    // Check for the element every 500ms until it is found
    var checkExist = setInterval(function () {
        if (document.getElementById('content')) {
            applyBackground();
            clearInterval(checkExist);
            removeElementsByID('cinematics-container');
        }
    }, 500);

    // Additionally, listen for page changes and reapply the background
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                applyBackground();
                applyTransparentElems()
                removeElementsByID('cinematics-container');
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

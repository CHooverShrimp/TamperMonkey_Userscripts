// ==UserScript==
// @name         Red Highlight for < lines
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Make lines starting with &lt; red in postMessage blocks
// @author       You
// @include      http://boards.4chan.org/*
// @include      https://boards.4chan.org/*
// @include      http://sys.4chan.org/*
// @include      https://sys.4chan.org/*
// @include      http://www.4chan.org/*
// @include      https://www.4chan.org/*
// @include      http://boards.4channel.org/*
// @include      https://boards.4channel.org/*
// @include      http://sys.4channel.org/*
// @include      https://sys.4channel.org/*
// @include      http://www.4channel.org/*
// @include      https://www.4channel.org/*
// @include      http://i.4cdn.org/*
// @include      https://i.4cdn.org/*
// @include      http://is.4chan.org/*
// @include      https://is.4chan.org/*
// @include      http://is2.4chan.org/*
// @include      https://is2.4chan.org/*
// @include      http://is.4channel.org/*
// @include      https://is.4channel.org/*
// @include      http://is2.4channel.org/*
// @include      https://is2.4channel.org/*
// @include      https://erischan.org/*
// @include      https://www.erischan.org/*
// @include      https://fufufu.moe/*
// @include      https://gnfos.com/*
// @include      https://himasugi.blog/*
// @include      https://www.himasugi.blog/*
// @include      https://kakashinenpo.com/*
// @include      https://www.kakashinenpo.com/*
// @include      https://kissu.moe/*
// @include      https://www.kissu.moe/*
// @include      https://lainchan.org/*
// @include      https://www.lainchan.org/*
// @include      https://merorin.com/*
// @include      https://ota-ch.com/*
// @include      https://www.ota-ch.com/*
// @include      https://ponyville.us/*
// @include      https://www.ponyville.us/*
// @include      https://smuglo.li/*
// @include      https://notso.smuglo.li/*
// @include      https://smugloli.net/*
// @include      https://smug.nepu.moe/*
// @include      https://sportschan.org/*
// @include      https://www.sportschan.org/*
// @include      https://sushigirl.us/*
// @include      https://www.sushigirl.us/*
// @include      https://tvch.moe/*
// @include      https://desuarchive.org
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAACVBMVEUAAGcAAABmzDNZt9VtAAAAAXRSTlMAQObYZgAAAF5JREFUeNrtkTESABAQxPD/R6tsE2dUGYUtFJvLDKf93KevHJAjpBorAQWSBIKqFASC4G0pCAkm4GfaEvgYXl0T6HBaE97f0vmnfYHbZOMLZCx9ISdKWwjOWZSC8GYm4SUGwfYgqI4AAAAASUVORK5CYII=
// ==/UserScript==

(function () {
    'use strict';

    // Target all postMessage blocks
    const posts = document.querySelectorAll('.postMessage');

    posts.forEach(post => {
        // Collect all text nodes first to avoid DOM modification issues during traversal
        const textNodes = [];
        const walker = document.createTreeWalker(post, NodeFilter.SHOW_TEXT, null);
        let node;
        while ((node = walker.nextNode())) {
            textNodes.push(node);
        }

        // Now process each text node
        textNodes.forEach(textNode => {
            if (textNode.nodeValue && textNode.nodeValue.includes('<')) {
                const parent = textNode.parentNode;
                const text = textNode.nodeValue;

                // Split by line breaks to handle each line separately
                const lines = text.split('\n');
                const frag = document.createDocumentFragment();

                lines.forEach((line, index) => {
                    if (index > 0) {
                        frag.appendChild(document.createTextNode('\n'));
                    }

                    if (line.trim().startsWith('<')) {
                        const span = document.createElement('span');
                        span.style.color = 'Salmon';
                        span.textContent = line;
                        frag.appendChild(span);
                    } else {
                        frag.appendChild(document.createTextNode(line));
                    }
                });

                parent.replaceChild(frag, textNode);
            }
        });
    });
})();

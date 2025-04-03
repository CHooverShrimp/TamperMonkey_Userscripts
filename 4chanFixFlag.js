// ==UserScript==
// @name         4chan fix flax pixelated
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Apply image-rendering: pixelated to images with class "bfl"
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
// @exclude      http://www.4chan.org/advertise
// @exclude      https://www.4chan.org/advertise
// @exclude      http://www.4chan.org/advertise?*
// @exclude      https://www.4chan.org/advertise?*
// @exclude      http://www.4chan.org/donate
// @exclude      https://www.4chan.org/donate
// @exclude      http://www.4chan.org/donate?*
// @exclude      https://www.4chan.org/donate?*
// @exclude      http://www.4channel.org/advertise
// @exclude      https://www.4channel.org/advertise
// @exclude      http://www.4channel.org/advertise?*
// @exclude      https://www.4channel.org/advertise?*
// @exclude      http://www.4channel.org/donate
// @exclude      https://www.4channel.org/donate
// @exclude      http://www.4channel.org/donate?*
// @exclude      https://www.4channel.org/donate?*
// @connect      4chan.org
// @connect      4channel.org
// @connect      4cdn.org
// @connect      4chenz.github.io
// @connect      archive.4plebs.org
// @connect      warosu.org
// @connect      desuarchive.org
// @connect      boards.fireden.net
// @connect      arch.b4k.co
// @connect      archived.moe
// @connect      thebarchive.com
// @connect      archiveofsins.com
// @connect      www.tokyochronos.net
// @connect      archive.palanq.win
// @connect      eientei.xyz
// @connect      api.clyp.it
// @connect      api.dailymotion.com
// @connect      api.github.com
// @connect      soundcloud.com
// @connect      api.streamable.com
// @connect      vimeo.com
// @connect      www.youtube.com
// @connect      *
// @icon         https://www.google.com/s2/favicons?sz=64&domain=4chan.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create a style element
    const style = document.createElement('style');
    style.textContent = `
        .bfl {
            image-rendering: pixelated !important;
        }
    `;

    // Append the style element to the document head
    document.head.appendChild(style);
})();

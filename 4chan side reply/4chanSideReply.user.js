// ==UserScript==
// @name         4chan Side Reply with Toggle
// @namespace    http://tampermonkey.net/
// @version      2025-04-25
// @description  Side reply on 4chan threads.
// @author       Hoover
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
// @icon         https://www.google.com/s2/favicons?sz=64&domain=4chan.org
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // Inject custom styles for positioning and toggle
    const style = document.createElement('style');
    style.textContent = `
        .custom-post-form {
            position: fixed !important;
            right: 0;
            top: 0;
            z-index: 9999;
        }
        .custom-post-form.hidden {
            transform: translateX(100%);
        }
        #post-checkbox {
            position: absolute;
            top: 0;
            right: 0;
            appearance: none;
            -webkit-appearance: none;
            width: 3rem;
            height: 3rem;
            pointer-events: auto;
            cursor:pointer;
        }
        #post-checkbox::after {
            content: "SHOW";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        #post-checkbox:checked::after {
            content: "HIDE";
        }
    `;
    document.head.appendChild(style);

    // Function to get styles from first cell and apply to checkbox
    function applyFirstCellStylesToCheckbox() {
        const checkbox = document.getElementById('post-checkbox');
        const firstCell = document.querySelector('table.postForm > tbody > tr > td:first-child');

        if (!checkbox || !firstCell) {
            return setTimeout(applyFirstCellStylesToCheckbox, 500);
        }

        const firstCellStyle = window.getComputedStyle(firstCell);

        // Apply the styles from the first cell to the checkbox
        checkbox.style.backgroundColor = firstCellStyle.backgroundColor;
        checkbox.style.color = firstCellStyle.color;
        checkbox.style.fontWeight = firstCellStyle.fontWeight;
        checkbox.style.border = firstCellStyle.border;
        checkbox.style.fontSize = firstCellStyle.fontSize;

        // Ensure the text inside the checkbox has the same color
        const afterStyle = document.createElement('style');
        afterStyle.textContent = `
            #post-checkbox::after {
                color: ${firstCellStyle.color};
                font-weight: ${firstCellStyle.fontWeight};
                font-size: ${firstCellStyle.fontSize};
            }
        `;
        document.head.appendChild(afterStyle);
    }

    // Function to apply reply styles to postForm
    function applyReplyStyles() {
        const form = document.getElementById('postForm');
        const replyDiv = document.querySelector('div.reply');

        if (!form || !replyDiv) {
            return setTimeout(applyReplyStyles, 500);
        }

        // Get computed styles from an actual reply element
        const computedStyle = window.getComputedStyle(replyDiv);

        // Apply styles directly
        form.style.backgroundColor = computedStyle.backgroundColor;
        form.style.color = computedStyle.color;

        // Make sure border is explicitly applied with all properties
        form.style.borderWidth = computedStyle.borderWidth;
        form.style.borderStyle = computedStyle.borderStyle;
        form.style.borderColor = computedStyle.borderColor;

        form.style.borderRadius = computedStyle.borderRadius;
        form.style.padding = computedStyle.padding;
        form.style.margin = computedStyle.margin;
        form.style.boxShadow = computedStyle.boxShadow;
        form.style.fontFamily = computedStyle.fontFamily;
        form.style.fontSize = computedStyle.fontSize;

        // Make sure border is visible
        form.style.borderWidth = computedStyle.borderWidth || '1px';
        form.style.borderStyle = computedStyle.borderStyle || 'solid';

        // Update checkbox styles too
        applyFirstCellStylesToCheckbox();
    }

    // Watch for theme changes by monitoring stylesheets
    function setupStylesheetObserver() {
        // This will run when stylesheets are added/removed/changed
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' &&
                    mutation.attributeName === 'href' &&
                    mutation.target.tagName === 'LINK') {
                    // CSS href changed, reapply styles
                    applyReplyStyles();
                    applyFirstCellStylesToCheckbox();
                }
            });
        });

        // Observe all stylesheet links
        document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
            observer.observe(link, { attributes: true });
        });

        // Also observe the head for new stylesheets being added
        observer.observe(document.head, {
            childList: true,
            subtree: true
        });

        return observer;
    }

    // Main function to customize the post form
    function customizePostForm() {
        const form = document.getElementById('postForm');
        if (!form) return setTimeout(customizePostForm, 500);

        // Add custom class
        form.classList.add('custom-post-form');

        // Create checkbox toggle if it doesn't exist
        if (!document.getElementById('post-checkbox')) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'post-checkbox';
            checkbox.name = 'post-visibility';
            checkbox.checked = true; // Initially visible
            checkbox.addEventListener('change', () => {
                toggleVisibility(form, checkbox.checked);
            });
            form.appendChild(checkbox);
        }

        // Apply initial styles
        applyReplyStyles();
        applyFirstCellStylesToCheckbox();

        // Setup theme change detection
        setupStylesheetObserver();

        // Also watch for theme change buttons
        document.querySelectorAll('[title*="style"]').forEach(elem => {
            elem.addEventListener('click', () => {
                // Wait a moment for styles to update
                setTimeout(() => {
                    applyReplyStyles();
                    applyFirstCellStylesToCheckbox();
                }, 200);
            });
        });
    }

    // Toggle visibility of tbody and tfoot based on checkbox state
    function toggleVisibility(form, isChecked) {
        const tbody = form.querySelector('tbody');
        const tfoot = form.querySelector('tfoot');
        if (tbody) {
            tbody.style.display = isChecked ? '' : 'none';
        }
        if (tfoot) {
            tfoot.style.display = isChecked ? '' : 'none';
        }
    }

    // Start the process
    customizePostForm();

    // Auto-trigger form when quoting
    document.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith("javascript:quote(")) {
            const toggle = document.querySelector('#togglePostFormLink a');
            if (toggle) toggle.click();
            const checkbox = document.getElementById('post-checkbox');
            if (checkbox) checkbox.checked = true; // show form
            const form = document.getElementById('postForm');
            if (form) {
                form.classList.remove('hidden');
                applyReplyStyles(); // Reapply styles when showing
                applyFirstCellStylesToCheckbox();
            }
        }
    });

    // Additional listener for theme switchers
    document.addEventListener('click', function (e) {
        if (e.target.href && e.target.href.includes('theme=')) {
            // Theme change detected, reapply styles after a delay
            setTimeout(() => {
                applyReplyStyles();
                applyFirstCellStylesToCheckbox();
            }, 500);
        }
    }, true);
})();

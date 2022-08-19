/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 */

'use strict';

define([
    'uiComponent',
    'domReady!'
], function (Component) {
    const init = function (config) {
        enableAndConfigDoofinder(config);
    };

    const hideElement = function (element) {
        element.style.display = 'none';
    };

    const showElement = function(element, display = 'block') {
        element.style.display = display;
    };

    const hideDoofinderPopup = function (dfLayer) {
        dfLayer.layer.plugins.close.close();
    };

    const checkDf = function () {
        return (window.dfFullscreenLayers[0] !== undefined);
    };

    const enableAndConfigDoofinder = function (config) {
        const dfSearchIcon = document.querySelector('.header.content .gr-header-top-search'),
              dfSearchCloseIcon = document.querySelector('.header.content .gr-header-top-search-close'),
              dfSearchbox = document.querySelector('#search');

        const dfUrl = '//cdn.doofinder.com/media/js/doofinder-fullscreen.7.latest.min.js';
        (function(c,o,k,e){var r,t,i=setInterval(function(){t+=c;r=typeof(require)==='function';
            if(t>=o||r)clearInterval(i);if(r)require([k],e)},c)})(100, 10000, dfUrl, function(doofinder){
            doofinder.fullscreen.setLayers([{
                queryInput: config.queryInputField,
                hashid: config.accountId,
                zone: "eu1",
                urlHash: false,
                display: {
                    lang: config.lang,
                    width: "100%",
                    closeIfEmpty: true,
                    facets: {
                        attached: "left"
                    }
                },
                callbacks: {
                    loaded: function () {
                        if (window.matchMedia("(max-width: " + config.breakpointMobile + "px)").matches &&
                            checkDf()) {
                            const dfMobileCloseButton = document.querySelector('.df-mobile button[data-role="close"]');

                            if (dfMobileCloseButton !== null) {
                                dfMobileCloseButton.addEventListener('click', function () {
                                    hideElement(dfSearchCloseIcon);
                                    showElement(dfSearchIcon, 'inline');
                                });
                            }
                        }
                    }
                },
                toggleInput: config.queryInputField
            }]);
        });

        dfSearchIcon.addEventListener('click', function (event) {
            event.preventDefault();
            if (window.matchMedia("(max-width: " + config.breakpointMobile + "px)").matches) {
                hideElement(this);
                showElement(dfSearchCloseIcon, 'inline');
            }
            dfSearchbox.click();
        });

        dfSearchCloseIcon.addEventListener('click', function (event) {
            event.preventDefault();
            if (window.matchMedia("(max-width: " + config.breakpointMobile + "px)").matches &&
                checkDf()) {
                hideElement(this);
                showElement(dfSearchIcon, 'inline');
                hideDoofinderPopup(window.dfFullscreenLayers[0]);
            }
        });
    };

    return Component.extend({
        initialize: function (config) {
            init(config);
        }
    });
});

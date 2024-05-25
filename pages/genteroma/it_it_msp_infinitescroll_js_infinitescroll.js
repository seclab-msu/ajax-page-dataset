/*
 * MageSpecialist
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to info@magespecialist.it so we can send you a copy immediately.
 *
 * @copyright  Copyright (c) 2018 Skeeller srl (http://www.magespecialist.it)
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

define([
    'jquery'
], function ($) {
    'use strict';

    let modeScroll = false,
        modeButton = false,
        loader,
        button,
        threshold,
        isLoading = false,
        allLoaded = false,
        lastPageNum;

    const getPathName = function () {
        return decodeURIComponent(window.location.pathname);
    };

    const getParams = function () {
        return decodeURIComponent(window.location.search.substring(1));
    };

    const getParamsArray = function () {
        return getParams().split('&');
    };

    const setUrlPage = function (p) {
        let sURLVariables = getParamsArray(),
            sParameterName,
            params = '',
            i,
            newUrl = getPathName();

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === 'p') {
                sParameterName[1] = p;
            }
            params += '&';
            params += sParameterName[0];

            if (sParameterName[1] != null) {
                params += "=";
                params += sParameterName[1];
            }
        }

        if( params.includes("&") && params.includes("p=")) {
            if (!params.includes(p)) {
                params += p;
            }
        }   else if (params.includes("&")) {
                params += "&" + "p=";
                params += p;
            }

        newUrl += '?' + params.substring(1);

        if (history.pushState) {
            window.history.pushState(null, null, newUrl);
        } else {
            document.location.href = newUrl;
        }

        return newUrl;
    };

    const getUrlParameter = function getUrlParameter(sParam) {
        let sURLVariables = getParamsArray(),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
        return null;
    };

    const loadPage = function (loader, p) {
        let newUrl = setUrlPage(p);
        isLoading = true;
        newUrl += "&ajax";

        return $.get({
            url: newUrl,
            cache: true
        }, function (data) {
            let products = $(data).find(".products.list.items.product-items .product-item");
            addProducts(products);

            $("body").trigger("infinite-scroll-loaded");
        });
    };

    const addProducts = function (products) {
        $(".products.list.items.product-items").append(products);
    };

    const replaceToolbars = function (toolbars) {
        let topToolbarNew = toolbars[0],
            bottomToolbarNew = toolbars[1],
            topToolbarOld = $(".toolbar.toolbar-products")[0],
            bottomToolbarOld = $(".toolbar.toolbar-products")[1];

        if (topToolbarNew && topToolbarOld) {
            topToolbarOld.replaceWith(topToolbarNew);
        }

        if (bottomToolbarNew && bottomToolbarOld) {
            bottomToolbarOld.replaceWith(bottomToolbarNew);
        }
    };

    const start = function (loaderElement, totalPageNumber) {
        loader = loaderElement;
        lastPageNum = totalPageNumber;

        $(window).on("scroll", function () {
            load(lastPageNum);
        });

        load(lastPageNum);

        $(button).click(function () {
            if (!modeButton) return;

            let currentPageNumber = getUrlParameter('p') ? parseInt(getUrlParameter('p')) : 1;

            $(button).hide();

            if (currentPageNumber < lastPageNum) {
                $(loader).show();
                loadPage(loader, currentPageNumber + 1).done(function () {
                    visiblityButtonAndLoader();
                });
            }
        });

        visiblityButtonAndLoader();
    };

    const load = function (lastPageNum) {
        if (!modeScroll || isLoading || allLoaded) return;

        let scrollHeight = $(document).height(),
            scrollPosition = $(window).height() + $(window).scrollTop();

        if ((scrollHeight - scrollPosition) < threshold) {
            let currentPageNumber = getUrlParameter('p') ? parseInt(getUrlParameter('p')) : 1;

            if (currentPageNumber < lastPageNum) {
                $(loader).show();
                loadPage(loader, currentPageNumber + 1).done(function () {
                    $(loader).hide();
                    isLoading = false;
                });
            } else {
                allLoaded = true;
            }
        }
    };

    const visiblityButtonAndLoader = function () {
        $(loader).hide();

        if (button) {
            $(button).hide();
        }

        if (modeButton) {
            let currentPageNumber = getUrlParameter('p') ? parseInt(getUrlParameter('p')) : 1

            if (currentPageNumber < lastPageNum) {
                $(button).show();
            }
        }
    };

    return {
        initButton: function (buttonElement) {
            modeButton = true;
            button = buttonElement;
            visiblityButtonAndLoader();
        },
        initScroll: function (thresholdValue) {
            modeScroll = true;
            threshold = thresholdValue;
            visiblityButtonAndLoader();
        },
        destroyButton: function () {
            modeButton = false;
            visiblityButtonAndLoader();
        },
        destroyScroll: function () {
            modeScroll = false;
            visiblityButtonAndLoader();
        },
        start: start
    };

});

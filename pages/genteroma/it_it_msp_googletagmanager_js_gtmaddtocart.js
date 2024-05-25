/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 *
 * TODO gtmAddTocart.js e gtmCustomerNewsletterSubscribe.js andrebbero riuniti
 */
define(['jquery', 'jsCookie', 'underscore'], function ($, jsCookie, _) {
    'use strict';

    return {
        dataLayer: undefined,

        /**
         * shouldPush
         * @returns {Boolean}
         */
        shouldPush: function () {
            return !!this.dataLayer;
        },

        /**
         * getDataLayer
         */
        getDataLayer: function () {
            return this.dataLayer;
        },

        /**
         * init
         */
        init: function () {
            var converter = jsCookie.withConverter({
                    read: function (value) {
                        return value
                        // Decode the plus sign to spaces first, otherwise "legit" encoded pluses
                        // will be replaced incorrectly
                        // VCT-105 - https://github.com/js-cookie/js-cookie/blob/master/SERVER_SIDE.md
                            .replace(/\+/g, ' ')
                            // Decode all characters according to the "encodeURIComponent" spec
                            .replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
                    }
                }),
                cookieData = converter.getJSON('msp_gtm_cart_add_product');

            if (cookieData !== undefined) {

                this.dataLayer = {
                    'event': 'addToCart',
                    'ecommerce': {
                        'currencyCode': cookieData.currencyCode,
                        'add': {
                            'products': _.map(cookieData.products, function (product) {
                                return product;
                            })
                        }
                    }
                };
                jsCookie.remove('msp_gtm_cart_add_product');
            }
        }
    };
});

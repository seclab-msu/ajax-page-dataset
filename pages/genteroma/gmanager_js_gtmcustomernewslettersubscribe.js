/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 *
 * TODO gtmAddTocart.js e gtmCustomerNewsletterSubscribe.js andrebbero riuniti
 */
define(['jquery', 'pusher', 'jsCookie'], function ($, pusher, jsCookie) {
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
            var dataLayer = jsCookie.getJSON(
                'msp_gtm_newsletter_subscribe_success'
            );

            if (dataLayer !== undefined) {
                this.dataLayer = dataLayer;
                jsCookie.remove('msp_gtm_newsletter_subscribe_success');
            }
        }
    };
});

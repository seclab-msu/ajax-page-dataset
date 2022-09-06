/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 */
define(['pusher'], function (pusher) {
    'use strict';

    return {
        /**
         * gtmListingImpressions
         * @param {Object} config
         */
        gtmListingImpressions: function (config) {
            if (
                config.hasOwnProperty('impressions') &&
                config.impressions.length > 0 &&
                config.hasOwnProperty('currencyCode') &&
                config.currencyCode.length > 0
            ) {
                pusher.push({
                    event: 'productImpressions',
                    ecommerce: {
                        currencyCode: config.currencyCode,
                        impressions: config.impressions
                    }
                });
            }
        }
    };
});

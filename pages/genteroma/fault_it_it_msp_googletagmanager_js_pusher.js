/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 */
define([], function () {
    'use strict';

    return {
        /**
         * execute
         * Add data to existing observable
         * @param {Function} observable
         * @param {Object} data
         */
        add: function (observable, data) {
            var currentDataLayer = observable();

            Object.keys(data).forEach(function (value) {
                currentDataLayer[value] = data[value];
            });

            observable(currentDataLayer);
        },

        /**
         * push
         * Push GTM datalayer
         * @param {Object} dataLayer
         */
        push: function (dataLayer) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(dataLayer);
        }
    };
});

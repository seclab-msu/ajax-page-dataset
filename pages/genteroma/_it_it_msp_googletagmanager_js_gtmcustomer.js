/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'ko',
    'Magento_Customer/js/customer-data',
    'pusher',
    'gtmCustomerNewsletterSubscribe',
    'gtmAddToCart',
    'gtmRemoveFromCart',
    'domReady!'
], function (
    $,
    ko,
    customerData,
    pusher,
    newsletter,
    addToCart,
    removeFromCart
) {
    'use strict';

    return {
        dataLayerObservable: ko.observable({
            event: 'DLmain'
        }),
        status: ko.observable(0),

        mobileBp: 520,
        tabletBp: 820,

        /**
         * Return Customer
         * @returns {Object}
         */
        getCustomer: function () {
            var customer = customerData.get('customer');

            return customer();
        },

        /**
         * isLoggedIn
         * @returns {Boolean}
         */
        isLoggedIn: function () {
            var customer = this.getCustomer();

            return customer && customer.firstname !== undefined;
        },

        /**
         * getLoggedStatusLabel
         * @returns {String}
         */
        getLoggedStatusLabel: function () {
            return this.isLoggedIn() ? 'logged' : 'not-logged';
        },

        /**
         * @returns {String}
         */
        getDeviceType: function () {
            var windowWidth =
                    window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth,
                deviceType = 'd';

            if (windowWidth <= this.mobileBp) {
                deviceType = 'm';
            } else if (windowWidth <= this.tabletBp) {
                deviceType = 't';
            }

            return deviceType;
        },

        /**
         * getGtmCustomer
         * @returns {Object}
         */
        getGtmCustomer: function () {
            var gtmCustomer = customerData.get('gtm-customer');

            return gtmCustomer();
        },

        /**
         * getGtmCustomerData
         * @returns {Object}
         */
        getGtmCustomerData: function () {
            var data = {},
                gtmCustomer = this.getGtmCustomer();

            Object.keys(gtmCustomer).forEach(function (value) {
                if (value !== 'data_id') {
                    data[value] = gtmCustomer[value];
                }
            });

            return data;
        },

        /**
         * gtmCustomer
         */
        gtmCustomer: function () {
            var me = this,
                gtmCustomerData;

            newsletter.init();
            addToCart.init();
            removeFromCart.init();

            this.dataLayerObservable.subscribe(function () {
                me.status(me.status() + 1);

                if (me.status() === 2) {
                    this.dispose();
                }
            });

            this.status.subscribe(function (value) {
                if (value === 2) {
                    pusher.add(me.dataLayerObservable, {
                        device: me.getDeviceType()
                    });
                    pusher.push(me.dataLayerObservable());

                    if (newsletter.shouldPush()) {
                        pusher.push(newsletter.getDataLayer());
                    }

                    if (addToCart.shouldPush()) {
                        pusher.push(addToCart.getDataLayer());
                    }

                    if (removeFromCart.shouldPush()) {
                        pusher.push(removeFromCart.getDataLayer());
                    }
                }
            });

            if (!this.isLoggedIn()) {
                customerData.reload(['customer'], true);

                customerData.get('customer').subscribe(function () {
                    pusher.add(me.dataLayerObservable, {
                        login: me.getLoggedStatusLabel()
                    });
                    this.dispose();
                });
            } else {
                pusher.add(this.dataLayerObservable, {
                    login: this.getLoggedStatusLabel()
                });
            }

            if (Object.keys(this.getGtmCustomerData()).length === 0) {
                customerData.reload(['gtm-customer'], true);

                customerData.get('gtm-customer').subscribe(function () {
                    gtmCustomerData = me.getGtmCustomerData();

                    pusher.add(me.dataLayerObservable, gtmCustomerData);

                    this.dispose();
                });
            } else {
                gtmCustomerData = this.getGtmCustomerData();

                pusher.add(me.dataLayerObservable, gtmCustomerData);
            }
        }
    };
});

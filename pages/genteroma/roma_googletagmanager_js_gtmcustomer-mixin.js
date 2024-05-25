/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Customer/js/customer-data',
    'pusher',
    'gtmCustomerNewsletterSubscribe',
    'gtmAddToCart',
    'gtmRemoveFromCart',
    'domReady!'
], function (
    $,
    wrapper,
    customerData,
    pusher,
    newsletter,
    addToCart,
    removeFromCart
) {
    'use strict';

    return function (gtmCustomer) {
        gtmCustomer.getCurrentWebsite = function () {
            const customer = gtmCustomer.getCustomer();
            return customer ? customer.website : '';
        };

        gtmCustomer.getCurrentCountry = function () {
            const customer = gtmCustomer.getCustomer();
            return customer ? customer.country : this.getCurrentWebsite();
        };

        gtmCustomer.gtmCustomer = wrapper.wrap(gtmCustomer.gtmCustomer, function () {
            let me = this,
                gtmCustomerData;

            newsletter.init();
            addToCart.init();
            removeFromCart.init();

            me.dataLayerObservable.subscribe(function () {
                me.status(me.status() + 1);

                if (me.status() === 2) {
                    this.dispose();
                }
            });

            me.status.subscribe(function (value) {
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

            if (!gtmCustomer.isLoggedIn()) {
                customerData.reload(['customer'], true);

                customerData.get('customer').subscribe(function () {
                    pusher.add(me.dataLayerObservable, {
                        login: me.getLoggedStatusLabel(),
                        website: me.getCurrentWebsite(),
                        country: me.getCurrentCountry()
                    });
                    this.dispose();
                });
            } else {
                pusher.add(me.dataLayerObservable, {
                    login: me.getLoggedStatusLabel(),
                    website: me.getCurrentWebsite(),
                    country: me.getCurrentCountry()
                });
            }

            if (Object.keys(me.getGtmCustomerData()).length === 0) {
                customerData.reload(['gtm-customer'], true);

                customerData.get('gtm-customer').subscribe(function () {
                    gtmCustomerData = me.getGtmCustomerData();

                    pusher.add(me.dataLayerObservable, gtmCustomerData);

                    this.dispose();
                });
            } else {
                gtmCustomerData = me.getGtmCustomerData();
                pusher.add(me.dataLayerObservable, gtmCustomerData);
            }
        });

        return gtmCustomer;
    };
});

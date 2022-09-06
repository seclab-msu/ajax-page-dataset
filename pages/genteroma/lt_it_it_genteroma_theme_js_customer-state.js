/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'uiComponent',
    'ko',
    'Magento_Customer/js/customer-data'
], function (Component, ko, customerData) {
    'use strict';

    const isCustomerLoggedIn = function () {
        return customerData.get('customer') &&
            customerData.get('customer')().hasOwnProperty('firstname');
    };

    return Component.extend({
        initialize: function () {
            this._super();
            var self = this;
            self.isLoggedIn(isCustomerLoggedIn());
            customerData.get('customer').subscribe(function () {
                self.isLoggedIn(isCustomerLoggedIn());
                self.customer = customerData.get('customer');
            });
        },

        defaults: {
            isLoggedIn: ko.observable(false),
            customer: customerData.get('customer')
        }
    });
});

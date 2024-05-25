/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'mage/validation',
    'mage/translate'
], function ($) {
    'use strict';

    return {
        /**
         * Validate customer creation clauses
         *
         * @returns {Boolean}
         */
        validate: function () {
            var isValid = true,
                clausesInputPath = '.newsletter-clauses div.privacy-clause input';

            $(clausesInputPath).each(function (index, element) {
                if (element.type === 'radio' && element.classList.contains('custom-validate-one-required-by-name')) {
                    var radioName = element.name.replace(/([\\"])/g, '\\$1'),
                        radioContainerJQ = $('#' + element.id).parents('div.clause-radio').parent(),
                        radioContainer = radioContainerJQ.get(0);

                    if (!radioContainer.querySelectorAll('input[name="' + radioName + '"]:checked').length) {
                        isValid = false;

                        // error label insert
                        radioContainerJQ.append($('<div>', {
                            'for': radioName,
                            'generated': 'true',
                            'class': 'mage-error',
                            'id': radioName + '-error'
                        }).html($.mage.__('Please select one of the options.')));
                    }
                } else if (element.type === 'checkbox' && element.classList.contains('required-entry')) {
                    var checkboxName = element.name.replace(/([\\"])/g, '\\$1'),
                        checkboxContainerJQ = $('#' + element.id).parents('div.privacy-clause'),
                        checkboxContainer = checkboxContainerJQ.get(0);

                    if (!checkboxContainer.querySelectorAll('input[name="' + checkboxName + '"]:checked').length) {
                        isValid = false;

                        // error label insert
                        checkboxContainerJQ.append($('<div>', {
                            'for': checkboxName,
                            'generated': 'true',
                            'class': 'mage-error',
                            'id': checkboxName + '-error'
                        }).html($.mage.__('Required field.')));
                    }
                }
            });

            return isValid;
        }
    };
});

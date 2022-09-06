/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'uiComponent',
    'jquery',
    'domReady!'
], function (Component, $, mediaCheck) {
    'use strict';

    return Component.extend({
        initialize: function(config, target) {
            this._super();

            let resizeEnd = '';

            const footerElementContentWrapper =  $('.' + config.elementSelector + ' .footer-element-collapsible__content'),
                footerElementTitleWrapper =  $('.' + config.elementSelector + ' .footer-element-collapsible__title-wrapper'),
                mobileWidth = config.mobileWidth;

            $(window).on('resize', function () {
                clearTimeout(resizeEnd);
                resizeEnd = setTimeout(function () {
                    $(window).trigger('resize-end');
                }, 100);
            });

            $(window).on('resize-end', function () {
                let ww = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;

                if (ww > mobileWidth) {
                    footerElementContentWrapper.show();
                } else {
                    footerElementContentWrapper.hide();
                }

                if (footerElementTitleWrapper.hasClass('opened')) {
                    footerElementTitleWrapper.removeClass('opened');
                }
            });

            footerElementTitleWrapper.click(function (event) {
                let ww = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;

                if (ww < mobileWidth) {
                    $(this).toggleClass('opened');
                    $(this).next().slideToggle('fast');
                }
            });
        }
    });
});

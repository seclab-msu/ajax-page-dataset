/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'matchMedia',
    'jqueryHoverInit'
], function ($, mediaCheck) {
    'use strict';

    return {
        mediaBreakpoint: '(max-width: 1200px)',
        hoverClass: 'hover-class',
        menuSelector: '.menu__submenu',
        topLevel: 'ul.gr-menu > .level0',
        firstLevel: 'ul.gr-menu .level1',
        secondLevel: 'ul.gr-menu .level1 > .submenu > .level2',
        responsiveBreakpoint: 1200,
        toggleSelector: '.action.nav-toggle, .js-close-menu-mobile',

        genteromaMenu: function () {
            let that = this;

            if ($.support.touch) document.body.classList.add('touch');

            $(window).ready(function () {
                that.menuDesktop();
                that.menuMobile();
            });
            mediaCheck({
                media: this.mediaBreakpoint,
                entry: $.proxy(function () {
                    this._toggleMobileMode();
                }, this),
                exit: $.proxy(function () {
                    this._toggleDesktopMode();
                }, this)
            });
        },

        /**
         * @private
         */
        _toggleMobileMode: function () {
            let that = this;
            that.reset();
        },

        /**
         * @private
         */
        _toggleDesktopMode: function () {
            let that = this;
            that.reset();
        },

        reset: function() {
            let that = this;
            $(that.menuSelector).removeAttr('style');
            $(that.topLevel).find('.menu__sub').removeAttr('style');
            $(that.topLevel).removeClass('opened').removeClass('has-opened-child');
            $(that.firstLevel).removeClass('opened');
        },

        menuMobile: function () {
            let that = this;

            $(that.toggleSelector).click(function () {
                let $html = $('html'),
                    ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                if (ww < that.responsiveBreakpoint) {
                    if ($html.hasClass('nav-open')) {
                        $html.removeClass('nav-open');
                        setTimeout(function () {
                            $html.removeClass('nav-before-open');
                        }, 300);
                    } else {
                        $html.addClass('nav-before-open');
                        setTimeout(function () {
                            $html.addClass('nav-open');
                        }, 50);
                    }
                }
            });

            $('.parent.level0 > a').click(function (event) {
                let me = $(this),
                    parentElement = me.parent(),
                    $topLevel = $(that.topLevel),
                    ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                if (ww >= that.responsiveBreakpoint) {
                    return true;
                }
                event.preventDefault();

                $topLevel.not(parentElement).removeClass('opened');
                $topLevel.not(parentElement).removeClass('has-opened-child');
                $topLevel.not(parentElement).find('.item__sub').hide();

                parentElement.toggleClass('opened');
                parentElement.removeClass('has-opened-child');
                parentElement.find('.menu__sub').toggle();
            });

            $('.level0.menu__item--designer > a').click(function (event) {
                let me = $(this),
                    parentElement = me.parent(),
                    $topLevel = $(that.topLevel),
                    ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                if (ww >= that.responsiveBreakpoint) {
                    /** Inibito il click al primo livello del Menu **/
                    event.preventDefault();
                    return true;
                }
                event.preventDefault();

                $topLevel.not(parentElement).removeClass('opened');
                $topLevel.not(parentElement).removeClass('has-opened-child');
                $topLevel.not(parentElement).find('.item__sub').hide();

                parentElement.toggleClass('opened');
                parentElement.removeClass('has-opened-child');
                parentElement.find('.menu__sub').toggle();
            });

            $('.parent.level1 > a').click(function (event) {
                let me = $(this),
                    parentElement = me.parent(),
                    $firstLevel = $(that.firstLevel),
                    ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                if (ww >= that.responsiveBreakpoint) {
                    return true;
                }
                event.preventDefault();

                if(parentElement.hasClass('opened')) {
                    parentElement.removeClass('opened');
                    parentElement.closest('.level0.opened').removeClass('has-opened-child');
                } else {
                    $firstLevel.not(parentElement).removeClass('opened');
                    // $firstLevel.not(parentElement).find('> .menu__sub').hide();

                    parentElement.toggleClass('opened');
                    parentElement.closest('.level0.opened').addClass('has-opened-child');
                }
            });
        },

        menuDesktop: function () {
            let that = this,
                windowWidth =
                    window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth,
                $topLevel = $(that.topLevel);

            /**
             * touch menu
             */
            if (
                document.body.classList.contains('touch') &&
                windowWidth >= that.responsiveBreakpoint
            ) {
                $topLevel.find('> a').click(function (event) {
                    let $parentLi = $(this).parent();
                    if ($parentLi.data('do-tap') !== '1') {
                        event.preventDefault();
                        $parentLi.data('do-tap', '1');
                    }
                });

            }

            $topLevel.hoverIntent({
                over: function () {
                    $(this).addClass(that.hoverClass);
                },
                out: function () {
                    $(this).removeClass(that.hoverClass);
                },
                timeout: 300
                });
        }
    }
});

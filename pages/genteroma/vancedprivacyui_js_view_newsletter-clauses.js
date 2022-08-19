/*
 * Copyright © MageSpecialist - Skeeller srl. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'ko',
    'jquery',
    'uiComponent',
    'MSP_AdvancedPrivacyUi/js/model/clauses-modal',
    'MSP_AdvancedPrivacyUi/js/model/newsletter-clause-validator'
], function (ko, $, Component, clausesModal, Validator) {
    'use strict';

    var clauseIsRequired = true,
        clauseHasInput = true,
        clauseModalType = 3,
        clauseTypeCheckbox = 2;

    return Component.extend({
        defaults: {
            template: 'MSP_AdvancedPrivacyUi/newsletter/newsletter-clauses'
        },
        initialize: function(config) {
            this._super();
            const clausesConfig = config.newsletterConfig;
            this.clauses = clausesConfig.clauses;
            this.isVisible = clausesConfig.isEnabled;

            if (this.isVisible) {
                $('.subscribe').on('submit', function () {
                    Validator.validate();
                });
            }
        },
        isVisible: true,
        clauses: {},
        modalTitle: ko.observable(null),
        modalContent: ko.observable(null),
        modalWindow: null,

        /**
         * Checks for clause type
         *
         * @param {Object} element
         */
        isCheckbox: function (element) {
            return element.inputType === clauseTypeCheckbox;
        },

        /**
         * Checks for modal using
         *
         * @param {Object} element
         */
        isModal: function (element) {
            return element.type === clauseModalType;
        },

        /**
         * Checks if clause required
         *
         * @param {Object} element
         */
        isClauseRequired: function (element) {
            return element.isRequired === clauseIsRequired;
        },

        /**
         * Checks if clause has input field
         *
         * @param {Object} element
         */
        hasClauseInput: function (element) {
            return element.hasInput === clauseHasInput;
        },

        /**
         * Show clause content in modal
         *
         * @param {Object} element
         */
        showContent: function (element) {
            this.modalTitle(element.inputText);
            this.modalContent(element.content);
            clausesModal.showModal();
        },

        /**
         * build a unique id for the term checkbox
         *
         * @param {Object} context - the ko context
         * @param {Number} clauseId
         */
        getCheckboxId: function (context, clauseId) {
            return 'clause_checkbox_' + clauseId;
        },

        /**
         * build a unique id for the term radio
         *
         * @param {Object} context - the ko context
         * @param {Number} clauseId
         * @param {String} value
         */
        getRadioId: function (context, clauseId, value) {
            return 'clause_radio_' + value + '_' + clauseId;
        },

        /**
         * Init modal window for rendered element
         *
         * @param {Object} element
         */
        initModal: function (element) {
            clausesModal.createModal(element);
        }
    });
});

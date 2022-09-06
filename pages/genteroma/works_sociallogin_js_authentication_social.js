define([
    'uiElement'
], function (Element) {
    'use strict';

    return Element.extend({
        defaults: {
            linksContent: ''
        },

        /**
         * Get links content
         * @returns {*}
         */
        getLinksContent: function() {
            return this.linksContent;
        }
    });
});

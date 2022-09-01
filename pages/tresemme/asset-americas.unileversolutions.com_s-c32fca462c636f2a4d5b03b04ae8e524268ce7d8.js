define(["formService"],function(){"use strict";var t=null;function e(){t=new IEA.formService}return _.extend(e.prototype,{defaultSettings:{address:"contact-streetAddress1",contactProvince:"contact-region",contactUsManufacturingCodeDetail:"contactUs-manufacturingCodeDetail",contactUsProdId:"#contactUs-upcCode",contactUsProduct:"contactUs-product",contactUsUpcCode:"contactUs-upcCodeDetail",expiryDate:"#contactUs-expiryDate",inquiryType:"#contactUs-inquiryType",locality:"contact-locality",manufacturingCode:"contactUs-manufacturingCode",manufacturingCodeDetail:"#contactUs-manufacturingCodeDetail",mfgCode:"#contactUs-manufacturingCode",postCode:"contact-postalCode",productConcern:'option[value="Product Concern"]',purchasedFrom:"#contactUs-storeNamePurchasedFrom",upcCode:"contactUs-upcCode",upcCodeDetail:"#contactUs-upcCodeDetail"},elementsHandlingEnquiryType:function(){var a=this;t.makeFieldMandatory(a.settings.upcCodeDetail,a.settings.upcCode,"Full"),t.makeFieldMandatory(a.settings.manufacturingCodeDetail,a.settings.manufacturingCode,"Full","Partial"),$(document).on("makeMandatoryEvent",function(t,e,n){a.requiredMethod(e,n),a.validator.addRules(a,{rules:a._createValidationRules()})}),a.getFormElement(a.settings.inquiryType).on("change",function(t){a._inquiryTypeChangeHandler(t)})},_inquiryTypeChangeHandler:function(t){var e=this,t=$(t.target),n=$('[name="locale"]').val()||this.getModelJSON().formV2.locale,a=$.isArray(n.match(/^.*?us$/i)),o=[e.getFormElement(e.settings.upcCodeDetail),e.getFormElement(e.settings.expiryDate),e.getFormElement(e.settings.manufacturingCodeDetail),e.getFormElement(e.settings.mfgCode),e.getFormElement(e.settings.purchasedFrom)];if(t.find(e.settings.productConcern).is(":selected")){for(var i=0;i<o.length;i++)o[i].closest(".component-wrapper").show();e._enquiryFieldMandatory(e.settings.contactUsProduct),e.requiredMethod(e.settings.contactUsProduct,!0),a&&(e._enquiryFieldMandatory([e.settings.contactUsUpcCode,e.settings.contactUsManufacturingCodeDetail]),e.requiredMethod(e.settings.contactUsUpcCode,!0),e.requiredMethod(e.settings.contactUsManufacturingCodeDetail,!0))}else this._removeMandatory([e.settings.contactUsProduct,e.settings.contactUsManufacturingCodeDetail,e.settings.contactUsUpcCode]);e._isCandianLocale(n)&&(t.find(e.settings.productConcern).is(":selected")?(e._enquiryFieldMandatory([e.settings.contactUsUpcCode,e.settings.contactUsManufacturingCodeDetail,e.settings.address,e.settings.locality,e.settings.postCode,e.settings.contactProvince]),e.requiredMethod([{attrName:e.settings.contactUsUpcCode,validateFlag:!0},{attrName:e.settings.contactUsManufacturingCodeDetail,validateFlag:!0},{attrName:e.settings.address,validateFlag:!0},{attrName:e.settings.locality,validateFlag:!0},{attrName:e.settings.postCode,validateFlag:!0},{attrName:e.settings.contactProvince,validateFlag:!0}])):this._removeMandatory([e.settings.contactUsUpcCode,e.settings.contactUsManufacturingCodeDetail]))},_isCandianLocale:function(t){return!!t.match(/^.*?ca$/i)},_enquiryFieldMandatory:function(t){var n=this;function a(t){var e=$('label[for="'+t+'"]');(e=0===e.length?((t=$("[name='"+t+"']")).parent().parent().find("label")?t.parent():t).parent().find("label"):e).find(".c-form-mandatory").length?e.find("."+n.settings.formMandatoryClass).show():e.append('<span class="'+n.settings.formMandatoryClass+'">*</span>')}$.isArray(t)?t.forEach(function(t,e){a(t)}):"string"==typeof t&&a(t)},getFormElement:function(t){var e=this.$form.find(t);return e=0===e.length?this.$form.find("[name='"+t.slice(1)+"']"):e}}),e});
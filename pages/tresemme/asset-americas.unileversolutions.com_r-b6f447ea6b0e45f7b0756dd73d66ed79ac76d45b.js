define(["commonService"],function(){"use strict";var o=null;function r(){o=new IEA.commonService}return _.extend(r.prototype,{_scrollToError:function(){var r=this.$el.find('[class*="-error"]:visible'),e=$(".global-navigation .o-navbar"),o=$(".c-secondary-nav"),s=0;r.length&&(e.length&&o.length?s=e.height()+o.height():e.length?s=e.height():o.length&&(s=o.height()),$("html, body").animate({scrollTop:r.offset().top-s},800),this._trackInputErrors())},_customErrorMessagehandler:function(r,e){var o=this,r=o.$form.find('[name$="'+r+'"]'),s=r.closest(o.settings.formGroup),e=e?r.attr(e):r.attr("data-error-message");r.length&&e&&(r.addClass("form-input-error").parent().find(o.settings.helpBlock).html(e).removeClass("hidden"),s.addClass(o.settings.formError))},_renderServerSideErrorMessages:function(r,e,o){o=$('<div class="form-error-msg text-danger default-text"><span class="glyphicon glyphicon-warning-sign "></span><span class="'+(o?o+"-":"")+'error-msg-text">'+r+"</span></div>"),r=e||this.$form;r.prevAll(this.settings.formErrorMsg).remove(),r.before(o),"community_register"!==this.compJson.formType&&"community_create_password"!==this.compJson.formType||this._scrollToError(),this.isSubmitted=!1},_renderServerSideErrorMessagesDesc:function(r){var e=this.$form;e.prevAll(this.settings.formErrorMsgDesc).remove(),r.thirdPartyErrorDesc&&(r=$('<div class="form-error-msg js-error-msg-desc text-danger default-text"><span class="error-heading">For Authors</span><div class="error-msg-desc"><span class="glyphicon glyphicon-warning-sign"></span><span class="error-msg-text">'+r.thirdPartyErrorDesc+"</span><ul>"+r.errorInfo+"</ul></div></div>"),e.before(r),this.isSubmitted=!1)},_loginPageErrors:function(r){var e,o,s=this.$form.find('[name*="Credentials-Password"]');403===r.status&&r.responseJSON&&(o=(r=r.responseJSON).ErrorCode,e=this.$form.find('button[type="submit"]'),o="InvalidInput"===o?s.data("form-invalidinput-msg"):"ItemNotFound"===o?s.data("form-itemnotfound-msg"):r.ErrorMessage,$(this.settings.formErrorClass).remove(),e.parents(this.settings.formGroup).addClass("has-error-block"),s=$("<span />").addClass("error-msg-text help-block-error").text(o),e.parent().prepend(s))},_redirectToErrorPage:function(){IEA.History.started?Router.navigate(this.form.errorRedirectURL,{trigger:!0}):window.location.href=this.form.errorRedirectURL},_couponErrorCode:function(r){for(var e,o,s=this.modelData.formElementsV2Config,a=0,a=0;a<s.length;a++)if(null!==s[a]&&void 0!==(e=s[a].formElementV2)&&"couponcode"===e.elementType){o=e.couponErrorCodes[r.code.toString()];break}this._renderServerSideErrorMessages(o,!1)},_handleErrorCodes:function(r){var e=this;1004<=r.code&&r.code<=1009?e._couponErrorCode(r):!$(e.settings.rewardComp).length||r.code!==e.errorCodes.productOutOfStock&&r.code!==e.errorCodes.productExpired&&r.code!==e.errorCodes.productUnAvailable&&r.code!==e.errorCodes.quantityNotAvailable?r.code===e.errorCodes.emailErrorCodeForm?e._customErrorMessagehandler("email"):r.code===e.errorCodes.inlineErrorValidationCode&&r.validationErrors&&e.modelData.dynamicConditionValidator?void 0!==e.errorCodes.validationErrors?e.inlineErrorValidation(e.errorCodes.validationErrors):e.inlineErrorValidation(r.validationErrors):r.code===e.errorCodes.utmErrorCode?window.location.href=e.modelData.errorPagePath:r.code===e.errorCodes.captchaErrorCode?e._genericErrorCodeHandler(r,!0):r.code===e.errorCodes.alreadySignedUpErrorMessage?(e._customErrorMessagehandler("email","data-already-signedup-err-msg"),e._renderServerSideErrorMessages(e.form.failureMessage,e.$form)):e._genericErrorCodeHandler(r,!1):e._rewardErrorHandler(r.responseData),e.modelData.isPreviewMode&&e._renderServerSideErrorMessagesDesc(r)},_genericErrorCodeHandler:function(s,a,t){var n,i=this;s.code?(n=[],a?_.each(s.errors,function(r){i.modelData.messages&&n.push(r.code)}):n.push(s.code),n&&(i.modelData.messages?_.each(i.modelData.messages,function(r,e){var o;-1!==$.inArray(parseInt(r.code),n)?(o=r.message,a?i._inlineErrorCodeMessages(o):(424===parseInt(r.code)&&(o=o.replace(/placeholderForPaymentTransactionId/gi,s.status)),i._renderServerSideErrorMessages(o,t))):i._renderServerSideErrorMessages(i.form.failureMessage,i.$form)}):_.each(s.errors,function(r,e){i._renderServerSideErrorMessages(r.error,t)}))):i._renderServerSideErrorMessages(i.form.failureMessage,i.$form)},_errorHandlerMethod:function(r){var e=this;o.dispatchEvent("cof:loader:hide",e),e.$form.find("button[type=submit]").prop("disabled",!1),void 0!==e.form.errorRedirectURL&&""!==e.form.errorRedirectURL&&!1!==e.form.errorRedirectURL?e._redirectToErrorPage():(!e.form.convertToInstantWin||"displayMessage"!==e.form.onSucessFullSubmission&&"redirectTo"!==e.form.onSucessFullSubmission)&&r?r.responseJSON&&r.responseJSON.validationErrors&&e.modelData.dynamicConditionValidator?e.inlineErrorValidation(r.responseJSON.validationErrors):"secure-frame-login"===window.name?e._loginPageErrors(r):e._handleErrorCodes(r):e._renderServerSideErrorMessages(e.form.failureMessage,e.$form),e._resetCaptcha(),e._scrollToError(),e.$form.find(".c-coupon-code").length&&e._trackRedeemCoupon(r),this.triggerMethod("error",e.form.failureMessage)}}),r});
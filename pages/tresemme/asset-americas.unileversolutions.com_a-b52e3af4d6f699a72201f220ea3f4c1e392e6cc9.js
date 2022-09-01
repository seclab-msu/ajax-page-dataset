define(["commonService"],function(){"use strict";var s=null;function a(){s=new IEA.commonService}return _.extend(a.prototype,{RECAPTCHA_SERVICE_URL:"//www.google.com/recaptcha/api.js",defaultSettings:{captchaField:".g-recaptcha",captchaText:"#entry",captchaTextbox:".c-form-captcha",cookielessCaptchaChallenge:"#challenge",ocaCaptchaImg:".ocaCaptchaImg",vaptchaField:"#vaptcha-response",vaptchaContainer:"#vaptchaContainer",audioCaptcha:".captcha-audio"},_loadCaptcha:function(){var a,e,t=$(".g-recaptcha");t&&(t=t.attr("data-sitekey"))&&(this._onloadCallbackReCaptcha(),a=document.getElementsByTagName("script")[0],(e=document.createElement("script")).type="text/javascript",e.async=!0,e.src=this.RECAPTCHA_SERVICE_URL+"?onload=onReCaptchaSuccess&render="+t,a.parentNode.insertBefore(e,a))},_onloadCallbackReCaptcha:function(){window.onReCaptchaSuccess=function(){var a=$(".g-recaptcha").attr("data-sitekey");a&&grecaptcha.execute(a,{action:$("body").data("pagename")}).then(function(a){document.getElementById("g-recaptcha-response").value=a})}},_reloadCaptcha:function(a){a&&a.preventDefault();var i=this,a=i.compJson&&i.compJson.formElementsV2Config?i.compJson.formElementsV2Config:i.flexiSignupFormFields;_.each(a,function(a,e){var t,n,c,o,s,a=a.formElementV2||a;a&&"nocookie-captcha"===a.name&&a.nocookieDomain&&(s=a.nocookieDomain,t=a.publicKey,n=a.challenge,o=s+"ocacaptcha.gif?temp=beaf49da-b680-4f3c-a748-768f1727365f&brand="+(a=a.serviceBrandName)+"&id="+t+"&challenge="+(c=n+(n=(new Date).getTime()))+"&timestamp="+n,s=s+"ocaaudiocaptcha.wav?temp=beaf49da-b680-4f3c-a748-768f1727365f&brand="+a+"&id="+t+"&challenge="+c+"&timestamp="+n,i.$form.find(i.settings.ocaCaptchaImg).attr("src",o),i._reloadAudioCaptcha(s),i.$form.find(i.settings.cookielessCaptchaChallenge).val(c))}),i.$form.find(i.settings.captchaText).val("")},_loadVaptcha:function(){var o=this,a=o.compJson.formElementsV2Config;_.each(a,function(a,e){var t=a.formElementV2,n={},c={};t&&"vaptcha"===t.name&&(n={token:"",challenge:""},$.getScript(t.captchaAPIJs).done(function(){c.servletUrl=t.captchaURL,c.isTypePost=!IEA.currentInstance.config.attributes.localEnv,c.onCompleteCallback=function(a){a=JSON.parse(a),a={vid:a.vid,challenge:a.challenge,container:o.$form.find(o.settings.vaptchaContainer),type:"float",https:!0,color:"#57ABFF",outage:t.captchaDowntimeURL,success:function(a,e){n.token=a,n.challenge=e,o.$form.find(o.settings.vaptchaField).val(n.challenge+"|"+n.token)},fail:function(){}};window.vaptcha(a,function(a){a.init()})},s.getDataAjaxMethod(c)}))})},_captchaHandler:function(){var a=this,e=a.$form.find(a.settings.captchaText),t=e.siblings(a.settings.helpBlock);return""===e.val()?(e.addClass(a.settings.formInputError),t.removeClass("hidden"),e.parents(".form-group").addClass("has-error"),a.compJson&&a.compJson.messages?_.each(a.compJson.messages,function(a){"40"===a.code&&t.text(a.message)}):_.each(a.flexiSignupFormFields,function(a,e){a&&"nocookie-captcha"===a.name&&a.nocookieDomain&&t.text(a.errorMsg).addClass("form-element-error")}),!1):(e.removeClass(a.settings.formInputError),t.addClass("hidden"),e.parents(".form-group").removeClass("has-error"),!0)},_resetCaptcha:function(){var a=this;if(a.$form.find(a.settings.captchaText).length)a._reloadCaptcha();else if(a.$form.find(a.settings.captchaField).length)try{"v3"===a.$form.find(a.settings.captchaField).attr("data-version")?a._loadCaptcha():grecaptcha.reset()}catch(a){throw new Error(a)}},_inlineErrorCodeMessages:function(a){var e=this,t=e.$form.find(e.settings.captchaText),t=t.length?t:e.$form.find(e.settings.captchaField),a=$("<span />").addClass("help-block").text(a),n=t.parents(e.settings.formGroup);n.find(e.settings.helpBlock).remove(),n.addClass([e.settings.formError,"has-error"]),t.after(a),t.focus()},_audioCaptcha:function(){var a=this.$el.find(this.settings.audioCaptcha);a.length&&a[0].play&&a[0].play()},_reloadAudioCaptcha:function(a){this.$el.find(this.settings.audioCaptcha).attr("src",a)}}),a});
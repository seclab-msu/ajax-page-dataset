define(["iea","validation"],function(e){"use strict";return e.module("form.validator",function(e,n){var i={AMERICAN_EXPRESS:{length:[15],prefix:["34","37"]},DINERS_CLUB:{length:[14],prefix:["300","301","302","303","304","305","36"]},DINERS_CLUB_US:{length:[16],prefix:["54","55"]},DISCOVER:{length:[16],prefix:["6011","622126","622127","622128","622129","62213","62214","62215","62216","62217","62218","62219","6222","6223","6224","6225","6226","6227","6228","62290","62291","622920","622921","622922","622923","622924","622925","644","645","646","647","648","649","65"]},JCB:{length:[16],prefix:["3528","3529","353","354","355","356","357","358"]},LASER:{length:[16,17,18,19],prefix:["6304","6706","6771","6709"]},MAESTRO:{length:[12,13,14,15,16,17,18,19],prefix:["5018","5020","5038","6304","6759","6761","6762","6763","6764","6765","6766"]},MASTERCARD:{length:[16],prefix:["51","52","53","54","55"]},SOLO:{length:[16,18,19],prefix:["6334","6767"]},UNIONPAY:{length:[16,17,18,19],prefix:["622126","622127","622128","622129","62213","62214","62215","62216","62217","62218","62219","6222","6223","6224","6225","6226","6227","6228","62290","62291","622920","622921","622922","622923","622924","622925"]},VISA:{length:[16],prefix:["4"]}};_.extend(this,Backbone.Validation),Backbone.Validation.configure({selector:"form-validate"}),Backbone.Validation.helpers={call:function(e,n){if("function"==typeof e)return e.apply(this,n);if("string"==typeof e){for(var t=(e="()"===e.substring(e.length-2)?e.substring(0,e.length-2):e).split("."),e=t.pop(),i=window,r=0;r<t.length;r++)i=i[t[r]];return void 0===i[e]?null:i[e].apply(this,n)}},format:function(e,n){for(var t in n=$.isArray(n)?n:[n])n.hasOwnProperty(t)&&(e=e.replace("%s",n[t]));return e},date:function(e,n,t,i){if(isNaN(e)||isNaN(n)||isNaN(t))return!1;if(2<t.length||2<n.length||4<e.length)return!1;if(t=parseInt(t,10),n=parseInt(n,10),(e=parseInt(e,10))<1e3||9999<e||n<=0||12<n)return!1;var r,a=[31,28,31,30,31,30,31,31,30,31,30,31];return(e%400==0||e%100!=0&&e%4==0)&&(a[1]=29),!(t<=0||t>a[n-1])&&(!0!==i||(i=(a=new Date).getFullYear(),r=a.getMonth(),a=a.getDate(),e<i||e===i&&n-1<r||e===i&&n-1===r&&t<a))},luhn:function(e){for(var n=e.length,t=0,i=[[0,1,2,3,4,5,6,7,8,9],[0,2,4,6,8,1,3,5,7,9]],r=0;n--;)r+=i[t][parseInt(e.charAt(n),10)],t^=1;return r%10==0&&0<r},mod11And10:function(e){for(var n=5,t=e.length,i=0;i<t;i++)n=(2*(n||10)%11+parseInt(e.charAt(i),10))%10;return 1===n},mod37And36:function(e,n){for(var t=(n=n||"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").length,i=e.length,r=Math.floor(t/2),a=0;a<i;a++)r=(2*(r||t)%(t+1)+n.indexOf(e.charAt(a)))%t;return 1===r}},_.extend(Backbone.Validation.callbacks,{valid:function(e,n){e=e.$("[name="+n+"]").closest(".form-group");0<e.children(".multivalue").length?((n=$("input[name="+n+"]").parents(".multivalue-field")).removeClass("has-error"),n.find(".help-block").html("").addClass("hidden")):(e.removeClass("has-error"),e.find(".help-block").html("").addClass("hidden"))},invalid:function(e,n,t){e=e.$("[name="+n+"]").closest(".form-group");0<e.children(".multivalue").length?((n=$("input[name="+n+"]").parents(".multivalue-field")).addClass("has-error"),n.find(".help-block").html(t).removeClass("hidden")):(e.addClass("has-error"),e.find(".help-block").html(t).removeClass("hidden"))}}),_.extend(Backbone.Validation.validators,{required:function(e,n,t,i,r){var a=$("[name="+n+"]:checkbox",i.$el),i=_.isFunction(t)?t.call(i,e,n,r):t;return!(!i&&!e)&&(!(!a.length||a.filter(":checked").length)||(!(!i||e)||void 0))},cvv:function(e){return""===e||(!Backbone.Validation.patterns.cvv.test(e)||void 0)},xss:function(e){if(Backbone.Validation.patterns.xss.test(e))return!0},creditcard:function(e){var n,t;if(""===e)return!0;if(/[^0-9-\s]+/.test(e))return!0;if(!Backbone.Validation.helpers.luhn(e))return!0;for(n in i)if(i.hasOwnProperty(n))for(t in i[n].prefix)if(e.substr(0,i[n].prefix[t].length)===i[n].prefix[t]&&-1!==$.inArray(e.length,i[n].length))return!1;return!0}}),_.extend(Backbone.Validation.patterns,{cvv:/^[0-9]{3,4}$/,xss:/<[^<]+?>/}),this.addRules=function(e,n){e=n.model||e.model;void 0!==e&&(void 0===e.validation?_.extend(e,{validation:n.rules}):_.extend(e.validation,n.rules))},this.addValidation=function(e,n){Backbone.Validation.bind(e,n)},this.removeValidation=function(e,n){Backbone.Validation.bind(e,n)}})});
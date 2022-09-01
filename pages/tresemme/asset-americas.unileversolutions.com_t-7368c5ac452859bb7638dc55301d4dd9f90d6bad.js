/* Version=6.58.2,Timestamp=2022-05-26T20:31:38.780Z */define("featured-content",["analytics","commonService","lazyLoadService"],function(){"use strict";return IEA.module("UI.featured-content",function(e,t,n){var i=null,a=null,o=!0,d=!0,r=null;_.extend(e,{defaultSettings:{videoWrapper:".js-video-player",videoHandler:".c-featured-content-item__video-icon",isVideoOpen:"is-video-player__open",videoButton:".js-btn-video",multipleVideoInstances:!1},events:{"click .js-player-handler":"triggerVideoPlay"},initialize:function(e){this._super(e),this.triggerMethod("init"),i=new IEA.commonService,r=new IEA.LazyLoad},render:function(){return this.$el.html(this.template(this.getModelJSON())),!1===this._isEnabled&&(this.enable(),this._isEnabled=!0),this.triggerMethod("render"),this},enable:function(){this.triggerMethod("beforEnable");var e=this,t=e.defaultSettings;e.componentJson=e.getModelJSON().featuredContent,e.videoHandler=e.$el.find(t.videoHandler),!e.componentJson.videoControls.autoplay||"video"!==e.componentJson.subContentType.toLowerCase()||e.$el.find(t.videoWrapper).data("video-display-overlay")||e.$el.find(t.videoWrapper).data("no-cookie-experience")||(t=e.$el.find(".c-featured-content"),r.lazyLoadFeature(t,function(){e.triggerVideoPlay()})),this._spotlightDataHandler(),e.componentJson.teaserCopy||i.dispatchEvent("contentLoaded",e),this.triggerMethod("enable")},_spotlightDataHandler:function(){var e,t,n=this.getModelJSON().featuredContent,i=new Date;""!==n.startDate&&(e=new Date(n.startDate)),""!==n.endDate&&(t=new Date(n.endDate)),void 0!==e&&void 0!==t&&e<=i&&i<=t||void 0!==t&&void 0===e&&i<=t||void 0!==e&&void 0===t&&e<=i||void 0===e&&void 0===t?this.$el.find(".c-featured-content").html():this.$el.find(".c-featured-content").empty()},_ctComponentInfo:function(){(a=new IEA.Analytics).trackComponentInfo(this.$el.find("[data-componentname]"),digitalData)},_playerStateChange:function(e,t,n){n={player:this.$el.find("#"+n),data:t.data,analyticsstatus:o,videoPlayer:e};t&&"undefined"!=typeof digitalData&&"undefined"!=typeof ctConstants&&(this._ctComponentInfo(),(1===t.data&&o||0===t.data&&d)&&(a._ctTag(n,function(){o=!1}),0===t.data&&(d=!1))),this.triggerMethod("playerStateChange")},_vimeoPlayerStateChange:function(e,t){this._playerStateChange(e,t,e.attr("id"))},_progressTrack:function(e,t,n,i){var a={};this._ctComponentInfo(),a.eventInfo={type:ctConstants.trackEvent,eventAction:ctConstants.videoProgress,eventLabel:e+" - "+t+" - "+n+" - progressed "+i,eventValue:1},a.attributes={nonInteractive:{nonInteraction:1}},a.category={primaryCategory:ctConstants.engagement},a.subcategory="Read",digitalData.event.push(a)},triggerVideoPlay:function(){var e,t=this;t.videoInitialized||require(["videoPlayerServiceV2"],function(){e={selector:t.defaultSettings.videoHandler,videoWrapper:t.defaultSettings.videoWrapper,view:t,previewImage:".js-preview-image",multipleVideoInstances:t.defaultSettings.multipleVideoInstances},t.videoInitialized=!0,(new IEA.videoPlayerServiceV2).initVideoPlayer(e)})}})})});
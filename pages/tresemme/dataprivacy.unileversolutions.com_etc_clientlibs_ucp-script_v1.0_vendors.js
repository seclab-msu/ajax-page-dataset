
    (function (id) {
        function append(scriptid, url, async) {
            var d = document, sn = 'script', f = d.getElementsByTagName(sn)[0];
            if (!f) f = d.head;
            var s = d.createElement(sn);
            s.async = async;
            s.id = scriptid;
            s.src = url;
            s.charset = 'utf-8';
            f.parentNode.insertBefore(s, f);
        }

        function is2parttld(value) {
            var tldindicators = ['co', 'com', 'info', 'web', 'info', 'gov', 'edu', 'biz', 'net', 'org'];
            var countryindicators = ['uk', 'us', 'fr', 'es', 'de', 'at', 'au', 'ae', 'be', 'br', 'ca', 'ch', 'cn', 'co', 'cz', 'dk', 'eg', 'eu', 'fi', 'gb', 'gr', 'hk', 'hr', 'hu', 'ie', 'in', 'jp', 'mx', 'nl', 'no', 'nz', 'pl', 'ro', 'ru', 'se'];
            return (tldindicators.indexOf(value) !== -1 || countryindicators.indexOf(value) !== -1);
        }

        function getRootDomain() {
            var parts = window.location.hostname.split('.');
            if (parts.length === 2) rootDomain = parts[0];
            else if (parts.length > 2) {
                // see if the next to last value is a common tld
                var part = parts[parts.length - 2];
                if (is2parttld(part)) {
                    rootDomain = parts[parts.length - 3]; // go back one more
                }
                else {
                    rootDomain = part;
                }
            }

            return rootDomain;
        }

        window.evidon = {};
        window.evidon.id = id;
        window.evidon.test = false;  // set to true for non-production testing.
        //window.evidon.userid = '';

        var cdn = '//c.evidon.com/', rootDomain = getRootDomain(), noticecdn = cdn + 'sitenotice/';
        append('evidon-notice', noticecdn + 'evidon-sitenotice-tag.js', false);
        append('evidon-location', cdn + 'geo/country.js', true);
        append('evidon-themes', noticecdn + id + '/snthemes.js', true);
        if (rootDomain) append('evidon-settings', noticecdn + id + '/' + rootDomain + (window.evidon.test ? '/test' : '') + '/settings.js', true);

        window.evidon.priorConsentCallback = function (categories, vendors, cookies) {
            // add the tags which need to wait for prior consent
            // here.  This should be all your advertising tags and
            // probably most of your social and tracking tags.
            var handlers = {
                categories: {},
                vendors: {
                    '33across': 'handle33Across',
                    'addthis': 'handleAddThis',
                    'adform': 'handleAdform',
                    'adobe': 'handleAdobe',
                    'adobe-creative-cloud-typekit': 'handleAdobeCreativeCloud',
                    'adobe-marketing-cloud-analytics': 'handleAdobeExperienceCloudAnalytics',
                    'adobe-marketing-cloud-audience-manager': 'handleAdobeExperienceCloudAudienceManager',
                    'adobe-marketing-cloud-target': 'handleAdobeExperienceCloudTarget',
                    'akamai-technologies': 'handleAkamaiTechnologies',
                    'amazon-associates': 'handleAmazonAssociates',
                    'amazon-web-services': 'handleAmazonWebServices',
                    'amobee': 'handleAmobee',
                    'aol-advertising': 'handleAOLAdvertising',
                    'appnexus': 'handleAppNexus',
                    'apture': 'handleAptureGoogle',
                    'bazaarvoice': 'handleBazaarvoice',
                    'bombora': 'handleBombora',
                    'brightcove': 'handleBrightcove',
                    'cdnjs': 'handleCDNJS',
                    'decibel-insight': 'handleDecibelInsight',
                    'dotomi': 'handleDotomi',
                    'doubleclick': 'handleDoubleClick',
                    'doubleclick-bid-manager-formerly-invite-media': 'handleDoubleClickBidManagerformerlyInviteMedia',
                    'dstillery-formerly-media6degrees': 'handleDstilleryformerlyMedia6Degrees',
                    'Epsilon-Conversant': 'handleEpsilonConversant',
                    'evidon': 'handleEvidon',
                    'exelate': 'handleeXelate',
                    'eyeota': 'handleEyeota',
                    'facebook': 'handleFacebook',
                    'facebook-custom-audience': 'handleFacebookBusinessformerlyFacebookCustomAudience',
                    'facebook-connect': 'handleFacebookforDevelopersformerlyFacebookConnect',
                    'freewheel': 'handleFreeWheel',
                    'full-circle-studies': 'handleFullCircleStudies',
                    'gigya': 'handleGigya',
                    'google-ad-services': 'handleGoogleAdServices',
                    'google-adsense': 'handleGoogleAdSense',
                    'google-adwords': 'handleGoogleAdWords',
                    'google-analytics': 'handleGoogleAnalytics',
                    'googlefonts': 'handleGoogleFonts',
                    'google': 'handleGoogleInc',
                    'google-maps': 'handleGoogleMaps',
                    'google-tag-manager': 'handleGoogleTagManager',
                    'casale-media': 'handleIndexExchangeFormerlyCasaleMedia',
                    'iponweb': 'handleIPONWEB',
                    'jquery': 'handlejQuery',
                    'liveramp': 'handleLiveRamp',
                    'lotame': 'handleLotame',
                    'media-innovation-group': 'handleMediaInnovationGroup',
                    'medianet': 'handlemedianet',
                    'microsoft-advertising': 'handleMicrosoftAdvertising',
                    'aggregate-knowledge': 'handleNeustarMarketingFormerlyPlatformOne',
                    'new-relic': 'handleNewRelic',
                    'olapic': 'handleOlapic',
                    'optanon-cookie-law': 'handleOneTrust',
                    'openx': 'handleOpenX',
                    'bluekai': 'handleOracleDataCloud',
                    'pinterest': 'handlePinterest',
                    'placed': 'handlePlaced',
                    'price-spider': 'handlePriceSpider',
                    'pubmatic': 'handlePubMatic',
                    'pulsepoint-ad-exchange': 'handlePulsepointAdExchange',
                    'rubicon-project': 'handleRubiconProject',
                    'rythmone': 'handleRythmOne',
                    'salesforce': 'handleSalesforce',
                    'krux-digital': 'handleSalesforceDMPFormerlyKruxDigital',
                    'semasio': 'handleSemasio',
                    'sharethrough': 'handleSharethrough',
                    'simplifi': 'handleSimplifi',
                    'sizmek-formerly-mediamind': 'handleSizmek',
                    'snap-inc': 'handleSnapInc',
                    'spotxchange': 'handleSpotXchange',
                    'survata': 'handleSurvata',
                    'taboola': 'handleTaboola',
                    'tapad': 'handleTapad',
                    'the-trade-desk': 'handleTheTradeDesk',
                    'tremor-video': 'handleTremorVideo',
                    'triplelift': 'handleTripleLift',
                    'turnto-networks': 'handleTurnToNetworks',
                    'twitter': 'handleTwitter',
                    'unilever': 'handleUnilever',
                    'unileverfoodsolutions': 'handleUnileverFoodSolutions',
                    'unruly-media': 'handleUnruly',
                    'visualiq': 'handleVisualIQ',
                    'yahoo': 'handleYahoo',
                    'youtube': 'handleYouTube',
                    'zeotap': 'handleZeoTap',
                }
            };

            for (var category in categories) {
                if (!categories[category]) continue;
                var handler = window.evidon[handlers.categories[category]];
                if (typeof handler === 'function') handler();
            }
            for (var vendor in vendors) {
                if (!vendors[vendor]) continue;
                var handler = window.evidon[handlers.vendors[vendor]];
                if (typeof handler === 'function') handler();
            }
        }

        window.evidon.closeCallback = function () {
            // this is executed if the user closed a UI element without either Accepting (providing consent)
            // or Declining (declining to provide consent).
        }

        window.evidon.consentWithdrawnCallback = function () {
            // this is exeucted if the user withdraws consent and elects to
            // no longer allow technologies to run on the site.
        }

        window.evidon.consentDeclinedCallback = function () {
            // this is executed if the user explicitly declines giving consent by
            // using a Decline button
        }
    })(2523);

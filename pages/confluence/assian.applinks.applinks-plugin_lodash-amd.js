WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:lodash-amd', location = 'applinks/internal/lib/lodash-amd-global.js' */
define('applinks/lib/lodash', function() {
        if (!window._) {
            throw "lodash not found";
        }
        return window._;
    });
}catch(e){WRMCB(e)};
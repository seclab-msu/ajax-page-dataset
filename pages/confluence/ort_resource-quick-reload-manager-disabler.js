WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'com.k15t.scroll.scroll-viewport:resource-quick-reload-manager-disabler', location = '/com/k15t/scroll/viewport/render/quick-reload-manager-disabler.js' */
require('confluence/module-exporter').safeRequire('confluence-quick-reload/main/quick-reload-manager', function(QuickReloadManager) {
    QuickReloadManager.enable = function() {
        console.log('Enabling of QuickReloadManager requested. Don\'t enable QuickReloadManager to prevent in-page notifications');
    };
    QuickReloadManager.update = function() {
        console.log('Quick reload update requested. Update is disabled to prevent in-page notifications.');
    };
});
}catch(e){WRMCB(e)};
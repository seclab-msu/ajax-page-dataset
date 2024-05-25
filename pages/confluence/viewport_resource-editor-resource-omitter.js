WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'com.k15t.scroll.scroll-viewport:resource-editor-resource-omitter', location = '/com/k15t/scroll/viewport/render/editor-resources-omitter.js' */
require('confluence/module-exporter').safeRequire('confluence-editor-loader/editor-loader', function (loader) {
    if (document.querySelectorAll('meta[name="ajs-vprt-preserve-editor-loader"]').length === 0) {
        loader.load = function() {
            console.log('Editor web resources requested. Omitting request for performance reasons.');
        };
    }
});

}catch(e){WRMCB(e)};
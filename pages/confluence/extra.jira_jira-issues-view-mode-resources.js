WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'confluence.extra.jira:jira-issues-view-mode-resources', location = 'jira/jira-issues-view-mode/main.js' */
require(["ajs","jquery"],function(a,d){var c=function(){var b=d(".wiki-content [data-jira-key][data-client-id]");if(0==b.length)return!1;WRM.require("wr!confluence.extra.jira:jira-issues-view-mode-async-resource",function(){require(["confluence/jim/jira/jira-issues-view-mode/lazy-loading","confluence/jim/jira/jira-issues-view-mode/fix-ui"],function(e,f){e.init(b).done(function(){f.fixBreakIconInOldConf()})})})};a.toInit(c);a.bind("ic-jim-async-supported",c)});
}catch(e){WRMCB(e)};
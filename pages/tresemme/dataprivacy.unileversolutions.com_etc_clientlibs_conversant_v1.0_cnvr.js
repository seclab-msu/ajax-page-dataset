"use strict";(function(){var a={comId:80143,msgCampId:2306,tid:2317};var b=function(c){if(c){var d=c.ResponseType;if(d==="Decision"){conversantCallBack(c.culid)}else{console.warn("No Profile exist at conversant")}}};CNVR.fetchUserDecision(a,b)})();
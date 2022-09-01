define(function(){"use strict";IEA.service("Listing",function(e,t,a){function i(){return this}var o=null;return _.extend(i.prototype,{initialize:function(){return o=new IEA.commonService,this},handleLoadMore:function(e,t){var a=e,i=a.defaultSettings,e=function(e){var t=$(window).scrollTop()+$(window).height();a.$el.offset().top+a.$el.height()+a.$el.find(i.loadmoreBtn).height()<=t&&2<=a.pageNum&&a.pageScroll&&(a.pageScroll=!1,a.$el.find(i.loadmoreBtn).click())};t?document.addEventListener("scroll",_.throttle(e,1e3,{trailing:!0,leading:!0})):document.addEventListener("scroll",e)},getUrlParameter:function(e){for(var t,a=window.location.search.substr(1).split("&"),i="",r=0;r<a.length;r++)(t=a[r].split("="))[0]===e&&(i=t[1]);return i},setFilterQueryParams:function(e,s){var t,d=e,f=this,e="",p="",g="",a="",i="",c=d.isRecipes?d.componentJson.recipeConfig:d.componentJson,u=1,m=!1,r=window.location.search,n=d.filterId+"="+f.getUrlParameter(d.filterId),h=f.getUrlParameter(d.filterId).split(d.urlSeprator);return d.defaultSettings.filtertags&&$(d.defaultSettings.filtertags).html(""),d.$el.find(d.defaultSettings.filterWrapper).each(function(e,t){if($(this).parents(d.defaultSettings.filterContainer).is(":visible")||$(this).parents(d.defaultSettings.sortWrapper).is(":visible")){var a=$(this),i=a.data("filter-type"),r=a.data("filter-option"),n="",l="",o=1<u?d.urlSeprator:"";switch(i){case"dropdown":n=f.getDropdownFilterValue(a,!0),l=f.getDropdownFilterValue(a,!1);break;case"radioButton":case"checkBox":n=a.is(":checked")?a.val():"",l=a.data("label");break;case"triStateButtonGroup":n=a.is(":checked")?r+"~"+a.val():"",l=a.data("filter-heading")+": "+a.data("label");break;case"multiValueButtonGroup":n=f.getMultiValueFilterValues(a,c),l=a.data("filter-heading")+": "+a.data("label");break;case"rangeFinder":n=f.getRangeFilterValues(a,c,!0),l=f.getRangeFilterValues(a,c,!1)+" "+a.data("label")}l=n.trim()?l.trim():"",""!==(n=!1===d.pushHistory&&l!==decodeURIComponent(h[u-1])?"":n)?a.data("filter-action")&&"sort"===a.data("filter-action")?"history"!==s&&(g+=c.sortConfig.sortParams.sortingCategory+"="+n+"&"):(m=!0,void 0!==s&&"history"===s?p+=o+l:g+=f.filterParamNameHandler(c,i)+"="+n+"&"):void 0!==s&&"history"===s&&"sort"!==a.data("filter-action")&&(p+="dropdown"===i?o+l:o+(l="")),d.isRecipes&&!a.data("filter-action")&&d._renderFilterTags(a,n,l),u++}}),d.isRecipes?(a=c.sortConfig.sortParams.pageIndex+"="+d.pageNum+"&",t=c.filterConfig.pageNoParamName+"="+c.pagination.itemsPerPage+"&",i=c.sortConfig.sortParams.pageSize+"="+c.pagination.itemsPerPage):t=c.filterConfig.pageNoParamName+"="+d.pageNum,"history"===s?(p=m?p:"",e+=r=-1<r.indexOf(n)?r.replace(n,d.filterId+"="+encodeURIComponent(p)):r?r+"&"+d.filterId+"="+encodeURIComponent(p):m?"?"+d.filterId+"="+encodeURIComponent(p):""):e+="?"+g+t+a+i,e},setRecipeMigrationFilterQueryParams:function(e){var l=this,o={};return e.$el.find(e.defaultSettings.filterWrapper).each(function(e,t){var a=$(this),i=a.data("filter-type"),r=a.data("filter-option"),n="";switch(i){case"dropdown":n=l.getDropdownFilterValue(a,!0);break;case"radioButton":n=a.is(":checked")?a.val():"";break;case"checkBox":n=l.getCheckBoxFilterValue(a)}""!==n&&(o[r]=n)}),o},setRecipeFilterQueryParams:function(e,s){var t,d=e,f=this,e="",p="",g="",a="",i="",r="",c=d.isRecipes?d.componentJson.recipeConfig:d.componentJson,u=1,m=!1,n=window.location.search,l=d.filterId+"="+f.getUrlParameter(d.filterId),h=f.getUrlParameter(d.filterId).split(d.urlSeprator);return d.defaultSettings.filtertags&&"history"!==s&&$(d.defaultSettings.filtertags).html(""),d.$el.find(d.defaultSettings.filterWrapper).each(function(e,t){var a=$(this),i=a.data("filter-type"),r=a.data("filter-option"),n="",l="",o=1<u?d.urlSeprator:"";switch(i){case"dropdown":n=f.getDropdownFilterValue(a,!0),l=f.getDropdownFilterValue(a,!1);break;case"radioButton":case"checkBox":n=a.is(":checked")?a.val():"",l=a.data("label");break;case"triStateButtonGroup":n=a.is(":checked")?r+"~"+a.val():"",l=a.data("filter-heading")+": "+a.data("label");break;case"multiValueButtonGroup":n=f.getMultiValueFilterValues(a,c),l=a.data("filter-heading")+": "+a.data("label");break;case"rangeFinder":n=f.getRangeFilterValues(a,c,!0),l=f.getRangeFilterValues(a,c,!1)+" "+a.data("label")}l=n.trim()?l.trim():"",""!==(n=!1===d.pushHistory&&l!==decodeURIComponent(h[u-1])?"":n)?a.data("filter-action")&&"sort"===a.data("filter-action")?"history"!==s&&(g+=c.sortConfig.sortParams.sortingCategory+"="+n+"&",d.sortElmVal=n):(m=!0,void 0!==s&&"history"===s?p+=o+e+"-"+l:g+=f.filterParamNameHandler(c,i)+"="+n+"&"):void 0!==s&&"history"===s&&"sort"!==a.data("filter-action")&&(p+="dropdown"===i?o+l:l=""),!d.isRecipes||a.data("filter-action")||d.componentJson.isMigrationEnabled||d._renderFilterTags(a,n,l),u++}),d.isRecipes&&!d.componentJson.isMigrationEnabled?(a=c.sortConfig.sortParams.pageIndex+"="+d.pageNum+"&",t=c.filterConfig.pageNoParamName+"="+c.pagination.itemsPerPage+"&",i=c.sortConfig.sortParams.pageSize+"="+c.pagination.itemsPerPage,""!==d.sortElmVal&&(r=c.sortConfig.sortParams.sortingCategory+"="+d.sortElmVal+"&")):t=c.filterConfig.pageNoParamName+"="+d.pageNum,"history"===s?(p=m?p:"",e+=n=-1<n.indexOf(l)?n.replace(l,d.filterId+"="+encodeURIComponent(p)):n?n+"&"+d.filterId+"="+encodeURIComponent(p):m?"?"+d.filterId+"="+encodeURIComponent(p):""):e+="?"+r+g+t+a+i,e},validateTriggerPoint:function(e,t,a){for(var i=e=e>=a.length?a.length-1:e;0<=i;i--){var r=$(a[i]),n=decodeURIComponent(t[i]).toLowerCase(),l=r[0].tagName.toLowerCase();if(1<=n.indexOf("-")&&(n=n.substr(n.indexOf("-")+1,n.length)),"select"===l){if(r.find("option").filter(function(){return o.trimString($(this).text()).toLowerCase()===n}).length)return i}else{l=o.trimString(r.parents("label").text()).toLowerCase();if(n===l)return i}}},filterParamNameHandler:function(e,t){var a;switch(t){case"multiValueButtonGroup":a=e.filterConfig.kiloCalFilterParam;break;case"rangeFinder":a=e.filterConfig.cookingTimeFilterParam;break;case"triStateButtonGroup":a=e.filterConfig.dietaryFilterParam;break;default:a=e.filterConfig.filterParamName}return a},getDropdownFilterValue:function(e,t){var a,i=e.data("filter-option"),r=e.find("option:selected").val(),n=e.find("option:selected").text(),e=e.data("filter-heading"),i="p_serves"!==i&&"p_makes"!==i||!r?(a=o.trimString(r),o.trimString(n)):(a=i+"~"+o.trimString(r),e+": "+o.trimString(n));return t?a:i},getRangeFilterValues:function(e,t,a){var i="",r="",n=e.data("slider-min"),l=e.data("slider-max"),o=e.data("filter-option"),s=e.data("filter-heading"),e=e.slider("getValue");return!e.length||e[0]===n&&e[1]===l||(i=o+"~"+e[0]+"&"+t.filterConfig.cookingTimeFilterParam+"="+o+"~"+e[1],r=s+": "+e[0]+"-"+e[1]),a?i:r},getMultiValueFilterValues:function(e,t){var a="",i=e.data("filter-option");return a=e.is(":checked")?i+"~"+(e=e.val().split("~"))[0]+"&"+t.filterConfig.kiloCalFilterParam+"="+i+"~"+e[1]:a},filtersHandler:function(e,t){var e=$(e.currentTarget),a="is-default-val";t.$el.find(t.defaultSettings.filterBlock).addClass(a),e.hasClass("active-dropdown")&&(t.activeState=!1),t.activeState||(""!==e.val()?(e.parents(t.defaultSettings.filterContainer).find(t.defaultSettings.filterBlock).removeClass(a),e.addClass("active-dropdown"),t.selectedFiltersIndex=t.$el.find(t.defaultSettings.filterBlock+"."+a).data("index")):(e.removeClass("active-dropdown"),t.activeState=!1)),t.pageNum=t.defaultSettings.startPageNum,t.isPageLoad=!0,$(t.preloaderContent).removeClass("hidden").show(),t._populateData()},updateFilters:function(e,t){var a=e.defaultSettings,i=e.getTemplate("listing-v2-filters",a.filterTemplate),r=t.filterConfig.filterOptions[e.selectedFiltersIndex],n=a.filterBlock+'[data-index="'+e.selectedFiltersIndex+'"]',a=a.filterContainer;r&&(r.index=e.selectedFiltersIndex),e.activeState||(r&&$(r.filters).length?e.$el.find(n).html(i(r)).parents(a).show():e.$el.find(n).parents(a).hide(),e.activeState=e.$el.find(e.defaultSettings.filterBlock+".is-default-val").length!==t.filterConfig.filterOptions.length)},animateResults:function(e,t,a,i){"show"===i?($(e).animate({opacity:1,top:0},800),$(t).fadeOut(a)):($(e).animate({opacity:1,top:"30px"},800),$(t).fadeIn(a))},pagination:function(e,t,a){var i=t,t=i.data("role"),r="o-btn--disabled",n=a.$el.find(e+'[data-role="first"]'),l=a.$el.find(e+'[data-role="last"]'),o=a.$el.find(e+'[data-role="next"]'),s=a.$el.find(e+'[data-role="prev"]'),d=a.isRecipes?a.componentJson.recipeConfig:a.componentJson,f=a.defaultSettings.pageNavCount;switch(a.$el.find(e).removeClass("o-btn--active"),t){case"first":a.pageNum=parseInt(i.data("pagenum")),a.startIndex=a.pageNum;break;case"last":case"navigation":a.pageNum=parseInt(i.data("pagenum")),a.startIndex=d.pagination.itemsPerPage*(a.pageNum-1)+1;break;case"next":a.pageNum++,a.startIndex=a.startIndex+d.pagination.itemsPerPage;break;case"prev":a.pageNum--,a.startIndex=a.startIndex-d.pagination.itemsPerPage}a.pageNum===parseInt(l.data("pagenum"))?(o.addClass(r),l.addClass(r),n.removeClass(r),s.removeClass(r)):(a.pageNum===parseInt(n.data("pagenum"))?(n.addClass(r),s.addClass(r)):(n.removeClass(r),s.removeClass(r)),o.removeClass(r),l.removeClass(r)),a.$el.find(e+"[data-pagenum="+a.pageNum+"]").addClass("o-btn--active"),this.updateNavCount(a,t,f)},generatePagination:function(e,t,a,i){var r,n=t,l=n.getTemplate("pagination",n.defaultSettings.paginationTemplate),o=i.itemsPerPage,s=Math.ceil(e/o),d=[],f=t.defaultSettings.pageNavCount,p="hidden";if(o&&s){for(var g=0;g<s;g++)d.push(g);r={componentJson:n.componentJson,pageNum:n.pageNum||n.defaultSettings.pageNum,totalPages:s,paginate:d},n._updateParamsOnPageScroll(e),a&&"pagination"===i.paginationType&&$(n.pagination).html(l(r)),o<e?($(n.pagination).removeClass(p),$(n.loadmoreWrapper).removeClass(p),1===n.pageNum&&n.$el.find(n.defaultSettings.loadmoreBtn).fadeIn()):($(n.pagination).addClass(p),$(n.loadmoreWrapper).addClass(p)),a&&f&&this.setNavCount(n.pagination,f,t)}},setNavCount:function(e,t,a){a=a.$el.find(".js-pagination-numbers");$(a.addClass("hidden").splice(0,t)).removeClass("hidden")},updateNavCount:function(e,t,a){var i,r=e.$el.find(".js-pagination-numbers"),n=e.pageNum;switch(t){case"first":$(r.addClass("hidden").splice(0,a)).removeClass("hidden");break;case"last":r.addClass("hidden"),$(_.last(r,a)).removeClass("hidden");break;case"next":$(r[n]).add($(r[n-1])).removeClass("hidden"),(i=$(r).filter(":visible")).length>a&&i.first().addClass("hidden");break;case"prev":$(r[n-2]).add($(r[n-1])).removeClass("hidden"),(i=$(r).filter(":visible")).length>a&&i.last().addClass("hidden");break;case"navigation":$(r[n-1]).removeClass("hidden"),$(r[n]).hasClass("hidden")?($(r[n]).removeClass("hidden"),(i=$(r).filter(":visible")).length>a&&i.first().addClass("hidden")):$(r[n-1]).prev().hasClass("hidden")&&($(r[n-1]).prev().removeClass("hidden"),(i=$(r).filter(":visible")).length>a&&i.last().addClass("hidden"))}},_filtersViewHandler:function(e){var t=!!o.isMobile(),a=$(e.filtersCollapsibleWrapper).find(e.defaultSettings.filterContainer);t&&($(e.showHideFilterCl).show(),$(e.showHideFilterOptionsCl).hide(),$(e.filterBlockWrapper).addClass(e.defaultSettings.filterCollapsedCl),$(a).removeClass(e.defaultSettings.filtersCollapsedCl))},_toggleFilterOptions:function(e,t){var a=t.data("collapsed-state"),i=a?e.componentJson.filterConfig.hideFilterOptionsLabel:e.componentJson.filterConfig.showFilterOptionsLabel;$(e.filterBlockWrapper).toggle(),t.html(i),t.data("collapsed-state",!a)},_filterApplyHandler:function(e){e.activeState=!0,e.pageNum=e.defaultSettings.startPageNum,e.isPageLoad=!0,$(e.preloaderContent).removeClass(e.hiddenClass).show(),e._populateData()},_filterClearHandler:function(e){$(e.filterBlock).find("select").prop("selectedIndex",0),$(e.filterBlock).find("input").prop("checked",!1),e._populateData()},_filterShowHideMoreHandler:function(e,t){var a=t.data("collapsed-state"),i=a?e.componentJson.filterConfig.showLessFiltersLabel:e.componentJson.filterConfig.showMoreFiltersLabel;t.parent(e.defaultSettings.filterBlockWrapper).find(e.defaultSettings.filtersCollapsedWrapper).toggle(),t.html(i),t.data("collapsed-state",!a)},getCheckBoxFilterValue:function(e){var e=e.parents(".o-filter-checkbox").children().find(".c-listing-filter__filter"),a=[];return e.each(function(e,t){$(this).is(":checked")&&a.push($(this).val())}),a=a.join("|")}}),i})});
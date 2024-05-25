/** @preserve jQuery.floatThead 2.2.0 - https://mkoryak.github.io/floatThead/ - Copyright (c) 2012 - 2019 Misha Koryak **/
// @license MIT

/* @author Misha Koryak
 * @projectDescription position:fixed on steroids. Lock a table header in place while scrolling.
 *
 * Dependencies:
 * jquery 1.9.0 + [required] OR jquery 1.7.0 + jquery UI core
 *
 * https://mkoryak.github.io/floatThead/
 *
 * Tested on FF13+, Chrome 21+, IE8, IE9, IE10, IE11
 */
(function( $ ) {
  /**
   * provides a default config object. You can modify this after including this script if you want to change the init defaults
   * @type {!Object}
   */
  $.floatThead = $.floatThead || {};
  $.floatThead.defaults = {
    headerCellSelector: 'tr:visible:first>*:visible', //thead cells are this.
    zIndex: 1001, //zindex of the floating thead (actually a container div)
    position: 'auto', // 'fixed', 'absolute', 'auto'. auto picks the best for your table scrolling type.
    top: 0, //String or function($table) - offset from top of window where the header should not pass above
    bottom: 0, //String or function($table) - offset from the bottom of the table where the header should stop scrolling
    scrollContainer: function($table) { // or boolean 'true' (use offsetParent) | function -> if the table has horizontal scroll bars then this is the container that has overflow:auto and causes those scroll bars
      return $([]);
    },
    responsiveContainer: function($table) { // only valid if scrollContainer is not used (ie window scrolling). this is the container which will control y scrolling at some mobile breakpoints
      return $([]);
    },
    getSizingRow: function($table, $cols, $fthCells){ // this is only called when using IE,
      // override it if the first row of the table is going to contain colgroups (any cell spans greater than one col)
      // it should return a jquery object containing a wrapped set of table cells comprising a row that contains no col spans and is visible
      return $table.find('tbody tr:visible:first>*:visible');
    },
    ariaLabel: function($table, $headerCell, columnIndex) { // This function will run for every header cell that exists in the table when we add aria-labels. 
      // Override to customize the aria-label. NOTE: These labels will be added to the 'sizer cells' which get added to the real table and are not visible by the user (only screen readers), 
      // The number of sizer columns might not match the header columns in your real table - I insert one sizer header cell per column. This means that if your table uses colspans or multiple header rows,
      // this will not be reflected by sizer cells. This is why I am giving you the `columnIndex`.
      return $headerCell.text();
    },
    floatTableClass: 'floatThead-table',
    floatWrapperClass: 'floatThead-wrapper',
    floatContainerClass: 'floatThead-container',
    copyTableClass: true, //copy 'class' attribute from table into the floated table so that the styles match.
    autoReflow: false, //(undocumented) - use MutationObserver api to reflow automatically when internal table DOM changes
    debug: false, //print possible issues (that don't prevent script loading) to console, if console exists.
    support: { //should we bind events that expect these frameworks to be present and/or check for them?
      bootstrap: true,
      datatables: true,
      jqueryUI: true,
      perfectScrollbar: true
    },
    floatContainerCss: {"overflow-x": "hidden"} // undocumented - css applied to the floatContainer
  };

  var util = (function underscoreShim(){
    var that = {};
    var hasOwnProperty = Object.prototype.hasOwnProperty, isThings = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'];
    that.has = function(obj, key) {
      return hasOwnProperty.call(obj, key);
    };
    that.keys = Object.keys || function(obj) {
      if (obj !== Object(obj)) throw new TypeError('Invalid object');
      var keys = [];
      for (var key in obj) if (that.has(obj, key)) keys.push(key);
      return keys;
    };
    var idCounter = 0;
    that.uniqueId = function(prefix) {
      var id = ++idCounter + '';
      return prefix ? prefix + id : id;
    };
    $.each(isThings, function(){
      var name = this;
      that['is' + name] = function(obj) {
        return Object.prototype.toString.call(obj) === '[object ' + name + ']';
      };
    });
    that.debounce = function(func, wait, immediate) {
      var timeout, args, context, timestamp, result;
      return function() {
        context = this;
        args = arguments;
        timestamp = new Date();
        var later = function() {
          var last = (new Date()) - timestamp;
          if (last < wait) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        if (!timeout) {
          timeout = setTimeout(later, wait);
        }
        if (callNow) result = func.apply(context, args);
        return result;
      };
    };
    return that;
  })();

  var canObserveMutations = typeof MutationObserver !== 'undefined';


  //browser stuff
  var ieVersion = function(){for(var a=3,b=document.createElement("b"),c=b.all||[];a = 1+a,b.innerHTML="<!--[if gt IE "+ a +"]><i><![endif]-->",c[0];);return 4<a?a:document.documentMode}();
  var isFF = /Gecko\//.test(navigator.userAgent);
  var isWebkit = /WebKit\//.test(navigator.userAgent);
  var isRTL = /rtl/i.test(document.documentElement.dir || '');

  if(!(ieVersion || isFF || isWebkit)){
    ieVersion = 11; //yey a hack!
  }

  //safari 7 (and perhaps others) reports table width to be parent container's width if max-width is set on table. see: https://github.com/mkoryak/floatThead/issues/108
  var isTableWidthBug = function(){
    if(isWebkit) {
      var $test = $('<div>').css('width', 0).append(
          $('<table>').css('max-width', '100%').append(
              $('<tr>').append(
                  $('<th>').append(
                      $('<div>').css('min-width', 100).text('X')
                  )
              )
          )
      );
      $("body").append($test);
      var ret = ($test.find("table").width() === 0);
      $test.remove();
      return ret;
    }
    return false;
  };

  var createElements = !isFF && !ieVersion; //FF can read width from <col> elements, but webkit cannot

  var $window = $(window);

  var buggyMatchMedia = isFF && window.matchMedia; // TODO remove when fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=774398

  if(!window.matchMedia || buggyMatchMedia) {
    var _beforePrint = window.onbeforeprint;
    var _afterPrint = window.onafterprint;
    window.onbeforeprint = function () {
      _beforePrint && _beforePrint();
      $window.triggerHandler("fth-beforeprint");
    };
    window.onafterprint = function () {
      _afterPrint && _afterPrint();
      $window.triggerHandler("fth-afterprint");
    };
  }

  /**
   * @param eventName
   * @param cb
   */
  function windowResize(eventName, cb){
    if(ieVersion === 8){ //ie8 is crap: https://github.com/mkoryak/floatThead/issues/65
      var winWidth = $window.width();
      var debouncedCb = util.debounce(function(){
        var winWidthNew = $window.width();
        if(winWidth !== winWidthNew){
          winWidth = winWidthNew;
          cb();
        }
      }, 1);
      $window.on(eventName, debouncedCb);
    } else {
      $window.on(eventName, util.debounce(cb, 1));
    }
  }

  function getClosestScrollContainer($elem) {
    var elem = $elem[0];
    var parent = elem.parentElement;

    do {
      var pos = window
          .getComputedStyle(parent)
          .getPropertyValue('overflow');

      if (pos !== 'visible') break;

    } while (parent = parent.parentElement);

    if(parent === document.body){
      return $([]);
    }
    return $(parent);
  }


  function debug(str){
    window && window.console && window.console.error && window.console.error("jQuery.floatThead: " + str);
  }

  //returns fractional pixel widths
  function getOffsetWidth(el) {
    var rect = el.getBoundingClientRect();
    return rect.width || rect.right - rect.left;
  }

  /**
   * try to calculate the scrollbar width for your browser/os
   * @return {Number}
   */
  function scrollbarWidth() {
    var d = document.createElement("scrolltester");
    d.style.cssText = 'width:100px;height:100px;overflow:scroll!important;position:absolute;top:-9999px;display:block';
    document.body.appendChild(d);
    var result = d.offsetWidth - d.clientWidth;
    document.body.removeChild(d);
    return result;
  }

  /**
   * Check if a given table has been datatableized (https://datatables.net)
   * @param $table
   * @return {Boolean}
   */
  function isDatatable($table){
    if($table.dataTableSettings){
      for(var i = 0; i < $table.dataTableSettings.length; i++){
        var table = $table.dataTableSettings[i].nTable;
        if($table[0] === table){
          return true;
        }
      }
    }
    return false;
  }

  function tableWidth($table, $fthCells, isOuter){
    // see: https://github.com/mkoryak/floatThead/issues/108
    var fn = isOuter ? "outerWidth": "width";
    if(isTableWidthBug && $table.css("max-width")){
      var w = 0;
      if(isOuter) {
        w += parseInt($table.css("borderLeft"), 10);
        w += parseInt($table.css("borderRight"), 10);
      }
      for(var i=0; i < $fthCells.length; i++){
        w += getOffsetWidth($fthCells.get(i));
      }
      return w;
    } else {
      return $table[fn]();
    }
  }
  $.fn.floatThead = function(map){
    map = map || {};

    if(ieVersion < 8){
      return this; //no more crappy browser support.
    }

    var mObs = null; //mutation observer lives in here if we can use it / make it

    if(util.isFunction(isTableWidthBug)) {
      isTableWidthBug = isTableWidthBug();
    }

    if(util.isString(map)){
      var command = map;
      var args = Array.prototype.slice.call(arguments, 1);
      var ret = this;
      this.filter('table').each(function(){
        var $this = $(this);
        var opts = $this.data('floatThead-lazy');
        if(opts){
          $this.floatThead(opts);
        }
        var obj = $this.data('floatThead-attached');
        if(obj && util.isFunction(obj[command])){
          var r = obj[command].apply(this, args);
          if(r !== undefined){
            ret = r;
          }
        }
      });
      return ret;
    }
    var opts = $.extend({}, $.floatThead.defaults || {}, map);

    $.each(map, function(key, val){
      if((!(key in $.floatThead.defaults)) && opts.debug){
        debug("Used ["+key+"] key to init plugin, but that param is not an option for the plugin. Valid options are: "+ (util.keys($.floatThead.defaults)).join(', '));
      }
    });
    if(opts.debug){
      var v = $.fn.jquery.split(".");
      if(parseInt(v[0], 10) === 1 && parseInt(v[1], 10) <= 7){
        debug("jQuery version "+$.fn.jquery+" detected! This plugin supports 1.8 or better, or 1.7.x with jQuery UI 1.8.24 -> http://jqueryui.com/resources/download/jquery-ui-1.8.24.zip")
      }
    }

    this.filter(':not(.'+opts.floatTableClass+')').each(function(){
      var floatTheadId = util.uniqueId();
      var $table = $(this);
      if($table.data('floatThead-attached')){
        return true; //continue the each loop
      }
      if(!$table.is('table')){
        throw new Error('jQuery.floatThead must be run on a table element. ex: $("table").floatThead();');
      }
      canObserveMutations = opts.autoReflow && canObserveMutations; //option defaults to false!
      var $header = $table.children('thead:first');
      var $tbody = $table.children('tbody:first');
      if($header.length === 0 || $tbody.length === 0){
        if(opts.debug) {
          if($header.length === 0){
            debug('The thead element is missing.');
          } else{
            debug('The tbody element is missing.');
          }
        }
        $table.data('floatThead-lazy', opts);
        $table.unbind("reflow").one('reflow', function(){
          $table.floatThead(opts);
        });
        return;
      }
      if($table.data('floatThead-lazy')){
        $table.unbind("reflow");
      }
      $table.data('floatThead-lazy', false);

      var headerFloated = true;
      var scrollingTop, scrollingBottom;
      var scrollbarOffset = {vertical: 0, horizontal: 0};
      if(util.isFunction(scrollbarWidth)) {
        scrollbarWidth = scrollbarWidth();
      }

      var lastColumnCount = 0; //used by columnNum()

      if(opts.scrollContainer === true){
        opts.scrollContainer = getClosestScrollContainer;
      }

      var $scrollContainer = opts.scrollContainer($table) || $([]); //guard against returned nulls
      var locked = $scrollContainer.length > 0;
      var $responsiveContainer = locked ? $([]) : opts.responsiveContainer($table) || $([]);
      var responsive = isResponsiveContainerActive();

      var useAbsolutePositioning = null;



      if (opts.position === 'auto') {
        useAbsolutePositioning = null;
      } else if (opts.position === 'fixed') {
        useAbsolutePositioning = false;
      } else if (opts.position === 'absolute'){
        useAbsolutePositioning = true;
      } else if (opts.debug) {
        debug('Invalid value given to "position" option, valid is "fixed", "absolute" and "auto". You passed: ', opts.position);
      }

      if(useAbsolutePositioning == null){ //defaults: locked=true, !locked=false
        useAbsolutePositioning = locked;
      }
      var $caption = $table.find("caption");
      var haveCaption = $caption.length === 1;
      if(haveCaption){
        var captionAlignTop = ($caption.css("caption-side") || $caption.attr("align") || "top") === "top";
      }

      var $fthGrp = $('<fthfoot>').css({
        'display': 'table-footer-group',
        'border-spacing': 0,
        'height': 0,
        'border-collapse': 'collapse',
        'visibility': 'hidden'
      });

      var wrappedContainer = false; //used with absolute positioning enabled. did we need to wrap the scrollContainer/table with a relative div?
      var $wrapper = $([]); //used when absolute positioning enabled - wraps the table and the float container
      var absoluteToFixedOnScroll = ieVersion <= 9 && !locked && useAbsolutePositioning; //on IE using absolute positioning doesn't look good with window scrolling, so we change position to fixed on scroll, and then change it back to absolute when done.
      var $floatTable = $("<table/>");
      var $floatColGroup = $("<colgroup/>");
      var $tableColGroup = $table.children('colgroup:first');
      var existingColGroup = true;
      if($tableColGroup.length === 0){
        $tableColGroup = $("<colgroup/>");
        existingColGroup = false;
      }
      var colSelector = existingColGroup ? "col:visible" : "col";
      var $fthRow = $('<fthtr>').css({ //created unstyled elements (used for sizing the table because chrome can't read <col> width)
        'display': 'table-row',
        'border-spacing': 0,
        'height': 0,
        'border-collapse': 'collapse'
      });
      var $floatContainer = $('<div>').css(opts.floatContainerCss).attr('aria-hidden', 'true');
      var floatTableHidden = false; //this happens when the table is hidden and we do magic when making it visible
      var $newHeader = $("<thead/>");
      var $sizerRow = $('<tr class="size-row"/>');
      var $sizerCells = $([]);
      var $tableCells = $([]); //used for sizing - either $sizerCells or $tableColGroup cols. $tableColGroup cols are only created in chrome for borderCollapse:collapse because of a chrome bug.
      var $headerCells = $([]);
      var $fthCells = $([]); //created elements

      $newHeader.append($sizerRow);
      $table.prepend($tableColGroup);
      if(createElements){
        $fthGrp.append($fthRow);
        $table.append($fthGrp);
      }

      $floatTable.append($floatColGroup);
      $floatContainer.append($floatTable);
      if(opts.copyTableClass){
        $floatTable.attr('class', $table.attr('class'));
      }
      $floatTable.attr({ //copy over some deprecated table attributes that people still like to use. Good thing people don't use colgroups...
        'cellpadding': $table.attr('cellpadding'),
        'cellspacing': $table.attr('cellspacing'),
        'border': $table.attr('border')
      });
      var tableDisplayCss = $table.css('display');
      $floatTable.css({
        'borderCollapse': $table.css('borderCollapse'),
        'border': $table.css('border'),
        'display': tableDisplayCss
      });
      if(!locked){
        $floatTable.css('width', 'auto');
      }
      if(tableDisplayCss === 'none'){
        floatTableHidden = true;
      }

      $floatTable.addClass(opts.floatTableClass).css({'margin': 0, 'border-bottom-width': 0}); //must have no margins or you won't be able to click on things under floating table

      if(useAbsolutePositioning){
        var makeRelative = function($container, alwaysWrap){
          var positionCss = $container.css('position');
          var relativeToScrollContainer = (positionCss === "relative" || positionCss === "absolute");
          var $containerWrap = $container;
          if(!relativeToScrollContainer || alwaysWrap){
            var css = {"paddingLeft": $container.css('paddingLeft'), "paddingRight": $container.css('paddingRight')};
            $floatContainer.css(css);
            $containerWrap = $container.data('floatThead-containerWrap') || $container.wrap(
                $('<div>').addClass(opts.floatWrapperClass).css({
                  'position': 'relative',
                  'clear': 'both'
                })
            ).parent();
            $container.data('floatThead-containerWrap', $containerWrap); //multiple tables inside one scrolling container - #242
            wrappedContainer = true;
          }
          return $containerWrap;
        };
        if(locked){
          $wrapper = makeRelative($scrollContainer, true);
          $wrapper.prepend($floatContainer);
        } else {
          $wrapper = makeRelative($table);
          $table.before($floatContainer);
        }
      } else {
        $table.before($floatContainer);
      }


      $floatContainer.css({
        position: useAbsolutePositioning ? 'absolute' : 'fixed',
        marginTop: 0,
        top:  useAbsolutePositioning ? 0 : 'auto',
        zIndex: opts.zIndex,
        willChange: 'transform'
      });
      $floatContainer.addClass(opts.floatContainerClass);
      updateScrollingOffsets();

      var layoutFixed = {'table-layout': 'fixed'};
      var layoutAuto = {'table-layout': $table.css('tableLayout') || 'auto'};
      var originalTableWidth = $table[0].style.width || ""; //setting this to auto is bad: #70
      var originalTableMinWidth = $table.css('minWidth') || "";

      function eventName(name){
        return name+'.fth-'+floatTheadId+'.floatTHead'
      }

      function setHeaderHeight(){
        var headerHeight = 0;
        $header.children("tr:visible").each(function(){
          headerHeight += $(this).outerHeight(true);
        });
        if($table.css('border-collapse') === 'collapse') {
          var tableBorderTopHeight = parseInt($table.css('border-top-width'), 10);
          var cellBorderTopHeight = parseInt($table.find("thead tr:first").find(">*:first").css('border-top-width'), 10);
          if(tableBorderTopHeight > cellBorderTopHeight) {
            headerHeight -= (tableBorderTopHeight / 2); //id love to see some docs where this magic recipe is found..
          }
        }
        $sizerRow.outerHeight(headerHeight);
        $sizerCells.outerHeight(headerHeight);
      }


      function setFloatWidth(){
        var tw = tableWidth($table, $fthCells, true);
        var $container = responsive ? $responsiveContainer : $scrollContainer;
        var width = $container.length ? getOffsetWidth($container[0]) : tw;
        var floatContainerWidth = $container.css("overflow-y") !== 'hidden' ? width - scrollbarOffset.vertical : width;
        $floatContainer.width(floatContainerWidth);
        if(locked){
          var percent = 100 * tw / (floatContainerWidth);
          $floatTable.css('width', percent+'%');
        } else {
          $floatTable.css('width', tw+'px');
        }
      }

      function updateScrollingOffsets(){
        scrollingTop = (util.isFunction(opts.top) ? opts.top($table) : opts.top) || 0;
        scrollingBottom = (util.isFunction(opts.bottom) ? opts.bottom($table) : opts.bottom) || 0;
      }

      /**
       * get the number of columns and also rebuild resizer rows if the count is different than the last count
       */
      function columnNum(){
        var count;
        var $headerColumns = $header.find(opts.headerCellSelector);
        if(existingColGroup){
          count = $tableColGroup.find(colSelector).length;
        } else {
          count = 0;
          $headerColumns.each(function () {
            count += parseInt(($(this).attr('colspan') || 1), 10);
          });
        }
        if(count !== lastColumnCount){
          lastColumnCount = count;
          var cells = [], cols = [], psuedo = [];
          $sizerRow.empty();
          for(var x = 0; x < count; x++){
            var cell = document.createElement('th');
            cell.setAttribute('aria-label', opts.ariaLabel($table, $headerColumns.eq(x), x));
            cell.className = 'floatThead-col';
            $sizerRow[0].appendChild(cell);
            cols.push('<col/>');
            psuedo.push(
                $('<fthtd>').css({
                  'display': 'table-cell',
                  'height': 0,
                  'width': 'auto'
                })
            );
          }

          if(existingColGroup){
            cols = $tableColGroup.html();
          } else {
            cols = cols.join('');
          }
  
          if(createElements){
            $fthRow.empty();
            $fthRow.append(psuedo);
            $fthCells = $fthRow.find('fthtd');
          }
          
          $sizerCells = $sizerRow.find("th");
          if(!existingColGroup){
            $tableColGroup.html(cols);
          }
          $tableCells = $tableColGroup.find(colSelector);
          $floatColGroup.html(cols);
          $headerCells = $floatColGroup.find(colSelector);

        }
        return count;
      }

      function refloat(){ //make the thing float
        if(!headerFloated){
          headerFloated = true;
          if(useAbsolutePositioning){ //#53, #56
            var tw = tableWidth($table, $fthCells, true);
            var wrapperWidth = $wrapper.width();
            if(tw > wrapperWidth){
              $table.css('minWidth', tw);
            }
          }
          $table.css(layoutFixed);
          $floatTable.css(layoutFixed);
          $floatTable.append($header); //append because colgroup must go first in chrome
          $tbody.before($newHeader);
          setHeaderHeight();
        }
      }
      function unfloat(){ //put the header back into the table
        if(headerFloated){
          headerFloated = false;
          if(useAbsolutePositioning){ //#53, #56
            $table.width(originalTableWidth);
          }
          $newHeader.detach();
          $table.prepend($header);
          $table.css(layoutAuto);
          $floatTable.css(layoutAuto);
          $table.css('minWidth', originalTableMinWidth); //this looks weird, but it's not a bug. Think about it!!
          $table.css('minWidth', tableWidth($table, $fthCells)); //#121
        }
      }
      var isHeaderFloatingLogical = false; //for the purpose of this event, the header is/isnt floating, even though the element
                                           //might be in some other state. this is what the header looks like to the user
      function triggerFloatEvent(isFloating){
        if(isHeaderFloatingLogical !== isFloating){
          isHeaderFloatingLogical = isFloating;
          $table.triggerHandler("floatThead", [isFloating, $floatContainer])
        }
      }
      function changePositioning(isAbsolute){
        if(useAbsolutePositioning !== isAbsolute){
          useAbsolutePositioning = isAbsolute;
          $floatContainer.css({
            position: useAbsolutePositioning ? 'absolute' : 'fixed'
          });
        }
      }
      function getSizingRow($table, $cols, $fthCells, ieVersion){
        if(createElements){
          return $fthCells;
        } else if(ieVersion) {
          return opts.getSizingRow($table, $cols, $fthCells);
        } else {
          return $cols;
        }
      }

      /**
       * returns a function that updates the floating header's cell widths.
       * @return {Function}
       */
      function reflow(){
        var i;
        var numCols = columnNum(); //if the tables columns changed dynamically since last time (datatables), rebuild the sizer rows and get a new count

        return function(){
          //Cache the current scrollLeft value so that it can be reset post reflow
          var scrollLeft = $floatContainer.scrollLeft();
          $tableCells = $tableColGroup.find(colSelector);
          var $rowCells = getSizingRow($table, $tableCells, $fthCells, ieVersion);

          if($rowCells.length === numCols && numCols > 0){
            if(!existingColGroup){
              for(i=0; i < numCols; i++){
                $tableCells.eq(i).css('width', '');
              }
            }
            unfloat();
            var widths = [];
            for(i=0; i < numCols; i++){
              widths[i] = getOffsetWidth($rowCells.get(i));
            }
            for(i=0; i < numCols; i++){
              $headerCells.eq(i).width(widths[i]);
              $tableCells.eq(i).width(widths[i]);
            }
            refloat();
          } else {
            $floatTable.append($header);
            $table.css(layoutAuto);
            $floatTable.css(layoutAuto);
            setHeaderHeight();
          }
          //Set back the current scrollLeft value on floatContainer
          $floatContainer.scrollLeft(scrollLeft);
          $table.triggerHandler("reflowed", [$floatContainer]);
        };
      }

      function floatContainerBorderWidth(side){
        var border = $scrollContainer.css("border-"+side+"-width");
        var w = 0;
        if (border && ~border.indexOf('px')) {
          w = parseInt(border, 10);
        }
        return w;
      }

      function isResponsiveContainerActive(){
        return $responsiveContainer.css("overflow-x") === 'auto';
      }
      /**
       * first performs initial calculations that we expect to not change when the table, window, or scrolling container are scrolled.
       * returns a function that calculates the floating container's top and left coords. takes into account if we are using page scrolling or inner scrolling
       * @return {Function}
       */
      function calculateFloatContainerPosFn(){
        var scrollingContainerTop = $scrollContainer.scrollTop();

        //this floatEnd calc was moved out of the returned function because we assume the table height doesn't change (otherwise we must reinit by calling calculateFloatContainerPosFn)
        var floatEnd;
        var tableContainerGap = 0;
        var captionHeight = haveCaption ? $caption.outerHeight(true) : 0;
        var captionScrollOffset = captionAlignTop ? captionHeight : -captionHeight;

        var floatContainerHeight = $floatContainer.height();
        var tableOffset = $table.offset();
        var tableLeftGap = 0; //can be caused by border on container (only in locked mode)
        var tableTopGap = 0;
        if(locked){
          var containerOffset = $scrollContainer.offset();
          tableContainerGap = tableOffset.top - containerOffset.top + scrollingContainerTop;
          if(haveCaption && captionAlignTop){
            tableContainerGap += captionHeight;
          }
          tableLeftGap = floatContainerBorderWidth('left');
          tableTopGap = floatContainerBorderWidth('top');
          tableContainerGap -= tableTopGap;
        } else {
          floatEnd = tableOffset.top - scrollingTop - floatContainerHeight + scrollingBottom + scrollbarOffset.horizontal;
        }
        var windowTop = $window.scrollTop();
        var windowLeft = $window.scrollLeft();
        var getScrollContainerLeft = function(){
          return (isResponsiveContainerActive() ?  $responsiveContainer : $scrollContainer).scrollLeft() || 0;
        };
        var scrollContainerLeft = getScrollContainerLeft();

        return function(eventType){
          responsive = isResponsiveContainerActive();

          var isTableHidden = $table[0].offsetWidth <= 0 && $table[0].offsetHeight <= 0;
          if(!isTableHidden && floatTableHidden) {
            floatTableHidden = false;
            setTimeout(function(){
              $table.triggerHandler("reflow");
            }, 1);
            return null;
          }
          if(isTableHidden){ //it's hidden
            floatTableHidden = true;
            if(!useAbsolutePositioning){
              return null;
            }
          }

          if(eventType === 'windowScroll'){
            windowTop = $window.scrollTop();
            windowLeft = $window.scrollLeft();
          } else if(eventType === 'containerScroll'){
            if($responsiveContainer.length){
              if(!responsive){
                return; //we dont care about the event if we arent responsive right now
              }
              scrollContainerLeft = $responsiveContainer.scrollLeft();
            } else {
              scrollingContainerTop = $scrollContainer.scrollTop();
              scrollContainerLeft = $scrollContainer.scrollLeft();
            }
          } else if(eventType !== 'init') {
            windowTop = $window.scrollTop();
            windowLeft = $window.scrollLeft();
            scrollingContainerTop = $scrollContainer.scrollTop();
            scrollContainerLeft =  getScrollContainerLeft();
          }
          if(isWebkit && (windowTop < 0 || (isRTL && windowLeft > 0 ) || ( !isRTL && windowLeft < 0 )) ){
            //chrome overscroll effect at the top of the page - breaks fixed positioned floated headers
            return;
          }

          if(absoluteToFixedOnScroll){
            if(eventType === 'windowScrollDone'){
              changePositioning(true); //change to absolute
            } else {
              changePositioning(false); //change to fixed
            }
          } else if(eventType === 'windowScrollDone'){
            return null; //event is fired when they stop scrolling. ignore it if not 'absoluteToFixedOnScroll'
          }

          tableOffset = $table.offset();
          if(haveCaption && captionAlignTop){
            tableOffset.top += captionHeight;
          }
          var top, left;
          var tableHeight = $table.outerHeight();

          if(locked && useAbsolutePositioning){ //inner scrolling, absolute positioning
            if (tableContainerGap >= scrollingContainerTop) {
              var gap = tableContainerGap - scrollingContainerTop + tableTopGap;
              top = gap > 0 ? gap : 0;
              triggerFloatEvent(false);
            } else if(scrollingContainerTop - tableContainerGap > tableHeight - floatContainerHeight){
              // scrolled past table but there is space in the container under it..
              top = tableHeight - floatContainerHeight - scrollingContainerTop - tableContainerGap;
            } else {
              top = wrappedContainer ? tableTopGap : scrollingContainerTop;
              //headers stop at the top of the viewport
              triggerFloatEvent(true);
            }
            left = tableLeftGap;
          } else if(!locked && useAbsolutePositioning) { //window scrolling, absolute positioning
            if(windowTop > floatEnd + tableHeight + captionScrollOffset){
              top = tableHeight - floatContainerHeight + captionScrollOffset + scrollingBottom; //scrolled past table
            } else if (tableOffset.top >= windowTop + scrollingTop) {
              top = 0; //scrolling to table
              unfloat();
              triggerFloatEvent(false);
            } else {
              top = scrollingTop + windowTop - tableOffset.top + tableContainerGap + (captionAlignTop ? captionHeight : 0);
              refloat(); //scrolling within table. header floated
              triggerFloatEvent(true);
            }
            left =  scrollContainerLeft;
          } else if(locked && !useAbsolutePositioning){ //inner scrolling, fixed positioning
            if (tableContainerGap > scrollingContainerTop || scrollingContainerTop - tableContainerGap > tableHeight) {
              top = tableOffset.top - windowTop;
              unfloat();
              triggerFloatEvent(false);
            } else {
              top = tableOffset.top + scrollingContainerTop  - windowTop - tableContainerGap;
              refloat();
              triggerFloatEvent(true);
              //headers stop at the top of the viewport
            }
            left = tableOffset.left + scrollContainerLeft - windowLeft;
          } else if(!locked && !useAbsolutePositioning) { //window scrolling, fixed positioning
            if(windowTop > floatEnd + tableHeight + captionScrollOffset){
              top = tableHeight + scrollingTop - windowTop + floatEnd + captionScrollOffset;
              //scrolled past the bottom of the table
            } else if (tableOffset.top > windowTop + scrollingTop) {
              top = tableOffset.top - windowTop;
              refloat();
              triggerFloatEvent(false); //this is a weird case, the header never gets unfloated and i have no no way to know
              //scrolled past the top of the table
            } else {
              //scrolling within the table
              top = scrollingTop;
              triggerFloatEvent(true);
            }
            left = tableOffset.left + scrollContainerLeft - windowLeft;
          }
          return {top: Math.round(top), left: Math.round(left)};
        };
      }
      /**
       * returns a function that caches old floating container position and only updates css when the position changes
       * @return {Function}
       */
      function repositionFloatContainerFn(){
        var oldTop = null;
        var oldLeft = null;
        var oldScrollLeft = null;
        return function(pos, setWidth, setHeight){
          if(pos != null && (oldTop !== pos.top || oldLeft !== pos.left)){
            if(ieVersion === 8){
              $floatContainer.css({
                top: pos.top,
                left: pos.left
              });
            } else {
              var transform = 'translateX(' + pos.left + 'px) translateY(' + pos.top + 'px)';
              var cssObj = {
                '-webkit-transform' : transform,
                '-moz-transform'    : transform,
                '-ms-transform'     : transform,
                '-o-transform'      : transform,
                'transform'         : transform,
                'top': 0,
                'left': 0,
              };
              $floatContainer.css(cssObj);
            }
            oldTop = pos.top;
            oldLeft = pos.left;
          }
          if(setWidth){
            setFloatWidth();
          }
          if(setHeight){
            setHeaderHeight();
          }
          var scrollLeft = (responsive ? $responsiveContainer : $scrollContainer).scrollLeft();
          if(!useAbsolutePositioning || oldScrollLeft !== scrollLeft){
            $floatContainer.scrollLeft(scrollLeft);
            oldScrollLeft = scrollLeft;
          }
        }
      }

      /**
       * checks if THIS table has scrollbars, and finds their widths
       */
      function calculateScrollBarSize(){ //this should happen after the floating table has been positioned
        if($scrollContainer.length){
          if(opts.support && opts.support.perfectScrollbar && $scrollContainer.data().perfectScrollbar){
            scrollbarOffset = {horizontal:0, vertical:0};
          } else {
            if($scrollContainer.css('overflow-x') === 'scroll'){
              scrollbarOffset.horizontal = scrollbarWidth;
            } else {
              var sw = $scrollContainer.width(), tw = tableWidth($table, $fthCells);
              var offsetv = sh < th ? scrollbarWidth : 0;
              scrollbarOffset.horizontal = sw - offsetv < tw ? scrollbarWidth : 0;
            }
            if($scrollContainer.css('overflow-y') === 'scroll'){
              scrollbarOffset.vertical = scrollbarWidth;
            } else {
              var sh = $scrollContainer.height(), th = $table.height();
              var offseth = sw < tw ? scrollbarWidth : 0;
              scrollbarOffset.vertical = sh - offseth < th ? scrollbarWidth : 0;
            }
          }
        }
      }
      //finish up. create all calculation functions and bind them to events
      calculateScrollBarSize();

      var flow;

      var ensureReflow = function(){
        flow = reflow();
        flow();
      };

      ensureReflow();

      var calculateFloatContainerPos = calculateFloatContainerPosFn();
      var repositionFloatContainer = repositionFloatContainerFn();

      repositionFloatContainer(calculateFloatContainerPos('init'), true); //this must come after reflow because reflow changes scrollLeft back to 0 when it rips out the thead

      var windowScrollDoneEvent = util.debounce(function(){
        repositionFloatContainer(calculateFloatContainerPos('windowScrollDone'), false);
      }, 1);

      var windowScrollEvent = function(){
        repositionFloatContainer(calculateFloatContainerPos('windowScroll'), false);
        if(absoluteToFixedOnScroll){
          windowScrollDoneEvent();
        }
      };
      var containerScrollEvent = function(){
        repositionFloatContainer(calculateFloatContainerPos('containerScroll'), false);
      };


      var windowResizeEvent = function(){
        if($table.is(":hidden")){
          return;
        }
        updateScrollingOffsets();
        calculateScrollBarSize();
        ensureReflow();
        calculateFloatContainerPos = calculateFloatContainerPosFn();
        repositionFloatContainer = repositionFloatContainerFn();
        repositionFloatContainer(calculateFloatContainerPos('resize'), true, true);
      };
      var reflowEvent = util.debounce(function(){
        if($table.is(":hidden")){
          return;
        }
        calculateScrollBarSize();
        updateScrollingOffsets();
        ensureReflow();
        calculateFloatContainerPos = calculateFloatContainerPosFn();
        repositionFloatContainer(calculateFloatContainerPos('reflow'), true, true);
      }, 1);

      /////// printing stuff
      var beforePrint = function(){
        unfloat();
      };
      var afterPrint = function(){
        refloat();
      };
      var printEvent = function(mql){
        //make printing the table work properly on IE10+
        if(mql.matches) {
          beforePrint();
        } else {
          afterPrint();
        }
      };

      var matchMediaPrint = null;
      if(window.matchMedia && window.matchMedia('print').addListener && !buggyMatchMedia){
        matchMediaPrint = window.matchMedia("print");
        matchMediaPrint.addListener(printEvent);
      } else {
        $window.on('fth-beforeprint', beforePrint);
        $window.on('fth-afterprint', afterPrint);
      }
      ////// end printing stuff


      if(locked){ //internal scrolling
        if(useAbsolutePositioning){
          $scrollContainer.on(eventName('scroll'), containerScrollEvent);
        } else {
          $scrollContainer.on(eventName('scroll'), containerScrollEvent);
          $window.on(eventName('scroll'), windowScrollEvent);
        }
      } else { //window scrolling
        $responsiveContainer.on(eventName('scroll'), containerScrollEvent);
        $window.on(eventName('scroll'), windowScrollEvent);
      }

      $window.on(eventName('load'), reflowEvent); //for tables with images

      windowResize(eventName('resize'), windowResizeEvent);
      $table.on('reflow', reflowEvent);
      if(opts.support && opts.support.datatables && isDatatable($table)){
        $table
            .on('filter', reflowEvent)
            .on('sort',   reflowEvent)
            .on('page',   reflowEvent);
      }

      if(opts.support && opts.support.bootstrap) {
        $window.on(eventName('shown.bs.tab'), reflowEvent); // people cant seem to figure out how to use this plugin with bs3 tabs... so this :P
      }
      if(opts.support && opts.support.jqueryUI) {
        $window.on(eventName('tabsactivate'), reflowEvent); // same thing for jqueryui
      }


      if (canObserveMutations) {
        var mutationElement = null;
        if(util.isFunction(opts.autoReflow)){
          mutationElement = opts.autoReflow($table, $scrollContainer)
        }
        if(!mutationElement) {
          mutationElement = $scrollContainer.length ? $scrollContainer[0] : $table[0]
        }
        mObs = new MutationObserver(function(e){
          var wasTableRelated = function(nodes){
            return nodes && nodes[0] && (nodes[0].nodeName === "THEAD" || nodes[0].nodeName === "TD"|| nodes[0].nodeName === "TH");
          };
          for(var i=0; i < e.length; i++){
            if(!(wasTableRelated(e[i].addedNodes) || wasTableRelated(e[i].removedNodes))){
              reflowEvent();
              break;
            }
          }
        });
        mObs.observe(mutationElement, {
          childList: true,
          subtree: true
        });
      }

      //attach some useful functions to the table.
      $table.data('floatThead-attached', {
        destroy: function(){
          var ns = '.fth-'+floatTheadId;
          unfloat();
          $table.css(layoutAuto);
          $tableColGroup.remove();
          createElements && $fthGrp.remove();
          if($newHeader.parent().length){ //only if it's in the DOM
            $newHeader.replaceWith($header);
          }
          triggerFloatEvent(false);
          if(canObserveMutations){
            mObs.disconnect();
            mObs = null;
          }
          $table.off('reflow reflowed');
          $scrollContainer.off(ns);
          $responsiveContainer.off(ns);
          if (wrappedContainer) {
            if ($scrollContainer.length) {
              $scrollContainer.unwrap();
            }
            else {
              $table.unwrap();
            }
          }
          if(locked){
            $scrollContainer.data('floatThead-containerWrap', false);
          } else {
            $table.data('floatThead-containerWrap', false);
          }
          $table.css('minWidth', originalTableMinWidth);
          $floatContainer.remove();
          $table.data('floatThead-attached', false);
          $window.off(ns);
          $window.off('fth-beforeprint fth-afterprint'); // Not bound with id, so cant use ns.
          if (matchMediaPrint) {
            matchMediaPrint.removeListener(printEvent);
          }
          beforePrint = afterPrint = function(){};

          return function reinit(){
            return $table.floatThead(opts);
          }
        },
        reflow: function(){
          reflowEvent();
        },
        setHeaderHeight: function(){
          setHeaderHeight();
        },
        getFloatContainer: function(){
          return $floatContainer;
        },
        getRowGroups: function(){
          if(headerFloated){
            return $floatContainer.find('>table>thead').add($table.children("tbody,tfoot"));
          } else {
            return $table.children("thead,tbody,tfoot");
          }
        }
      });
    });
    return this;
  };
})((function(){
  var $ = window.jQuery;
  if(typeof module !== 'undefined' && module.exports && !$) {
    // only use cjs if they dont have a jquery for me to use, and we have commonjs
    $ = require('jquery');
  }
  return $;
})());
;/**/
/* jQuery Form Styler v1.4 | (c) Dimox | https://github.com/Dimox/jQueryFormStyler */
(function(d){d.fn.styler=function(p){p=d.extend({idSuffix:"-styler",filePlaceholder:"\u0424\u0430\u0439\u043b \u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",browseText:"\u041e\u0431\u0437\u043e\u0440...",selectVisibleOptions:0,singleSelectzIndex:"100",selectSmartPositioning:!0},p);return this.each(function(){var a=d(this),q="",s="",u="",t="";void 0!==a.attr("id")&&""!=a.attr("id")&&(q=' id="'+a.attr("id")+p.idSuffix+'"');void 0!==a.attr("class")&&""!=a.attr("class")&&(s=" "+a.attr("class"));void 0!==
a.attr("title")&&""!=a.attr("title")&&(u=' title="'+a.attr("title")+'"');var v=a.data(),f;for(f in v)""!=v[f]&&(t+=" data-"+f+'="'+v[f]+'"');q+=t;a.is(":checkbox")?a.css({position:"absolute",opacity:0}).each(function(){if(1>a.next("div.jq-checkbox").length){var b=d("<div"+q+' class="jq-checkbox'+s+'"'+u+' style="display: inline-block"><div></div></div>');a.after(b).css("margin-top",b.outerHeight());a.is(":checked")&&b.addClass("checked");a.is(":disabled")&&b.addClass("disabled");b.click(function(){b.is(".disabled")||
(a.is(":checked")?(a.prop("checked",!1),b.removeClass("checked")):(a.prop("checked",!0),b.addClass("checked")),a.change());return!1});a.parent("label").add('label[for="'+a.attr("id")+'"]').click(function(a){b.click();a.preventDefault()});a.change(function(){a.is(":checked")?b.addClass("checked"):b.removeClass("checked")}).keydown(function(d){!a.parent("label").length||13!=d.which&&32!=d.which||b.click()}).focus(function(){b.is(".disabled")||b.addClass("focused")}).blur(function(){b.removeClass("focused")}).on("refresh",
function(){a.is(":checked")?b.addClass("checked"):b.removeClass("checked");a.is(":disabled")?b.addClass("disabled"):b.removeClass("disabled")})}}):a.is(":radio")?a.css({position:"absolute",opacity:0}).each(function(){if(1>a.next("div.jq-radio").length){var b=d("<div"+q+' class="jq-radio'+s+'"'+u+' style="display: inline-block"><div></div></div>');a.after(b).css("margin-top",b.outerHeight());a.is(":checked")&&b.addClass("checked");a.is(":disabled")&&b.addClass("disabled");b.click(function(){b.is(".disabled")||
(b.closest("form").find('input[name="'+a.attr("name")+'"]').prop("checked",!1).next().removeClass("checked"),a.prop("checked",!0).next().addClass("checked"),a.change());return!1});a.parent("label").add('label[for="'+a.attr("id")+'"]').click(function(a){b.click();a.preventDefault()});a.change(function(){d('input[name="'+a.attr("name")+'"]').next().removeClass("checked");a.next().addClass("checked")}).focus(function(){b.is(".disabled")||b.addClass("focused")}).blur(function(){b.removeClass("focused")}).on("refresh",
function(){a.is(":checked")?(d('input[name="'+a.attr("name")+'"]').next().removeClass("checked"),b.addClass("checked")):b.removeClass("checked");a.is(":disabled")?b.addClass("disabled"):b.removeClass("disabled")})}}):a.is(":file")?a.css({position:"absolute",top:"0",right:"0",width:"100%",height:"100%",opacity:0}).each(function(){if(1>a.parent("div.jq-file").length){var b=d("<div"+q+' class="jq-file'+s+'" style="display: inline-block; position: relative; overflow: hidden"></div>'),f=d('<div class="jq-file__name">'+
p.filePlaceholder+"</div>").appendTo(b);d('<div class="jq-file__browse">'+p.browseText+"</div>").appendTo(b);a.after(b);b.append(a);a.is(":disabled")&&b.addClass("disabled");a.change(function(){f.text(a.val().replace(/.+[\\\/]/,""))}).focus(function(){b.addClass("focused")}).blur(function(){b.removeClass("focused")}).click(function(){b.removeClass("focused")}).on("refresh",function(){a.is(":disabled")?b.addClass("disabled"):b.removeClass("disabled")})}}):a.is("select")&&a.each(function(){if(1>a.next("div.jqselect").length){var b=
function(){function b(a){a.unbind("mousewheel DOMMouseScroll").bind("mousewheel DOMMouseScroll",function(a){var e=null;"mousewheel"==a.type?e=-1*a.originalEvent.wheelDelta:"DOMMouseScroll"==a.type&&(e=40*a.originalEvent.detail);e&&(a.preventDefault(),d(this).scrollTop(e+d(this).scrollTop()))})}function t(){f=0;for(len=g.length;f<len;f++){var a="",b="",d=a="",n="",c="";g.eq(f).prop("selected")&&(b="selected sel");g.eq(f).is(":disabled")&&(b="disabled");g.eq(f).is(":selected:disabled")&&(b="selected sel disabled");
void 0!==g.eq(f).attr("class")&&(d=" "+g.eq(f).attr("class"),c=' data-jqfs-class="'+g.eq(f).attr("class")+'"');var h=g.eq(f).data(),m;for(m in h)""!=h[m]&&(a+=" data-"+m+'="'+h[m]+'"');a="<li"+c+a+' class="'+b+d+'">'+g.eq(f).text()+"</li>";g.eq(f).parent().is("optgroup")&&(void 0!==g.eq(f).parent().attr("class")&&(n=" "+g.eq(f).parent().attr("class")),a="<li"+c+' class="'+b+d+" option"+n+'">'+g.eq(f).text()+"</li>",g.eq(f).is(":first-child")&&(a='<li class="optgroup'+n+'">'+g.eq(f).parent().attr("label")+
"</li>"+a));x+=a}}function v(){var e=d("<div"+q+' class="jq-selectbox jqselect'+s+'" style="display: inline-block; position: relative; z-index:'+p.singleSelectzIndex+'"><div class="jq-selectbox__select"'+u+'><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>');a.wrap('<div class="jq-selectbox-wrapper" style="position: relative"></div>').after(e);var f=d("div.jq-selectbox__select",e),k=d("div.jq-selectbox__select-text",
e),n=g.filter(":selected");n.length?k.text(n.text()):k.text(g.first().text());t();var c=d('<div class="jq-selectbox__dropdown" style="position: absolute; overflow: auto; overflow-x: hidden"><ul style="list-style: none">'+x+"</ul></div>");e.append(c);var h=d("li",c),m=0;h.each(function(){d(this).css({display:"inline-block","white-space":"nowrap"});d(this).width()>m&&(m=d(this).width());d(this).css({display:"block","white-space":"normal"})});var l=a.clone().css("width","auto").insertAfter(a),B=l.width();
l.remove();B==a.width()?f.width(m):e.width(a.outerWidth());m>c.width()&&c.width(m+c.width()-h.width());a.css({position:"absolute",opacity:0,height:e.outerHeight()});l=h.filter(".selected");1>l.length&&h.first().addClass("selected sel");var y=e.outerHeight();"auto"==c.css("left")&&c.css({left:0});"auto"==c.css("top")&&c.css({top:y});var r=h.outerHeight(),z=c.css("top");c.hide();l.length&&(g.first().text()!=n.text()&&e.addClass("changed"),e.data("jqfs-class",l.data("jqfs-class")),e.addClass(l.data("jqfs-class")));
if(a.is(":disabled"))return e.addClass("disabled"),!1;f.click(function(){a.focus();if(p.selectSmartPositioning){var m=d(window),g=e.offset().top,f=m.height()-y-(g-m.scrollTop()),l=p.selectVisibleOptions,k=6*r,w=r*l;0<l&&6>l&&(k=w);0>f||f<k?(c.height("auto").css({top:"auto",bottom:z}),c.outerHeight()>g-m.scrollTop()-20&&(c.height(Math.floor((g-m.scrollTop()-20)/r)*r),0<l&&6>l?c.height()>k&&c.height(k):6<l&&c.height()>w&&c.height(w))):f>k&&(c.height("auto").css({bottom:"auto",top:z}),c.outerHeight()>
f-20&&(c.height(Math.floor((f-20)/r)*r),0<l&&6>l?c.height()>k&&c.height(k):6<l&&c.height()>w&&c.height(w)))}d("div.jqselect").css({zIndex:p.singleSelectzIndex-1}).removeClass("opened focused");e.css({zIndex:p.singleSelectzIndex});c.is(":hidden")?(d("div.jq-selectbox__dropdown:visible").hide(),c.show(),e.addClass("opened")):(c.hide(),e.removeClass("opened"));h.filter(".selected").length&&c.scrollTop(c.scrollTop()+h.filter(".selected").position().top-c.innerHeight()/2+r/2);b(c);return!1});h.hover(function(){d(this).siblings().removeClass("selected")});
var A=h.filter(".selected").text();h.filter(".selected").text();h.filter(":not(.disabled):not(.optgroup)").click(function(){var b=d(this),m=b.text();if(A!=m){var l=b.index();b.is(".option")&&(l-=b.prevAll(".optgroup").length);b.addClass("selected sel").siblings().removeClass("selected sel");g.prop("selected",!1).eq(l).prop("selected",!0);A=m;k.text(m);g.first().text()!=m?e.addClass("changed"):e.removeClass("changed");e.data("jqfs-class")&&e.removeClass(e.data("jqfs-class"));e.data("jqfs-class",b.data("jqfs-class"));
e.addClass(b.data("jqfs-class"));a.change()}c.hide();e.removeClass("opened")});c.mouseout(function(){d("li.sel",c).addClass("selected")});a.change(function(){k.text(g.filter(":selected").text());h.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel")}).focus(function(){e.addClass("focused")}).blur(function(){e.removeClass("focused")}).bind("keydown keyup",function(b){k.text(g.filter(":selected").text());h.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel");
38!=b.which&&37!=b.which&&33!=b.which||c.scrollTop(c.scrollTop()+h.filter(".selected").position().top);40!=b.which&&39!=b.which&&34!=b.which||c.scrollTop(c.scrollTop()+h.filter(".selected").position().top-c.innerHeight()+r);13==b.which&&c.hide()});d(document).on("click",function(a){d(a.target).parents().hasClass("jq-selectbox")||"OPTION"==a.target.nodeName||(c.hide().find("li.sel").addClass("selected"),e.removeClass("focused opened"))})}function C(){var e=d("<div"+q+' class="jq-select-multiple jqselect'+
s+'"'+u+' style="display: inline-block; position: relative"></div>');a.wrap('<div class="jq-selectbox-wrapper" style="position: relative"></div>').after(e);t();e.append('<ul style="position: relative">'+x+"</ul>");var f=d("ul",e).css({"overflow-x":"hidden"}),k=d("li",e).attr("unselectable","on").css({"-webkit-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","-o-user-select":"none","user-select":"none","white-space":"nowrap"}),n=a.attr("size"),c=f.outerHeight(),h=k.outerHeight();
void 0!==n&&0<n?f.css({height:h*n}):f.css({height:4*h});c>e.height()&&(f.css("overflowY","scroll"),b(f),k.filter(".selected").length&&f.scrollTop(f.scrollTop()+k.filter(".selected").position().top));a.is(":disabled")?(e.addClass("disabled"),g.each(function(){d(this).is(":selected")&&k.eq(d(this).index()).addClass("selected")}),e.width(a.outerWidth()),e.width(e.width()-(e.outerWidth()-e.width())),a.css({position:"absolute",opacity:0,height:e.outerHeight()})):(e.width(a.outerWidth()),e.width(e.width()-
(e.outerWidth()-e.width())),a.css({position:"absolute",opacity:0,height:e.outerHeight()}),k.filter(":not(.disabled):not(.optgroup)").click(function(b){a.focus();e.removeClass("focused");var c=d(this);b.ctrlKey||c.addClass("selected");b.shiftKey||c.addClass("first");b.ctrlKey||b.shiftKey||c.siblings().removeClass("selected first");b.ctrlKey&&(c.is(".selected")?c.removeClass("selected first"):c.addClass("selected first"),c.siblings().removeClass("first"));if(b.shiftKey){var f=!1,h=!1;c.siblings().removeClass("selected").siblings(".first").addClass("selected");
c.prevAll().each(function(){d(this).is(".first")&&(f=!0)});c.nextAll().each(function(){d(this).is(".first")&&(h=!0)});f&&c.prevAll().each(function(){if(d(this).is(".selected"))return!1;d(this).not(".disabled, .optgroup").addClass("selected")});h&&c.nextAll().each(function(){if(d(this).is(".selected"))return!1;d(this).not(".disabled, .optgroup").addClass("selected")});1==k.filter(".selected").length&&c.addClass("first")}g.prop("selected",!1);k.filter(".selected").each(function(){var a=d(this),b=a.index();
a.is(".option")&&(b-=a.prevAll(".optgroup").length);g.eq(b).prop("selected",!0)});a.change()}),g.each(function(a){d(this).data("optionIndex",a)}),a.change(function(){k.removeClass("selected");var a=[];g.filter(":selected").each(function(){a.push(d(this).data("optionIndex"))});k.not(".optgroup").filter(function(b){return-1<d.inArray(b,a)}).addClass("selected")}).focus(function(){e.addClass("focused")}).blur(function(){e.removeClass("focused")}),c>e.height()&&a.keydown(function(a){38!=a.which&&37!=
a.which&&33!=a.which||f.scrollTop(f.scrollTop()+k.filter(".selected").position().top-h);40!=a.which&&39!=a.which&&34!=a.which||f.scrollTop(f.scrollTop()+k.filter(".selected:last").position().top-f.innerHeight()+2*h)}))}var g=d("option",a),x="";a.is("[multiple]")?C():v()};b();a.on("refresh",function(){a.next().remove();b()});a.on("adaptiveWidth",function(){a.css({position:"static"});a.next().width(a.outerWidth());a.css({position:"absolute"})});d(window).on("resize",function(){a.trigger("adaptiveWidth")})}})})}})(jQuery);;/**/
(function ($) {
  Drupal.behaviors.atColorbox = {
    attach: function (context, settings) {
      $('#block-system-main .field-name-body img').once(function () {
        var anchor = $('<a/>').attr({'href': this.src}).colorbox({rel: "image-content"});
        $(this).wrap(anchor);
      });
    }
  };

  Drupal.behaviors.styler = {
    attach: function (context, settings) {
      $('select').styler();
      $('input[type="checkbox"]').styler();
      $('input[type="radio"]').styler();
    }
  };

  Drupal.behaviors.menuSidbar = {
    attach: function (context, settings) {
      $('li.expanded.menu-depth-1 > a').replaceWith(function () {
        return $('<div class="expanded-link">' + $(this).text() + '</div>');
      });
    }
  };

  /**
   * Usage: to open accordion if there is an anchor text in the url.
   */
  Drupal.behaviors.openAnchorAccordion = {
    attach: function (context, settings) {
      var link = window.location.href;

      if(link.indexOf('#') === -1) return;

      var anchor = link.match('[^#]*$')[0];
      if(anchor.length !== 0) {
        var selector = $("#block-system-main");

        selector.find('#' + anchor).removeClass('collapsed');
        selector.find('#' + anchor + ' .fieldset-wrapper').css('display', '');
      }
    }
  };

  /**
   * This behavior will add the current user search input on the search page to the current_search block.
   */
  Drupal.behaviors.currentSearchKeys = {
    attach: function (context, settings) {
      var keywords = $("#edit-s");

      if (keywords.length && keywords.val().length > 0) {
        var currentSearchKeys = $("#block-current-search-article-current-search").find('li').first();
        // Adding the text from what the user has inserted into the search.
        currentSearchKeys.text(keywords.val());
        // Show the block after it is being rendered.
        currentSearchKeys.addClass('show-item');
      }
    }
  };

  /**
   * Adding the possibility to have fixed header in the table.
   * @type {{attach: Drupal.behaviors.fixedTableHeader.attach}}
   */
  Drupal.behaviors.fixedTableHeader = {
    attach: function (context, settings) {
      $("#fixed-header").floatThead({top: 0})
    }
  };

  // Changing the markup of certain buttons to be icon.
  Drupal.behaviors.iconChange = {
    attach: function (context, settings) {
      // Print icon
      let label = Drupal.t('Print');
      $(".print-block a").html('<i class="kb kb-printer"></i><span class="tooltip">'+ label +'</span>');

      // Bookmark delete icon
      $(".view-acronis-bookmarks .views-field-delete a").html('<i class="kb kb-close-circle"></i>');
    }
  };

  // Pre-selecting the search option.
  Drupal.behaviors.preSelectSearchFilter = {
    attach: function (context, settings) {
      let attr = $("body").attr('data-term')

      // If we are on taxonomy term page, pre-select the search option.
      if(typeof attr !== typeof undefined && attr !== false) {
        let term = $('#edit-ap option[value=' + attr + ']'),
            selectedText = term.text();
        // Select the choice in th original select box.
        term.attr('selected', 'selected');

        // Select the choice in the styled select box.
        $('#edit-ap-styler ul li').removeClass('selected sel');
        $('#edit-ap-styler ul li:contains('+ selectedText +')').addClass('selected sel');
        $('#edit-ap-wrapper .jq-selectbox__select-text').text(selectedText);
      }
    }
  };
})(jQuery);
;/**/
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PFG6ZF');;/**/

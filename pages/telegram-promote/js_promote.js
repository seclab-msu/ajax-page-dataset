
var Ads = {
  init: function() {
    Aj.onLoad(function(state) {
      Ads.updateTime(Aj.ajContainer);
      Ads.updateAdMessagePreviews(Aj.ajContainer);
      $('.logout-link').on('click', Ads.eLogOut);
    });
    Aj.onUnload(function(state) {
      $('.logout-link').off('click', Ads.eLogOut);
    });
  },
  checkAuth: function (e) {
    if (Aj.needAuth()) {
      e.preventDefault();
      return false;
    }
  },
  eUpdateField: function(e) {
    var $fieldEl = $(this);
    if (e.type == 'focus' || e.type == 'focusin') {
      Ads.updateField($fieldEl, true);
    } else if (e.type == 'blur' || e.type == 'focusout') {
      Ads.updateField($fieldEl, false);
    } else {
      Ads.updateField($fieldEl);
    }
  },
  wrapAmount: function(value, no_currency, field_format) {
    var amount_str = formatNumber(value, 2, '.', field_format ? '' : ',');
    if (no_currency) {
      return amount_str;
    }
    var currency = l('WEB_ADS_DEF_CURRENCY_SIGN', '€');
    return '<span class="amount-currency">' + currency + '</span>' + amount_str;
  },
  amountFieldValue: function($form, field) {
    var $fieldEl   = $form.field(field);
    var minValue = $fieldEl.attr('data-min') || null;
    var maxValue = $fieldEl.attr('data-max') || null;
    var decPoint = $fieldEl.attr('data-dec-point') || '.';
    var value    = $fieldEl.value();

    var float_value = value.length ? value : '0';
    if (decPoint != '.') {
      float_value.split(decPoint).join('.');
    }
    float_value = parseFloat(float_value);
    if (isNaN(float_value) || float_value >= 1e12) {
      return false;
    }
    if (minValue !== null && float_value < minValue ||
        maxValue !== null && float_value > maxValue) {
      return false;
    } else {
      return float_value;
    }
  },
  eUpdateAmountField: function(e) {
    var $fieldEl = $(this);
    var minValue = $fieldEl.attr('data-min') || null;
    var maxValue = $fieldEl.attr('data-max') || null;
    var decPoint = $fieldEl.attr('data-dec-point') || '.';
    var decimals = $fieldEl.attr('data-decimals') || 2;
    var sel_dir   = this.selectionDirection;
    var sel_start = this.selectionStart;
    var sel_end   = this.selectionEnd;
    var value     = this.value;
    var new_sel_start = sel_start;
    var new_sel_end   = sel_end;
    var new_value     = '';
    var has_decimal = false;
    var chars_len = 0;
    var decimal_len = 0;
    for (var i = 0; i < value.length; i++) {
      var char = value[i];
      if ((char == '.' || char == ',') && !has_decimal) {
        if (!chars_len) {
          new_value += '0';
          if (i < sel_start) new_sel_start++;
          if (i < sel_end) new_sel_end++;
        }
        has_decimal = true;
        new_value += decPoint;
      } else if (char >= '0' && char <= '9' && decimal_len < decimals) {
        new_value += char;
        if (has_decimal) decimal_len++;
        else chars_len++;
      } else {
        if (i < sel_start) new_sel_start--;
        if (i < sel_end) new_sel_end--;
      }
    }
    this.value = new_value;
    this.setSelectionRange(new_sel_start, new_sel_end, sel_dir);
    var float_value = new_value.length ? new_value : '0';
    if (decPoint != '.') {
      float_value.split(decPoint).join('.');
    }
    float_value = parseFloat(float_value);
    var is_invalid = (isNaN(float_value) || float_value >= 1e12);
    if (minValue !== null && float_value < minValue ||
        maxValue !== null && float_value > maxValue ||
        is_invalid) {
      Ads.showFieldError($fieldEl);
    } else {
      Ads.hideFieldError($fieldEl);
    }
    if (e.type == 'change') {
      if (new_value.length && !is_invalid) {
        this.value = Ads.wrapAmount(float_value, true, true);
      }
    }
  },
  updateField: function($fieldEl, focused) {
    var $formGroup = $fieldEl.parents('.form-group');
    if (typeof focused !== 'undefined') {
      $formGroup.toggleClass('field-focused', focused);
    }
    var $select = $fieldEl.parents('.select');
    var selectedCnt = $select.find('.selected-item').size();
    $formGroup.toggleClass('noinput', $select.hasClass('no-search') && !selectedCnt);
    var hasValue = $fieldEl.value().length > 0 || selectedCnt > 0;
    $formGroup.toggleClass('field-has-value', hasValue);
  },
  showFieldHint: function($fieldEl, hint_text, field_invalid) {
    var $formGroup = $fieldEl.parents('.form-group');
    var $hint = $formGroup.find('>.pr-form-control-hint');
    var $msg = $formGroup.find('>.pr-form-control-msg');
    if (!$msg.size() && hint_text) {
      $msg = $('<div class="pr-form-control-msg ohide" />');
      $formGroup.find('>.pr-form-control-wrap').after($msg);
    }
    $msg.toggleClass('no-hint', !$hint.text().length);
    if (hint_text) {
      $msg.html('<div class="pr-form-control-msg-text">' + hint_text + '</div>').redraw().fadeShow();
    } else {
      $msg.fadeHide();
    }
    $formGroup.toggleClass('field-invalid', !!field_invalid);
  },
  showFieldError: function($fieldEl, error_text, focus) {
    Ads.showFieldHint($fieldEl, error_text, true);
    if (focus) {
      if ($fieldEl.hasClass('select')) {
        $fieldEl.trigger('click');
        $fieldEl.find('.items-list').addClass('collapsed');
        $fieldEl.removeClass('open');
      } else {
        $fieldEl.focusAndSelect();
      }
    }
  },
  hideFieldError: function($fieldEl) {
    Ads.showFieldHint($fieldEl, '', false);
  },
  onSelectChange: function(field, value, valueFull) {
    var $fieldEl = Aj.state.$form.field(field);
    Ads.hideFieldError($fieldEl);
  },
  updateTime: function(context) {
    $('time[datetime]', context).each(function () {
      var $time = $(this), datetime = $time.attr('datetime'), title = $time.attr('title'), html = $time.html(), new_html = formatDateTime(datetime, $time.hasClass('short'));
      if (html != new_html) {
        $time.html(new_html);
      }
      if ($time.hasClass('short') && title) {
        var new_title = formatDateTime(datetime);
        if (title != new_title) {
          $time.attr('title', new_title);
        }
      }
      $time.removeAttr('datetime');
    });
  },
  fieldInit: function(field) {
    $(field).on('focus blur keyup change input', Ads.eUpdateField);
    $(field).parents('.pr-search-input-wrap').find('.pr-search-reset').on('click', Ads.eClearField);
    Ads.updateField($(field));
  },
  fieldDestroy: function(field) {
    $(field).off('focus blur keyup change input', Ads.eUpdateField);
    $(field).parents('.pr-search-input-wrap').find('.pr-search-reset').off('click', Ads.eClearField);
  },
  formInit: function(form) {
    var $form = $(form);
    $('.pr-form-control', $form).each(function(){ Ads.fieldInit(this); });
    $('.js-amount-input', $form).on('keyup change input', Ads.eUpdateAmountField);
    $('input.checkbox,input.radio', $form).on('focus blur', Ads.eUpdateField);
    $('.js-hint-tooltip', $form).on('mouseover mouseout click', Ads.eHintEvent);
    $('textarea.pr-form-control', $form).initAutosize();
    $(document).on('touchstart click', Ads.eHideAllHints);
    setTimeout(function(){ $form.removeClass('no-transition'); }, 100);
  },
  formDestroy: function(form) {
    var $form = $(form);
    $('.pr-form-control', $form).each(function(){ Ads.fieldDestroy(this); });
    $('.js-amount-input', $form).off('keyup change input', Ads.eUpdateAmountField);
    $('input.checkbox,input.radio', $form).off('focus blur', Ads.eUpdateField);
    $('.js-hint-tooltip', $form).off('mouseover mouseout click', Ads.eHintEvent);
    $('textarea.pr-form-control', $form).destroyAutosize();
    $(document).off('touchstart click', Ads.eHideAllHints);
  },
  eClearField: function(e) {
    var $fieldEl = $(this).parents('.pr-search-input-wrap').find('.pr-search-input');
    $fieldEl.value('').trigger('input').focus();
  },
  showHint: function($hint, delay, hide_delay) {
    hide_delay = hide_delay || 0;
    var show_to = $hint.data('show_to');
    var hide_to = $hint.data('hide_to');
    clearTimeout(show_to);
    clearTimeout(hide_to);
    show_to = setTimeout(function() {
      $hint.addClass('show-hint');
      if (hide_delay > 0) {
        Ads.hideHint($hint, hide_delay);
      }
    }, delay);
    $hint.data('show_to', show_to);
  },
  hideHint: function($hint, delay) {
    var show_to = $hint.data('show_to');
    var hide_to = $hint.data('hide_to');
    clearTimeout(show_to);
    clearTimeout(hide_to);
    hide_to = setTimeout(function() {
      $hint.removeClass('show-hint');
    }, delay);
    $hint.data('hide_to', hide_to);
  },
  eHintEvent: function(e) {
    var $hint = $(this);
    if (e.type == 'click') {
      Ads.showHint($hint, 50, 2000);
    } else if (e.type == 'mouseover') {
      Ads.showHint($hint, 400);
    } else if (e.type == 'mouseout') {
      Ads.hideHint($hint, 100);
    }
  },
  eHideAllHints: function(e) {
    var $closestHint = $(e.target).closest('.js-hint-tooltip');
    $('.js-hint-tooltip.show-hint').each(function() {
      if (!$closestHint.filter(this).size()) {
        Ads.hideHint($(this), 1);
      }
    });
  },
  updateTextShadow: function(footerEl, textSel, shadowedSel, add_margin) {
    var textEl = footerEl.previousElementSibling;
    if (textEl && $(textEl).is(textSel)) {
      var text_rect = textEl.getBoundingClientRect();
      var tnode = textEl.firstChild;
      while (tnode && tnode.nodeType == tnode.ELEMENT_NODE) {
        tnode = tnode.firstChild;
      }
      $(textEl).removeClass('before_footer');
      if (tnode) {
        var r = document.createRange();
        r.setStart(tnode, 0);
        r.setEnd(tnode, 1);
        var char_rect = r.getBoundingClientRect();
        if (Math.abs(char_rect.right - text_rect.right) > 3) {
          var $infoEl = $(footerEl).find(shadowedSel);
          if ($infoEl.size()) {
            $(textEl).find('span.js-shadow').remove();
            var $shadowEl = $('<span class="js-shadow">').css('display', 'inline-block').width($infoEl.width() + (add_margin || 0));
            $(textEl).append($shadowEl).addClass('before_footer');
          }
        }
      }
    }
  },
  updateAdMessagePreviews: function(cont) {
    $('.pr-review-ad-preview .tgme_widget_message_footer', cont).each(function() {
      Ads.updateTextShadow(this, '.js-message_text', '.js-message_info');
    });
  },
  initSelect: function($form, field, options) {
    var $selectEl = $form.field(field);
    var $selectInput = $('.input', $selectEl);
    options = options || {};
    $selectEl.data('selOpts', options);
    Aj.onLoad(function(state) {
      $selectEl.initSelect({
        multiSelect: !options.noMultiSelect,
        noCloseOnSelect: false,
        noCloseOnEnter: !!options.onEnter,
        enterEnabled: function() {
          return !!options.onEnter;
        },
        prepareQuery: function(str) {
          return $.trim(str).toLowerCase();
        },
        renderItem: options.renderItem,
        renderSelectedItem: options.renderSelectedItem,
        renderNoItems: function(q) {
          return q && options.l_no_items_found ? '<div class="select-list-no-results">' + options.l_no_items_found + '</div>' : '';
        },
        getData: function() {
          var data = options.items;
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            item._values = [item.name.toLowerCase()];
          }
          return data;
        },
        onBlur: function(value) {
          options.onEnter && options.onEnter(field, value);
        },
        onEnter: function(value) {
          options.onEnter && options.onEnter(field, value);
        },
        onChange: function(value, valueFull) {
          options.onChange && options.onChange(field, value, valueFull);
        },
        onUpdate: function(value, valueFull) {
          Ads.updateField($selectInput);
          options.onUpdate && options.onUpdate(field, value, valueFull);
        }
      });
      Ads.updateField($selectInput);
    });
    Aj.onUnload(function(state) {
      $selectEl.destroySelect();
    });
  },
  eLogOut: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Aj.apiRequest('logOut', {}, function(result) {
      location.reload();
    });
    return false;
  }
};

var NewAd = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.pr-new-form', cont);
      Ads.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.js-preview-link', NewAd.ePreviewAd);
      cont.on('click.curPage', '.clear-draft-btn', NewAd.eClearDraft);
      cont.on('click.curPage', '.create-new-ad-btn', NewAd.eSubmitForm);
      for (var i = 0; i < state.selectList.length; i++) {
        var selectData = state.selectList[i];
        if (selectData.channel_search) {
          Ads.initSelect(state.$form, selectData.field, {
            items: Aj.state[selectData.items_key] || [],
            renderSelectedItem: function(val, item) {
              return '<div class="selected-item' + (item.photo ? ' has-photo' : '') + '" data-val="' + cleanHTML(val.toString()) + '">' + (item.photo ? '<div class="selected-item-photo">' + item.photo + '</div>' : '') + '<span class="close"></span><div class="label">' + item.name + '</div></div>';
            },
            l_channels_limit: selectData.limit_lang_key ? l(selectData.limit_lang_key) : '',
            onEnter: NewAd.onChannelSearch,
            onUpdate: NewAd.onSelectUpdate,
            onChange: Ads.onSelectChange
          });
        } else {
          Ads.initSelect(state.$form, selectData.field, {
            items: Aj.state[selectData.items_key] || [],
            l_no_items_found: selectData.no_items_lang_key ? l(selectData.no_items_lang_key) : '',
            onUpdate: NewAd.onSelectUpdate,
            onChange: Ads.onSelectChange
          });
        }
      }
      state.titleField = state.$form.field('title');
      state.titleField.on('change.curPage', NewAd.onTitleChange);
      state.textField = state.$form.field('text');
      state.textField.on('change.curPage', NewAd.onTextChange);
      state.textField.on('input.curPage', NewAd.onTextInput);
      state.promoteUrlField = state.$form.field('promote_url');
      state.promoteUrlField.on('change.curPage', NewAd.onPromoteUrlChange);
      state.confirmedCheckbox = state.$form.field('confirmed');
      state.confirmedCheckbox.on('change.curPage', NewAd.onConfirmedChange);
      NewAd.updateAdPreview(state.$form, state.previewData);
      NewAd.updateAdTargetOverview();
      setTimeout(function() {
        state.titleField.focusAndSelect();
      }, 50);
      Aj.onLoad(function(state) {
        state.initFormData = NewAd.getFormData(state.$form);
        state.initPreviewFormData = NewAd.getPreviewFormData();
        Aj.onBeforeUnload(function() {
          var curPreviewFormData = NewAd.getPreviewFormData();
          if (Aj.state.initPreviewFormData != curPreviewFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          var curFormData = NewAd.getFormData(state.$form);
          if (Aj.state.initFormData != curFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          return false;
        });
        NewAd.saveDraftAuto(true);
      });
    });
    Aj.onUnload(function(state) {
      Ads.formDestroy(state.$form);
      state.$form.off('submit', preventDefault);
      state.titleField.off('.curPage');
      state.textField.off('.curPage');
      state.promoteUrlField.off('.curPage');
      state.confirmedCheckbox.off('.curPage');
      clearTimeout(state.saveDraftTo);
    });
  },
  onTitleChange: function() {
    Ads.hideFieldError($(this));
  },
  onConfirmedChange: function() {
    $('.create-new-ad-btn', Aj.ajContainer).prop('disabled', !$(this).prop('checked'));
  },
  onTextChange: function() {
    var $form = $(this.form);
    var textField = $form.field('text');
    Ads.hideFieldError(textField);
    NewAd.adPostCheck($form);
  },
  onTextInput: function() {
    var textField = $(this);
    var text = textField.value();
    var max_len = Aj.state.textMaxLength;
    var symbols_left = max_len - text.length;
    Ads.showFieldError(textField);
    if (text.indexOf('\n') >= 0) {
      Ads.showFieldHint(textField, l('ADS_ERROR_POST_NEW_LINES_NOT_ALLOWED'), true);
    } else if (symbols_left < 0) {
      Ads.showFieldHint(textField, l('ADS_ERROR_POST_MESSAGE_TOO_LONG', {max_len: Aj.state.textMaxLength}), true);
    } else {
      if (symbols_left <= 20) {
        Ads.showFieldHint(textField, l('WEB_AD_TEXT_SYMBOLS_LEFT', {n: symbols_left}));
      } else {
        Ads.showFieldHint(textField, '');
      }
    }
  },
  onPromoteUrlChange: function() {
    var $form = $(this.form);
    var promoteUrlField = $form.field('promote_url');
    Ads.hideFieldError(promoteUrlField);
    NewAd.adPostCheck($form);
  },
  adPostCheck: function($form) {
    var textField = $form.field('text');
    var promoteUrlField = $form.field('promote_url');
    var text = textField.value();
    var promote_url = promoteUrlField.value();
    var $formGroup = promoteUrlField.parents('.form-group');
    if (!text && !promote_url) {
      return false;
    }
    var params = {
      text: text,
      promote_url: promote_url
    };
    if (Aj.state.ownerId && Aj.state.adId) {
      params.owner_id = Aj.state.ownerId;
      params.ad_id = Aj.state.adId;
    }
    $formGroup.addClass('field-loading');
    Aj.apiRequest('checkAdPost', params, function(result) {
      Ads.hideFieldError(textField);
      Ads.hideFieldError(promoteUrlField);
      $formGroup.removeClass('field-loading');
      if (result.promote_url) {
        var new_promote_url = promoteUrlField.value();
        if (!new_promote_url || promote_url == new_promote_url) {
          if (new_promote_url != result.promote_url) {
            promoteUrlField.value(result.promote_url);
          }
        }
      }
      if (result.exclude_channel) {
        var $excludeField = Aj.state.$form.field('exclude_channels');
        var excludeValueFull = $excludeField.data('valueFull');
        var already_excluded = false;
        excludeValueFull && $.each(excludeValueFull, function(val, item) {
          if (item.val == result.exclude_channel.id) {
            already_excluded = true;
          } else if (item._auto) {
            $excludeField.trigger('deselectval', [val]);
            $excludeField.data('prevval', '');
            if (Aj.state.autoExcluded) {
              delete Aj.state.autoExcluded[item.val];
            }
          }
        });
        if (!already_excluded) {
          if (!Aj.state.autoExcluded) {
            Aj.state.autoExcluded = {};
          }
          if (!Aj.state.autoExcluded[result.exclude_channel.id]) {
            var item = {
              val: result.exclude_channel.id,
              name: result.exclude_channel.title,
              photo: result.exclude_channel.photo,
              _auto: true
            };
            $excludeField.trigger('selectval', [item, true]);
            $excludeField.data('prevval', '');
            Aj.state.autoExcluded[result.exclude_channel.id] = true;
          }
        }
      }
      NewAd.updateAdPreview($form, result.preview_data);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
    });
  },
  onChannelSearch: function(field, value) {
    var $fieldEl = Aj.state.$form.field(field);
    var $formGroup = $fieldEl.parents('.form-group');
    var prev_value = $fieldEl.data('prevval');
    if (prev_value && prev_value == value) {
      return false;
    }
    $fieldEl.data('prevval', value);
    Ads.hideFieldError($fieldEl);
    if (!value) {
      return false;
    }
    var channels_limit = Aj.state.channelItemsLimit;
    if ($fieldEl.data('value').length >= channels_limit) {
      var selOpts = $fieldEl.data('selOpts');
      if (selOpts.l_channels_limit) {
        Ads.showFieldError($fieldEl, selOpts.l_channels_limit);
        return false;
      }
    }
    $formGroup.addClass('field-loading');
    Aj.apiRequest('searchChannel', {
      query: value,
      field: field
    }, function(result) {
      $formGroup.removeClass('field-loading');
      if (result.error) {
        Ads.showFieldError($fieldEl, result.error);
        return false;
      }
      if (result.channel) {
        var item = {
          val: result.channel.id,
          name: result.channel.title,
          photo: result.channel.photo,
          username: result.channel.username
        };
        $fieldEl.trigger('selectval', [item, true]);
        $fieldEl.data('prevval', '');
      }
    });
  },
  onSelectUpdate: function(field, value, valueFull) {
    var paired_field = null;
    if (field == 'topics') {
      paired_field = 'exclude_topics';
    } else if (field == 'exclude_topics') {
      paired_field = 'topics';
    } else if (field == 'channels') {
      paired_field = 'exclude_channels';
    } else if (field == 'exclude_channels') {
      paired_field = 'channels';
    }
    if (!paired_field) {
      NewAd.updateAdTargetOverview();
      return;
    }
    var $pairedField = Aj.state.$form.field(paired_field);
    if ($pairedField.data('inited')) {
      var paired_value = $pairedField.data('value');
      var paired_valueFull = $pairedField.data('valueFull');
      valueFull && $.each(valueFull, function(val, item) {
        if (paired_valueFull[val]) {
          $pairedField.trigger('deselectval', [val]);
          $pairedField.data('prevval', '');
        }
      });
    }
    NewAd.updateAdTargetOverview();
  },
  ePreviewAd: function(e) {
    e.preventDefault();
    NewAd.previewPopup();
  },
  updateAdPreview: function($form, previewData) {
    var $previewPopup = Aj.state.$previewPopup;
    var inPopup = $form.parents('.pr-layer-preview-ad').size() > 0;
    if (inPopup) {
      Aj.state.popupPreviewData = previewData;
      if ($previewPopup) {
        if (previewData) {
          $('.js-preview-from', $previewPopup).html(previewData.from);
          $('.js-preview-from', $previewPopup).attr('href', previewData.from_url);
          $('.js-promote-photo', $previewPopup).html(previewData.photo);
          $('.js-promote-photo-tooltip', $previewPopup).html(previewData.from);
          $('.js-preview-text', $previewPopup).html(previewData.text);
          $('.js-preview-button', $previewPopup).html(previewData.button);
          $('.js-preview-button', $previewPopup).attr('href', previewData.button_url);
          $('.js-preview-footer', $previewPopup).each(function() {
            Ads.updateTextShadow(this, '.ad-msg-text', '.label', 10);
          });
        }
        $('.js-promote-photo', $previewPopup).parents('.pr-form-control-wrap').toggleClass('has-photo', !!previewData);
        $('.js-preview', $previewPopup).toggleClass('active', !!previewData);
      }
    } else {
      Aj.state.previewData = previewData;
      if (previewData) {
        $('.js-promote-photo', Aj.state.$form).html(previewData.photo);
        $('.js-promote-photo-tooltip', Aj.state.$form).html(previewData.from);
      }
      $('.js-promote-photo', Aj.state.$form).parents('.pr-form-control-wrap').toggleClass('has-photo', !!previewData);
      $('.js-preview-link', Aj.state.$form).toggleClass('inactive', !previewData);
    }
  },
  checkBeforePreviewPopupUnload: function(load_fn) {
    var message = null;
    var curPreviewFormData = NewAd.getPreviewFormData();
    if (Aj.state.initPreviewFormData != curPreviewFormData) {
      message = l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
    }
    if (message) {
      var message_html = $('<div>').text(message).html();
      showConfirm(message_html, load_fn, l('WEB_LEAVE_PAGE', 'Leave'));
      return false;
    } else {
      load_fn();
      return true;
    }
  },
  previewPopup: function() {
    var state = Aj.state;
    if (!state.previewData) {
      return false;
    }
    var $previewPopup = $('<div class="popup-container hide alert-popup-container pr-popup-container">' + state.previewTpl + '</div>');
    state.$previewPopup = $previewPopup;
    var $form = state.$form;
    var text = $form.field('text').value();
    var promote_url = $form.field('promote_url').value();

    var $previewForm = $('.pr-new-form', $previewPopup);
    Ads.formInit($previewForm);
    $previewForm.on('submit', preventDefault);

    state.previewTextField = $previewForm.field('text');
    state.previewTextField.on('change.curPage', NewAd.onTextChange);
    state.previewTextField.value(text);
    state.previewTextField.on('input.curPage', NewAd.onTextInput);
    state.previewPromoteUrlField = $previewForm.field('promote_url');
    state.previewPromoteUrlField.on('change.curPage', NewAd.onPromoteUrlChange);
    state.previewPromoteUrlField.value(promote_url);

    NewAd.updateAdPreview($previewForm, state.previewData);
    NewAd.adPostCheck($previewForm);

    var previewSave = function() {
      var text = state.previewTextField.value();
      var promote_url = state.previewPromoteUrlField.value();
      $form.field('text').value(text).updateAutosize();
      $form.field('promote_url').value(promote_url);
      NewAd.updateAdPreview($form, state.popupPreviewData);
      NewAd.adPostCheck($form);
      delete state.popupPreviewData;
      delete state.$previewPopup;
      state.initPreviewFormData = NewAd.getPreviewFormData();
      closePopup($previewPopup);
    }
    var $submitBtn = $('.submit-form-btn', $previewPopup);
    $submitBtn.on('click', previewSave);
    var previewCancel = function() {
      state.initPreviewFormData = NewAd.getPreviewFormData();
      closePopup($previewPopup);
    }
    var $cancelBtn = $('.cancel-form-btn', $previewPopup);
    $cancelBtn.on('click', previewCancel);
    $previewPopup.one('popup:open', function() {
      $('.pr-preview-ad-message .ad-msg-date', $previewPopup).each(function() {
        Ads.updateTextShadow(this, '.ad-msg-text', '.label', 10);
      });
      state.previewTextField.updateAutosize();
      state.initPreviewFormData = NewAd.getPreviewFormData();
    });
    $previewPopup.one('popup:close', function() {
      Ads.formDestroy($previewForm);
      $previewForm.off('submit', preventDefault);
      delete state.$previewPopup;
      $submitBtn.off('click', previewSave);
      $cancelBtn.off('click', previewCancel);
      $previewPopup.remove();
    });
    openPopup($previewPopup, {
      closeByClickOutside: '.popup-no-close',
      onBeforeClose: function($popup) {
        var unloaded = NewAd.checkBeforePreviewPopupUnload(function() {
          var options = $popup.data('options');
          options.onBeforeClose = null;
          closePopup($popup);
        });
        return unloaded;
      }
    });
    return $previewPopup;
  },
  updateAdTargetOverview: function() {
    var len = {}, lang_params = {};
    for (var i = 0; i < Aj.state.selectList.length; i++) {
      var selectData = Aj.state.selectList[i];
      var field = selectData.field;
      var $field = Aj.state.$form.field(field);
      var value = $field.data('value') || [];
      var valueFull = $field.data('valueFull') || {};
      len[field] = value.length;
      if (value.length) {
        var list = [];
        for (var j = 0; j < value.length; j++) {
          var val = value[j], valFull = valueFull[val] || {};
          list.push(valFull.username ? '<a class="value" href="https://t.me/' + valFull.username + '" rel="noopener" target="_blank" dir="auto">' + valFull.name + '</a>' : '<span class="value" dir="auto">' + valFull.name + '</span>');
        }
        if (list.length > 1) {
          var last_item = list.pop();
          list[list.length - 1] = l('WEB_AD_TARGET_AND', {item1: list[list.length - 1], item2: last_item});
        }
        lang_params[field] = list.join(', ');
      } else {
        lang_params[field] = '';
      }
      Ads.hideFieldError($field);
    }
    if (!len.langs && len.topics) {
      Ads.showFieldError(Aj.state.$form.field('langs'), l('ADS_ERROR_LANGUAGE_REQUIRED'));
    }
    var overview = '';
    if (!len.langs && !len.topics && !len.channels ||
        !len.langs && len.topics) {
      overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_NOTHING') + '</div>';
    } else {
      if (len.langs > 0) {
        if (len.topics > 0) {
          overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_TOPICS', lang_params) + '</div>';
        } else {
          overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_LANGS', lang_params) + '</div>';
        }
      }
      if (len.channels > 0) {
        overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_CHANNELS', lang_params) + '</div>';
      }
      if (len.exclude_topics > 0) {
        overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_EXCLUDE_TOPICS', lang_params) + '</div>';
      }
      if (len.exclude_channels > 0) {
        overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_EXCLUDE_CHANNELS', lang_params) + '</div>';
      }
    }
    $('.pr-target-overview', Aj.ajContainer).html(overview);
  },
  getFormData: function($form) {
    var form = $form.get(0);
    if (!form) return false;
    var values = [
      $form.field('title').value(),
      $form.field('text').value(),
      $form.field('promote_url').value(),
      $form.field('cpm').value(),
      $form.field('budget').value()
    ];
    for (var i = 0; i < Aj.state.selectList.length; i++) {
      var selectData = Aj.state.selectList[i];
      var vals = $form.field(selectData.field).data('value');
      values.push(vals.join(';'));
    }
    return values.join('|');
  },
  getPreviewFormData: function($form) {
    if (Aj.state.$previewPopup) {
      var $previewPopup = Aj.state.$previewPopup;
      var $previewForm = $('.pr-new-form', $previewPopup);
      if (!$previewForm.get(0)) return false;
      var values = [
        $previewForm.field('text').value(),
        $previewForm.field('promote_url').value()
      ];
      return values.join('|');
    }
    return false;
  },
  eSubmitForm: function(e) {
    e.preventDefault();
    var $form       = Aj.state.$form;
    var $button     = $(this);
    var title       = $form.field('title').value();
    var text        = $form.field('text').value();
    var promote_url = $form.field('promote_url').value();
    var cpm         = Ads.amountFieldValue($form, 'cpm');
    var budget      = Ads.amountFieldValue($form, 'budget');

    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    if (!text.length) {
      $form.field('text').focus();
      return false;
    }
    if (!promote_url.length) {
      $form.field('promote_url').focus();
      return false;
    }
    if (cpm === false) {
      $form.field('cpm').focus();
      return false;
    }
    if (budget === false) {
      $form.field('budget').focus();
      return false;
    }
    var params = {
      owner_id: Aj.state.ownerId,
      title: title,
      text: text,
      promote_url: promote_url,
      cpm: cpm,
      budget: budget
    };
    for (var i = 0; i < Aj.state.selectList.length; i++) {
      var selectData = Aj.state.selectList[i];
      var values = $form.field(selectData.field).data('value');
      params[selectData.field] = values.join(';');
    }
    NewAd.saveDraftAuto(true);
    $button.prop('disabled', true);
    Aj.apiRequest('createAd', params, function(result) {
      if (result.error) {
        $button.prop('disabled', false);
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      Aj.state.initFormData = NewAd.getFormData($form);
      NewAd.saveDraftAuto(true);
      if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    });
    return false;
  },
  eClearDraft: function(e) {
    e.preventDefault();
    NewAd.clearDraft();
  },
  saveDraftAuto: function(with_delay) {
    if (!with_delay) {
      NewAd.saveDraft();
    }
    clearTimeout(Aj.state.saveDraftTo);
    Aj.state.saveDraftTo = setTimeout(NewAd.saveDraftAuto, 3000, false);
  },
  saveDraft: function() {
    var $form       = Aj.state.$form;
    var title       = $form.field('title').value();
    var text        = $form.field('text').value();
    var promote_url = $form.field('promote_url').value();
    var cpm         = Ads.amountFieldValue($form, 'cpm');
    var budget      = Ads.amountFieldValue($form, 'budget');

    var curFormData = NewAd.getFormData($form);
    if (Aj.state.initFormData == curFormData) {
      return false;
    }
    var params = {
      owner_id: Aj.state.ownerId,
      title: title,
      text: text,
      promote_url: promote_url,
      cpm: cpm,
      budget: budget
    };
    for (var i = 0; i < Aj.state.selectList.length; i++) {
      var selectData = Aj.state.selectList[i];
      var values = $form.field(selectData.field).data('value');
      params[selectData.field] = values.join(';');
    }
    Aj.apiRequest('saveAdDraft', params, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      Aj.state.initFormData = curFormData;
      NewAd.saveDraftAuto(true);
      $('.pr-draft-btn-wrap').toggleClass('active', !!result.has_draft);
      // $('.pr-draft-btn-wrap').addClass('saved');
      // setTimeout(function() {
      //   $('.pr-draft-btn-wrap').removeClass('saved');
      // }, 1500);
    });
    return false;
  },
  clearDraft: function(callback) {
    var $form = Aj.state.$form;
    $form.field('title').value('');
    $form.field('text').value('');
    $form.field('promote_url').value('');
    $form.field('cpm').value('');
    $form.field('budget').value('');
    for (var i = 0; i < Aj.state.selectList.length; i++) {
      var selectData = Aj.state.selectList[i];
      var values = $form.field(selectData.field).trigger('reset');
    }
    Aj.state.titleField.focusAndSelect();
    NewAd.updateAdPreview(Aj.state.$form, false);
    var curFormData = NewAd.getFormData($form);
    var params = {
      owner_id: Aj.state.ownerId
    };
    $('.pr-draft-btn-wrap').removeClass('active');
    NewAd.saveDraftAuto(true);
    Aj.apiRequest('clearAdDraft', params, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      Aj.state.initFormData = curFormData;
      NewAd.saveDraftAuto(true);
      callback && callback();
    });
    return false;
  }
};

var Account = {
  formFields: [
    'full_name',
    'email',
    'phone_number',
    'country',
    'city'
  ],
  addFundsFormFields: [
    'adv_type',
    'products_desc',
    'ads_language',
    'annual_budget',
    'additional_comment',
  ],
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.account-edit-form', cont);
      Ads.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.save-info-btn', Account.eSubmitForm);
      cont.on('change.curPage', '.pr-form-control', Account.onFieldChange);
      Ads.initSelect(state.$form, 'channel', {
        items: Aj.state.channelItems || [],
        noMultiSelect: true,
        renderSelectedItem: function(val, item) {
          return '<div class="selected-item' + (item.photo ? ' has-photo' : '') + '" data-val="' + cleanHTML(val.toString()) + '">' + (item.photo ? '<div class="selected-item-photo">' + item.photo + '</div>' : '') + '<span class="close"></span><div class="label">' + item.name + '</div></div>';
        },
        onChange: Account.onChannelChange
      });
      Aj.onLoad(function(state) {
        state.initFormData = Account.getFormData(state.$form);
        Aj.onBeforeUnload(function() {
          var curFormData = Account.getFormData(state.$form);
          if (Aj.state.initFormData != curFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          return false;
        });
      });
    });
    Aj.onUnload(function(state) {
      Ads.formDestroy(state.$form);
      state.$form.off('submit', preventDefault);
    });
  },
  onFieldChange: function() {
    if (!$(this).hasClass('js-amount-input')) {
      Ads.hideFieldError($(this));
    }
  },
  onChannelChange: function(field, value, valueFull) {
    $accPhoto = $('.pr-account-button-wrap.current .pr-account-button-photo');
    $accTitle = $('.pr-account-button-wrap.current .pr-account-button-title');
    if (!$accPhoto.data('def-val')) {
      $accPhoto.data('def-val', $accPhoto.html());
    }
    if (!$accTitle.data('def-val')) {
      $accTitle.data('def-val', $accTitle.html());
    }
    $accPhoto.html(valueFull ? valueFull.photo : $accPhoto.data('def-val'));
    $accTitle.html(valueFull ? valueFull.name : $accTitle.data('def-val'));
    var $form = Aj.state.$form;
    for (var i = 0; i < Account.formFields.length; i++) {
      var field = Account.formFields[i];
      var value = $form.field(field).prop('disabled', !valueFull);
    }
  },
  getFormData: function($form) {
    var form = $form.get(0);
    if (!form) return false;
    var values = [];
    if (!Aj.state.ownerId) {
      var value = $form.field('channel').data('value');
      values.push(value);
    }
    for (var i = 0; i < Account.formFields.length; i++) {
      var field = Account.formFields[i];
      var value = $form.field(field).value();
      values.push(value);
    }
    return values.join('|');
  },
  eSubmitForm: function(e) {
    e.preventDefault();
    var $form   = Aj.state.$form;
    var $button = $(this);
    var params = {};
    if (Aj.state.ownerId) {
      params.owner_id = Aj.state.ownerId;
    } else {
      params.owner_id = $form.field('channel').data('value');
      if (!params.owner_id) {
        $form.field('channel').trigger('click');
        return false;
      }
    }
    for (var i = 0; i < Account.formFields.length; i++) {
      var field = Account.formFields[i];
      var value = $form.field(field).value();
      if (!value.length) {
        $form.field(field).focus();
        return false;
      }
      params[field] = value;
    }

    $button.prop('disabled', true);
    Aj.apiRequest('saveAccountInfo', params, function(result) {
      if (result.error) {
        $button.prop('disabled', false);
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      Aj.state.initFormData = Account.getFormData($form);
      if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    });
    return false;
  },
  initAddFunds: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.add-funds-req-form', cont);
      Ads.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.send-request-btn', Account.eSendAddFundsRequest);
      cont.on('change.curPage', '.pr-form-control', Account.onFieldChange);
      Ads.initSelect(state.$form, 'ads_language', {
        items: Aj.state.langItems || [],
        noMultiSelect: true,
        l_no_items_found: l('WEB_AD_NO_LANGS_FOUND'),
        onChange: Account.onFieldChange
      });
      state.confirmedCheckbox = state.$form.field('confirmed');
      state.confirmedCheckbox.on('change.curPage', Account.onConfirmedChange);
      Aj.onLoad(function(state) {
        state.initFormData = Account.getAddFundsFormData(state.$form);
        Aj.onBeforeUnload(function() {
          var curFormData = Account.getAddFundsFormData(state.$form);
          if (Aj.state.initFormData != curFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          return false;
        });
      });
    });
    Aj.onUnload(function(state) {
      Ads.formDestroy(state.$form);
      state.$form.off('submit', preventDefault);
    });
  },
  onConfirmedChange: function() {
    $('.send-request-btn', Aj.ajContainer).prop('disabled', !$(this).prop('checked'));
  },
  getAddFundsFormData: function($form) {
    var form = $form.get(0);
    if (!form) return false;
    var values = [];
    for (var i = 0; i < Account.formFields.length; i++) {
      var field = Account.formFields[i];
      var value = $form.field(field).value();
      values.push(value);
    }
    for (var i = 0; i < Account.addFundsFormFields.length; i++) {
      var field = Account.addFundsFormFields[i];
      var value = $form.field(field).value();
      values.push(value);
    }
    return values.join('|');
  },
  eSendAddFundsRequest: function(e) {
    e.preventDefault();
    var $form   = Aj.state.$form;
    var $button = $(this);
    var params = {
      owner_id: Aj.state.ownerId
    };
    for (var i = 0; i < Account.formFields.length; i++) {
      var field = Account.formFields[i];
      var value = $form.field(field).value();
      if (!value.length) {
        $form.field(field).focus();
        return false;
      }
      params[field] = value;
    }
    params.adv_type = $form.field('adv_type').value();
    params.products_desc = $form.field('products_desc').value();
    if (!params.products_desc.length) {
      $form.field('products_desc').focus();
      return false;
    }
    params.ads_language = $form.field('ads_language').data('value');
    if (!params.ads_language.length) {
      $form.field('ads_language').trigger('click');
      return false;
    }
    params.annual_budget = Ads.amountFieldValue($form, 'annual_budget');
    if (params.annual_budget === false) {
      $form.field('annual_budget').focus();
      return false;
    }
    params.additional_comment = $form.field('additional_comment').value();

    $button.prop('disabled', true);
    Aj.apiRequest('sendAddFundsRequest', params, function(result) {
      if (result.error) {
        $button.prop('disabled', false);
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      Aj.state.initFormData = Account.getAddFundsFormData($form);
      if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
      if (result.ok_msg) {
        showAlert(result.ok_msg);
      }
    });
    return false;
  }
};

var OwnerAds = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$searchField = $('.pr-search-input');
      state.$searchResults = $('.pr-table tbody');
      Ads.fieldInit(state.$searchField);
      cont.on('click.curPage', '.pr-cell-sort', OwnerAds.eSortList);

      state.$searchField.initSearch({
        $results: state.$searchResults,
        emptyQueryEnabled: true,
        updateOnInit: true,
        resultsNotScrollable: true,
        itemTagName: 'tr',
        enterEnabled: function() {
          return false;
        },
        renderItem: function(item, query) {
          var status_attrs = ' href="' + item.base_url + item.status_url + '" ' + (item.status_attrs || 'data-layer');
          var tme_link = item.tme_path ? '<a href="https://t.me/' + item.tme_path + '" target="_blank">' + item.tme_path + '</a>' : '<span class="pr-no-tme-link">' + l('WEB_ADS_NO_TME_LINK') + '</span>';
          return '<td><div class="pr-cell pr-cell-title"><a href="' + item.base_url + '">' + item.title + '</a></div></td><td><div class="pr-cell"><a href="' + item.base_url + '/stats" class="pr-link">' + item.views_str + '</a></div></td><td><div class="pr-cell"><a href="' + item.base_url + '/edit_cpm" data-layer>' + item.cpm_str + '</a></div></td><td><div class="pr-cell"><a href="' + item.base_url + '/edit_budget" data-layer>' + item.budget + '</a></div></td><td><div class="pr-cell"><a href="' + item.base_url + '" class="pr-link">' + item.target + '</a></div></td><td><div class="pr-cell">' + tme_link + '</div></td><td><div class="pr-cell"><a' + status_attrs + '>' + item.status + '</a></div></td><td><div class="pr-cell"><a href="' + item.base_url + '" class="pr-link">' + OwnerAds.formatTableDate(item.date) + '</a></div></td>';
        },
        renderLoading: function() {
          return '<tr><td colspan="8" class="pr-cell-empty"><div class="pr-cell">' + l('WEB_OWNER_ADS_LOADING') + '</div></td></tr>';
        },
        renderNoItems: function(query) {
          if (Aj.state.adsListIsLoading) {
            return '<tr><td colspan="8" class="pr-cell-empty-full"><div class="pr-cell">' + l('WEB_OWNER_ADS_LOADING') + '</div></td></tr>';
          }
          return '<tr><td colspan="8" class="pr-cell-empty-full"><div class="pr-cell">' + l('WEB_OWNER_NO_ADS') + '</div></td></tr>';
        },
        appendToItems: function(query, result_count) {
          if (Aj.state.adsListIsLoading && result_count > 0) {
            return '<tr><td colspan="8" class="pr-cell-empty"><div class="pr-cell">' + l('WEB_OWNER_ADS_LOADING') + '</div></td></tr>';
          }
          return '';
        },
        getData: function() {
          return OwnerAds.getAdsList();
        }
      });
    });
    Aj.onUnload(function(state) {
      Ads.fieldDestroy(state.$searchField);
      state.$searchField.destroySearch();
    });
  },
  formatTableDate: function(timestamp) {
    var date = new Date(timestamp * 1000);
    var j = date.getDate();
    var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    var y = date.getFullYear() % 100;
    return j + ' ' + M + ' ' + y + ' ' + formatTime(timestamp * 1000);
  },
  eSortList: function(e) {
    var $sortEl = $(this);
    var sortBy  = $sortEl.attr('data-sort-by');
    var sortAsc = $sortEl.hasClass('sort-asc');
    if (sortBy == Aj.state.adsListSortBy) {
      Aj.state.adsListSortAsc = !sortAsc;
    } else {
      Aj.state.adsListSortBy = sortBy;
      Aj.state.adsListSortAsc = false;
    }
    OwnerAds.updateAdsList();
    Aj.state.$searchField.trigger('datachange');
  },
  updateAdsList: function() {
    if (Aj.state.adsList) {
      var sortBy  = Aj.state.adsListSortBy;
      var sortAsc = Aj.state.adsListSortAsc;
      $('.pr-cell-sort').each(function() {
        var $sortEl = $(this);
        var curSortBy  = $sortEl.attr('data-sort-by');
        $sortEl.toggleClass('sort-active', sortBy == curSortBy);
        $sortEl.toggleClass('sort-asc', sortAsc && sortBy == curSortBy);
      });
      Aj.state.adsList.sort(function(ad1, ad2) {
        var v1 = sortAsc ? ad1 : ad2;
        var v2 = sortAsc ? ad2 : ad1;
        return (v1[sortBy] - v2[sortBy]) || (v1.date - v2.date);
      });
    }
  },
  processAdsList: function(result, opts) {
    opts = opts || {};
    if (result.items) {
      if (!Aj.state.adsList) {
        Aj.state.adsList = [];
      }
      for (var i = 0; i < result.items.length; i++) {
        var item = result.items[i];
        item.base_url = '/account/ad/' + item.ad_id;
        item._values = [
          item.title.toLowerCase(),
          item.tme_path.toLowerCase(),
        ];
        Aj.state.adsList.push(item);
      }
      OwnerAds.updateAdsList();
      Aj.state.$searchField.trigger('contentchange');
    }
    if (result.next_offset_id) {
      opts.offset = result.next_offset_id;
      OwnerAds.loadAdsList(opts);
    } else {
      Aj.state.adsListIsLoading = false;
      Aj.state.$searchField.trigger('dataready');
    }
  },
  loadAdsList: function(opts) {
    opts = opts || {};
    Aj.apiRequest('getAdsList', {
      owner_id: Aj.state.ownerId,
      offset_id: opts.offset
    }, function(result) {
      if (result.error) {
        if (!opts.retry) opts.retry = 1;
        else opts.retry++;
        setTimeout(function(){ OwnerAds.loadAdsList(opts); }, opts.retry * 1000);
      } else {
        if (opts.retry) {
          opts.retry = 0;
        }
        OwnerAds.processAdsList(result, opts);
      }
    });
  },
  getAdsList: function() {
    var _data = Aj.state.adsList;
    if (_data === false) {
      return false;
    } else if (_data) {
      return _data;
    }
    Aj.state.adsList = false;
    Aj.state.adsListIsLoading = true;
    if (Aj.state.initialAdsList) {
      setTimeout(function() {
        OwnerAds.processAdsList(Aj.state.initialAdsList);
      }, 10);
    } else {
      OwnerAds.loadAdsList({offset: 0});
    }
    return false;
  },
  updateAd: function(ad) {
    if (!Aj.state || !Aj.state.adsList) {
      return;
    }
    var adsList = Aj.state.adsList;
    for (var i = 0; i < adsList.length; i++) {
      if (ad.owner_id == adsList[i].owner_id &&
          ad.ad_id == adsList[i].ad_id) {
        ad.base_url = '/account/ad/' + ad.ad_id;
        ad._values = [
          ad.title.toLowerCase(),
          ad.tme_path.toLowerCase(),
        ];
        adsList[i] = ad;
        OwnerAds.updateAdsList();
        Aj.state.$searchField.trigger('contentchange');
        return;
      }
    }
  }
};

var ReviewAds = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.pr-search-form', cont);
      state.$form.on('submit', ReviewAds.onSubmit);
      state.$searchField = $('.pr-search-input', cont);
      Ads.fieldInit(state.$searchField);
      cont.on('click.curPage', '.pr-search-reset', ReviewAds.eClearSearch);
      cont.on('click.curPage', '.ad-approve-btn', ReviewAds.eApproveAd);
      cont.on('click.curPage', '.ad-decline-btn', ReviewAds.eDeclineAd);
      $(window).on('scroll resize', ReviewAds.onScroll);
      ReviewAds.onScroll();
    });
    Aj.onUnload(function(state) {
      state.$form.off('submit', ReviewAds.onSubmit);
      Ads.fieldDestroy(state.$searchField);
      $(window).off('scroll resize', ReviewAds.onScroll);
    });
  },
  onScroll: function() {
    $('.js-load-more').each(function() {
      var $loadMore = $(this);
      var top = $loadMore.offset().top - $(window).scrollTop();
      if (top < $(window).height() * 2) {
        ReviewAds.load($loadMore);
      }
    });
  },
  load: function($loadMore) {
    var offset = $loadMore.attr('data-offset');
    if (!offset) {
      $loadMore.remove();
    }
    if ($loadMore.data('loading')) {
      return;
    }
    var params = Aj.state.filterParams;
    params.offset_id = offset;
    var $loadMoreBtn = $('.pr-load-more', $loadMore);
    $loadMoreBtn.data('old-text', $loadMoreBtn.text()).text($loadMoreBtn.data('loading')).addClass('dots-animated');
    $loadMore.data('loading', true);
    Aj.apiRequest('loadReviewedAds', params, function(result) {
      $loadMore.data('loading', false);
      if (result.ads_html) {
        var $loadMoreCont = $loadMore.closest('.pr-review-list');
        if ($loadMoreCont.size()) {
          $loadMore.remove();
          $loadMoreCont.append(result.ads_html);
          Ads.updateAdMessagePreviews($loadMoreCont);
        } else {
          var $loadMoreBtn = $('.pr-load-more', $loadMore);
          $loadMoreBtn.text($loadMoreBtn.data('old-text')).removeClass('dots-animated');
        }
        ReviewAds.onScroll();
      }
    });
  },
  onSubmit: function(e) {
    e.preventDefault();
    var href = this.action;
    if (this.query.value) {
      href += href.indexOf('?') >= 0 ? '&' : '?';
      href += 'query=' + encodeURIComponent(this.query.value);
    }
    Aj.location(href);
  },
  eClearSearch: function(e) {
    Aj.state.$form.submit();
  },
  eApproveAd: function(e) {
    e.preventDefault();
    var $ad      = $(this).parents('.js-review-item');
    var owner_id = $ad.attr('data-owner-id');
    var ad_id    = $ad.attr('data-ad-id');
    var $buttons = $ad.find('.pr-btn');

    if ($buttons.prop('disabled')) {
      return false;
    }
    $buttons.prop('disabled', true);
    Aj.apiRequest('approveAd', {
      owner_id: owner_id,
      ad_id: ad_id
    }, function(result) {
      $buttons.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.status_html) {
        $ad.find('.js-review-ad-status').html(result.status_html);
      }
      if (result.buttons_html) {
        $ad.find('.js-review-buttons').html(result.buttons_html);
      }
    });
    return false;
  },
  eDeclineAd: function(e) {
    e.preventDefault();
    var $ad       = $(this).parents('.js-review-item');
    var owner_id  = $ad.attr('data-owner-id');
    var ad_id     = $ad.attr('data-ad-id');
    var $buttons  = $ad.find('.pr-btn');
    var reason_id = $(this).attr('data-reason-id');

    if ($buttons.prop('disabled')) {
      return false;
    }
    $buttons.prop('disabled', true);
    Aj.apiRequest('declineAd', {
      owner_id: owner_id,
      ad_id: ad_id,
      reason_id: reason_id
    }, function(result) {
      $buttons.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.status_html) {
        $ad.find('.js-review-ad-status').html(result.status_html);
      }
      if (result.buttons_html) {
        $ad.find('.js-review-buttons').html(result.buttons_html);
      }
    });
    return false;
  }
};

var EditAd = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.pr-new-form', cont);
      Ads.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.js-preview-link', NewAd.ePreviewAd);
      cont.on('click.curPage', '.edit-ad-btn', EditAd.eSubmitForm);
      cont.on('click.curPage', '.js-clone-ad-btn', EditAd.eCloneAd);
      cont.on('click.curPage', '.delete-ad-btn', EditAd.deleteAd);
      cont.on('click.curPage', '.pr-form-select', EditAd.eSelectPlaceholder);
      state.titleField = state.$form.field('title');
      state.titleField.on('change.curPage', NewAd.onTitleChange);
      state.textField = state.$form.field('text');
      state.textField.on('change.curPage', NewAd.onTextChange);
      state.textField.on('input.curPage', NewAd.onTextInput);
      state.promoteUrlField = state.$form.field('promote_url');
      state.promoteUrlField.on('change.curPage', NewAd.onPromoteUrlChange);
      NewAd.updateAdPreview(state.$form, state.previewData);
      Aj.onLoad(function(state) {
        state.initFormData = EditAd.getFormData(state.$form);
        state.initPreviewFormData = NewAd.getPreviewFormData();
        Aj.onBeforeUnload(function() {
          var curPreviewFormData = NewAd.getPreviewFormData();
          if (Aj.state.initPreviewFormData != curPreviewFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          var curFormData = EditAd.getFormData(state.$form);
          if (Aj.state.initFormData != curFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          return false;
        });
      });
    });
    Aj.onUnload(function(state) {
      Ads.formDestroy(state.$form);
      state.$form.off('submit', preventDefault);
      state.titleField.off('.curPage');
      state.textField.off('.curPage');
      state.promoteUrlField.off('.curPage');
    });
  },
  getFormData: function($form) {
    var form = $form.get(0);
    if (!form) return false;
    var values = [
      $form.field('title').value(),
      $form.field('text').value(),
      $form.field('promote_url').value(),
      $form.field('cpm').value(),
    ];
    return values.join('|');
  },
  eSelectPlaceholder: function() {
    Ads.showHint($('.pr-form-control-hint', this), 50, 2000);
  },
  initEditTitlePopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.titleField = layerState.$form.field('title');
      layerState.titleField.on('change.curPage', NewAd.onTitleChange);
      Aj.layer.one('popup:open', function() {
        layerState.titleField.focusAndSelect(true);
      });
      layerState.$form.on('submit', EditAd.eSubmitEditTitlePopupForm);
      cont.on('click.curLayer', '.submit-form-btn', EditAd.eSubmitEditTitlePopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', EditAd.eSubmitEditTitlePopupForm);
      layerState.titleField.off('.curPage');
    });
  },
  eSubmitEditTitlePopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var title    = $form.field('title').value();
    if ($form.data('disabled')) {
      return false;
    }
    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      title:    title
    };
    $form.data('disabled', true);
    Aj.apiRequest('editAdTitle', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (result.ad) {
        OwnerAds.updateAd(result.ad);
      }
    });
    return false;
  },
  initEditCPMPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.cpmField = layerState.$form.field('cpm');
      Aj.layer.one('popup:open', function() {
        layerState.cpmField.focusAndSelect(true);
      });
      layerState.$form.on('submit', EditAd.eSubmitEditCPMPopupForm);
      cont.on('click.curLayer', '.submit-form-btn', EditAd.eSubmitEditCPMPopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', EditAd.eSubmitEditCPMPopupForm);
    });
  },
  eSubmitEditCPMPopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var cpm      = Ads.amountFieldValue($form, 'cpm');

    if ($form.data('disabled')) {
      return false;
    }
    if (cpm === false) {
      $form.field('cpm').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      cpm:      cpm
    };
    $form.data('disabled', true);
    Aj.apiRequest('editAdCPM', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (result.ad) {
        OwnerAds.updateAd(result.ad);
      }
    });
    return false;
  },
  initEditBudgetPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.budgetField = layerState.$form.field('budget');
      Aj.layer.one('popup:open', function() {
        layerState.budgetField.focusAndSelect(true);
      });
      layerState.$form.on('submit', EditAd.eSubmitEditBudgetPopupForm);
      cont.on('click.curLayer', '.submit-form-btn', EditAd.eSubmitEditBudgetPopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', EditAd.eSubmitEditBudgetPopupForm);
    });
  },
  eSubmitEditBudgetPopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var budget   = Ads.amountFieldValue($form, 'budget');

    if ($form.data('disabled')) {
      return false;
    }
    if (budget === false) {
      $form.field('budget').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      budget:   budget,
      popup:    1
    };
    $form.data('disabled', true);
    Aj.apiRequest('incrAdBudget', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (result.ad) {
        OwnerAds.updateAd(result.ad);
      }
      if (result.owner_budget) {
        $('.js-owner_budget').html(result.owner_budget);
      }
      if (result.ad_budget_val) {
        $('.js-ad_budget_val').value(result.ad_budget_val);
      }
    });
    return false;
  },
  initEditStatusPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.$form.on('submit', EditAd.eSubmitEditStatusForm);
      cont.on('click.curLayer', '.submit-form-btn', EditAd.eSubmitEditStatusForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', EditAd.eSubmitEditStatusForm);
    });
  },
  eSubmitEditStatusForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var active   = $form.field('active').value();
    if ($form.data('disabled')) {
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      active:   active
    };
    $form.data('disabled', true);
    Aj.apiRequest('editAdStatus', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (result.ad) {
        OwnerAds.updateAd(result.ad);
      }
    });
    return false;
  },
  initShareStatsPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$urlField = $('.js-share-url', cont);
      layerState.$copyBtn = $('.js-copy-link', cont);
      layerState.$revokeBtn = $('.js-revoke-link', cont);
      layerState.$urlField.on('click', EditAd.eSelectUrl);
      layerState.$copyBtn.on('click', EditAd.eCopyUrl);
      layerState.$revokeBtn.on('click', EditAd.eRevokeUrl);
    });
    Aj.onLayerUnload(function(layerState) {
      layerState.$urlField.off('click', EditAd.eSelectUrl);
      layerState.$copyBtn.off('click', EditAd.eCopyUrl);
      layerState.$revokeBtn.off('click', EditAd.eRevokeUrl);
    });
  },
  eSelectUrl: function() {
    Aj.layerState.$urlField.focusAndSelectAll();
  },
  eCopyUrl: function(copy) {
    Aj.layerState.$urlField.focusAndSelectAll();
    document.execCommand('copy');
    showToast(l('WEB_AD_STATS_LINK_COPIED', 'Copied.'));
  },
  eRevokeUrl: function(e) {
    e.preventDefault();
    var $btn = $(this);
    if ($btn.data('disabled')) {
      return false;
    }
    var params = {
      owner_id: Aj.layerState.ownerId,
      ad_id:    Aj.layerState.adId
    };
    $btn.data('disabled', true);
    Aj.apiRequest('revokeStatsUrl', params, function(result) {
      $btn.data('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.new_url) {
        Aj.layerState.$urlField.value(result.new_url);
      }
      if (result.toast) {
        showToast(result.toast);
      }
    });
    return false;
  },
  initIncrBudget: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.pr-incr-budget-form', cont);
      Ads.formInit(state.$form);
      state.budgetField = state.$form.field('budget');
      state.$form.on('submit', EditAd.eSubmitIncrBudgetForm);
      cont.on('click.curPage', '.submit-form-btn', EditAd.eSubmitIncrBudgetForm);
    });
    Aj.onUnload(function(state) {
      Ads.formDestroy(state.$form);
      state.$form.off('submit', EditAd.eSubmitIncrBudgetForm);
    });
  },
  eSubmitIncrBudgetForm: function(e) {
    e.preventDefault();
    var $form    = Aj.state.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var budget   = Ads.amountFieldValue($form, 'budget');

    if ($form.data('disabled')) {
      return false;
    }
    if (budget === false) {
      $form.field('budget').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      budget:   budget
    };
    $form.data('disabled', true);
    Aj.apiRequest('incrAdBudget', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      Aj.state.$form.reset();
      if (result.owner_budget) {
        $('.js-owner_budget').html(result.owner_budget);
      }
      if (result.ad_budget) {
        $('.js-ad_budget').html(result.ad_budget);
      }
      if (result.history) {
        $('.js-history').html(result.history);
      }
    });
    return false;
  },
  eSubmitForm: function(e) {
    e.preventDefault();
    var $form       = Aj.state.$form;
    var $button     = $(this);
    var title       = $form.field('title').value();
    var text        = $form.field('text').value();
    var promote_url = $form.field('promote_url').value();
    var cpm         = Ads.amountFieldValue($form, 'cpm');

    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    if (!text.length) {
      $form.field('text').focus();
      return false;
    }
    if (!promote_url.length) {
      $form.field('promote_url').focus();
      return false;
    }
    if (cpm === false) {
      $form.field('cpm').focus();
      return false;
    }
    var params = {
      owner_id: Aj.state.ownerId,
      ad_id: Aj.state.adId,
      title: title,
      text: text,
      promote_url: promote_url,
      cpm: cpm
    };
    $button.prop('disabled', true);
    Aj.apiRequest('editAd', params, function(result) {
      if (result.error) {
        $button.prop('disabled', false);
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      Aj.state.initFormData = EditAd.getFormData($form);
      if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    });
    return false;
  },
  eCloneAd: function(e) {
    e.preventDefault();
    var $button = $(this);
    if ($button.prop('disabled')) {
      return false;
    }
    var params = {
      owner_id: Aj.state.ownerId,
      ad_id: Aj.state.adId
    };
    var onSuccess = function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.confirm_text && result.confirm_hash) {
        showConfirm(result.confirm_text, function() {
          params.confirm_hash = result.confirm_hash;
          $button.prop('disabled', true);
          Aj.apiRequest('createDraftFromAd', params, onSuccess);
        }, result.confirm_btn);
      } else if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    };
    $button.prop('disabled', true);
    Aj.apiRequest('createDraftFromAd', params, onSuccess);
    return false;
  },
  deletePopup: function (confirm_text, onConfirm) {
    var $confirm = $('<div class="popup-container hide alert-popup-container"><section class="pr-layer-popup pr-layer-delete-ad popup-no-close"><h3 class="pr-layer-header">' + l('WEB_DELETE_AD_CONFIRM_HEADER') + '</h3><p class="pr-layer-text"></p><div class="tgme_popup_buttons"><div class="tgme_popup_button popup-cancel-btn">' + l('WEB_POPUP_CANCEL_BTN') + '</div><div class="tgme_popup_button popup-primary-btn">' + l('WEB_DELETE_AD_CONFIRM_BUTTON') + '</div></div></section></div>');
    var confirm = function() {
      onConfirm && onConfirm($confirm);
      closePopup($confirm);
    }
    $('.pr-layer-text', $confirm).html(confirm_text);
    var $primaryBtn = $('.popup-primary-btn', $confirm);
    $primaryBtn.on('click', confirm);
    $confirm.one('popup:close', function() {
      $primaryBtn.off('click', confirm);
      $confirm.remove();
    });
    openPopup($confirm, {
      closeByClickOutside: '.popup-no-close',
    });
    return $confirm;
  },
  deleteAd: function(e) {
    e.preventDefault();
    var $button = $(this);
    if ($button.prop('disabled')) {
      return false;
    }
    var params = {
      owner_id: Aj.state.ownerId,
      ad_id: Aj.state.adId
    };
    var onSuccess = function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.confirm_text && result.confirm_hash) {
        EditAd.deletePopup(result.confirm_text, function() {
          params.confirm_hash = result.confirm_hash;
          $button.prop('disabled', true);
          Aj.apiRequest('deleteAd', params, onSuccess);
        });
      } else if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    };
    $button.prop('disabled', true);
    Aj.apiRequest('deleteAd', params, onSuccess);
    return false;
  }
};



(function(d){var c=function(a){this._options={checkOnLoad:!1,resetOnEnd:!1,loopCheckTime:50,loopMaxNumber:5,baitClass:"pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links ads-header ads-content",baitStyle:"width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;"};this._var={version:"3.2.1",bait:null,checking:!1,loop:null,loopNumber:0,event:{detected:[],notDetected:[]}};void 0!==a&&this.setOption(a);var b=this;a=function(){setTimeout(function(){!0===b._options.checkOnLoad&&(null===b._var.bait&&b._creatBait(),setTimeout(function(){b.check()},1))},1)};void 0!==d.addEventListener?d.addEventListener("load",a,!1):d.attachEvent("onload",a)};c.prototype._options=null;c.prototype._var=null;c.prototype._bait=null;c.prototype.setOption=function(a,b){if(void 0!==b){var e=a;a={};a[e]=b}for(var f in a)this._options[f]=a[f];return this};c.prototype._creatBait=function(){var a=document.createElement("div");a.setAttribute("class",this._options.baitClass);a.setAttribute("style",this._options.baitStyle);this._var.bait=d.document.body.appendChild(a);this._var.bait.offsetParent;this._var.bait.offsetHeight;this._var.bait.offsetLeft;this._var.bait.offsetTop;this._var.bait.offsetWidth;this._var.bait.clientHeight;this._var.bait.clientWidth};c.prototype._destroyBait=function(){d.document.body.removeChild(this._var.bait);this._var.bait=null};c.prototype.check=function(a){void 0===a&&(a=!0);this._var.checking=!0;null===this._var.bait&&this._creatBait();var b=this;this._var.loopNumber=0;!0===a&&(this._var.loop=setInterval(function(){b._checkBait(a)},this._options.loopCheckTime));setTimeout(function(){b._checkBait(a)},1);return!0};c.prototype._checkBait=function(a){var b=!1;null===this._var.bait&&this._creatBait();if(null!==d.document.body.getAttribute("abp")||null===this._var.bait.offsetParent||0==this._var.bait.offsetHeight||0==this._var.bait.offsetLeft||0==this._var.bait.offsetTop||0==this._var.bait.offsetWidth||0==this._var.bait.clientHeight||0==this._var.bait.clientWidth)b=!0;if(void 0!==d.getComputedStyle){var e=d.getComputedStyle(this._var.bait,null);!e||"none"!=e.getPropertyValue("display")&&"hidden"!=e.getPropertyValue("visibility")||(b=!0)}!0===a&&(this._var.loopNumber++,this._var.loopNumber>=this._options.loopMaxNumber&&this._stopLoop());if(!0===b)this._stopLoop(),this._destroyBait(),this.emitEvent(!0),!0===a&&(this._var.checking=!1);else if(null===this._var.loop||!1===a)this._destroyBait(),this.emitEvent(!1),!0===a&&(this._var.checking=!1)};c.prototype._stopLoop=function(a){clearInterval(this._var.loop);this._var.loop=null;this._var.loopNumber=0};c.prototype.emitEvent=function(a){a=this._var.event[!0===a?"detected":"notDetected"];for(var b in a)if(a.hasOwnProperty(b))a[b]();!0===this._options.resetOnEnd&&this.clearEvent();return this};c.prototype.clearEvent=function(){this._var.event.detected=[];this._var.event.notDetected=[]};c.prototype.on=function(a){this._var.event.detected.push(a);return this};d.ABC=c;void 0===d.AB&&(d.AB=new c({checkOnLoad:!0,resetOnEnd:!0}))})(window);
AB.on(function() {
  openPopup('<div class="popup-container hide alert-popup-container"><section class="pr-layer-popup pr-layer-delete-ad popup-no-close"><h3 class="pr-layer-header">' + l('WEB_AB_WARNING_HEADER') + '</h3><p class="pr-layer-text">' + l('WEB_AB_WARNING_TEXT') + '</p><div class="tgme_popup_buttons"><div class="tgme_popup_button popup-cancel-btn">' + l('WEB_POPUP_CLOSE_BTN', 'Close') + '</div></div></section></div>');
});

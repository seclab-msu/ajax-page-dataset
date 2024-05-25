(function($) {

    var GeoIPModuleDialog = function(o, el) {
        this.o = $.extend({autoOpen: false}, o);
        this.el = el;
        this.prefix = 'geoip-';

        this.modal = $('<div class="' + this.prefix + 'modal ' + this.prefix + 'fade"></div>');
        this.backdrop = $('<div class="' + this.prefix + 'backdrop ' + this.prefix + 'fade"></div>').height($(window).height());
        this.dialog = $('<div class="' + this.prefix + 'modal-dialog"></div>');
        this.content = $('<div class="' + this.prefix + 'modal-content"></div>');
        var close = $('<div class="' + this.prefix + 'close">&times;</div>');
        this.content.append(close);
        $('body').append(this.modal.append(this.backdrop, this.dialog.append(this.content.append(el))));

        var self = this;

        $(window).resize(function() {
            self.backdrop.height($(window).height());
        });

        if (this.o.autoOpen) {
            this.open();
        } else {
            this.close();
        }

        close.click(function() {
            self.close();
        });

        this.backdrop.click(function() {
            self.close();
        });

        $(document).keydown(function(e) {
            if (e.which == 27) {
                self.close();
            }
        });
    };

    GeoIPModuleDialog.prototype.open = function() {
        $('body').addClass(this.prefix + 'modal-open');
        this.modal.addClass(this.prefix + 'in').show();
        this.backdrop.addClass(this.prefix + 'in');

        if (this.o.open) {
            this.o.open.apply(this);
        }
    };

    GeoIPModuleDialog.prototype.close = function() {
        $('body').removeClass(this.prefix + 'modal-open');
        this.modal.removeClass(this.prefix + 'in').hide();
        this.backdrop.removeClass(this.prefix + 'in');
    };

    var methods = {
        init: function(o) {
            return this.each(function() {
                var self = $(this),
                    data = self.data('GeoIPModuleDialog');

                if (!data) {
                    self.data('GeoIPModuleDialog', {target: self, obj: new GeoIPModuleDialog(o, self)});
                }
            });
        },
        open: function() {
            $(this).data('GeoIPModuleDialog').obj.open();
        },
        close: function() {
            $(this).data('GeoIPModuleDialog').obj.close();
        }
    };

    $.fn.geoipModuleDialog = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }

        return false;
    }
})(jQuery);

(function($) {

    var DialogUi = {
        createConfirm: function(self) {
            self.confirmBlock.attr('title', self.lang['yourZone']);
            var buttons = {};
            buttons[self.lang['btnYes']] = function() {
                $(this).dialog('close');
            };
            buttons[self.lang['btnNo']] = function() {
                $(this).dialog('close');
                self.chooseBlock.dialog('open');
            };

            self.confirmBlock.dialog({
                autoOpen: true,
                height:   180,
                width:    350,
                modal:    false,
                position: [self.el.offset().left + self.el.width() - 352, self.el.offset().top + 22],
                buttons:  buttons
            });

        },
        createChoose: function(self) {
            self.chooseBlock.dialog({
                autoOpen:  false,
                minWidth:  600,
                minHeight: 300,
                modal:     true,
                open:      function() {
                    self.loadCities();

                    $('.ui-widget-overlay').click(function() {
                        self.chooseBlock.dialog("close");
                    });
                }
            });
        },
        openChoose: function(self) {
            self.chooseBlock.dialog('open');
        },
        closeChoose: function(self) {
            self.chooseBlock.dialog('close');
        }
    };

    var DialogCustom = {
        createConfirm: function(self) {
            self.confirmBlock.addClass('geoip-custom-popup');

            self.confirmBlock.append('<div class="geoip-confirm-buttons"><input type="button" class="geoip-confirm-yes" value="' + self.lang['btnYes'] + '">'
            + ' <input type="button" class="geoip-confirm-no" value="' + self.lang['btnNo'] + '"> </div>');

            self.confirmBlock.find('.geoip-confirm-yes').click(function() {
                self.confirmBlock.hide();
            });

            self.confirmBlock.find('.geoip-confirm-no').click(function() {
                self.confirmBlock.hide();
                DialogCustom.openChoose(self);
            });
        },
        createChoose:  function(self) {
            self.chooseBlock.addClass('geoip-custom-popup');
            self.chooseBlock.geoipModuleDialog();
        },
        openChoose:    function(self) {
            if (self.citiesLoaded) {
                self.chooseBlock.geoipModuleDialog('open');
            } else {
                self.loadCities(function() {
                    self.chooseBlock.geoipModuleDialog('open');
                });
            }
        },
        closeChoose:   function(self) {
           self.chooseBlock.geoipModuleDialog('close');
        }
    };

    var GeoIPModule = function(o, el) {
        this.o = $.extend({fromAjax: false, ruleFromAjax: false, confirmRegion: false, dialogView: 'custom', httpServer: location.host, lang: {}}, o);
        this.lang = this.o.lang;
        this.http_host = location.protocol + '//' + this.o.httpServer + '/';
        this.el = el;
        this.citiesLoaded = false;
        var self = this;
        var dialogs = this.o.dialogView == 'jquery-ui' ? DialogUi : DialogCustom;

        el.addClass('geoip-module').append('<div class="geoip-text"></div>');

        if (this.o.fromAjax) {
            $.get(this.http_host + 'index.php?route=module/geoip/getCity',
                function(json) {
                    el.find('.geoip-text').html(self.lang['yourZone'] + ': <span class="zone">' + json.zone + '</span>');
                },
                'json'
            );
        } else {
            el.find('.geoip-text').html(self.lang['yourZone'] + ': <span class="zone">' + self.lang['zoneName'] + '</span>');
        }

        this.chooseBlock = $('<div class="geoip-choose-region"></div>');
        el.after(this.chooseBlock);
        dialogs.createChoose(this);

        this.chooseBlock.on('click', '.choose-city', function() {
            self.setRegion($(this).attr('data-id'));
            dialogs.closeChoose(self);
            return false;
        });

        el.on('click', '.geoip-text', function() {
            dialogs.openChoose(self);
        });

        if (this.o.confirmRegion) {
            this.confirmBlock = $('<div class="geoip-confirm-region">' + this.lang['confirmRegion'] + '</div>');
            el.append(this.confirmBlock);
            dialogs.createConfirm(self);
        }

        this.setRules();
    };

    GeoIPModule.prototype.loadCities = function(callback) {
        var self = this;
        if (!this.citiesLoaded) {
            $.ajax({
                url:      self.http_host + 'index.php?route=module/geoip/getList',
                dataType: 'html',
                success:  function(html) {
                    self.chooseBlock.html(html);
                    var input = self.chooseBlock.find('.geoip-popup-input');
                    self.autocomplete(input, self.chooseBlock.find('.geoip-block'));
                    input.focus();
                    self.citiesLoaded = true;
                    callback.apply();
                }
            });
        }
    };

    GeoIPModule.prototype.autocomplete = function(el, appendTo) {
        var xhr = false;
        var self = this;

        el.autocomplete({
            search:    function() {
                if (xhr) {
                    xhr.abort();
                }
            },
            source: self.http_host + 'index.php?route=module/geoip/search',
            minLength: 2,
            appendTo:  appendTo,
            select:    function(e, ui) {
                self.setRegion(ui.item.fias_id);
            }
        });
    };

    GeoIPModule.prototype.setRegion = function(id) {
        $.ajax({
            url: this.http_host + 'index.php?route=module/geoip/save&fias_id=' + id,
            success: function(data) {
                location.reload();
            }
        });
    };

    GeoIPModule.prototype.setRules = function() {
        if (this.o.ruleFromAjax) {
            $.get(this.http_host + 'index.php?route=module/geoip/getRules', function(json) {
                if (json.rules) {
                    $('.geoip-rule').each(function() {
                        if (json.rules[$(this).attr('data-key')]) {
                            $(this).after(json.rules[$(this).attr('data-key')]);
                        } else if ($(this).attr('data-default')) {
                            $(this).after($(this).attr('data-default'));
                        }
                        $(this).remove();
                    });
                } else {
                    $('.geoip-rule').each(function() {
                        if ($(this).attr('data-default')) {
                            $(this).after($(this).attr('data-default'));
                        }
                        $(this).remove();
                    });
                }
            }, 'json');
        }
    };

    var methods = {
        init: function(o) {
            return this.each(function() {
                var self = $(this),
                    data = self.data('GeoIPModule');

                if (!data) {
                    self.data('GeoIPModule', {target: self, obj: new GeoIPModule(o, self)});
                }
            });
        }
    };

    $.fn.geoipModule = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }

        return false;
    }

})(jQuery);
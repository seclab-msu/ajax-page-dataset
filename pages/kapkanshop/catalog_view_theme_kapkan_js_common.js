if (!window.fireProductInfoEvent) window.fireProductInfoEvent = () => false; // dev fix

(function ($) {
    jQuery.fn.lightTabs = function (options) {

        var createTabs = function () {
            tabs = this;
            i = 0;
            // console.log(this);
            showPage = function (tabs, i) {
                $(tabs).children("div").children("div").hide();
                $(tabs).children("div").children("div").eq(i).show();
                $(tabs).children("ul").children("li").removeClass("active");
                $(tabs).children("ul").children("li").eq(i).addClass("active");
            }

            showPage(tabs, 0);

            $(tabs).children("ul").children("li").each(function (index, element) {
                $(element).attr("data-page", i);
                i++;
            });

            $(tabs).children("ul").children("li").click(function () {
                showPage($(this).parent().parent(), parseInt($(this).attr("data-page")));
            });
        };
        return this.each(createTabs);
    };
})(jQuery);

var geocode;

function buttonUp() {
    var inputVal = $('.searchbox-input').val();
    inputVal = $.trim(inputVal).length;
    if (inputVal !== 0) {
        $('.searchbox-icon').css('display', 'none');
    } else {
        $('.searchbox-input').val('');
        $('.searchbox-icon').css('display', 'block');
    }
}

function initMap() {
    if(!geocode) {
        $.ajax({
            url: 'index.php?route=common/header/getGeo',
            type: 'post',
            dataType: 'json',
            success: function (json) {
                if(json.error) {
                    console.log(json.error);
                } else {
                    geocode = json;

                    var map = new google.maps.Map(document.getElementById('map_contact'), {
                        zoom: 15,
                        center: geocode
                    });
                    var marker = new google.maps.Marker({
                        position: geocode,
                        map: map
                    });
                    $('.box-modal-google-map').arcticmodal();
                }
            }
        });
    } else {
        $('.box-modal-google-map').arcticmodal();
    }
}

$(document).on('ready', function () {
    $('.filter-chek-open').click(function(){
        $( this ).prev().animate({height: ['toggle', 'swing'],});
        $( this ).toggle();
        $( this ).next().toggle();
    });
    $('.filter-chek-close').click(function(){
        $( this ).prev().prev().animate({height: ['toggle', 'swing'],});
        $( this ).toggle();
        $( this ).prev().toggle();
    });

    $(".main-category-slider, .main-product-slider").slick({
        dots: false,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1270,
                settings: {
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 890,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                }
            }
        ]
    });
    $(".main-brand-slider").slick({
        dots: false,
        arrows: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1270,
                settings: {
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 7,
                }
            },
            {
                breakpoint: 990,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 850,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 440,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 2,
                }
            }
        ]
    });
    $(".main-header-slider").slick({
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $(".fast-buy-slider").slick({
        dots: true,
        arrows: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $(".slider-single-product").slick({
        dots: false,
        arrows: false,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-single-product-nav',
    });
    $('.slider-single-product-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.slider-single-product',
        dots: false,
        arrows: true,
        vertical: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1070,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 2,
                    vertical: false,
                }
            }
        ]
    });


    var windload = $( window ).width();

    if(windload < 1120) {

        $('.sub-menu-btn').click(function(e) {



            if ($(this).find('.container-sub-menu').length > 0) {
                e.preventDefault();
                $(this).find('.container-sub-menu').css({
                    'left': 0,
                    'transition': 'left 500ms 1ms',
                    'width': '100%',
                    'overflow': 'visible'
                });
            } else {
                console.log('no')
            }
        });

        $('.container-sub-menu a').click(function () {
            window.location = this.href;
        });

        $('.sub-menu--back').click(function() {
            setTimeout(function() {
                $('.sub-menu--back').parents('.container-sub-menu').css({
                    'left': '100%',
                    'transition': 'left 500ms',
                });
            }, 1);

            setTimeout(function() {
                $('.sub-menu--back').parents('.container-sub-menu').css({
                    'width': '0',
                    'overflow': 'hidden'
                });
            }, 501);
        });
    }

    $(document).on('click', '.checkout-block-title-btn', function () {
        $(this).next().animate({height: ['toggle', 'swing'],});
        $(this).toggleClass("open");
    });
    $('.checkout-type-delivery-container > .info span').click(function (e) {
        e.stopPropagation();
        $(this).prev().toggleClass("open");
    });

    $('.header-menu-open').click(function(){
        $(".header-menu-block").animate({height: ['toggle', 'swing'],});
        $(".header-block-menu, .header-menu-t1, .header-menu-t2, .header-menu-open").toggleClass("v2");
        $(".header-menu-open").toggleClass("header-menu-close");
        $("body").toggleClass("body-block");
    });

    $('.open-modal-map').click(function () {
        initMap();
        return false;
    });
    $('.open-modal-login').click(function (e) {
        e.preventDefault();
        openLoginForm();
    });
    $(document).on('click', '.box-modal-close', function (e) {
        $.arcticmodal('close');
        return false;
    });

    // $('.table-size').on("click", function (e) {
    //     e.preventDefault();
    //     $('.box-modal-size-chart').arcticmodal();
    // });

    $('.add-favourite-product').click(function (e) {
        e.preventDefault();
        var th = $(this);
        var href = th.attr('href');
        if (href) {
            $.ajax({
                url: href,
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        var $span = th.next();
                        var temp = $span.text();
                        $span.html(data.message);
                        setTimeout(function() {
                            $span.html(temp);
                        }, 3000);
                    } else {
                        console.log(data.error);
                    }
                }
            });
        }
    });

    $(document).on('click', '.fast-buy-btn-modal', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        if (href) {
            $.arcticmodal({
                type: 'ajax',
                url: href,
                ajax: {
                    type: 'POST',
                    cache: false,
                    dataType: 'json',
                    success: function (data, el, response) {
                        data.body.html(response.html);

                        $(".fast-buy-slider").slick({
                            dots: true,
                            arrows: true,
                            fade: true,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        });

                        $('.icheck-inp input').iCheck({
                            radioClass: 'check-radio',
                            checkboxClass: 'check-box',
                            labelHover: false,
                            cursor: true
                        });
                        $('.icheck-inp li div.disabled').parent().addClass('disabled');
                        $('.icheck-inp li div.checked').parent().addClass('active');
                    }
                }
            });
        } else {
            console.error("Ошибка получения id товара");
        }
        return false;
    });

    $(document).on('click', '.slider-single-big-img', function (e) {
        e.preventDefault();
        var th = this;
        var index = -1;
        var productID = $(this).data('product');
        if(productID) {
            $.each($('.slider-single-big-img'), function(key, elem) {
                if(elem === th)
                    index = key;
            });

            var href = '/index.php?route=product/product/photos&product_id='+productID;
            $.arcticmodal({
                type: 'ajax',
                url: href,
                ajax: {
                    type: 'GET',
                    cache: false,
                    dataType: 'json',
                    success: function (data, el, response) {
                        data.body.html(response.html);

                        $(".gallery-slider").slick({
                            dots: true,
                            arrows: true,
                            fade: true,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        });
                        setTimeout(function() {
                            $('.gallery-slider .slick-dots li:eq('+index+') button').click();
                        }, 0);
                    }
                }
            });
        }
    });

    $('#button-cart').on('click', function () {
        $.ajax({
            url: 'index.php?route=checkout/cart/add',
            type: 'post',
            data: $('#product input[type=\'text\'], #product input[type=\'hidden\'], #product input[type=\'radio\']:checked, #product input[type=\'checkbox\']:checked, #product select, #product textarea'),
            dataType: 'json',
            beforeSend: function () {
                $('#button-cart').html('loading');
            },
            complete: function () {
                $('#button-cart').html('reset');
            },
            success: function (json) {
                console.log(json);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    });

    $(document).on('click', '.fast-buy-action', function (e) {
        e.preventDefault();
        var data = {};
        var th = $(this);
        var url = th.attr('href');
        var urlSplit = th.attr('href').split('&');
        var productID = urlSplit[urlSplit.length-1].split('=')[1];
        th.parent().find('.alert').remove();
        if(th.hasClass('add-product')) {
            data = {
                quantity: 1,
                option: {}
            };
            var $container = th.parent().parent();
            var sizeItem = $container.find('[name=option-size]:checked');
            if(sizeItem) {
                var sizeOptionId = $container.find('[name=size_option_id]').val();
                data.option[sizeOptionId] = sizeItem.val();
            }
        }
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            dataType: 'json',
            success: function (json) {
                if(json.success) {
                    if(th.hasClass('add-wishlist')) {
                        var productItem = false;
                        if(document.location.href.indexOf('wishlist') >= 0)
                            productItem = $('.product-item[data-product='+json.id+']');

                        if(json.class === 'delete') {
                            if(productItem)
                                productItem.show();

                            th.addClass('delete');
                            fireProductInfoEvent('AddToWishlist', productID); // Facebook Pixel
                        } else {
                            if(productItem)
                                productItem.hide();

                            th.removeClass('delete');
                        }
                        th.parent().prepend($('<p></p>').addClass('alert alert-success').html(json.success));
                    } else if(th.hasClass('add-product')) {
                        th.parent().prepend($('<p></p>').addClass('alert alert-success').html(json.success));
                        th.text("Добавить в корзину").removeAttr('style');
                        fireProductInfoEvent('AddToCart', productID, 1); // Facebook Pixel
                            googleEcommerce('addToCart', productID, 1);
                    }

                    if(json.redirect !== undefined)
                        document.location.href = json.redirect;

                    if(json.cart !== undefined)
                        $('.header-btn-cart').html(json.cart);
                } else {
                    if(json.error && json.error === 'login') {
                        openLoginForm();
                    } else {
                        if(th.hasClass('add-product')) {
                            var errorMessage = '';
                            $.each(json.error, function(type, item) {
                                $.each(item, function(index, error) {
                                    errorMessage = error;
                                    return false;
                                });
                            });
                            th.text(errorMessage).css({
                                'background': 'red'
                            });
                        } else if (th.hasClass('add-wishlist')) {
                            th.parent().prepend($('<p></p>').addClass('alert alert-danger').html(json.error));
                        }
                    }
                }
            }
        });
    });
    function googleEcommerce (eventName, productId, quantity){
        jQuery.get(
            'index.php?route=google/product/getProductInfo',
            {
                event_name: eventName,
                product_id: productId,
                quantity: quantity,
            },
            function (json) {
                dataLayer.push({
                    event: json.event,
                    ecommerce: {
                        add: {
                            actionField: {list: 'Phones'},
                            products: [json.data]
                        }
                    }

                })
            }
        );
    }

    $(document).on('click', '.remove-from-cart', function () {
        var th = $(this);
        var key = th.data('key');

        // Checking cart page
        var route = '/cart';
        var isCartPage = document.location.href.slice(-(route.length)) === route;

        $.ajax({
            url: 'index.php?route=checkout/cart/remove',
            type: 'post',
            data: 'key=' + key,
            dataType: 'json',
            beforeSend: function () {
                $('#button-cart').html('loading');
            },
            complete: function () {
                $('#button-cart').html('reset');
            },
            success: function (json) {
                if (json.success) {
                    if (isCartPage) {
                        if (json.count === 0) {
                            document.location.href = '/';
                            return false;
                        }

                        $('.cart-total-pay').html(json.totalPay);
                        th.closest('.product-item-t1').remove();
                        $('#header-cart .remove-from-cart[data-key=' + key + ']')
                          .closest('.header-cart-product-body').remove();
                    } else {
                        th.closest('.header-cart-product-body').remove();
                    }
                    $('.cart-total-sum').html(json.total);
                    $('.cart-count').html(json.count);
                    if (json.count === 0) {
                        $('#header-cart').hide();
                    }
                } else {
                    console.log('Remove product error');
                    console.log(json);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    });

    $('.quont-minus, .quont-plus').on('click', function () {
        // Checking cart page
        var route = '/cart';
        var isCartPage = document.location.href.slice(-(route.length)) === route;

        var $input = $(this).parent().find('input');
        var key = $input.data('key');
        var qty = 1;
        if ($(this).hasClass('quont-minus')) {
            qty = parseInt($input.val()) - 1;
            qty = qty < 1 ? 1 : qty;
        } else qty = parseInt($input.val()) + 1;
        $input.val(qty);

        $.ajax({
            url: 'index.php?route=checkout/cart/edit',
            type: 'post',
            data: {
                key: key,
                quantity: qty
            },
            dataType: 'json',
            success: function (json) {
                if (json.success) {
                    if (isCartPage) {
                        $('.cart-total-pay').html(json.totalPay);
                        $('#header-cart .remove-from-cart[data-key='+key+']')
                          .parent().find('.count b').html(qty)
                    }
                    $('.cart-total-sum').html(json.total);
                    $('.cart-count').html(json.count);
                } else {
                    console.log('Change qty product error');
                    console.log(json);
                }
            }
        });
    });

    $('#account-address-form, #account-form').on('submit', function(e) {
        if(pMask.list.length) {
            if(!pMask.validate()) {
                return;
            }
            pMask.destroy();
        }
    });

    $('#checkout-address').on('submit', function(e) {
        e.preventDefault();

        if(pMask.list.length) {
            if(!pMask.validate()) {
                return;
            }
            pMask.destroy();
        }

        var url = $(this).attr('action');
        var formData = JSON.parse(JSON.stringify($(this).serializeArray()));
        var data = $(this).serialize() + '&' + $($('.address-email')[0]).serialize();

        pMask.init();

        $('.address-error').remove();

        $.ajax({
            url: url,
            data: data,
            type: 'post',
            dataType: 'json',
            success: function (json) {
                if(json.error) {
                    $('#payment-methods').remove();
                    $.each(json.error, function(key, item) {
                        var err = $('<div></div>')
                                      .addClass('address-error')
                                      .css({
                                          'color': '#f00',
                                          'font-size': '12px',
                                          'padding-top': '.5em'
                                      }).html(item);
                        $('.address-'+key).after(err);
                    });
                } else {
                    $.each(formData, function (index, elem) {
                        var val = elem.value;
                        var $input = $($('#address-list').find("[name='" + elem.name + "']")[0]);
                        if(elem.name !== 'lastname') {
                            $input.parent().contents().filter(function () {
                                return this.nodeType === 3;
                            }).replaceWith('');
                        } else {
                            val = ' ' + val;
                        }
                        $input.val(val);
                        $input.before(val);
                    });
                    $('#address-form').hide();
                    $('#address-list').show();

                    shippingSelect();

                    if(json.ajax) {
                        $.each(json.ajax, function(key, ajaxUrl) {
                            $.ajax({
                                url: ajaxUrl,
                                type: 'post',
                                success: function (response) {
                                    if(key === 'payment') {
                                        if(response.length) {
                                            $('#payment-methods').remove();
                                            $('.checkout-order-btn').before(response);
                                            $('.icheck-inp-checkout input').iCheck({
                                                radioClass: 'check-radio-t3',
                                                checkboxClass: 'check-box-t3',
                                                labelHover: false,
                                                cursor: true
                                            });
                                        }
                                    } else if(key === 'shipping_method') {
                                        $($('.white-block-t1')[2]).replaceWith(response);
                                        $('.icheck-inp-checkout-delivery input').iCheck({
                                            radioClass: 'check-radio-t4',
                                            checkboxClass: 'check-box-t4',
                                            labelHover: false,
                                            cursor: true
                                        });

                                        if($checked_shipping.length === 0) {
                                            var $elem = $checked_shipping.closest('.checkout-hide-container').prev();
                                            if(!$elem.hasClass('open')) {
                                                $elem.trigger('click');
                                                $("html, body").stop().animate({scrollTop:$elem.offset().top - 10}, 500, 'swing');
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    }
                    if($('[name="shipping"]').length && $('[name="shipping"]:checked').length === 0) {
                        var $elem = $('[name="shipping"]').closest('.checkout-hide-container').prev();
                        $elem.trigger('click');
                        $("html, body").stop().animate({scrollTop:$elem.offset().top - 10}, 500, 'swing');
                    }
                }
            }
        });
    });

    $('#show-address-edit').on('click', function() {
        $('#address-list').hide();
        $('#address-form').show();
    });

    // Search
    $('#search').on('submit', function (e) {
        e.preventDefault();
        var url = $('base').attr('href') + 'index.php?route=product/search';

        var value = $('#search input[name="search"]').val();

        if (value) {
            url += '&search=' + encodeURIComponent(value);
        }

        location = url;
    });

    $('#search input[name="search"]').on('keydown', function (e) {
        if (e.keyCode == 13) {
            $(this).parent().find('input[name="submit"]').trigger('click');
        }
    });

    $(".tabs, .tabs2").lightTabs();

    $('.icheck-inp input, .icheck-inp-color input').iCheck({
        radioClass: 'check-radio',
        checkboxClass: 'check-box',
        labelHover: false,
        cursor: true
    });

    $('.icheck-inp-myaccount input').iCheck({
        radioClass: 'check-radio-t2',
        checkboxClass: 'check-box-t2',
        labelHover: false,
        cursor: true
    });
    $('.icheck-inp-checkout input').iCheck({
        radioClass: 'check-radio-t3',
        checkboxClass: 'check-box-t3',
        labelHover: false,
        cursor: true
    });
    $('.icheck-inp-checkout-delivery input').iCheck({
        radioClass: 'check-radio-t4',
        checkboxClass: 'check-box-t4',
        labelHover: false,
        cursor: true
    });
    $('.filter-option input').iCheck({
        radioClass: 'check-radio-t5',
        checkboxClass: 'check-box-t5',
        labelHover: false,
        cursor: true
    });

    $(document).on('ifChecked', 'input', function (event) {
        $(this).parent().parent().addClass('active');
    });
    $(document).on('ifUnchecked', 'input', function (event) {
        $(this).parent().parent().removeClass('active');
    });
    $('.sort-order-container select').niceSelect();

    $('#use-promocode').on('click', function() {
        var $input = $(this).prev();
        var $info = $(this).parent().next('.checkout-info-text');
        var code = $input.val();
        $.ajax({
            url: 'index.php?route=checkout/checkout/setCoupon',
            data: {code: code},
            type: 'post',
            dataType: 'json',
            success: function (json) {
                $('#last-sum').html(json.sum);

                $info.html(json.info);

                if(json.error) {
                    $info.html(json.error);
                    $('#promocode-info').hide();
                } else {
                    $('#promocode-info #promocode-name').html(json.promocode.name);
                    $('#promocode-info #promocode-sum').html(json.promocode.sum);
                    $('#promocode-info').show();
                }
            }
        });
    });

    $(document).on('ifClicked', '.shipping-select', function() {
        if(!$(this).is(':checked')) {
            $('#button-confirm').addClass('disabled');
            setTimeout(function() {shippingSelect();}, 0);
        }
    });

    function shippingSelect() {
        var $select = $('.shipping-select:checked');
        if(!$select.length) return;
        var type = $select.val();

        $('#checkout-shipping').toggle(type !== 'pickup.pickup');

        $.ajax({
            url: 'index.php?route=checkout/shipping_method/save',
            data: {shipping_method: type, comment: ''},
            type: 'post',
            dataType: 'json',
            success: function (json) {
                if(json.ajax) {
                    $.each(json.ajax, function(key, ajaxUrl) {
                        $.ajax({
                            url: ajaxUrl,
                            type: 'post',
                            success: function (response) {
                                if(key === 'payment') {
                                    if(response.length) {
                                        $('#payment-methods').remove();
                                        $('.checkout-order-btn').before(response);
                                        $('.icheck-inp-checkout input').iCheck({
                                            radioClass: 'check-radio-t3',
                                            checkboxClass: 'check-box-t3',
                                            labelHover: false,
                                            cursor: true
                                        });
                                    }
                                }
                            }
                        });
                    });
                }
            }
        });
        $.ajax({
            url: 'index.php?route=checkout/checkout/setShipping',
            data: {shipping: type},
            type: 'post',
            dataType: 'json',
            success: function (json) {
                $('#last-sum').html(json.sum);
            }
        });
    }

    $('#load-more-blog').on('click', function(e) {
        e.preventDefault();
        var th = $(this);
        var url = th.attr('href');
        $.ajax({
            url: url,
            data: {ajax: true},
            type: 'post',
            dataType: 'json',
            success: function (json) {
                if(json.posts) {
                    $('.container-blog-short').append(json.posts);
                }
                if(json.link === '') {
                    th.remove();
                } else {
                    th.attr('href', json.link.replace(/&amp;/g, '&'));
                }
            }
        });
    });

    if($('#post-content')) {
        ['p', 'div:not(.blog-single-container-content):not(.blog-single-big-photo)'].forEach(function(tag, key) {
            $('#post-content > ' + tag).each(function(key, p) {
                if($(p).find('img').length === 1) {
                    $(p).replaceWith(function () {
                        return $('<div/>', {
                            class: 'blog-single-big-photo',
                            html: this.innerHTML,
                            attr: {
                                style: $(this).attr('style')
                            }
                        });
                    });
                } else if($(p).find('img').length > 1) {
                    var $images = $(p).find('img');
                    var $imagesContainer = $('<div/>').addClass('slider-blog-single');

                    $.each($images, function(index, img) {
                        $imagesContainer.append($('<div/>', {
                            html: img
                        }));
                    });

                    $(p).html('');
                    $(p).append($imagesContainer);
                    $(p).append($('<div/>').addClass('col-sli'));

                    $(p).replaceWith(function () {
                        return $('<div/>', {
                            class: 'blog-single-container-content',
                            html: this.innerHTML
                        });
                    });

                    var slickBlogItem = $('.slider-blog-single');

                    slickBlogItem.slick({
                        dots: true,
                        arrows: true,
                        fade: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    });

                    $('.slider-blog-single > ul.slick-dots').append(slickBlogItem.slick("getSlick").slideCount);
                } else {
                    if($(p).find('p:empty, div:empty').length) {
                        $(p).find('p:empty, div:empty').remove();
                    }
                    if($(p).html().length) {
                        $(p).wrap($('<div></div>').addClass('blog-single-container-content'));
                    } else $(p).remove();
                }
            });
        });
    }

    $('.toggle-description').on('click', function() {
        var desc = $(this).parent().find('.hidden-description');
        if(desc.hasClass('show'))
            desc.removeClass('show');
        else
            desc.addClass('show');
    });

    if($('#mc-embedded-subscribe-form')) {
        $('#mc-embedded-subscribe-form').replaceWith(function(){
            var $form = $("<form>", {html: $(this).html()});

            $.each(this.attributes, function(i, attribute){
                $form.attr(attribute.name, attribute.value);
            });
            return $form;
        });
    }

});

$(document).ready(function () {

    if($('#birthday').length) {
        $.datetimepicker.setLocale('ru');

        $('#birthday').datetimepicker({
            timepicker:false,
            format:'d.m.Y'
        });
    }

    var submitIcon = $('.searchbox-icon');
    var inputBox = $('.searchbox-input');
    var searchBox = $('.searchbox');
    var isOpen = false;
    submitIcon.click(function () {
        if (isOpen == false) {
            searchBox.addClass('searchbox-open');
            inputBox.focus();
            isOpen = true;
        } else {
            searchBox.removeClass('searchbox-open');
            inputBox.focusout();
            inputBox.val('');
            isOpen = false;
        }
    });
    submitIcon.mouseup(function () {
        return false;
    });
    searchBox.mouseup(function () {
        return false;
    });
    $(document).mouseup(function () {
        if (isOpen == true) {
            $('.searchbox-icon').css('display', 'block');
            submitIcon.click();
        }
    });

    $('#orders-sort').on('change', function() {
        var sort = $(this).val();
        var search = $('#orders-search').val();
        ordersAction(sort, search);
    });


    var ost;
    $('#orders-search').on('keyup', function() {
        clearTimeout(ost);
        var search = $(this).val();
        var sort = $('#orders-sort').val();
        ost = setTimeout(function() {
            ordersAction(sort, search);
        }, 500);
    });

    $(document).on('ifClicked', 'input[name="payment_method"]', function() {
        var paymentMethod = $(this).val();
        $('#button-confirm').addClass('disabled');
        $.ajax({
            url: 'index.php?route=checkout/payment_method/save',
            type: 'post',
            data: {
                payment_method: paymentMethod,
                comment: '',
                agree: true
            },
            dataType: 'json',
            success: function (json) {
                if (json['redirect']) {
                    location = json['redirect'];
                } else if (json['error']) {
                    if (json['error']['warning']) {
                        alert(json['error']['warning']);
                    }
                } else {
                    $.ajax({
                        url: 'index.php?route=checkout/confirm',
                        dataType: 'html',
                        success: function(html) {
                            $('#confirm-html').remove();
                            $('#button-confirm').before(
                              $('<div></div>').attr('id', 'confirm-html').html(html).hide()
                            );
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                        }
                    });
                }
            }
        });
    });

    $('#button-confirm.disabled').on('click', function() {
        var $button = $(this);
        var $text = $button.find('span');
        var defaultText = $text.html();

        function setText(text) {
            $text.text(text);
            setTimeout(function() {
                $text.text(defaultText);
            }, 3000);
        }

        if(!$('.shipping-select:checked').length) {
            setText('Выберите способ доставки');
            setTimeout(function() {
                $('html, body').animate({
                    scrollTop: $('#checkout-shipping-method').offset().top
                }, 'slow');
            }, 500);
            return;
        }

        if($('#checkout-shipping').is(':visible')) {
            if($('#address-form').is(':visible')) {
                var $inputs = $('#address-list input');
                var countFill = $inputs.filter(function(key, item) {return item.value !== '';});
                if($inputs.length !== countFill.length) {
                    setText('Укажите адресс доставки');
                    return;
                }
            }
        }

        if(!$('[name=payment_method]:checked').length) {
            setText('Выберите способ оплаты');
            return;
        }
    });

  $('input[name="no_call"]').on('ifClicked', function() {
      var th = $(this);
      setTimeout(function() {
          $.ajax({
            url: 'index.php?route=checkout/checkout/setNoCall',
            data: { no_call: th.is(':checked') ? 1 : 0 },
            type: 'post'
          });
      }, 100);
  });

  // Fade out filter blocks in small screen size
  if (window.screen.availWidth < 994) {
      $('.container-type-filter').addClass('fade-out')
  }

    pMask.init();
});


var pMask = {
    list: [],
    item: $('input[type="tel"][data-imask]'),
    country: $('select[data-imask-country]'),
    obj: {
        mask: '{+38} (___) ___-__-__',
        lazy: false,
        definitions: {
            '_': /[0-9]/
        }
    },
    init: function() {
        if(this.item.length > 0) {
            $.each(this.item, function(i, el) {
                pMask.list.push({
                    elem: el,
                    item: new IMask(el, pMask.obj)
                });
            });

            if(this.country.length > 0) {
                this.country.off('change').on('change', function() {
                    var option = $(this).find(':selected');
                    var mask = option.data('mask');
                    if(mask.length > 0) {
                        pMask.obj.mask = mask;
                        pMask.update();
                    }
                });
            }
        }
    },
    update: function() {
        $.each(this.list, function(i, el) {
            el.item.updateOptions(pMask.obj);
            el.item.value = '';
        });
    },
    destroy: function() {
        $.each(this.list, function(i, el) {
            var v = el.item.unmaskedValue;
            el.item.destroy();
            el.elem.value = v;
            pMask.list.splice(i, 1);
        });
    },
    validate: function() {
        var err = true;
        $('.imask-error').remove();

        $.each(this.list, function(i, el) {
            if(el.item.masked.isComplete === false) {
                $(el.elem).after($('<div></div>')
                  .addClass('address-error imask-error')
                  .css({
                      'color': '#f00',
                      'font-size': '12px',
                      'padding-top': '.5em'
                  }).html('Неверно указан телефон'));

                err = false;
                return false;
            }
        });

        return err;
    }
};

function ordersAction(sort, search) {
    if(sort) {
        $.ajax({
            url: 'index.php?route=account/order',
            data: {sort: sort, search: search},
            type: 'post',
            dataType: 'json',
            success: function (json) {
                if(json.list) {
                    var $container = $('.account-order-body');
                    $container.find('.account-order-row:not(:first-child)').remove();
                    $container.append(json.list)
                }
            }
        });
    }
}


function openLoginForm() {
    $.arcticmodal('close');
    $('.box-modal-login').arcticmodal();
}

$.prototype.customFilter = function(data) {

    var $container = this;
    var $priceContainer = $('#filter-price');
    var $sliderRange = $("#slider-range");
    var sliderTimeout;

    var $min = $($priceContainer.find('input')[0]);
    var $max = $($priceContainer.find('input')[1]);
    var minPriceLimit = parseInt($min.data('limit'));
    var maxPriceLimit = parseInt($max.data('limit'));

    $('#products-container').prepend($('#ocfilter-selected'));

    $sliderRange.slider({
        orientation: "gorizontal",
        min: minPriceLimit,
        max: maxPriceLimit,
        range: true,
        values: [ $min.val(), $max.val() ],
        slide: function( event, ui ) {
            clearTimeout(sliderTimeout);
            $min.val( ui.values[ 0 ] );
            $max.val( ui.values[ 1 ] );
            sliderTimeout = setTimeout(load, 500);
        }
    });

    // Events
    $container.find('input').on('ifClicked', function() {
        load();
    });

    $($min).add($max).on('change', function() {
        var minVal = parseInt($min.val());
        var maxVal = parseInt($max.val());

        if(minVal > maxVal) {
            minVal = maxVal;
            $min.val(minVal);
        }
        if(minVal < minPriceLimit) {
            minVal = minPriceLimit;
            $max.val(maxVal);
        }
        if(maxVal > maxPriceLimit) {
            maxVal = maxPriceLimit;
            $max.val(maxVal);
        }
        $sliderRange.slider("values",0,minVal);
        $sliderRange.slider("values",1,maxVal);
    });

    $($min).add($max).on('keydown', function(event){
        var key, keyChar;
        if(!event) event = window.event;

        if (event.keyCode) key = event.keyCode;
        else if(event.which) key = event.which;

        if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
        keyChar=String.fromCharCode(key);

        if(!/\d/.test(keyChar)) return false;
    });

    $(document).on('click', '#ocfilter-selected span a', function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        if($(this).data('key') === 'p') {
            $min.val(minPriceLimit);
            $max.val(maxPriceLimit).change();
        } else {
            var $checkboxLink = $('#ocfilter-content').find('a[href="'+url+'"]');
            if($checkboxLink) {
                $checkboxLink.closest('li').find('[type=checkbox]').iCheck('uncheck');
            }
        }
        $(this).parent().remove();
        history.pushState(null, '', url);
        load();
    });

    $container.find('.clear-filter a').on('click', function(e) {
        e.preventDefault();
        $container.find(':input').iCheck('uncheck');
        $min.val(minPriceLimit);
        $max.val(maxPriceLimit).change();
        load();
    });

    $container.find('.title a').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.container-type-filter').find(":input").iCheck('uncheck');
        load();
    });

    $(document).on('click', data.loadMoreControl.selector, function(e) {
        e.preventDefault();
        $(this).addClass('loading');
        data.pageControl.find('a.active:last').next().addClass('active');
        load();
    });

    if(data.limitControl !== undefined) {
        if(data.limitControl) {
            data.limitControl.find('a').on('click', function(e) {
                e.preventDefault();
                if(!$(this).hasClass('active')) {
                    data.limitControl.find('a').removeClass('active');
                    data.limitControl
                      .find('a[href="'+$(this).attr('href')+'"]')
                      .addClass('active');
                    load();
                }
            });
        }
    }

    if(data.sortControl !== undefined) {
        if(data.sortControl) {
            data.sortControl.find('a').on('click', function(e) {
                e.preventDefault();
                if(!$(this).hasClass('active')) {
                    data.sortControl.find('a').removeClass('active');
                    data.sortControl
                      .find('a[href="'+$(this).attr('href')+'"]')
                      .addClass('active');
                    load();
                }
            });
        }
    }

    if(data.pageControl !== undefined) {
        if(data.pageControl) {
            $(document).on('click', data.pageControl.find('a:not(#load-more)').selector, function(e) {
                e.preventDefault();
                if(!$(this).hasClass('active')) {
                    data.pageControl.find('a').removeClass('active');
                    data.pageControl
                      .find('a[href="'+$(this).attr('href')+'"]:not(.prev):not(.next)')
                      .addClass('active');
                    load();
                }
            });
        }
    }

    // Common functions
    function parseFilter(callback) {
        setTimeout(function() {
            var str = '';
            var prices = {};
            var d = $container.find(':input').serializeArray();
            var oldKey = '';
            $.each(d, function(key, arr) {
                if(arr.name.indexOf('price') === 0) {
                    var k = arr.name.indexOf('min') >= 0 ? 'min' : 'max';
                    prices[k] = parseInt(arr.value);
                    if(k === 'max') {
                        if(prices.min !== minPriceLimit || prices.max !== maxPriceLimit) {
                            str += ';p:' + prices.min + '-' + prices.max;
                        }
                    }
                } else {
                    if(oldKey !== arr.name) {
                        if(oldKey !== '')
                            str += ';';

                        oldKey = arr.name;
                        str += arr.value;
                    } else {
                        str += ',' + arr.value.split(':')[1];
                    }
                }
            });
            data.filter_ocfilter = str;
            callback();
            if(!data.filter_ocfilter.length)
                history.pushState(null, '', document.location.href.split('&filter_ocfilter')[0]);
        });
    }

    // Functions
    function load() {
        parseFilter(function() {
            var url = data.url.replace(/&amp;/g, '&');
            if(data.limitControl.find('a.active:first').attr('href'))
                url += data.limitControl.find('a.active:first').attr('href');
            if(data.sortControl.find('a.active:first').attr('href'))
                url += data.sortControl.find('a.active:first').attr('href');

            if(data.pageControl.find('a.active[href]:last').length) {
                var pages = data.pageControl.find('a.active')
                  .map(function(key, item) {
                      return $(item).html();
                  }).get().join(',');
                url += data.pageControl.find('a.active[href]:last').attr('href').split('=')[0] + '=' + pages;
            }
            $.get(url, {filter_ocfilter:data.filter_ocfilter}, function(res) {
                loadContent(res)
            });
        });
    }

    function loadContent(res) {
        history.pushState(null, '', res.href);
        if(res.total > 0) {
            $('#products-list').html(res.htmlProducts);
        }
        $('#ocfilter-selected').html(res.selecteds);
        data.pageControl.html(res.pagination);
        $('#products-num').html(res.total);

        $container.find('.clear-filter').toggle(res.selecteds.length !== 0);


        $container.find(':input:not(:checked)').iCheck('disable');
        $container.find(':input').closest('li').addClass('disabled');

        $.each(res.values, function(key, val) {
            $('#v-'+key).find('a').attr('href', val.h.replace(/&amp;/g, '&'));
            $('#v-'+key).closest('li').removeClass('disabled');
            $('#v-'+key).closest('li').find(':input').iCheck('enable');
        });

        if(parseInt(res.price.min) === 0 && parseInt(res.price.max) === 0) {
            $container.find('#filter-price-container').hide();
        } else {
            var nMin = parseInt(res.price.min);
            var nMax = parseInt(res.price.max);
            if(minPriceLimit !== nMin || maxPriceLimit !== nMax) {
                $sliderRange.slider("option", "min", minPriceLimit = nMin);
                $sliderRange.slider("option", "max", maxPriceLimit = nMax);
                $min.val(res.price.selected_min ? res.price.selected_min : minPriceLimit);
                $max.val(res.price.selected_max ? res.price.selected_max : maxPriceLimit);
                $max.trigger('change');
                $container.find('#filter-price-container').show();
            }
        }

        if(res.title)
            document.title = res.title;

        if(res.meta_description) {
            var tagDesc = $('meta[name=description]');
            if(!tagDesc) {
                $('head').append($('meta', {
                    'name': 'description',
                    'content': res.meta_description
                }));
            } else {
                tagDesc.attr('content', res.meta_description);
            }
        }

        if(res.meta_keyword) {
            var tagKeyword = $('meta[name=keywords]');
            if(!tagKeyword) {
                $('head').append($('meta', {
                    'name': 'keywords',
                    'content': res.meta_keyword
                }));
            } else {
                tagKeyword.attr('content', res.meta_keyword);
            }
        }

        if(res.heading_title) {
            $('.title-page > h1').text(res.heading_title);
        }
    }
};

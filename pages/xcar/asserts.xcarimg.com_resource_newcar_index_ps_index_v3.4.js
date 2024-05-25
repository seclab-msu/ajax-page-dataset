/**get rand **/
function getRand() {
    return Math.random();
}
//获取zoneclick 阿拉丁
var $_GET = (function () {
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if (typeof (u[1]) == "string") {
        u = u[1].split("&");
        var get = {};
        for (var i in u) {
            var j = u[i].toString().split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();
var zoneclick_var = $_GET['zoneclick'] ? 1 : 2;
$(function () {
    ajax_load(city_id, city_name, province_id);
})

/**默认需要加载和切换城市调用的地方**/
function ajax_load(city_id, city_name, province_id) {

    if (0 > city_id) return false;
    var _city_name = typeof city_name != 'undefined' ? city_name : '本地';
    if (city_name) {
        _city_name = _city_name.replace('市', '');
        if (_city_name.length > 4) {
            $('.simple_city_name').html('<em></em>' + _city_name.substring(0, 3) + '...')
        } else {
            $('.simple_city_name').html('<em></em>' + _city_name)
        }
        $('span.local_name').text(_city_name);
    }
    province_id = 0 > province_id ? 0 : province_id;
    /***default function***/
    get_new_hangqing(city_id, _city_name, province_id);

    get_model_list_price(city_id, province_id);
    get_loan_cars(pserid, city_id);
    get_t_loan_cars(pserid, city_id);
    AjaxDealerInfo(city_id, '-2-', _city_name, 1, 1, province_id);
    get_special_car(city_id);

    //保持城市默认状态
}
function tab_switch(options) {

    var settings = $.extend({
        "pannel": "",
        "parents": "ul",
        "ele": "ul.cut_tag li a",
        "cls": "current",
        "hid": "div.conter_main",
        "pobj": ""
    }, options);
    var timer_interval = null;
    if (settings.pannel != "") {
        $(settings.pannel).on("mouseover mouseout click", settings.ele, function (event) {
            var obj = $(this);
            if (event.type == "mouseover") {//鼠标悬浮
                clearInterval(timer_interval);
                timer_interval = setInterval(function () {
                    tab_div(obj);
                    clearInterval(timer_interval);
                }, 500);
            } else if (event.type == "mouseout") {//鼠标离开
                if (timer_interval != null) clearInterval(timer_interval);
            } else if (event.type == "click") {
                if (timer_interval != null) clearInterval(timer_interval);
                tab_div(obj);
            }
        });
    }
    function tab_div(obj) {
        var p_obj = null;
        if (settings.pobj == "") {
            p_obj = obj.parents(settings.pannel);
        } else {
            p_obj = obj.parents(settings.parents);
        }
        if (settings.parents != "") {
            obj.parents(settings.parents).find("." + settings.cls).removeClass(settings.cls);
        } else {
            p_obj.find("." + settings.cls).removeClass(settings.cls);
        }
        var index = p_obj.find(settings.ele).index(obj);
        obj.addClass(settings.cls);
        $(settings.pannel + " " + settings.hid).hide().eq(index).show();
    }
}

//获取行情
function get_new_hangqing(city_id, city_name, province_id) {
    var url = "/auto/index.php?r=newcar/SeriseParentIndex/NewHangqing&rand=" + getRand();
    var _cityName = typeof city_name != "" ? city_name : '本地';

    $.ajax({
        url: url, data: { pserid: pserid, city_id: city_id }, success: function (data) {
            var _more = $('#hangqing_url .more')

            var _url = "/" + pserid + "/news_5_c" + city_id + ".htm";
            var _html1 = "<a href=" + _url + " target='_blank' title='" + _cityName + "行情'><span class='local_name'>" + _cityName + "</span>行情</a>";
            var _html2 = "<span class='local_name'>" + _cityName + "</span>行情"
            var _more_span = '<em></em><a href="' + _url + '" target="_blank">更多</a>';
            $("#get_hangqing_info").html(data);
            $('#get_hangqing_info').show();
            $('#hangqing_url .more').html(_more_span).show();
            var _hangqing_jump_status = $('#hangqing_jump_status').val();
            if (data.indexOf('暂无更多') >= 0 || data.indexOf('暂无内容') >= 0) {

                $('#hangqing_url .more').hide();
                if (data.indexOf('暂无更多') >= 0 && data.indexOf('暂无内容') < 0) {
                    if (_hangqing_jump_status == 1) {
                        $('#hangqing_url h3').html(_html1);
                        _more.show()
                    } else {
                        $('#hangqing_url h3').html(_html2);
                        _more.hide()
                    }

                } else {
                    $('#hangqing_url h3').html(_html2);
                    _more.hide()
                }
            } else {
                if (_hangqing_jump_status == 1) {
                    _more.show()
                    $('#hangqing_url h3').html(_html1);
                } else {
                    $('#hangqing_url h3').html(_html2);
                    _more.hide()
                }
                // $('#hangqing_url h3').html(_html1);
            }
        }
    });
}

//获取58合作的二手车
function get_hezuo_58(city_id) {

    var url = "/auto/index.php?r=newcar/SeriseParentIndex/AjaxHezuo58V3&rand=" + getRand();
    $.ajax({
        url: url, data: { pserid: pserid, city_id: city_id, psname: psname }, success: function (data) {
            if (data != "") {
                $("#get_hezuo_58").html(data);
                $('#get_hezuo_58').show();
            }
        }
    });
}

function get_used2_cars(province_id, city_id, res) {
    var usedhigtprice = 0;
    var usedlowprice = 0;
    var url = "/auto/index.php?r=newcar/SeriseParentIndex/Ajax_used2_car&rand=" + getRand();
    if (res.model_list) {
        usedhigtprice = res.max_price;
        usedlowprice = res.min_price;
    }
    $.ajax({
        url: url, data: { pbid: pbid, pserid: pserid, provinceId: province_id, cityId: city_id, max_price: usedhigtprice, min_price: usedlowprice }, success: function (data) {
            if (data != "") {
                $("#get_used2_cars").html(data);
                $('#get_used2_cars').show();
            }
        }
    });
}
/**
 *限时优惠
 * @param pserid
 * @param city_id
 * @param type
 */
function get_limit_offer(type_id) {
    var url = "/auto/index.php?r=Ajax/AjaxGetLimitOffer&rand=" + getRand();
    $.ajax({
        url: url,
        data: { type_id: type_id },
        success: function (data) {
            if (data != "") {
                $("#get_limit_offer").html(data);
                $('#get_limit_offer').show();
            }
        }
    });
}
get_limit_offer(1);
/**
 *车贷相关 
 * @param pserid
 * @param city_id
 * @param type
 */
function get_loan_cars(pserid, city_id) {
    var url = "/auto/index.php?r=Ajax/AjaxLoanCar&rand=" + getRand();
    $.ajax({
        url: url,
        data: { pserid: pserid, city_id: city_id },
        success: function (data) {
            if (data != "") {
                $("#get_loan_cars").html(data);
                $('#get_loan_cars').show();
            }
        }
    });
}
/**
 *贷款购相关
 * @param pserid
 * @param city_id
 * @param type
 */
function get_t_loan_cars(pserid, city_id) {
    var url = "/auto/index.php?r=Ajax/TloanCar";
    $.ajax({
        url: url,
        data: { pserid: pserid, city: city_id },
        success: function (data) {
            if (data != "") {
                $("#get_t_car_loan").html(data);
                $('#get_t_car_loan').show();
            }
        }
    });
}

$('a.ps_stop_model_list').click(function () {
    var url = "/auto/index.php?r=newcar/SeriseParentIndex/AjaxStopSaleModel&rand=" + getRand();
    var _year = $(this).attr('data') ? $(this).attr('data') : 0;
    if (_year > 1 && pserid) {
        $.ajax({
            url: url, data: { pserid: pserid, year: _year }, success: function (data) {
                if (data.length > 5) {
                    $('#serise_model_price_list').find('ul.tag_ul li a').removeClass('cur');
                    var $_table = $('#ps_stop_model_list_table');
                    $('#serise_model_price_list').parent().find('table').hide().last().after(data);
                    if ('object' == typeof $_table) {
                        $_table.remove();
                    }

                }
            }
        });
    }
})
var DONT_ENUM = "propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,toString,valueOf,constructor".split(","),
    hasOwn = ({}).hasOwnProperty;
for (var i in {
    toString: 1
}) {
    DONT_ENUM = false;
}


Object.keys = Object.keys || function (obj) {//ecma262v5 15.2.3.14
    var result = [];
    for (var key in obj) if (hasOwn.call(obj, key)) {
        result.push(key);
    }
    if (DONT_ENUM && obj) {
        for (var i = 0; key = DONT_ENUM[i++];) {
            if (hasOwn.call(obj, key)) {
                result.push(key);
            }
        }
    }
    return result;
};

//车型列表本地报价
function get_model_list_price(city_id, province_id) {
    var usedhigtprice = 0;
    var usedlowprice = 0;
    var url = "/auto/index.php?r=newcar/SeriseParentIndex/Ajax_used2_car&rand=" + getRand();
    $.getJSON(
        '/auto/index.php?r=ajax/GetDealerPrice2&flag=1&did_type=1&is_num=1&sort_price=1&is_pre_sale=1&province_id=' + province_id + '&city_id=' + city_id + "&pserid=" + pserid + "&rand=" + getRand(),
        function (data) {
            get_used2_cars(province_id, city_id, data);
            var _no_price_html = '<dl><dd><span class="no_txt">暂无</span></dd><dt></dt></dl>';
            var mid = '';
            var _min_price = 0, _max_price = 0;
            var _save_price = 0, _save_price_html = '';
            var _dt_class = '', _dd_class = '';
            var _is_show_model_price_html = true;
            var _is_dealer_flag = false;
            var _dealer_mid_arr = new Object;
            if (typeof data.dealer_num != "undefined") {
                for (var i in data.dealer_num) {
                    if (typeof data.dealer_num[i] != 'undefined' && data.dealer_num[i] > 0) _is_dealer_flag = true;
                }
            }
            if (data.model_list != undefined && data.model_list != '') {
                var _html = "", ht = "";
                var url = '';
                var _dealerPopwUrl = '';
                var $ps_mlist_td = '', $ps_price_menu_td;
                var _is_edit_local = false;
                for (var key in data.model_list) {
                    _is_edit_local = true;
                    mid = data.model_list[key].mid;
                    _dealer_mid_arr[mid] = 1;
                    url = "//price.xcar.com.cn/model" + mid + "/city" + city_id + "-1-1.htm";
                    $ps_mlist_td = $(".ps_mlist_td_" + mid);
                    $ps_price_menu_td = $(".ps_price_menu_td_" + mid);
                    if (data.model_list[key].price != undefined && data.model_list[key].price != null && data.model_list[key].price > 0) {
                        _dealerPopwUrl = '//newcar.xcar.com.cn/auto/index.php?r=dealerPopw/order&mid=' + mid + '&did=0&type=1&is_cms=738';
                        ht = parseFloat(data.model_list[key].price).toFixed(2) + " 万起";
                        _save_price = parseFloat(data.model_list[key].price_manu) - parseFloat(data.model_list[key].price);
                        if (_save_price > 0) {
                            _save_price_html = '<p class="save_price_' + mid + '">省' + _save_price.toFixed(2) + '万</p>';
                        } else {
                            _save_price_html = '';
                        }
                        _format_model_price_html(mid, ht, true, _no_price_html, _save_price_html);

                        if (_min_price == 0 || _min_price >= data.model_list[key].price) { _min_price = parseFloat(data.model_list[key].price) }
                        if (_max_price == 0 || _max_price <= data.model_list[key].price) { _max_price = parseFloat(data.model_list[key].price) }

                    } else {
                        if (typeof data.dealer_num[data.model_list[key].mid] != "undefined" && data.dealer_num[data.model_list[key].mid] == 1) {
                            _is_show_model_price_html = true;
                            _price = data.model_list[key].price_manu.toFixed(2) + ' 万'
                            _format_model_price_html(mid, _price, _is_show_model_price_html, _no_price_html, _save_price_html);

                        } else {
                            _is_show_model_price_html = false;
                            _format_model_price_html(mid, 0, _is_show_model_price_html, _no_price_html, _save_price_html);
                        }
                    }
                }
                _local_price_menu(1, _is_edit_local, _min_price, _max_price);
            } else if (true === _is_dealer_flag) {
                var _price = '';
                var $menu_list = $('td.price_menu_td');
                var _has_dealer = false;
                $menu_list.each(function () {
                    mid = $(this).attr('mid');
                    if (1 == data.dealer_num[mid]) {
                        _is_show_model_price_html = true;
                        _price = parseFloat($(this).children().eq(0).text()).toFixed(2);
                        if (_price > 0) {
                            _price = _price + ' 万';

                            _dt_class = 'mt6';
                            _dd_class = 'mt3';

                            _has_dealer = true;
                        } else {
                            _price = 0;
                            _is_show_model_price_html = false;
                        }
                        if (_min_price == 0 || _min_price >= _price) { _min_price = _price; }
                        if (_max_price == 0 || _max_price <= _price) { _max_price = _price; }
                        _format_model_price_html(mid, _price, _is_show_model_price_html, _no_price_html, _save_price_html);
                    } else {
                        _is_show_model_price_html = false;
                        _format_model_price_html(mid, _price, _is_show_model_price_html, _no_price_html, _save_price_html);
                    }
                })
                _local_price_menu(1, true, _min_price, _max_price, _has_dealer);
            } else {
                var $_model_list_id = $('#serise_model_price_list');
                var $_model_title = $('#serise_model_price_list a.ps_model_list_title');
                var $local_menu_tds = $('#serise_model_price_list table.table_main td.local_menu_td');
                var $price_menu_tds = $('#serise_model_price_list table.table_main td.price_menu_td');
                var _mid = $local_menu_tds.attr('mid');
                //在售但是没有一个经销商在卖，本地参考价就展示厂商指导价
                var _tmp_p = '', _tmp_no_price_html = '', _tmp_str = '';
                $local_menu_tds.each(function (k, v) {
                    _tmp_p = parseFloat($price_menu_tds.eq(k).children().eq(0).text()).toFixed(2);
                    _tmp_str = _tmp_p > 0 ? '<dl><dd><span class="no_txt_v1">' + _tmp_p + '万起</span></dd><dt></dt></dl>' : '<dl><dd><span class="no_txt">暂无</span></dd></dl>';
                    _tmp_no_price_html = '停售' == $(v).find('span.no_txt').text() ? $(v).html() : _tmp_str;
                    $(v).html(_tmp_no_price_html);
                })

                if (begin_sale_flag == 1) {
                    var _dealerPopwUrl = '//newcar.xcar.com.cn/auto/index.php?r=dealerPopw/order&mid=' + _mid + '&did=0&type=1&is_cms=738';
                    _no_price_html = '<dl>' +
                        '<dd>' + _save_price_html + '<p>暂无</p></dd>' +
                        '<dt><a onclick="clicklog(124567);" class="orange_but" href="' + _dealerPopwUrl + '" target="_blank">获取底价</a></dt></dl>';

                    $local_menu_tds.html(_no_price_html);
                }

                $('#serise_model_price_list table.table_main td.price_menu_td').children().eq(0).attr('target', '').attr('href', 'javascript:;').removeClass('cost_02');
                $_model_title.replaceWith($_model_title.text());
                $_model_list_id.find('td.price_menu_td').children().eq(0).removeAttr('href', '').removeAttr('target').addClass('cost_02');

                _local_price_menu(2, false, 0, 0);
            }
            ps_cut_info(data);//cut_info
            var _dealer_mid_arr_len = Object.keys(_dealer_mid_arr).length;
            if (_dealer_mid_arr_len > 0) {
                var $_local_menu_td = $('#serise_model_price_list td.local_menu_td');
                var _url = '';
                if (typeof $_local_menu_td != 'undefined' && _dealer_mid_arr_len < $_local_menu_td.length) {
                    var _no_price_html = '<dl><dd><span class="no_txt">暂无</span></dd><dt></dt></dl>';
                    _save_price_html = '';
                    _is_show_model_price_html = _is_dealer_flag == true ? true : false;
                    $($_local_menu_td).each(function (k, v) {
                        mid = $(v).attr('mid');
                        if (1 == data.dealer_num[mid]) {
                            if ('undefined' != _dealer_mid_arr[mid] && 1 != _dealer_mid_arr[mid]) {
                                _price = $('.ps_price_menu_td_' + mid).text().replace('万', '');
                                if (!isNaN(_price)) {
                                    _price = parseFloat($('.ps_price_menu_td_' + mid).text()).toFixed(2) + ' 万';
                                    _is_show_model_price_html = true;
                                    _url = '/m' + mid + '/baojia/';
                                    $('.ps_price_menu_td_' + mid).children().eq(0).attr('target', '_blank').attr('href', _url).removeClass('cost_02');
                                } else {
                                    _price = ''; _is_show_model_price_html = false;
                                }
                                _format_model_price_html(mid, _price, _is_show_model_price_html, _no_price_html, _save_price_html);
                            }
                        } else {
                            _is_show_model_price_html = false;
                            _format_model_price_html(mid, 0, _is_show_model_price_html, _no_price_html, _save_price_html);
                        }

                    })
                }
            }
            var url = "/auto/index.php?r=Ajax/GetModelLink&rand=" + getRand();
            $.ajax({
                url: url,
                data: { pserid: pserid, city_id: city_id },
                dataType: 'json',
                success: function (data) {
                    if (data != "") {
                        $(".local_menu_td").each(function () {
                            if ($.inArray($(this).attr("mid"), data.mids) != -1) {
                                $(this).children('dl').children('dt').append('<a target="_blank" onclick="clicklog(125652)" href="//mall.xcar.com.cn/' + data.pingyin + '/money/' + pserid + '_' + $(this).attr("mid") + '_0_0.html" class="loans_but">贷款</a>');
                            }
                        });
                    }
                }
            });
            //预售
            if (data.pre_sale != undefined && data.pre_sale != '') {
                $.each(data.pre_sale, function (k, v) {
                    var _td = $('.ps_mlist_td_' + k);
                    var _a_class = _td.find('a.orange_but').attr('class');
                    if (_a_class == undefined || _a_class != '') {
                        var _str = '<dl><dd>';
                        if (v.price != 0) {
                            _str += '<p><a onclick="clicklog(124566);" target="_blank" href="/m' + k + '/baojia/">' + v.price + ' 万起</a></p>';
                            if (v.dprice != undefined && v.dprice != 0)
                                _str += '<p>省' + v.dprice + '万</p>';
                        } else {
                            _str += '<span class="no_txt">暂无</span>';
                        }
                        _str += '</dd><dt><a onclick="clicklog(124567);" class="orange_but" href="//newcar.xcar.com.cn/auto/index.php?r=dealerPopw/order&mid=' + k + '&did=0&type=1&is_cms=738" target="_blank">获取底价</a></dt>';
                        _str += '</dl>';
                        _td.html(_str);
                    }
                })
            }
            if ($('.ref_pc').find('a').hasClass('attention') === false) {
                $('.ref_pc').append('<a class="attention" click_num="0" href="javascript:;" style="float:right">+关注</a>');
            }
            focus_on();
        }
    );
}

function _format_model_price_html(_mid, _price, _is_show_model_price_html, _no_price_html, _save_price_html) {
    var _html = '';
    var $ps_mlist_td = $(".ps_mlist_td_" + _mid);
    var $ps_price_menu_td = $(".ps_price_menu_td_" + _mid);
    var _dealerPopwUrl = '//newcar.xcar.com.cn/auto/index.php?r=dealerPopw/order&mid=' + _mid + '&did=0&type=1&is_cms=738';
    if (true === _is_show_model_price_html) {
        _html = '<dl>' +
            '<dd><p><a onclick="clicklog(124566);" target="_blank" href="/m' + _mid + '/baojia/">' + _price + '</a></p><p>' + _save_price_html + '</p></dd>' +
            '<dt><a onclick="clicklog(124567);" class="orange_but" href="' + _dealerPopwUrl + '" target="_blank">获取底价</a></dt></dl>';
    } else {
        if (begin_sale_flag == 1) {
            _no_price_html = '<dl>';
            if (_price > 0) {
                _no_price_html += '<dd><p><a onclick="clicklog(124566);" target="_blank" href="/m' + _mid + '/baojia/">' + _price + '</a></p><p>' + _save_price_html + '</p></dd>';
            } else {
                _no_price_html += '<dd><p>暂无</p><p>' + _save_price_html + '</p></dd>';
            }
            _no_price_html += '<dt><a onclick="clicklog(124567);" class="orange_but" href="' + _dealerPopwUrl + '" target="_blank">获取底价</a></dt></dl>';
        }
        _html = $ps_mlist_td.find('span.no_txt').text() == '停售' ? $ps_mlist_td.html() : _no_price_html;
        $ps_price_menu_td.children().eq(0).attr('target', '').attr('href', 'javascript:;').addClass('cost_02');
    }
    $ps_mlist_td.html(_html);
}



//cut_info
function ps_cut_info(data) {
    var $_cut_info_box = $('dd.ps_cut_info_box');
    var $_cut_info_more = $('a.ps_cut_more');
    $_cut_info_box.empty();
    var _href = $('.ps_dealer_popw_button').attr('href')
    if (xcar_base_status === 2) {
        $_cut_info_box.parent().find('dt>.down').css('opacity', 1)
    }

    // var _no_cut_price_html = '<p class="pt20"><i></i><span class="no_txt">暂无降价!</span></p>';
    // var _no_cut_price_html = xcar_base_status === 2 ? '<p class="pt20 noData_p"><i></i><span class="no_txt">通知经销商为我提供心动价格</span><a target="_blank" href=' + _href + ' onclick="clicklog(124547);" class="inquiry_btn">联系经销商</a></p>' : '<p class="pt20"><i></i><span class="no_txt">暂无降价!</span></p>';

    console.log('data', data.min_price)

    //20200617 联系经销商改成同类车型
    var _no_cut_price_html = ''
    var _text = (typeof data.min_price !== 'undefined') ? '同价位热门车' : '同级别热门车'

    if (data.same_range_list != undefined && data.same_range_list.length > 0) {
        _no_cut_price_html = '<div class="sameTypeCarWrapper">'
        _no_cut_price_html += '<div class="sameTypeCarTitle">' + _text + '</div>'
        _no_cut_price_html += '<ul class="sameTypeCar">';
        for (var i = 0; i < data.same_range_list.length; i++) {
            var item = data.same_range_list[i]
            _no_cut_price_html += '<li><a target="_blank" alt="' + item.psname + '" title="' + item.psname + '" href="' + item.purl + '">'
            _no_cut_price_html += '<img src="' + item.img_url + '" />';
            _no_cut_price_html += '<p class="sameTypeCarText">' + item.psname + '</p>'
            _no_cut_price_html += '</a></li>'
        }
        _no_cut_price_html += '</ul>'
        _no_cut_price_html += '</div>'
    }





    var _no_more_cut_price_html = '<p><i></i><span class="no_txt">暂无更多</span></p>';
    if (data.model_list != undefined && data.model_list.length > 0) {
        var _num = 0;
        var _length = parseInt(data.model_list.length) - 1;
        var _price_html = '', _name = '', _cut_info_price_html = '', _cut_info_price_class = '', _save_price = 0;//初始化
        var _clicklog = 'onclick="clicklog(124694)"';
        $.each(data.model_list, function (i, val) {
            if (_num == 3) return true;
            //如果显示降价信息列表，读取完接口后先把城市定位/降价信息/查看更多显示出来
            //后边再看是不是要显示同价位热门车（不显示降价信息）再隐藏
            $(".ref_inf").find('dt').show()
            _price_html = '', _name = '', _cut_info_price_html = '', _cut_info_price_class = '', _save_price = 0;//重置参数
            if (data.model_list[i].price != undefined && data.model_list[i].price != null && data.model_list[i].price > 0) {

                _name = $("[mid=" + data.model_list[i].mid + "_menu]").attr('data');

                _save_price = parseFloat(data.model_list[i].price_manu) - parseFloat(data.model_list[i].price);
                if (_save_price > 0) {
                    _cut_info_price_html = '<em></em>' + parseFloat(_save_price).toFixed(2) + '万';
                    _cut_info_price_class = 'cost';
                }
                if ('undefined' != typeof _name && _name.length > 0 && _save_price > 0) {
                    _price_html = '<p><i></i>';
                    _price_html += '<a ' + _clicklog + ' target="_blank" title="' + _name + '" href="/m' + data.model_list[i].mid + '/">' + _name.substr(0, 30) + '</a>';
                    _price_html += '<span class="' + _cut_info_price_class + '">' + _cut_info_price_html + '</span>';
                    _price_html += '</p>';
                    $_cut_info_box.append(_price_html);
                    _num++;
                }

            }
        });
        if (3 == _num) {
            var _url = '//dealer.xcar.com.cn/sale/' + city_id + '-' + pbid + '-' + pserid + '-0-0-0-1-b7-desc/';
            $_cut_info_more.attr('href', _url).attr('target', '_blank').show();
        } else {
            $_cut_info_more.hide();
        }
        if (0 == _num) {
            // $_cut_info_box.parent().find('dt>.down').css('opacity', 0)
            if (xcar_base_status === 2) {
                $_cut_info_box.parent().find('dt>.down').css('opacity', 0)
            }
            $(".ref_inf").find('dt').remove()
            $_cut_info_box.html(_no_cut_price_html);
        } else if (3 > _num) {//不够3条

            $_cut_info_box.append(_no_more_cut_price_html);
        }
    } else {
        // $_cut_info_box.parent().find('dt>.down').css('opacity', 0)
        if (xcar_base_status === 2) {
            $_cut_info_box.parent().find('dt>.down').css('opacity', 0)
        }
        $(".ref_inf").find('dt').remove()
        $_cut_info_box.html(_no_cut_price_html);
        $_cut_info_more.hide();
    }
}

function _local_price_menu(_action, _is_edit_local, _min_price, _max_price, _has_dealer) {
    var _baojia_url = '/' + pserid + '/baojia/';
    var $_local_price_menu = $('.local_price_menu');
    var $_com_price_menu = $('.com_price_menu');
    var _com_price_text = $_com_price_menu.text();
    var _local_price_unit = undefined != typeof $_local_price_menu.attr('price_text') ? $_local_price_menu.attr('price_text') : '万';
    var _local_price_html = '本地参考价：<span class="sale_pc">' + _com_price_text + '</span>' + _local_price_unit;
    var _local_price_a_html = '本地参考价：<span><a onclick="clicklog(124782);" class="sale_pc" target="_blank" href="' + _baojia_url + '">' + _com_price_text + '</a></span>' + _local_price_unit;
    var _local_no_price_html = '本地参考价：<span class="no_txt">暂无</span>';
    var _local_no_red_price_html = '本地参考价：<span class="no_txt sale_pc">暂无</span>';

    var _com_price_span_html = '<span class="' + $_com_price_menu.attr('class') + '">' + _com_price_text + '</span>';
    var _com_price_a_html = '<a onclick="clicklog(124546);" target="_blank" href="' + _baojia_url + '" class="' + $_com_price_menu.attr('class') + '">' + _com_price_text + '</a>';
    //var _model_cut_price_box = '<a href="javascript:;" class="mark_down" id="model_cut_price_box">降价通知</a>';

    if (_action == 1) {
        if (false == _is_edit_local) {
            $_local_price_menu.html(_local_no_price_html);
            $_com_price_menu.replaceWith(_com_price_span_html);
        } else {
            $_com_price_menu.replaceWith(_com_price_a_html);
        }
        var _text = '', _price_line = '';
        if (_min_price > 0 || _max_price > 0) {
            _min_price = _min_price.toFixed(2);//保留2位小数
            _max_price = _max_price.toFixed(2);
            _price_line = _min_price > 0 && _max_price > 0 && _min_price != _max_price ? '-' : '';
            _text = _min_price + _price_line + (_max_price != _min_price ? _max_price : '');
            $_local_price_menu.html(_local_price_a_html);
            if (_com_price_text != _text) {
                $_local_price_menu.find('a').eq(0).text(_text);
            }
            //$_local_price_menu.append(_model_cut_price_box);
        } else {
            var _will_open_text = $_local_price_menu.prev('div.ref_pc').text();
            if (typeof _will_open_text != 'undefined' && _will_open_text.indexOf('厂商预售价') >= 0) {
                $_local_price_menu.html(_local_no_price_html);
            } else {
                if (true === _has_dealer) {
                    $_local_price_menu.html(_local_price_a_html);
                } else if (_will_open_text.indexOf('厂商指导价') >= 0) {
                    $_local_price_menu.html(_local_no_price_html);
                } else {
                    $_local_price_menu.html(_local_no_red_price_html);
                }

            }
        }
    } else {
        if ($_local_price_menu.next().find('.com_price_menu').size() <= 0) {
            $_local_price_menu.html(_local_no_price_html);
        } else {
            // $_local_price_menu.html(_local_no_red_price_html);
            $_local_price_menu.html(_local_price_html);
        }
        $_com_price_menu.replaceWith(_com_price_span_html);
    }
}

/*关注以及上市通知我*/
$.fn.extend({
    attention_tz: function () {
        var _timer = null;
        $(".ps_attention").each(function () {
            $(this).attr("dv", $(this).html());
        });
        if (getCookie('_discuz_uid')) {
            var url = "/auto/index.php?r=newcar/Attention/checkAttStatus&format=json&rand=" + getRand();
            $.ajax(
                {
                    url: url + '&rand=' + Math.random(), dataType: "json", data: { type: "pserid", id: pserid }, success: function (data) {
                        if (data.status == 1 || data.status == 2) {
                            $(".ps_attention").attr('status', "1").attr('class', 'grey_but no_but undo').html('已关注该车');
                        };
                    }
                });
        }
        $(".ps_attention").hover(function () {
            fc_hide();
            clearTimeout(_timer);
            if ($(this).attr("status") != 1) {
                $(this).parent().find(".noTips").show();
            } else {
                if ($(this).hasClass("grey_but")) {
                    $(this).html("取消关注");
                }
            }
        }, function () {
            var obj = $(this).parent();
            clearTimeout(_timer);
            if ($(this).attr("status") != 1) {
                _timer = setTimeout(function () {
                    $(".attention_hint,.attention_hint_w").hide();
                }, 500);
            } else {
                if ($(this).hasClass("grey_but")) {
                    $(this).html("已关注该车");
                }
            }
        });

        $(".attention_hint,.attention_hint_w").hover(function () {
            clearTimeout(_timer);
        }, function () {
            _timer = setTimeout(function () {
                $(".attention_hint,.attention_hint_w").hide();
            }, 500);
        });

        $(".ps_attention").click(function (event) {

            event.preventDefault();
            var _a = $(this);
            if (!getCookie('_discuz_uid')) {//是否登陆
                openLoginWin();
            }
            else {
                var _click_num = $(this).attr('click_num');//防止重复点击
                if (_click_num == 0) {
                    _click_num = $(this).attr('click_num', 1)
                } else {
                    return;
                }
                var command = _a.attr("status") == "1" ? 'del' : 'insert';
                var id = pserid;
                var url = "/auto/index.php?r=newcar/Attention/setAttStatus&format=json";
                $.ajax({
                    url: url + '&rand=' + Math.random(), data: { command: command, id: id, type: "pserid" }, dataType: "json", context: $(this), success: function (data) {
                        if (data.status == -1) {
                            openLoginWin();
                        }
                        else if (data.status == 1 || data.status == 2) {
                            fc_hide();
                            if (command == "insert") {
                                $(this).attr('status', "1").attr('class', 'grey_but no_but undo').html('已关注该车');
                                $(_a).parent().find(".hasTips").show();
                                _timer = setTimeout(function () {
                                    $(_a).parent().find(".attention_hint,.attention_hint_w").hide();
                                }, 3000);
                                $('.attention').addClass('end').attr('status', '1').html('已关注');
                            }
                            else {
                                $(this).attr('status', '0').attr('class', 'orange_but notify').html('上市通知我');
                                $(this).parent().find('.noTips').show();
                                _timer = setTimeout(function () {
                                    $(_a).parent().find(".attention_hint,.attention_hint_w").hide();
                                }, 3000);
                                $('.attention').removeClass('end').attr('status', '0').html('+关注');
                            }
                        }
                        else if (data.status == 10) {
                            fc_hide();
                            $(_a).parent().find(".tenTips").show();
                            _timer = setTimeout(function () {
                                $(_a).parent().find(".attention_hint,.tenTips").hide();
                            }, 3000);
                        }
                        $(this).attr('click_num', 0)
                    }
                });
            }

        });

    }
});
/**关闭浮层**/
function fc_hide() {
    /*  $(".attention_top").hide();
      $(".show_div_msg").hide();
      $(".attention_gz").hide();*/
    $(".attention_hint_w").hide();
}
/*  颜色图切换  */
function initFocusCol(id) {
    var c = modellist_cut_price.getElementById(id);
    var f = c.children.item(0);
    var as = c.parentNode.getElementsByTagName('a');
    var r, l;
    (function () {
        for (var i = 0, len = as.length; i < len; i++) {
            if (as.item(i).className == 'prev') {
                r = as.item(i);
            } else if (as.item(i).className == 'next') {
                l = as.item(i);
            }
        }
    })();
    f.style.left = "0px";
    var child = c.children.item(0);
    addHandler(r, 'click', function (event) {
        var event = event || window.event;
        scroll('right');
    });
    addHandler(l, 'click', function (event) {
        var event = event || window.event;
        scroll('left');
    });
    var lock = false;
    var hand = [];
    var stepSize = 20;
    var page = { p: 1, c: f.children.length };
    function scroll(l_r) {
        if (!lock) {
            var l_r = ((l_r == 'left') ? true : false);
            if (l_r) {	/* true = left , false = right */
                if (page.p < page.c) {
                    page.p++;
                    run(!l_r);
                }
            } else {
                if (page.p > 1) {
                    page.p--;
                    run(!l_r);
                }
            }
        }
    }
    function run(l_r, callback) {
        clear();
        hand.push(setTimeout(function () {
            if (!l_r) {	/* 左 */
                f.style.left = parseInt(f.style.left) - stepSize + "px";
                if (parseInt(f.style.left) > -parseInt((page.p - 1) * 280)) {
                    run(l_r);
                } else {
                    if (typeof callback == 'function') callback();
                    checkfr();
                }
            } else {	/* 右 */
                f.style.left = stepSize + parseInt(f.style.left) + "px";
                if (parseInt(f.style.left) < -parseInt((page.p - 1) * 280)) {
                    run(l_r);
                } else {
                    if (typeof callback == 'function') callback();
                    checkfr();
                }
            }
        }, 25));
    }
    function clear() {
        for (var i = 0, len = hand.length; i < len; i++) {
            clearInterval(hand[i]);
        }
        hand.length = 0;
    }
    function checkfr() {
        if (page.p == page.c) {
            l.className = 'next_on';
        } else {
            l.className = 'next';
        }
        if (page.p == 1) {
            r.className = 'prev_on';
        } else {
            r.className = 'prev';
        }
    }
    checkfr();
}
var jqueryname = jQuery_1_7_2;
//登录窗口
function openLoginWin() {
    jqueryname(".login").xLoginBox({
        func: function () {
            jqueryname("#xlogininfo").show();
            callLoginScript.call(null);
            reloadMsgInfo.call(null);
        },
        args: [],
        show: true
    });
}
var _dealer_info_lock = true;
//获取经销商
function AjaxDealerInfo(city_id, type, cityName, page, obj, province_id) {
    if (!city_id) return false;
    var _obj = obj
    if (false == _dealer_info_lock) return;
    _dealer_info_lock = false;
    $.ajax({
        type: 'GET',
        cache: false,
        url: '/auto/index.php?r=newcar/SeriseParentIndex/DealerAjax&pserid=' + pserid + '&city_id=' + city_id + '&type=' + type + '&page=' + page + '&province_id=' + province_id + '&zoneclick=' + zoneclick_var + "&rand=" + getRand(),
        context: _obj,
        success: function (data) {
            _dealer_info_lock = true;
            if (typeof data != 'undefined') {
                var _clicklog_num = '124722'
                if (page > 1) {
                    var _p_obj = $(_obj).parents('.agency_ct');
                    var _font_note = _p_obj.find('.font_note') // *信息由卡友点评提供，有疑问请联系爱卡
                    var _dl_box = _p_obj.children('.dl_box_ald')   // 动态添加 4s 店信息box

                    $(_obj).parent().remove();

                    _dl_box.find('.font_note').remove(); // 删除box里面的所有的注释信息
                    _dl_box.append(data); // 向box中追加数据
                    var _inner_load = _dl_box.children().last(); // 取box中最后一个元素
                    if (_inner_load.hasClass('look_all')) {
                        _inner_load.before(_font_note); // 如果最后一个元素为加载更多，则在前面插入，
                        _p_obj.children('.font_note').remove()
                    } else {
                        _p_obj.children('.font_note').remove()
                        _dl_box.after(_font_note); // 否则在box末尾追加一个。
                    }


                    // _dl_box.find('.font_note').remove(); // 清除 box 中的注释信息：*信息由卡友点评提供，有疑问请联系爱卡


                    // _p_obj.find('.dl_box_ald').html( _p_obj.find('.dl_box_ald').html() + data);
                } else {
                    $('#dealer_area_info').html(data);
                }
                if (0 > data.indexOf('暂无4S经销商') && 0 > data.indexOf('未上市') && 0 > data.indexOf('即将上市')) {
                    var _html = '<a onclick="clicklog(' + _clicklog_num + ')"  title="' + psname + cityName + '经销商" href="/' + pserid + '/baojia/" target="_blank">' + psname + cityName + '经销商</a>'
                } else {
                    var _html = psname + cityName + '经销商';
                }
                $('#dealer_location').html(_html);
                // 检查经销商是否同意协议，函数在//asserts.xcarimg.com/resource/DemioModel/js/dealer_cookie.js中
                checkDealer();
            }
        }
    });
}

function get_special_car(city_id) {
    var url = "/auto/index.php?r=newcar/SeriseParentIndex/getSpecialCar&rand=" + getRand();
    data = { city_id: city_id, pserid: pserid };
    $.ajax({
        url: url, data: data, dataType: "json", success: function (data) {
            $("[do=special_car_nav],[do=special_car_model],[do=special_car_text]").removeAttr("onclick").hide();
            if (data.code == 'discount') {
                if (data.discount > 0) {
                    var url = "//mail.xcar.com.cn/buy/" + data.discount + ".htm";
                    $("[do=special_car_text]").attr("href", url).html("特卖").show();
                    $("[do=special_car_nav],[do=special_car_model]").attr("href", url).html("<i>特卖</i>").show();

                }
            } else if (data.code == 'special') {
                var url = data.special.url;
                $("[do=special_car_text]").attr("href", url).html("特惠车").attr("onclick", "clicklog(126041);").show();
            }
        }
    });
}

/*车系关注  zjc*/
function focus_on() {
    if (getCookie('_discuz_uid')) {
        var url = "/auto/index.php?r=newcar/Attention/checkAttStatus&format=json&rand=" + getRand();
        $.ajax(
            {
                url: url + '&rand=' + Math.random(), dataType: "json", data: { type: "pserid", id: pserid }, success: function (data) {
                    if (data.status == 1 || data.status == 2) {
                        $(".attention").attr('status', "1").attr('class', 'attention end').html('已关注');
                    };
                }
            });
    }
    $(".attention").hover(function () {
        if ($(this).attr("status") == 1) {
            $(this).html("取消关注");
        }
    }, function () {
        if ($(this).attr("status") == 1) {
            $(this).html("已关注");
        }
    });
    $(".attention").click(function () {
        var _a = $(this);
        if (!getCookie('_discuz_uid')) {//是否登陆
            openLoginWin();
        }
        else {
            var _click_num = $(this).attr('click_num');//防止重复点击
            if (_click_num == 0) {
                _click_num = $(this).attr('click_num', 1)
            } else {
                return;
            }
            var command = _a.attr("status") == "1" ? 'del' : 'insert';
            var id = pserid;
            var url = "/auto/index.php?r=newcar/Attention/setAttStatus&format=json";
            $.ajax({
                url: url + '&rand=' + Math.random(), data: { command: command, id: id, type: "pserid" }, dataType: "json", success: function (data) {
                    if (data.status == -1) {
                        openLoginWin();
                    }
                    else if (data.status == 1 || data.status == 2) {
                        if (command == "insert") {
                            $('.attention').attr('status', "1").addClass('end').html('已关注');
                            var _ps = $('.ps_attention') == '' ? $('.ps_attention') : $('.notify');
                            _ps.attr('status', "1").attr('class', 'grey_but no_but undo').html('已关注该车');
                        }
                        else {
                            $('.attention').removeClass('end').attr('status', '0').html('+关注');
                            $('.no_but').attr('status', '0').attr('class', 'orange_but notify').html('上市通知我');
                        }
                    }
                    $('.attention').attr('click_num', 0);
                }
            });
        }

    });
}
function fun_lazy_load(obj, _threshold) {
    if (typeof obj == 'object') {
        var _threshold = typeof _threshold != "undefined" ? _threshold : 150;
        /*obj.lazyload({
            placeholder:'//img1.xcarimg.com/newcar/defaultimg.png',
            data_attribute:'src',
            threshold:_threshold
        })*/
    }
}
$(document).ready(function () {
    if (typeof _AttStatus_flag != 'undefined' && _AttStatus_flag == 1) {
        $().attention_tz();//上市通知我调用
    }
    var _color_obj = document.getElementById('focusCol');
    if (_color_obj != null) {
        new initFocusCol('focusCol');
    }

    /* dealer*/
    tab_switch({ "pannel": "#dealer_area_info", "ele": ".tag_ul li a", "cls": "cur", "hid": ".agency_ct" });
    /* cost*/
    tab_switch({ "pannel": "#costs_info", "parents": "", "ele": "div.costs_switch span a", "cls": "cur", "hid": "div.cost_content" });
    /* modellist*/
    tab_switch({ "pannel": "#serise_model_price_list", "parents": "", "ele": "ul.tag_ul li a", "cls": "cur", "hid": "table.table_main" });
    /* article*/
    tab_switch({ "pannel": "#article_list", "hid": "div.list_cont" });
    /* space*/
    tab_switch({ "pannel": "#spaces_info", "parents": "", "ele": "div.space_tag span a", "cls": "cur", "hid": "div.spaces_content" });
    /* news_list */
    tab_switch({ "pannel": "#first_sceen_news_list", "ele": "ul.news_list_ul li a", "hid": "div.coupon_mian" });

    /* space report switch*/
    $('#space_report .seat_ul a').on('click', function () {
        var _pobj = $(this).parent();
        if (_pobj.hasClass('curve')) {
            return true;
        }
        _pobj.parent().find('.curve').removeClass('curve')
        var _index = _pobj.addClass('curve').parent().find('li').index(_pobj);
        $('#space_report').find('.conter_main').hide().eq(_index).show();
    })
    /* space report pop*/
    $("#space_report .question").hover(function () {
        $(this).addClass("blueques").parents(".facebox").find(".poptip").css({ "visibility": "visible" });
    }, function () {
        $(this).removeClass("blueques").parents(".facebox").find(".poptip").css({ "visibility": "hidden" });
    });

    /**car select color**/
    var car_sel_color_timer = null;
    $(".car_select_color").hover(function () {
        if (car_sel_color_timer != null) {
            clearTimeout(car_sel_color_timer);
        }
        $(this).parent().find(".current").removeClass("current");
        $(this).addClass("current");
        var rel = $(this).attr("rel");
        var imgsrc = rel ? rel : "//icon.xcar.com.cn/2011newcar/images/auto/car_default.jpg";
        var photo_url = "//newcar.xcar.com.cn/photo/ps" + pserid;
        var aobj = $(this).parents(".demio_focus").find(".demio_focus_img a.imga");
        $(this).parents(".demio_focus").find(".demio_focus_img img.color_car_img").fadeOut("slow", function () {
            $(this).attr("src", imgsrc).fadeIn();
        });
        if (rel) {
            aobj.attr("href", photo_url);
        } else {
            aobj.attr("href", "javascript:void(0);").attr("target", "").css({ "cursor": "default" });
        }
    }, function () {

        if (car_sel_color_timer != null) {
            clearTimeout(car_sel_color_timer);
        }
        var pobj = $(this).parents(".demio_focus");
        pobj.find(".current").removeClass("current");
        car_sel_color_timer = setTimeout(function () {
            $(".color_car_img").stop().css({ "opacity": "1" });
            var imgobj = pobj.find(".demio_focus_img img.color_car_img");
            imgobj.attr("src", imgobj.attr("defaultimg"));

            var aobj = imgobj.parent();
            if (aobj.attr("thref") != "") {
                aobj.attr("href", aobj.attr("thref")).attr("target", "_blank").css({ "cursor": "pointer" });
            }
        }, 500);
    });
    /* 引导图*/
    $(".color_car_img").hover(function () {
        if (car_sel_color_timer != null) {
            clearTimeout(car_sel_color_timer);
        }
    }, function () {
        if (car_sel_color_timer != null) {
            clearTimeout(car_sel_color_timer);
        }
        var pobj = $(this).parents(".demio_focus");
        car_sel_color_timer = setTimeout(function () {
            $(".color_car_img").stop().css({ "opacity": "1" });
            var imgobj = pobj.find(".demio_focus_img img.color_car_img");
            imgobj.attr("src", imgobj.attr("defaultimg"));

            var aobj = imgobj.parent();
            if (aobj.attr("thref") != "") {
                aobj.attr("href", aobj.attr("thref")).attr("target", "_blank").css({ "cursor": "pointer" });
            }
        }, 500);
    });
    /* model price list */
    $('#serise_model_price_list').on('click', '.get_model_yearlist', function () {
        var _num = parseInt($(this).text());
        var _year = _num > 0 ? _num : 'all';//显示的年款
        var $_table = $(this).parents('#serise_model_price_list').find('table');
        if (_year != '') {
            if (_year == 'all') {
                $_table.find('tr').show();
            } else {
                $_table.find('.table_bord').hide();
                $_table.find("[year=" + _year + "]").show();
            }
            //切换table_head
            switch_price_list_tr(_year);
        }
    })

    /*空间报告切换*/
    $("div.space_option li").unbind("click").click(function () {
        var value = $(this).children("a").text();
        var change = $(this).attr('name');
        if (change != '') {
            var parentspace = $(this).parents('.spaces_content');
            parentspace.find('.poptip').hide();
            parentspace.find('.' + change).show();
            var index_of = parentspace.find("div.space_option > ul > li").index($(this));

            //设置隐藏的那个变更
            $("#spaces_info > div.spaces_content:hidden").each(function () {
                var hid_spaces_content = $(this);
                var hid_li = hid_spaces_content.find("div.space_option > ul > li").eq(index_of);
                var hid_change = $(hid_li).attr('name');
                if (hid_change != "") {
                    hid_spaces_content.find('.poptip').hide();
                    hid_spaces_content.find('.' + hid_change).show();
                }
            });
        }
        $("#spaces_info").find("div.selectem").text(value);
        $("#spaces_info").find("div.ps_selectbox").removeClass('selectbox_on').addClass('selectbox');
        $(this).parents(".option").hide();

    });
    /*车系颜色切换*/
    $('.focus_cn .hue_on').click(function () {
        if ($(this).hasClass('hue_off')) {
            $(this).removeClass('hue_off');
            $('.focus_cn .hue_main').hide();
        } else {
            $(this).addClass('hue_off');
            $('.focus_cn .hue_main').show();
        }
    });
    /*配置信息溢出判断*/
    $('.ref_cn .more').mouseover(function () {
        if ($(this).hasClass('pl')) {
            $('.ref_cn .pls').show();
        } else if ($(this).hasClass('jg')) {
            $('.ref_cn .jgs').show();
        } else if ($(this).hasClass('bsx')) {
            $('.ref_cn .bsxs').show();
        }
    });
    $('.ref_cn .more').mouseout(function () {
        if ($(this).hasClass('pl')) {
            $('.ref_cn .pls').hide();
        } else if ($(this).hasClass('jg')) {
            $('.ref_cn .jgs').hide();
        } else if ($(this).hasClass('bsx')) {
            $('.ref_cn .bsxs').hide();
        }
    });
    /*车系颜色切换*/
    $('.space_tag span').mouseover(function () {
        if ($(this).hasClass('cur')) {
            $(this).removeClass('cur');
        } else {
            $(this).addClass('cur');
        }
    });
    /*空间报告文字详解*/
    $('.showbox .hint').mouseover(function () {
        $('.showbox .state').show();
    });
    $('.showbox .hint').mouseout(function () {
        $('.showbox .state').hide();
    });

    $('a.cur_a').hover(
        function () {
            $(this).addClass('cur');
        },
        function () {
            $(this).removeClass('cur');
        }
    )
    $(document).on('click', 'div.seller_level a.pub_city_but', function () {
        var city_id = $(this).parents('div.seller_tab').find('.city_id').val();
        if (0 >= city_id) {
            alert('请选择城市');
            $(this).parents('.seller_tab').show();
            return;
        }
        var province_id = $(this).parents('div.seller_tab').find('.province_id').val();
        var city_name = $(this).parents('div.seller_tab').find('.cityName').text();
        var province_name = $(this).parents('div.seller_tab').find('.provinceName').text();
        if (typeof province_id != "undefined" && typeof city_name != "undefined") {
            ajax_load(city_id, city_name, province_id);
            $('div.seller_tab').find('div.cityName').text(city_name);
            $('div.seller_tab').find('div.provinceName').text(province_name);
            $('div.seller_tab').find("input[class='province_id']").val(province_id);
            $('div.seller_tab').find("input[class='city_id']").val(city_id);
        }
    })
    $(document).bind('click', function (e) {
        var _obj = $(e.target).parent('.other_color_box');
        if (_obj.size() <= 0) {
            $('div.other_color_box a.color_click_box').removeClass('hue_off');
            $('div.other_color_box div.color_content_box').hide();
        }
    })
    fun_lazy_load($("#video_lazyload img,#photo_lazyload img,#activity_lazyload img"));
    fun_lazy_load($("#activity_lazyload img"), 300);
});
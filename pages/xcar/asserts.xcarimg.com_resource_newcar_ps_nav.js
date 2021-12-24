/**
 * Created by Xcar on 16-8-22.
 * 导航公共JS文件
 */
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

/**
 * 公共导航车型头部关注
 */
function getCookie2(name) {
    var cookieName = encodeURIComponent(name) + '=',
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;
    if (cookieStart > - 1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd == - 1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
}
function nav_attention() {
    var _timer = null;
    $(".follow").each(function () {
        $(this).attr("dv", $(this).html());
    });
    if (getCookie2('_discuz_uid')) {
        var url = "/auto/index.php?r=newcar/Attention/checkAttStatus&format=json";
        $.ajax({
            url: url + '&rand=' + Math.random(), dataType: "json", data: { type: "mid", id: _nav_mid }, success: function (data) {
                if (data.status == 1 || data.status == 2) {/***已经关注***/
                    $(".ps_head_attention").attr("status", "1").removeClass("orange_but").addClass("grey_but").html("<em></em>已关注");
                }
            }
        });
    }

    $(".ps_head_attention").hover(function () {
        //1:表示已关注
        if ($(this).attr("status") != 1) {
            $(this).html($(this).attr("dv"));
        } else {
            $(this).removeClass('grey_but').addClass('call_but').html("取消关注");
        }
    }, function () {
        if ($(this).attr("status") != 1) {
            $(this).html($(this).attr("dv"));
        } else {
            $(this).removeClass('call_but').addClass('grey_but').html("<em></em>已关注");
        }
    });
    var _att_lock = true;
    $(".ps_head_attention").click(function (event) {
        if (_att_lock == true) {
            _att_lock = false;
            event.preventDefault();
            var _a = $(this);
            if (!getCookie2('_discuz_uid')) {//是否登陆
                openLoginWin();
                _att_lock = true;
            } else {
                var command = _a.attr("status") == "1" ? 'del' : 'insert';
                var url = "/auto/index.php?r=newcar/Attention/setAttStatus&format=json";
                $.ajax({
                    url: url + '&rand=' + Math.random(), data: { command: command, id: _nav_mid, type: "mid" }, dataType: "json", success: function (data) {
                        if (data.status == -1) {
                            openLoginWin();
                        } else if (data.status == 1 || data.status == 2) {
                            if (command == "insert") {
                                $(".ps_head_attention").attr("status", "1").removeClass("orange_but").addClass("grey_but").html("<em></em>已关注");
                            } else {
                                $(".ps_head_attention").attr("status", "0").attr('class', 'follow ps_head_attention orange_but').html($(".ps_head_attention").attr("dv"));
                            }
                        }
                        _att_lock = true;
                    }
                });
            }
        }

    });
}

/**
 * 获取报价信息
 */
function getDealerPriceNav(_pserid, _mid, _city_id) {
    var pserid = _pserid > 0 ? parseInt(_pserid) : 0;
    var mid = _mid > 0 ? parseInt(_mid) : 0;
    var city_id = _city_id ? parseInt(_city_id) : 0;
    if ((!pserid && !mid) || !city_id) return false;
    $.getJSON(
        '/auto/index.php?r=ajax/NavPrice&c=' + city_id + "&p=" + pserid + "&m=" + mid,
        function (data) {
            if (1 == data) { return; }
            $('#newcar_nav_dealer_price').attr('class', 'no').attr('href', 'javascript:;');
        }
    );
}
/*
* 获取二手车信息
*/

function checkUsedCar(_pserid, _city_id, _province_id, _pbid, _type) {
    if (0 > _pserid || 0 > _pbid) return false;
    if (_city_id == undefined) _city_id = 0;
    if (_province_id == undefined) _province_id = 0;
    if (_type == undefined) _type = '';
    var log = _type == 'ps' ? '127099' : '127101';
    var usedImgSrc = $("#usedIconImg").val();

    $.getJSON(
        '/auto/index.php?r=ajax/CheckUsedCar&pserid=' + _pserid + '&city_id=' + _city_id + '&province_id=' + _province_id + '&pbid=' + _pbid,
        function (e) {
            var link = '<a target="_blank" href="//used.xcar.com.cn/search/' + _province_id + '-' + _city_id + '-0-0-0-0-' + _pbid + '-' + _pserid + '-0-0-0-0-0-0-0-0-0-0-0/?zoneclick=' + log + '" class="grey_but alink" >二手车</a>';

            if (usedImgSrc) {
                link += '<em class="usedIcon"><img src="' + usedImgSrc + '"></em>'
            }

            $('#used2_cars').html('').html(link);
            if (e != '') {
                $('.xcar_used_car').attr('href', e);
            } else {
                $('.xcar_used_car').removeAttr('target').attr('href', 'javascript:;').addClass('no');
                $('.xcar_used_car').next('.usedIcon').remove();
            }
        }
    )
}
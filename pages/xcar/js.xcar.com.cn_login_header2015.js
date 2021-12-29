var b_v = navigator.appVersion,
    IE6 = -1 != b_v.search(/MSIE 6/i),
    IE7 = -1 != b_v.search(/MSIE 7/i),
    data_time = Date.parse(new Date);
IE6 || IE7 ? loadScript({
    url: "//www.xcar.com.cn/site_js/header/new_login_2015ie6.php?t=" + data_time,
    charset: "gbk"
}) : loadScript("//www.xcar.com.cn/site_js/header/new_login_2015.php?t=" + data_time);

// function setCookierl(a, b, c, d, e, g) {
//     var f = new Date;
//     f.setDate(f.getDate() + c);
//     a = encodeURIComponent(a) + "=" + encodeURIComponent(b);
//     a += ";expires=" + f.toGMTString();
//     d && (a += ";path=" + d);
//     e && (a += ";domain=" + e);
//     g && (a += ";secure");
//     document.cookie = a
// }
var setCookierl = function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += ";expires=" + expires.toGMTString();
    }
    if (typeof expires == "number") {
      var cookieTime = new Date();
      cookieTime.setTime(cookieTime.getTime() + expires * 1000);
      cookieText += ";expires=" + cookieTime;
    }
    if (path) {
      cookieText += ";path=" + path;
    }
    if (domain) {
      cookieText += ";domain=" + domain;
    }
    if (secure) {
      cookieText += ";secure";
    }
    document.cookie = cookieText;
  };
$(".menubox").hover(function() {
    $(this).addClass("hover");
    $(this).children(".muser_show").css("width", 110 < $(this).width() ? $(this).width() : 110);
    var a = $(this).attr("rel");
    if (a && "xheaderbbsnavBox" == a) {
        var b = document.getElementById("xheaderbbsNav").children.item(0);
        if ("" == b.src) {
            var c = "//" + window.location.host;
            b.src = "//info.xcar.com.cn/bbs_nav.php?navul=" + c
        }
    }
    a && "xheaderchishi" == a && (b = document.getElementById("xheadcsdaohang").children.item(0), "" == b.src && (c = "//" + window.location.host, b.src =
        "//info.xcar.com.cn/ches_nav.php?navul=" + c))
}, function() {
    $(this).removeClass("hover")
});
var msg_tip = function(a) {
    var b = _str2 = _viewMode = _userClass = "",
        c = 0,
        d = document.getElementById("xheaderMessage"),
        e;
    e = function(a) {
        a = parseInt(a);
        0 < a ? (d.className = "menubox fr mess", a = '<div class="menutb" id="header_msg" style="">\u6d88\u606f<i>' + (99 < a ? "99+" : a) + "</i></div>", $(".mess").hover(function() {
                $("#header_msg").addClass("active");
                $(this).removeClass("active");
                $(this).addClass("hover");
                $(this).css("width", $(this).width())
            }, function() {
                $("#header_msg").removeClass("active");
                $(this).removeClass("hover")
            })) :
            (d.className = "menubox fr", a = '<div class="menutb" id="header_msg" >\u6d88\u606f</div>', $(".menubox").hover(function() {
                $(this).removeClass("active");
                $(this).addClass("hover");
                $(this).children(".muser_show").css("width", $(this).width())
            }, function() {
                $(this).removeClass("hover")
            }));
        return a
    };
    if (0 == a.stat) b = '<a href="//my.xcar.com.cn/msg/index.php" target="_blank" class="register">\u6d88\u606f</a>', null != a && (_viewMode = "none");
    else {
        _str2 = '<div class="mess_show">';
        for (var g = 1, b = 0, f = a.length; b < f; b++) {
            var h =
                a[b].count;
            0 == a[b].count && (h = "");
            c += parseInt(a[b].count);
            _str2 += '<a target="_blank" href="' + a[b].url + '"><em>' + h + "</em>" + a[b].name + "</a>";
            g++
        }
        _str2 += '<a target="_blank" href="//my.xcar.com.cn/set/reminder.php" style="color:#F37D01;display: none;">\u6d88\u606f\u63d0\u9192\u8bbe\u7f6e</a>';
        _str2 += "</div>";
        b = e(c) + _str2;
        _viewMode = "block";
        d.style.display = _viewMode;
        d.innerHTML = b
    }
    _str2 = b = _viewMode = _userClass = void 0;
    delete _str2;
    b;
    _viewMode;
    _userClass;
    c && msgFlicker()
};

function resWriteCheshiname() {
    if (475 != __ipLocationInfo.city_id) {
        var a = __ipLocationInfo.city_name + "\u8f66\u5e02";
        document.getElementById("xHeaderIplocation").innerHTML = '<a href="' + __ipLocationInfo.url + '" target="_blank">' + a + "</a>";
        document.getElementById("xHeaderIplocation").parentNode.style.width = 18 * a.length + 60 + "px"
    }
}
var __ipLocationInfo = {
        url: "//bj.xcar.com.cn/",
        province_id: "1",
        city_id: 475,
        city_name: "\u5317\u4eac"
    },
    _ipLocationInfo = getCookie("_locationInfo_");
if (_ipLocationInfo) __ipLocationInfo = _ipLocationInfo = eval("(" + _ipLocationInfo + ")"), __ipLocationInfo.city_name = decodeURIComponent(_ipLocationInfo.city_name), resWriteCheshiname();
else {
    var hosturl = document.domain,
        ipurl = "tools.xcar.com.cn";
    loadScript("//" + ipurl + "/ip2city/ip2getcity.php?_t=json&s=" + Date.parse(new Date) + "&from=" + encodeURIComponent(location.href), function() {
        _ipLocationInfo = __ipLocationInfo;
        __ipLocationInfo.url = _ipLocationInfo.url[0];
        var a = '{url:"' + __ipLocationInfo.url + '",city_id:"' +
            __ipLocationInfo.city_id + '",province_id:"' + __ipLocationInfo.province_id + '", city_name:"' + encodeURIComponent(__ipLocationInfo.city_name) + '"}';
        setCookierl("_locationInfo_", a, 86400, "/", ".xcar.com.cn");
        resWriteCheshiname();
        delete a;
        _ipLocationInfo
    })
}
var _xHeaderTimer = null,
    msgFlicker = function() {
        null !== _xHeaderTimer && (clearTimeout(_xHeaderTimer), _xHeaderTimer = null);
        var a = document.getElementById("header_msg");
        a && (a.className = "menutb" == a.className ? "menutb glint" : "menutb active" == a.className ? "menutb active glint" : "menutb glint" == a.className ? "menutb" : "menutb active", _xHeaderTimer = setTimeout("msgFlicker()", 500))
    };

function callLoginScript() {
    var a = document.getElementById("updateHeaderLoginScript");
    a && a.parentNode.removeChild(a);
    a = "//www.xcar.com.cn/site_js/header/new_login_2015.php?t=" + Date.parse(new Date);
    loadScript({
        url: a,
        id: "updateHeaderLoginScript",
        callback: function() {}
    })
}

function reloadMsgInfo() {
    var a = document.getElementById("updateHeaderUserMsg");
    a && a.parentNode.removeChild(a);
    a = "//msg.xcar.com.cn/newpop/msg_tip_new_forbbs.php?type=cms&t=" + Date.parse(new Date);
    loadScript({
        url: a,
        id: "updateHeaderUserMsg",
        callback: function() {
            updat_news_handler.run = !0;
            updat_news()
        }
    })
};
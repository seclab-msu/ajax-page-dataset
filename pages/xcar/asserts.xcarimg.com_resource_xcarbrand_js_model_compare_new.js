/**
 * 新版车型对比js,newcar-yu.jie,2016.9.4
 * edit 统计代码的顺序依次为 0车型对比按钮-1收起-2车型链接-3清除车型-4开始对比-5全部清空-6推荐车型链接-7推荐车型对比按钮-8推荐车型曝光-9品牌车系下车型
 * 记录统计代码的全局变量 compare_clickcode
 */

if (typeof (compare_clickcode) == 'undefined') {
    var compare_clickcode = [];
}

$(function () {
    function modelCompareNew(m) {
        var m = m || null;
        this.cookieScript1 = 'xcar_mcmp_mids'; //cookie名字
        this.cookieScript2 = 'xcar_mcmp_products';
        this.dataSource = NewCarSecObj;
        this.initSource();
        this.redraw();
        //var self = this;

    }
    //初始化准备工作 ->
    modelCompareNew.prototype.initSource = function () {

        var _self = this;
        var _datasource = _self.dataSource;
        var pb_data, words_tmp, _word;
        var words_str = pb_words = "";
        var pb_tmp_obj = {};
        pb_data = _datasource['pb'];
        for (var i in pb_data) {
            for (var j in pb_data[i]) {
                //var _ie8 = pb_data[i][j].toString();
                var _d = pb_data[i][j].split(" ");
                pb_tmp_obj[_d[0]] = pb_tmp_obj[_d[0]] || '';
                pb_tmp_obj[_d[0]] += j + '|' + _d[1] + ',';
            }
        }

        for (var w in pb_tmp_obj) {
            words_str += "<li><a href='javascript:;'>" + w + "</a></li>";//大写字母
            pb_words += "<li id='oft_" + w + "'><em>" + w + "</em></li>";//父品牌
            if (!pb_tmp_obj[w] || undefined == pb_tmp_obj[w]) {
                continue;
            }
            var _c = pb_tmp_obj[w].split(',')

            for (var e = 0; e < _c.length; e++) {
                if (!_c[e] || undefined == _c[e]) {
                    continue;
                }
                var ie8 = _c[e].toString();
                var _f = ie8.split('|');
                if (!_f[0])
                    continue;
                pb_words += "<li value='" + _f[0] + "'><a href='javascript:;'>" + _f[1] + "</a></li>";
            }
        }
        var ul_pb_words = $(".ul_pb_words");
        var ul_cp_words = $(".ul_cp_words");
        ul_cp_words.append(words_str); //初始化首字母ABC..
        ul_pb_words.append(pb_words);//初始化父品牌

        //点击字母定位父品牌 ->
        ul_cp_words.find("li").each(function () {

            $(this).bind('click', function () {
                ul_cp_words.find("a").removeClass('cur');
                $(this).children('a').addClass('cur');
                var now_scroll_top = $(".roll_pb_croll").scrollTop();
                var ul_pb_words_top = $(".roll_pb_croll").offset().top;
                var pb_w_id = '#oft_' + $(this).children('a').html();
                var _tmp_top = $(pb_w_id).offset().top;
                var scroll_top = _tmp_top - ul_pb_words_top;
                $(".roll_pb_croll").scrollTop(scroll_top + now_scroll_top);

            })
        })

        //点击字母定位父品牌  <-

        //点击父品牌 出现 选择 车系 ->
        ul_pb_words.find("li").each(function () {
            $(this).bind('click', function () {
                var pb_id = $(this).attr("value");
                if (pb_id <= 0)
                    return false;

                _self.initPserids(pb_id);
            })
        })

        //点击父品牌 出现 选择 车系 <-

        //页面对比按钮状态判断是否置灰 ->
        _self.alreadyJoin();
        //页面对比按钮状态判断是否置灰 <-
        _self.businessAd(1);

    }
    //初始化准备工作 <-

    //调取所有父车系 ->
    modelCompareNew.prototype.initPserids = function (pb_id) {
        var _self = this;
        var pbtob = this.dataSource['b'][pb_id];
        var btops = this.dataSource['ps'];
        var ps_str = "";
        if (!pbtob)
            return false;

        for (var i in pbtob) {
            if (!pbtob[i])
                continue;

            ps_str += "<li bid='" + pbtob[i]['id'] + "'><em>" + pbtob[i]['name'] + "</em></li>";
            var _ps_arr = btops[pbtob[i]['id']];

            for (var j in _ps_arr) {

                ps_str += "<li value='" + _ps_arr[j]['id'] + "'><a href='javascript:;'>" + _ps_arr[j]['name'] + "</a></li>";
            }
        }

        $(".ul_ps_words").empty().append(ps_str);
        $("#pb_block").hide();
        $("#ps_block").show();
        $(".ul_ps_words > li").each(function () {
            $(this).bind('click', function () {
                var ps_id = $(this).attr("value");
                if (ps_id <= 0)
                    return false;

                _self.initModels(ps_id);
            })
        })

    }
    //调取所有父车系 <-

    //调取所有车型 ->
    modelCompareNew.prototype.initModels = function (ps_id) {
        var midstr = this.getCookies(this.cookieScript1);
        var pstos = this.dataSource['s'][ps_id];
        var stom = this.dataSource['m'];
        var m_str = "";

        if (!pstos)
            return false;

        for (var i in pstos) {
            if (!pstos[i])
                continue;

            m_str += "<li bid='" + pstos[i]['id'] + "'><em>" + pstos[i]['name'] + "</em></li>";
            var _m_arr = stom[pstos[i]['id']];

            for (var j in _m_arr) {
                var txt = new RegExp(_m_arr[j]['id']);
                if (txt.test(midstr)) { //如果这个车型已经选了
                    m_str += "<li data-value='" + _m_arr[j]['id'] + "|" + pstos[i]['name'] + "'><a href='javascript:;'>" + _m_arr[j]['name'] + "(已添加)</a></li>";
                } else {
                    m_str += "<li data-value='" + _m_arr[j]['id'] + "|" + pstos[i]['name'] + "'><a href='javascript:;'>" + _m_arr[j]['name'] + "</a></li>";
                }
            }
        }

        $(".ul_m_words").empty().append(m_str);

        $("#ps_block").hide();
        $("#m_block").show();


        var That = this;
        $(".ul_m_words > li").each(function () {

            $(this).bind('click', function () {
                if (!$(this).data("value")) {
                    return false;
                }

                var m_val = $(this).data("value") + ' ' + $(this).children('a').html();

                if (m_val == null || m_val == undefined)
                    return false;
                if (/已添加/.test(m_val)) {
                    return false;
                }

                That.modelJoinCompare(m_val);

                $("#m_block").hide();
                if ($("#s_pb_block").hasClass('elect_pop')) {
                    $("#s_pb_block").removeClass('elect_pop');
                }
                compare_clickcode[9] > 0 && clicklog(compare_clickcode[9]);
            })
        })
    }
    //调取所有车型 <-

    //存cooki ->
    modelCompareNew.prototype.conserveCookies = function (name, value, expires) {

        var exp = new Date();
        exp.setTime(exp.getTime() + expires * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/" + ";domain=.xcar.com.cn";

    }
    //存cooki <-
    //取cooki ->
    modelCompareNew.prototype.getCookies = function (name) {

        var strArg = name + "=";
        var nArgLen = strArg.length;
        var nCookieLen = document.cookie.length;
        var nEnd;
        var i = 0;
        var j;

        while (i < nCookieLen) {
            j = i + nArgLen;
            if (document.cookie.substring(i, j) == strArg) {
                nEnd = document.cookie.indexOf(";", j);
                if (nEnd == -1) nEnd = document.cookie.length;
                return unescape(document.cookie.substring(j, nEnd));
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }

        return null;
    }
    //取cooki <-

    //车型加入对比 ->
    modelCompareNew.prototype.modelJoinCompare = function (m) {

        if (m == null || m.length <= 0) {
            return false;
        }
        var m2 = m.split('|');

        //车型id必须是纯数字
        /*var reg = new RegExp("^[0-9]+$");
        if(!reg.test(m2[0])){
            return false;
        }*/

        var midstr = this.getCookies(this.cookieScript1);

        var midlen = !midstr ? [] : midstr.split(',');

        if (midlen.length >= 6) {
            //alert('最多只能对比6个车型');
            $("#alert_message").css({ color: 'red' });
            this.redraw();//20161024两个页面不刷新的情况下cookie不同步
            return false;
        } else {
            $("#alert_message").css({ color: 'rgb(153,153,153)' });
        }
        var cmpstr = this.getCookies(this.cookieScript2);

        if (cmpstr != null && cmpstr.indexOf(m) > -1) {
            //alert('该车型已加入对比');
            return false;
        }

        midlen.push(m2[0]);

        var xinCookieValue1 = midlen != undefined && midlen.length > 1 ? midlen.join(',') : m2[0];
        var xinCookieValue2 = cmpstr != null && cmpstr.length > 1 ? cmpstr + "," + m : m;
        this.conserveCookies(this.cookieScript1, xinCookieValue1, 1); //车型id的cookie
        this.conserveCookies(this.cookieScript2, xinCookieValue2, 1); //车型名称的cookie
        this.redraw();
        var addMid = m2[0];
        this.businessAd(addMid);

    }
    //车型加入对比 <-
    //移除车型对比 ->
    modelCompareNew.prototype.modelRemoveCompare = function (m) {
        var m = m || null;
        var midstr = this.getCookies(this.cookieScript1);
        var midlen = midstr == null ? 0 : midstr.split(',').length;
        if (midlen >= 6) {
            //alert('最多只能对比6个车型');
            return false;
        }

    }
    //移除车型对比 <-

    modelCompareNew.prototype.redraw = function () {
        var self = this;
        var _cks = this.getCookies(this.cookieScript2);
        if (_cks == null || _cks == undefined || _cks == '') {  //清空对比
            $('.cmp_show_block').empty();
            $("#ad_contain_div").html('');//推荐广告也要空
            //return;
        }
        var _ckrr = _cks != null && _cks.length > 1 ? _cks.split(',') : [];
        var _show_str = '', link = [], _tmp_s;
        if (_ckrr.length > 0) {
            for (var i = 0; i < _ckrr.length; i++) {
                _tmp_s = _ckrr[i].split('|');
                if (_tmp_s[1].indexOf("<span>") >= 0) {
                    _show_str += '<li><p><img src="//js.xcar.com.cn/cms/16index/pic/txtAd1.png" width="21" height="12" style="margin-right:8px;position:relative;top:3px;"><a href="//newcar.xcar.com.cn/m' + _tmp_s[0] + '" onclick="clicklog(' + compare_clickcode[2] + ')" >' + _tmp_s[1] + '</a></p><a href="javascript:void(0)" class="close delcmp" data-key="' + _tmp_s[0] + '">×</a></li>';

                }
                else {
                    _show_str += '<li><p><a href="//newcar.xcar.com.cn/m' + _tmp_s[0] + '" onclick="clicklog(' + compare_clickcode[2] + ')" >' + _tmp_s[1] + '</a></p><a href="javascript:void(0)" class="close delcmp" data-key="' + _tmp_s[0] + '">×</a></li>';
                }
                link.push(_tmp_s[0]);
            }
        }


        $('.cmp_show_block').empty().append(_show_str);//显示对比车型列表
        $(".delcmp").bind('click', function () {  //单个删除每个车型
            var d_key = $(this).data('key');
            self.delProduct(d_key);
            compare_clickcode[3] > 0 && clicklog(compare_clickcode[3]);
        })
        /*$(document).on('click','.delcmp',function(){  //单个删除每个车型
            var d_key = $(this).data('key');
            self.delProduct(d_key);
        })*/

        var link_url = '//' + location.hostname + '/compare/';

        if (link.length == 1)
            link_url = '//' + location.hostname + '/compare/' + link + '.htm';

        if (link.length > 1)
            link_url = '//' + location.hostname + '/compare/' + link.join('-') + '.htm';

        $("#beginCmp").attr('href', link_url); //给开始对比 赋链接
        if (compare_clickcode[4] > 0) {
            $("#beginCmp").attr('onclick', 'clicklog(' + compare_clickcode[4] + ')'); //给开始对比 赋链接
        }
        self.alreadyJoin();
        if (_ckrr.length >= 6) {
            $("#alert_message").css({ color: 'red' });
            $("#s_pb_block").addClass('elect_no');
            return;
        } else {
            $("#alert_message").css({ color: 'rgb(153,153,153)' });
            if ($("#s_pb_block").hasClass('elect_no')) {
                $("#s_pb_block").removeClass('elect_no');
            }
        }


    }

    modelCompareNew.prototype.emptyCmp = function () {
        this.conserveCookies(this.cookieScript1, '', 1);
        this.conserveCookies(this.cookieScript2, '', 1);
        this.redraw();
    }

    modelCompareNew.prototype.delProduct = function (mid) {

        var nameCookieValue1 = this.getCookies(this.cookieScript1);
        var nameCookieValue2 = this.getCookies(this.cookieScript2);
        if (nameCookieValue1 && nameCookieValue1.indexOf(mid) != -1) {
            var arrCookies1 = nameCookieValue1.split(",");
            var arrCookies2 = nameCookieValue2.split(",");
            var ValueNum = arrCookies1.length;
            var nameCookieValue1 = [], nameCookieValue2 = [];
            for (i = 0; i < ValueNum; i++) {
                if (arrCookies1[i].indexOf(mid) == -1) {
                    nameCookieValue1.push(arrCookies1[i]);
                }
                if (arrCookies2[i].indexOf(mid) == -1) {
                    nameCookieValue2.push(arrCookies2[i]);
                }

            }

            this.conserveCookies(this.cookieScript1, nameCookieValue1.join(','), 1);
            this.conserveCookies(this.cookieScript2, nameCookieValue2.join(','), 1);

            //当删除的这条车型id和下面的推荐广告id是同一个时，推荐广告的按钮要从已对比变成对比
            var tj = $("#ad_contain_div");
            var tjid = tj.val();
            if (tjid > 0 && tjid == mid) {
                this.businessAd(1);
            }

        }
        this.redraw();
    }


    modelCompareNew.prototype.alreadyJoin = function () {
        var midstr = this.getCookies(this.cookieScript1);
        var midlen = midstr == null ? 0 : midstr.split(',').length;
        var flag = 0;  //'全部加入对比'按钮的是否置灰判断
        if (midlen >= 1) {
            $(".cmp_button").each(function () {  //车型首页初始化它的对比按钮状态
                var v = $(this).data('value') || '9999|9999';
                var v1 = v.split('|');
                var txt = new RegExp(v1[0]);
                if ($(this).is(":visible")) { //如果它在对比数据里 按钮置灰
                    if (txt.test(midstr)) {
                        $(this).hide();
                        $(this).parents("p").children(".grey_but").show();
                    } else {
                        flag++;
                    }
                } else { //如果不在对比数据里 置灰的按钮要恢复
                    if (!txt.test(midstr)) {
                        $(this).show();
                        $(this).parents("p").children(".grey_but").hide();
                        flag++;
                    }
                }

            })
            if (flag > 0) {
                if ($("#whole_compares").hasClass('grey_but')) {
                    $("#whole_compares").removeClass('grey_but').addClass('blue_but').html('全部加入对比');
                }
            } else {
                if ($("#whole_compares").hasClass('blue_but')) {
                    $("#whole_compares").removeClass('blue_but').addClass('grey_but').html('已全部对比');
                }
            }
            //车系车型报价页初始化它的对比按钮状态
            if ($('.cmp_button_a').length > 0) {
                $('.cmp_button_a').each(function () {
                    var v = $(this).data('value') || '9999|9999';
                    var v1 = v.split('|');
                    var txt = new RegExp(v1[0]);
                    if ($(this).hasClass("no_but")) { //如果不在对比数据里 置灰的按钮要恢复
                        if (!txt.test(midstr)) {
                            $(this).removeClass('no_but').addClass('grey_but').html("对比");
                        }
                    } else { //如果它在对比数据里 按钮置灰
                        if (txt.test(midstr)) {
                            $(this).show();
                            $(this).removeClass('grey_but').addClass('no_but').html("已加入");
                        }
                    }
                })
            }
        } else {
            if ($("#whole_compares").hasClass('grey_but')) {
                $("#whole_compares").removeClass('grey_but').addClass('blue_but').html('全部加入对比');
            }
            $(".cmp_button").each(function () {
                if ($(this).is(":hidden")) {
                    $(this).show();
                    $(this).parents("p").children(".grey_but").hide();
                }
            })
            $(".cmp_button_a").each(function () {
                if ($(this).hasClass("no_but")) {
                    $(this).removeClass('no_but').addClass('grey_but').html("对比");
                }
            })
        }

    }

    //推荐的商业广告
    modelCompareNew.prototype.businessAd = function (addMid) {

        if (addMid != 'undefined' && addMid > 0) {
            if (addMid === 1) {
                var midstr = this.getCookies(this.cookieScript1);
                var midlen = !midstr ? 0 : midstr.split(',').length;
                if (midlen == 0) return;
                if (midlen == 1) { addMid = midstr };
                if (midlen > 1) {
                    var _arr = new Array();
                    var _tmp_arr = midstr.split(',');
                    for (var i = 0; _tmp_arr[i]; i++) {
                        _arr.unshift(_tmp_arr[i]);
                    }
                    addMid = _arr.join(',');
                }
            }

            $.ajax({
                url: '//' + location.hostname + '/auto/index.php?r=newcar/compare/commendNew',
                type: 'GET',
                data: { mids: addMid, style: 'data' },
                dataType: 'json',
                timeout: 3000,
                success: function (data) {
                    if (data && data.from && data.to && data.minfo) {
                        var ad_html = '<span></span>' + data.minfo.psname + ' ' + data.minfo.typeyear + '款 ' + data.minfo.mname;
                        mcmpare.modelJoinCompare(data.to + "|" + ad_html);

                        ////广告的对比按钮
                        //if(addMid == data.to || addMid.indexOf(data.to) > -1 ){
                        //    var db_but = '<a href="javascript:void(0)" class="no_but gray_b">已对比</a>';
                        //}else{
                        //    var db_but = '<a href="javascript:void(0)" class="grey_but gray_b cmp_button_a" onclick="clicklog('+compare_clickcode[7]+')" data-value="'+data.to+'|'+data.minfo.typeyear+'款'+data.minfo.psname+' '+data.minfo.mname+'">对比</a>';
                        //}
                        //var ad_html = '<div class="elect_tt"><span>推荐车型</span></div>';
                        //ad_html += '<ul class="rm_ul">';
                        //ad_html += '<li>';
                        //ad_html += '<a href="/m'+data.to+'" target="_blank" class="a_img"><img src="//img1.xcarimg.com/PicLib/m/m'+data.to+'_80.jpg" width="80" height="60" alt=""></a>';
                        //ad_html += '<p class="rm_tt"><a href="/m'+data.to+'" target="_blank" onclick="clicklog('+compare_clickcode[6]+')" >'+data.minfo.psname+' '+data.minfo.typeyear+'款 '+data.minfo.mname+'</a></p>';
                        // if(data.minfo.price > 0){
                        //   ad_html += '<p><span class="guide">指导价格：<em>'+data.minfo.price+'</em><i>万</i></span>'+db_but+'</p>';
                        //}else{
                        //   ad_html += '<p><span class="guide">指导价格：<em></em><i>暂无</i></span>'+db_but+'</p>';
                        //}
                        //
                        //ad_html += '</li>';
                        //ad_html += '</ul>';
                        //$("#ad_contain_div").attr({value:data.to});  //记录一下推荐广告的id,单条删除对比车型的时候可以用到
                        //$("#ad_contain_div").html(ad_html);
                        compare_clickcode[8] > 0 && clicklog(compare_clickcode[8]);

                    }
                }
            });

        }

    }


    var mcmpare = new modelCompareNew('');
    //mcmpare.modelJoinCompare('21229|奥迪舒适型');

    $("#s_pb_block").bind("click", function () {  //请选择车型按钮
        if ($(this).hasClass("elect_no")) { //有这个类名 说明已经够6个车型了
            return;
        }
        if ($(this).hasClass("elect_pop")) {
            $(this).removeClass('elect_pop');
            $("#pb_block").hide();
        } else {
            $(this).addClass('elect_pop');
            $("#pb_block").show();
        }

    })

    $("#emptyAllCmp").bind("click", function () { //清空按钮

        mcmpare.emptyCmp();
        compare_clickcode[5] > 0 && clicklog(compare_clickcode[5]);

    })
    //品牌 > 车系 > 车型 效果

    $(".yj_pb").click(function () {
        $("#pb_block").show();
        $("#ps_block").hide();
        $("#m_block").hide();
    })
    $(".yj_ps").click(function () {
        $("#pb_block").hide();
        $("#ps_block").show();
        $("#m_block").hide();
    })
    $(document).bind('click', function (event) {

        if (event.target.nodeName == 'HTML' || event.target.nodeName == 'BODY') {

            $("#pb_block").hide();
            $("#ps_block").hide();
            $("#m_block").hide();
            $("#s_pb_block").removeClass("elect_pop");
        }

    })
    //收起
    $("#retract").click(function (event) {

        $("#compare_pop_wrap").hide();
        compare_clickcode[1] > 0 && clicklog(compare_clickcode[1]);
        event.stopPropagation();

    })

    //
    $("#return_db").click(function (event) {

        if (event.target.nodeName == 'A' && $(event.target).hasClass('a_link')) {

            if ($("#compare_pop_wrap").is(':visible')) {

                $("#compare_pop_wrap").hide();
            } else {

                $("#compare_pop_wrap").show();
            }
            compare_clickcode[0] > 0 && clicklog(compare_clickcode[0]);
        }

    })

    //加入对比按钮
    $(".cmp_button").each(function () {
        $(this).click(function () {
            if ($("#compare_pop_wrap").is(':hidden')) {
                $("#compare_pop_wrap").show();
            }
            var val = $(this).data("value");
            var tf = mcmpare.modelJoinCompare(val);
            if (tf === false) return;
            $(this).hide();
            $(this).parents("p").children(".grey_but").show();

        })
    })
    //车系车型报价页的按钮
    /*$(".cmp_button_a").bind('click',function(){
        if($(this).hasClass('no_but')){
            return false;
        }else{
            var val = $(this).data("value");
            var tf = mcmpare.modelJoinCompare(val);
            if(tf === false) return;
            $(this).addClass('no_but').removeClass('grey_but').html('已加入');
        }
    })*/

    $(document).on("click", ".cmp_button_a", function () {
        if ($(this).hasClass('no_but')) {
            return false;
        } else {
            if ($("#compare_pop_wrap").is(':hidden')) {
                $("#compare_pop_wrap").show();
            }
            var val = $(this).data("value");
            var tf = mcmpare.modelJoinCompare(val);
            if (tf === false) return;
            $(this).addClass('no_but').removeClass('grey_but').html('已加入');

        }
    })


    //全部加入对比
    $("#whole_compares").click(function () {
        $(".cmp_button").each(function () {
            if ($(this).is(':visible')) {
                var val = $(this).data("value");
                var tf = mcmpare.modelJoinCompare(val);
                if (tf === false) return;
                $(this).hide();
                $(this).parents("p").children(".grey_but").show();
            }
        })
        if ($("#compare_pop_wrap").is(':hidden')) {
            $("#compare_pop_wrap").show();
        }
    })

    //判断屏幕分辨率
    if (screen.width <= 1024) {
        $("#control_coat").css('margin-left', '413px');
    }



    $(window).scroll(function () {
        var top = $(document).scrollTop();
        if (top > 100) {
            $("#return_fh").fadeIn(200);
            //$("#compare_pop_wrap").css({bottom:"-167px"});
        } else {
            $("#return_fh").fadeOut(200);
            //$("#compare_pop_wrap").css({bottom:"-72px"});
        }

    });
    $("#return_fh").click(function () {
        $("html,body").animate({ scrollTop: 0 }, 500)
    });


})
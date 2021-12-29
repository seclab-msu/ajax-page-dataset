//诸葛统计询价上报 gb2312

$(function () {
  var zhugeGetParams = function (url, name) {
    var s = url.split("?");
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = s[1].match(reg);
    if (r != null) return r[2];
    return null;
  };
  $(document).on(
    "click",
    ".ask, .but,.button01,.inquiry_upset_btn,.orange_but,.paihang_query,.price,.price_btn,.selectedcar_rightbtn1,.selresult_listbtnx,.upset,.ref2,.price_btn",
    function (e) {
      if (!window.x_tongji || e.target.nodeName.toLowerCase() !== "a") {
        return false;
      }
      if ($(this).hasClass('ps_head_attention')) {
        console.log('11111111')
        return false;
      }
      var link = $(this).attr("href");
      if (link == "javascript:;") return false;
      var data = {
        did: zhugeGetParams(link, "did"),
        pserid: zhugeGetParams(link, "pserid"),
        mid: zhugeGetParams(link, "mid"),
        is_cms: zhugeGetParams(link, "is_cms"),
        cid: zhugeGetParams(link, "cid"),
        type: zhugeGetParams(link, "type")
      };
      $.ajax({
        url:
          "//newcar.xcar.com.cn/auto/index.php?r=ajax/zhugebutton&params=" +
          new Date().getTime(),
        type: "GET",
        data: data,
        dataType: "json",
        success: function (res) {
          if (res.status == 1) {
            if (typeof zhugeData !== "undefined") {
              res.data.page_name = zhugeData.data.page_name;
            } else {
              res.data.page_name = "";
            }

            zhuge.track("query_price_click", res.data);
          }
        }
      });
    }
  );

  //诸葛三期 关注/取消关注/对比/贷款/置换/微博分享/微信分享/QQ空间分享/二手车
  var zhuge_p_3 = null
  $.ajax({
    url:
      "//newcar.xcar.com.cn/auto/index.php?r=ajax/zhugeCarOperationClick&params=" +
      new Date().getTime(),
    type: "GET",
    data: {
      pserid: (typeof pserid !== 'undefined') ? pserid : null,
      mid: (typeof mid !== 'undefined') ? mid : null
    },
    dataType: "json",
    success: function (res) {
      if (res.status == 1) {
        zhuge_p_3 = res.data
      }
    }
  });




  $(document).on('click', '.grey_but,.loans_but,#beginCmp', function (e) {
    var text = $(this).text();
    if (text == '对比') return
    if (text == '置换估价') text = '置换'
    if (text == '开始对比') text = '对比'

    zhuge_fn(text);
  })

  $(".bds_qzone").on('click', function () {
    zhuge_fn('QQ空间分享');
  })
  $(".bds_sqq").on('click', function () {
    zhuge_fn('QQ好友分享');
  })
  $(".sina").on('click', function () {
    zhuge_fn('微博分享');
  })
  $(document).on('click', '.attention', function () {
    if ($(this).text() == '+关注') zhuge_fn('关注');
  })
  $(document).on('click', ".end[status=1]", function () {
    zhuge_fn('取消关注');
  })

  $(document).on('click', '.follow.ps_head_attention.orange_but', function () {
    zhuge_fn('关注');
  })

  $(document).on('click', '.follow.ps_head_attention.call_but', function () {
    zhuge_fn('取消关注');
  })



  function zhuge_fn(text) {
    if (!x_tongji) {
      console.warn('没有添加诸葛统计sdk');
      return false;
    }

    var zhugeSearchData = {
      key: 'web_car_operation_click',
      data: {
        "operation_type": text,
        "page_name": zhugeData.data.page_name
      }
    }

    for (var key in zhuge_p_3) {
      zhugeSearchData.data[key] = zhuge_p_3[key];
    }
    x_tongji(zhugeSearchData);
  }

});

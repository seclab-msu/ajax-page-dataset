//���ͳ��ѯ���ϱ� gb2312

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

  //������� ��ע/ȡ����ע/�Ա�/����/�û�/΢������/΢�ŷ���/QQ�ռ����/���ֳ�
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
    if (text == '�Ա�') return
    if (text == '�û�����') text = '�û�'
    if (text == '��ʼ�Ա�') text = '�Ա�'

    zhuge_fn(text);
  })

  $(".bds_qzone").on('click', function () {
    zhuge_fn('QQ�ռ����');
  })
  $(".bds_sqq").on('click', function () {
    zhuge_fn('QQ���ѷ���');
  })
  $(".sina").on('click', function () {
    zhuge_fn('΢������');
  })
  $(document).on('click', '.attention', function () {
    if ($(this).text() == '+��ע') zhuge_fn('��ע');
  })
  $(document).on('click', ".end[status=1]", function () {
    zhuge_fn('ȡ����ע');
  })

  $(document).on('click', '.follow.ps_head_attention.orange_but', function () {
    zhuge_fn('��ע');
  })

  $(document).on('click', '.follow.ps_head_attention.call_but', function () {
    zhuge_fn('ȡ����ע');
  })



  function zhuge_fn(text) {
    if (!x_tongji) {
      console.warn('û��������ͳ��sdk');
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

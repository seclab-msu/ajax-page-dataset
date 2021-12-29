// ���ص��� js css �ļ�����
function loadjscssfile(filename, filetype) {
  if (filetype == "js") {
    var fileref = document.createElement("script");
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
  } else if (filetype == "css") {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
  }
  if (typeof fileref != "undefined") {
    document.getElementsByTagName("head")[0].appendChild(fileref);
  }
}

loadjscssfile(
  "//asserts.xcarimg.com/resource/common/login_layer/css/login.css?v=201812182150",
  "css"
);
loadjscssfile(
  "//asserts.xcarimg.com/resource/common/login_layer/js/md5.js",
  "js"
);
loadjscssfile(
  "//asserts.xcarimg.com/resource/common/login_layer/js/jquery.xdomainrequest.min.js",
  "js"
);
// ����cookie

function set_cookie(name, value, secure) {
  var exp = new Date();
  exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie =
    name +
    "=" +
    value +
    ";expires=" +
    exp.toGMTString() +
    ";path=/;domain=xcar.com.cn";
}

/*
 * ������¼ע�ᵯ�����
 */
(function ($) {
  $("#wBox_overlay_LoginBox").remove();
  $("#wBox_logindiv").remove();
  var AjaxUid = "";

  $.fn.xLoginBox = function (options) {
    var $t = $(this);
    var defaults = {
      show: false,
      step: 1
    },
      _this = this;
    this.AZ = $.extend(defaults, options);

    //�ص���������
    if (_this.AZ.func == undefined) {
      _this.AZ.func = "";
    }
    if (_this.AZ.args == undefined) {
      _this.AZ.args = "";
    }
    if (_this.AZ.url == undefined) {
      _this.AZ.url = "";
    }

    var mycallbackz = _this.AZ.func;
    var mycallbackargsz = _this.AZ.args;
    var mycallbackurlz = _this.AZ.url;

    ////ִ�лص�����

    function callbackrun() {
      var func = mycallbackz;
      var args = mycallbackargsz;
      if (func != "") {
        //û�в���
        if (args == "") {
          func();
        } else {
          //�в���
          //��������
          count = args.length;
          //�˴�������ѭ����ѭ�����а���+���ŵĻ��������object���󣬻ᱨ��object�Զ�ת����string
          if (count == 1) {
            func(args[0]);
          } else if (count == 2) {
            func(args[0], args[1]);
          } else if (count == 3) {
            func(args[0], args[1], args[2]);
          } else if (count == 4) {
            func(args[0], args[1], args[2], args[3]);
          } else if (count == 5) {
            func(args[0], args[1], args[2], args[3], args[4]);
          }
        }
      } else {
        location.reload();
      }
      return false;
    }
    var initWangYi,
      is_send_msg = 0; //��ֹ������������Ͷ���

    function login_box() {
      //AJAXִ�м���û��Ƿ��¼��δ��¼�����ص�¼�������
      $.ajax({
        type: "POST",
        url: "https://reg.xcar.com.cn/ajax/checklogin.php?callback=?",
        dataType: "jsonp",
        success: function (res) {
          if (res.islogin == 1) {
            //�Ѿ���¼,����Ƿ�����ֻ���step = 2 ʱ����Ҫչʾ���ֻ�����
            if (_this.AZ.step == 2 && res.bandmo == 0) {
              //չʾ���ֻ�����
              //alert('���ֻ�');
              AjaxUid = res.binduid;
              show_band_mobile_div(res.binduid);
              return false;
            } else {
              callbackrun(); //ִ�лص�����
            }
          } else {
            //δ��¼
            $("#wBox_overlay_LoginBox").remove();
            $("#wBox_logindiv").remove();
            boxContent =
              '<div id="wBox_overlay_LoginBox" class="wBox_hide wBox_overlayBG" style="position: fixed;_position: absolute;top: 0px;left: 0px;height: 100%;width: 100%;background-color: #000;opacity: 0.6;filter: Alpha(Opacity=60);z-index: 10000;"></div>'; //���ֲ�
            boxContent +=
              '<div class="layer_landed ie6fixed_m"  id="wBox_logindiv" >'; //���㿪ʼ
            boxContent += '<div class="bg">';
            boxContent += '<table border="0" cellspacing="0" cellpadding="0">';
            boxContent += "<tbody>";
            boxContent += "<tr>";
            boxContent += "<td>";
            boxContent += '<div class="layer_l_box">';
            boxContent +=
              '<div class="title"><span style="color: #fff;font-size:16px;line-height:46px;text-align:left;">��¼����</span><a href="javascript:void(0);" class="close" title="�ر�" node-type="close" id="wBox_closediv"></a></div>'; //������
            boxContent += '<div class="layer_l_cont">'; //���嵯������
            boxContent += '<ul class="landed_ul clearfix">';
            boxContent +=
              '<li class="current" id="wBox_login_mobile"><em>��̬�����¼</em><i class="line" style="position: inherit;">|</i></li>';
            boxContent += '<li id="wBox_login_name"><em>�����ʺŵ�¼</em></li>';
            boxContent += "</ul>";
            boxContent += '<div class="clearfix">'; //��¼��ʽ��ʼ
            boxContent += '<div class="landed_con" id="wBox_login_mobile_div">'; //��̬�����¼start
            boxContent += '<ul class="landed_c_line">';
            boxContent +=
              '<li class="clearfix"><input type="text" id="wBox_mobile_num" value="�����������ֻ���" class="tel_text"/></li>';
            boxContent +=
              '<input type="hidden" value="" id="wBox_login_mobile_unistr">';
            boxContent += '<li id="captcha" style="height:40px;">';
            boxContent += '<div class="tel_text">��ȫ�����...</div>';
            boxContent += "</li>";
            boxContent += '<li class="clearfix last">';
            boxContent +=
              '<input type="text" value="������6λ��̬����" class="dynamic_passwrod" id="wBox_login_mobile_msgcode" style="width:190px;"/>';
            boxContent +=
              '<a href="javascript:void(0)" class="obtain_code" id="wBox_login_mobile_getmsgcode" onfocus="this.blur();">��ȡ��֤��</a>';
            boxContent +=
              '<a href="javascript:void(0)" class="obtain_code recovery_code" id="wBox_login_mobile_sendmsgcode" style="display: none">59������»�ȡ</a>';
            boxContent += '</li">';
            boxContent +=
              '<li class="law"><label for="law" class="checkk"><input type="checkbox" id="law" checked="checked"/>ͬ��<a href="//www.xcar.com.cn/register/terms.htm" target="_blank">���û�����Э�顷</a>�� <a target="_blank" href="//www.xcar.com.cn/register/yinsi.htm">����˽Ȩ������</a></label></li>';
            boxContent += "</ul>";
            boxContent +=
              '<div id="wBox_login_mobile_errordiv" class="error_div clearfix" style="display: none;">'; //������ʾ
            boxContent +=
              '<span class="error_icon"></span><font id="wBox_login_mobile_errormsg" class="error_msg"> </font>';
            boxContent += "</div>";
            boxContent += "</div>"; //��̬�����¼end
            boxContent +=
              '<div class="landed_con landed_xcar" style="display:none;" id="wBox_login_name_div">'; //�û��������¼start
            boxContent += '<ul class="landed_c_line">';
            boxContent += '<li class="clearfix pass_li">';
            boxContent += '<span class="landed_c_tel">�ʺ� | </span>';
            boxContent +=
              '<input type="text" value="�������û���/�ֻ���" class="tel_text" id="wBox_username_login_name"/>';
            boxContent += "</li>";
            boxContent += '<li class="clearfix pass_li">';
            boxContent += '<span class="landed_c_password">���� | </span>';
            boxContent +=
              '<input type="password" value="����������" class="tel_text" id="wBox_username_login_pwd"/>';
            boxContent += "</li>";
            boxContent +=
              '<li class="last" style="display:' +
              (res.show_checkcode == 1 ? "block" : "none") +
              '" id="wBox_usrlog_showcode">';
            boxContent +=
              '<input type="hidden" value="" id="wBox_username_login_unistr" >';
            boxContent +=
              '<input type="text" value="��������֤��" class="codes_text" id="wBox_username_login_codeinput"/>';
            boxContent +=
              '<span class="verify_span" style="padding-left: 10px;"><img src="" width="64" height="23" id="wBox_username_login_codeimg" style="display: inline-block;"/><a href="javascript:void(0);" id="wBox_username_login_changecode" onfocus="this.blur();">��һ��</a></span>';
            boxContent += "</li>";
            boxContent += '<li class="clearfix">';
            boxContent +=
              '<label for="chek1" class="tinblock"><input type="checkbox" checked="checked"/><i>��ס����</i></label>';
            boxContent +=
              '<a href="//reg.xcar.com.cn/setpwd.php" class="forget_password">���������ˣ�</a>';
            boxContent += "</li>";
            boxContent += "</ul>";
            boxContent +=
              '<div id="wBox_login_name_errordiv" class="error_div clearfix" style="display: none;">'; //������ʾ
            boxContent +=
              '<span class="error_icon"></span><font id="wBox_login_name_errormsg" class="error_msg"></font>';
            boxContent += "</div>";
            boxContent += "</div>"; //�û��������¼ end
            boxContent +=
              '<input type="hidden" value="1" id="wBox_login_type_input">'; //��¼��ʽ�л�
            boxContent +=
              '<div class="landed_btn"><a href="javascript:void(0)" id="wBox_do_login" class="btn" onfocus="this.blur();">��¼</a></div>'; //��¼��ť

            boxContent +=
              '<div class="autoLogin"><label for="checkk" class="checkk"><input type="checkbox" id="checkk" checked="checked"/>�´��Զ���¼</label></div>';
            boxContent += "</div>"; //��¼��ʽ����
            boxContent += "</div>"; //���嵯�����ݽ���
            boxContent += '<div class="other_accounts clearfix">'; //������½��ʽ
            boxContent += "<span>ʹ�������ʺŵ�¼</span>";
            boxContent += '<div class="other_a_icon">';
            boxContent +=
              "<i class=\"sina\" onclick=\"zhugeHref('΢��','//www.xcar.com.cn/register/weibo_api/sina/index.php')\"><a><em></em></a></i>"; //����
            boxContent +=
              "<i class=\"tbao\" onclick=\"zhugeHref('�ٶ�','//www.xcar.com.cn/register/weibo_api/baidu/index.php')\"><a><em></em></a></i>"; //�ٶ�
            boxContent +=
              "<i class=\"qq\" onclick=\"zhugeHref('QQ','//reg.xcar.com.cn/third_party_login/new_qq/index.php')\"><a><em></em></a></i>"; //QQ
            boxContent +=
              '<i class="weixin" onclick="zhugeHref(\'΢��\',\'//www.xcar.com.cn/register/weibo_api/weixin/index.php\')"><a><em></em></a></i>'//΢��
            boxContent += "</div>";
            boxContent += "</div>"; //������½��ʽ����
            boxContent += "</div>";
            boxContent += "</td>";
            boxContent += "</tr>";
            boxContent += "</tbody>";
            boxContent += "</table>";
            boxContent += "</div>";
            boxContent += '<div class="landed_l_floatbox"></div>';
            boxContent += "</div>"; //�������
            //��ʾ��������
            $(boxContent).appendTo("body");

            //�����ƶ���֤
            initNECaptcha(
              {
                captchaId: "2305803321634d2d8332d70002b8a0d6",
                element: "#captcha",
                mode: "float",
                width: 320,
                onReady: function (instance) {
                  // ��֤��һ��׼����������ʱ������ʹ����֤�����ع���
                },
                onVerify: function (err, data) {
                  /**
                   * ��һ��������err��Error��ʵ��������֤ʧ�ܲ���err����
                   * �ڶ���������data������֤�ɹ���������Ϣ��data���ݽṹΪkey-value�����£�
                   * {
                   *   validate: 'xxxxx' // ������֤��Ϣ
                   * }
                   */
                  if (err == null) {
                    $("#wBox_login_mobile_unistr").val(data.validate);
                  }
                }
              },
              function onload(instance) {
                // ��ʼ���ɹ�
                initWangYi = instance;
                // ��ʼ���ɹ�ͳ��
                clicklog("126786");
              },
              function onerror(err) {
                // ��֤���ʼ��ʧ�ܴ����߼������磺��ʾ�û������ť���³�ʼ��
                $("#wBox_secq_errmsg").html("��ʼ��ʧ��,��ˢ��ҳ������");
                $("#wBox_secq_errdiv").show();
                // ��ʼ��ʧ��ͳ��
                clicklog("126788");
                // ���³�ʼ��
                initWangYi.refresh();
              }
            );
            //��֤���Ƿ���ʾ����¼�����������5����ʾ
            if (res.show_checkcode) {
              //��֤����ʾ
              $.ajax({
                type: "get",
                url:
                  "https://reg.xcar.com.cn/ajax/ajax_box_login_code.php?callback=?",
                async: false,
                dataType: "jsonp",
                data: "action=getu&t=" + Date.parse(new Date()),
                success: function (u) {
                  $("#wBox_username_login_unistr").val(u);
                  imgurl =
                    "https://reg.xcar.com.cn/ajax/ajax_box_login_code.php?u=" +
                    u +
                    "&t=" +
                    Date.parse(new Date());
                  $("#wBox_username_login_codeimg").attr("src", imgurl);
                }
              });
            }
          }
        }
      });
      return false;
      //AJAXִ��end
    }

    //��ʾ��ȫ���ʲ�

    function show_secques_div(authstr) {
      $("#wBox_logindiv").remove(); //��¼����ȥ����չʾ��ȫ���ⵯ��
      var secquesdiv = '<div id="wBox_secques" class="ie6fixed_m">';
      secquesdiv +=
        '<div class="wBox_content" id="wBoxContent" style="position: static;">';
      secquesdiv += '<div class="landing_contain">';
      secquesdiv +=
        '<div class="landing_tit"><a class="wBox_close" id="wBox_seqque_closebox" href="javascript:void(0)" title="�ر�"></a>��¼����</div>';
      secquesdiv += '<div class="landing_registerMain question_box">';
      secquesdiv +=
        '<div class="question_txt">�����ʻ������˰�ȫ���⣬���ڴ�������ȷ������ʹ𰸡�</div>';
      secquesdiv += '<div class="landing_prompt">'; //������ʾ��ʼ
      secquesdiv +=
        '<div id="wBox_secq_errdiv" style="display:none;"><span></span><font id="wBox_secq_errmsg"></font></div>';
      secquesdiv += "</div>"; //������ʾ����
      secquesdiv += "<form>";
      secquesdiv += '<div class="mod_select">';
      secquesdiv += "<ul>";
      secquesdiv += "<li>";
      secquesdiv += '<div class="select_box">';
      secquesdiv +=
        '<span id="wBox_quest_content" class="select_txt">��ѡ�������õİ�ȫ��������</span>';
      secquesdiv +=
        '<a class="selet_open" id="wBox_show_secque_btn"><b></b></a>';
      secquesdiv +=
        '<div class="question_option" id="wBox_secque_ask" style="display: none;">';
      secquesdiv += "<a setval=1>ĸ�׵�����</a>";
      secquesdiv += "<a setval=2>үү������</a>";
      secquesdiv += "<a setval=3>���׳����ĳ���</a>";
      secquesdiv += "<a setval=4>������һλ��ʦ������</a>";
      secquesdiv += "<a setval=5>�����˼�������ͺ�</a>";
      secquesdiv += "<a setval=6>����ϲ���Ĳ͹�����</a>";
      secquesdiv += "<a setval=7>��ʻִ�յ������λ����</a>";
      secquesdiv += "</div>";
      secquesdiv += "</div>";
      secquesdiv += "</li>";
      secquesdiv += "</ul>";
      secquesdiv += "</div>";
      secquesdiv += "<br>";
      secquesdiv +=
        '<input type="text" id="wBox_secque_answer_txt" value="�����������õİ�ȫ���ʻش�" class="landing_text"><br><br>';
      secquesdiv += '<div class="landing_button landing_buttonT">';
      secquesdiv +=
        '<button id="wBox_do_question_btn" type="button">�ύ</button>';
      //secquesdiv +=                  '<a href="javascript:void(0)" id="question_return" title="�û���ע��">����</a>';
      secquesdiv += "</div>";
      secquesdiv += "</form>";
      secquesdiv += "<br><br><br>";
      secquesdiv += "</div>";
      secquesdiv += "</div>";
      secquesdiv +=
        '<input type="hidden" name="wBox_secques_asknumid" id="wBox_secques_asknumid" value="0">';
      secquesdiv +=
        '<input type="hidden" name="wBox_secques_askauth" id="wBox_secques_askauth" value="' +
        authstr +
        '">';
      secquesdiv += "</div>";
      secquesdiv += "</div>";
      //��ʾ��������
      $(secquesdiv).appendTo("body");

      //�����ʾ����
      $("#wBox_show_secque_btn").click(function () {
        $("#wBox_secque_ask").toggle();
      });

      $("#wBox_secque_ask a").each(function () {
        $(this).click(function () {
          var questinoid = $(this).attr("setval");
          var questxt = $(this).html();
          //alert(questinoid);
          $("#wBox_quest_content").html(questxt);
          $("#wBox_secques_asknumid").val(questinoid);
          $("#wBox_secque_ask").hide();
        });
      });

      $("#wBox_secque_answer_txt").focus(function () {
        if (
          $("#wBox_secque_answer_txt").val() == "�����������õİ�ȫ���ʻش�"
        ) {
          $("#wBox_secque_answer_txt").val("");
        }
      });
      //�ύ
      $("#wBox_do_question_btn").click(function () {
        var quesnumid = $("#wBox_secques_asknumid").val();
        if (quesnumid == 0) {
          $("#wBox_secq_errmsg").html("��ѡ��ȫ��¼����");
          $("#wBox_secq_errdiv").show();
          return false;
        }
        var quesanstxt = $.trim($("#wBox_secque_answer_txt").val());
        if (quesanstxt == "") {
          $("#wBox_secq_errmsg").html("�𰸲���Ϊ��");
          $("#wBox_secq_errdiv").show();
          return false;
        }
        var userauth = $("#wBox_secques_askauth").val();
        //ajaxִ�е�¼����
        $.ajax({
          type: "get",
          url: "https://reg.xcar.com.cn/ajax/ajax_dosecque.php?callback=?",
          async: false,
          dataType: "jsonp",
          data:
            "quesnumid=" +
            quesnumid +
            "&quesanstxt=" +
            quesanstxt +
            "&userauth=" +
            userauth +
            "&t=" +
            Date.parse(new Date()),
          success: function (data) {
            if (data.error) {
              $("#wBox_secq_errmsg").html(data.msg);
              $("#wBox_secq_errdiv").show();
              return false;
            } else {
              //��¼�ɹ�
              location.reload();
              //callbackrun();
            }
          }
        });
      });

      //�رյ���
      $("#wBox_seqque_closebox").click(function () {
        $("#wBox_overlay_LoginBox").remove();
        $("#wBox_secques").remove();
        return false;
      });
    }
    var canClick = true;
    var login_law_canClick = false;
    //����رհ�ť
    $("body")
      .on("click", "#wBox_closediv", function (event) {
        event.preventDefault();
        $("#wBox_overlay_LoginBox").remove();
        $("#wBox_logindiv").remove();
      })
      //��¼��ʽ�л�
      .on("click", "#wBox_login_mobile", function (event) {
        event.preventDefault();

        var law_checked = $("li.law").find("input").is(':checked');
        if (!law_checked) {
          $(".landed_btn").addClass('disabled');
        }
        else {
          $(".landed_btn").removeClass('disabled');
        }

        $("#wBox_login_name").removeClass("current");
        $("#wBox_login_mobile").addClass("current");
        $("#wBox_login_name_div").hide();
        $("#wBox_login_mobile_div").show();
        $("#wBox_login_type_input").val("1");
      })
      .on("click", "#wBox_login_name", function (event) {
        event.preventDefault();

        $(".landed_btn").removeClass('disabled');
        $("#wBox_login_mobile").removeClass("current");
        $("#wBox_login_name").addClass("current");
        $("#wBox_login_mobile_div").hide();
        $("#wBox_login_name_div").show();
        $("#wBox_login_type_input").val("2");
      })
      .on("focusin", "#wBox_mobile_num", function (event) {
        event.preventDefault();
        if ($("#wBox_mobile_num").val() == "�����������ֻ���") {
          $("#wBox_mobile_num").val("");
        }
      })
      .on("focusin", "#wBox_login_mobile_msgcode", function (event) {
        event.preventDefault();
        if ($("#wBox_login_mobile_msgcode").val() == "������6λ��̬����") {
          $("#wBox_login_mobile_msgcode").val("");
        }
      })
      //������ȡ�Ƕ�Ч��
      .on("focusout", "#wBox_mobile_num", function (event) {
        event.preventDefault();
        if ($("#wBox_mobile_num").val() == "") {
          $("#wBox_mobile_num").val("�����������ֻ���");
        }
      })
      .on("focusout", "#wBox_login_mobile_msgcode", function (event) {
        event.preventDefault();
        if ($("#wBox_login_mobile_msgcode").val() == "") {
          $("#wBox_login_mobile_msgcode").val("������6λ��̬����");
        }
      })
      //������Ͷ��Ŷ�̬����
      .on("click", "#wBox_login_mobile_getmsgcode", function (event) {
        event.preventDefault();
        if (is_send_msg > 0) {
          return false;
        }
        is_send_msg = 1;
        var loginmo = $.trim($("#wBox_mobile_num").val());
        if (loginmo == "" || loginmo == "�����������ֻ���") {
          $("#wBox_login_mobile_errormsg").html("�������ֻ���");
          $("#wBox_login_mobile_errordiv").show();
          is_send_msg = 0;
          return false;
        }
        var myreg = /^1[3456789]{1}\d{9}$/;
        if (!myreg.test(loginmo)) {
          $("#wBox_login_mobile_errormsg").html("����������ȷ���ֻ���");
          $("#wBox_login_mobile_errordiv").show();
          is_send_msg = 0;
          return false;
        }
        var loginmocheckcode = $.trim($("#wBox_login_mobile_unistr").val());
        if (loginmocheckcode == "") {
          is_send_msg = 0;
          $("#wBox_login_mobile_errormsg").html("������ť������֤");
          $("#wBox_login_mobile_errordiv").show();
          //   document.getElementById("wBox_login_mobile_checkcode").className = "codes_text error";
          return false;
        }

        $.ajax({
          url: "https://reg.xcar.com.cn/ajax/ajax_boxlogin_send_new.php",
          type: "POST",
          dataType: "json",
          data: {
            mobile: loginmo,
            NECaptchaValidate: loginmocheckcode,
            t: Date.parse(new Date())
          }
        })
          .done(function (data) {
            is_send_msg = 0;
            if (data.error != 0) {
              $("#wBox_login_mobile_errormsg").html(data.msg);
              $("#wBox_login_mobile_errordiv").show();
              if (data.error == 2) {
                document.getElementById("wBox_mobile_num").className =
                  "tel_text";
                document.getElementById("wBox_login_mobile_msgcode").className =
                  "dynamic_passwrod";
              }
              initWangYi.refresh();
              return false;
            } else {
              $("#wBox_login_mobile_getmsgcode").hide();
              $("#wBox_login_mobile_sendmsgcode").show();
              $("#wBox_login_mobile_errordiv").hide();
              settime(60);
            }
          })
          .fail(function () {
            $("#wBox_login_mobile_errormsg").html("�����쳣�������ԣ�");
            $("#wBox_login_mobile_errordiv").show();
          });
      })
      //�û����������¼��ʽ��ʼ
      //��ȡ����ʱ����
      .on("focusin", "#wBox_username_login_name", function (event) {
        event.preventDefault();
        if ($("#wBox_username_login_name").val() == "�������û���/�ֻ���") {
          $("#wBox_username_login_name").val("");
        }
      })
      .on("focusin", "#wBox_username_login_pwd", function (event) {
        event.preventDefault();
        if ($("#wBox_username_login_pwd").val() == "����������") {
          $("#wBox_username_login_pwd").val("");
        }
      })
      .on("focusin", "#wBox_username_login_codeinput", function (event) {
        event.preventDefault();
        if ($("#wBox_username_login_codeinput").val() == "��������֤��") {
          $("#wBox_username_login_codeinput").val("");
        }
      })
      //���������֤��
      .on("click", "#wBox_username_login_changecode", function (event) {
        event.preventDefault();
        $.ajax({
          type: "get",
          url: "https://reg.xcar.com.cn/ajax/ajax_box_login_code.php?callback=?",
          async: false,
          dataType: "jsonp",
          data: "action=getu&t=" + Date.parse(new Date()),
          success: function (u) {
            $("#wBox_username_login_unistr").val(u);
            imgurl =
              "https://reg.xcar.com.cn/ajax/ajax_box_login_code.php?u=" +
              u +
              "&t=" +
              Date.parse(new Date());
            $("#wBox_username_login_codeimg").attr("src", imgurl);
            $("#wBox_username_login_codeinput").val("");
          }
        });
      })
      //�����¼
      .on("click", "#wBox_do_login", function (event) {
        if ($(".landed_ul>li").eq(0).hasClass('current')) {
          var law_checked = $(".law input").is(':checked');
          if (!law_checked) {
            return false
          }
        }

        event.preventDefault();
        var login_box_type = $("#wBox_login_type_input").val();
        if (login_box_type == 1) {
          //��ֹ�ظ����
          if (!canClick) return;
          canClick = false;

          //�ֻ���̬�����¼
          var login_mobile = $.trim($("#wBox_mobile_num").val());
          if (login_mobile == "") {
            $("#wBox_login_mobile_errormsg").html("����������ȷ���ֻ���");
            $("#wBox_login_mobile_errordiv").show();
            document.getElementById("wBox_mobile_num").className =
              "tel_text error";
            return false;
          }
          var myreg = /^1[3456789]{1}\d{9}$/;
          if (!myreg.test(login_mobile)) {
            $("#wBox_login_mobile_errormsg").html("����������ȷ���ֻ���");
            $("#wBox_login_mobile_errordiv").show();
            document.getElementById("wBox_mobile_num").className =
              "tel_text error";
            document.getElementById("wBox_login_mobile_msgcode").className =
              "dynamic_passwrod";
            // document.getElementById("wBox_login_mobile_checkcode").className = "codes_text";
            return false;
          }
          var yzcode = $.trim($("#wBox_login_mobile_unistr").val());
          if (yzcode == "") {
            $("#wBox_login_mobile_errormsg").html("������ť������֤");
            $("#wBox_login_mobile_errordiv").show();
            // document.getElementById("wBox_login_mobile_checkcode").className = "codes_text error";
            document.getElementById("wBox_mobile_num").className = "tel_text";
            document.getElementById("wBox_login_mobile_msgcode").className =
              "dynamic_passwrod";
            return false;
          }
          var msgcode = $.trim($("#wBox_login_mobile_msgcode").val());
          if (msgcode == "" || msgcode == "������6λ��̬����") {
            $("#wBox_login_mobile_errormsg").html("�����붯̬����");
            $("#wBox_login_mobile_errordiv").show();
            document.getElementById("wBox_login_mobile_msgcode").className =
              "dynamic_passwrod error";
            document.getElementById("wBox_mobile_num").className = "tel_text";
            // document.getElementById("wBox_login_mobile_checkcode").className = "codes_text";
            return false;
          }
          //clicklog �ϱ�ע��ͳ��
          var _guid = new GUID();
          var _uuid = _guid.newGUID();
          clicklog("register", _uuid);
          //ajaxִ�е�¼����
          $.ajax({
            type: "post",
            url: "https://reg.xcar.com.cn/ajax/ajax_dologin.php",
            xhrFields: {
              withCredentials: true
            },
            dataType: "json",
            data: {
              mobile: login_mobile,
              msgcode: msgcode,
              logintype: login_box_type,
              uuid: _uuid
            },
            success: function (data) {
              canClick = true;
              if (data.error) {
                $("#wBox_login_mobile_errormsg").html(data.msg);
                $("#wBox_login_mobile_errordiv").show();
                if (data.error == 1) {
                  //��̬�������
                  document.getElementById(
                    "wBox_login_mobile_msgcode"
                  ).className = "dynamic_passwrod error";
                  document.getElementById("wBox_mobile_num").className =
                    "tel_text";
                  // document.getElementById(
                  // 	"wBox_login_mobile_checkcode"
                  // ).className = "codes_text";
                }
                return false;
              } else {
                if (data.secques == 1) {
                  //ѡ��չʾ��ȫ��¼ҳ��
                  show_secques_div(data.auth);
                } else {
                  set_cookie("_discuz_uid", data.discuz_uid, data.secure);
                  set_cookie("_discuz_pw", data.discuz_pw, data.secure);
                  set_cookie("_xcar_name", data.xcar_name, data.secure);
                  //20200426���ͳ��ȡ�û�������my.xcar.com.cn����û������������⣬���Ե�������µ�
                  set_cookie("_xcar_name_utf8", data.xcar_name, data.secure);
                  set_cookie("_discuz_vip", data.discuz_vip, data.secure);
                  set_cookie("bbs_auth", data.bbs_auth, data.secure);
                  set_cookie(
                    "bbs_cookietime",
                    data.bbs_cookietime,
                    data.secure
                  );
                  $("#wBox_overlay_LoginBox").hide(); //���ֲ�����
                  $("#wBox_logindiv").hide(); //��������
                  //��¼�ɹ�
                  //location.reload();
                  login_zhuge(
                    "��̬�����¼",
                    data.discuz_uid,
                    data.xcar_name,
                    callbackrun
                  );
                  // callbackrun(); //ִ�лص�����
                }
              }
            }
          });
        } else if (login_box_type == 2) {
          //�û��������¼
          var username = $.trim($("#wBox_username_login_name").val());
          if (username == "" || username == "�������û���/�ֻ���") {
            $("#wBox_login_name_errormsg").html("�������û���");
            $("#wBox_login_name_errordiv").show();
            $("#wBox_username_login_name").addClass("error");
            $("#wBox_username_login_pwd").removeClass("error");
            return false;
          }
          var password = $("#wBox_username_login_pwd").val();
          if (password == "" || password == "����������") {
            $("#wBox_username_login_pwd").val("");
            $("#wBox_login_name_errormsg").html("����������");
            $("#wBox_login_name_errordiv").show();
            $("#wBox_username_login_pwd").addClass("error");
            $("#wBox_username_login_name").removeClass("error");
            $("#wBox_username_login_codeinput").removeClass("error");
            return false;
          }
          //password = encodeURIComponent(password);
          password = hex_md5(password);
          if ($("#wBox_usrlog_showcode").attr("style") == "display:block;") {
            var checkcode = $.trim($("#wBox_username_login_codeinput").val());
            if (checkcode == "" || checkcode == "��������֤��") {
              $("#wBox_login_name_errormsg").html("��������֤��");
              $("#wBox_login_name_errordiv").show();
              //$('#wBox_username_login_pwd').val('');
              $("#wBox_username_login_name").removeClass("error");
              $("#wBox_username_login_pwd").removeClass("error");
              $("#wBox_username_login_codeinput").addClass("error");
              return false;
            }
            var u = $.trim($("#wBox_username_login_unistr").val());
          } else {
            var checkcode = $.trim($("#wBox_username_login_codeinput").val());
            var u = $.trim($("#wBox_username_login_unistr").val());
          }

          //ajaxִ�е�¼����
          $.ajax({
            type: "POST",
            url: "https://reg.xcar.com.cn/ajax/ajax_dologin.php",
            xhrFields: {
              withCredentials: true
            },
            dataType: "json",
            data: {
              logintype: login_box_type,
              username: username,
              userpwd: password,
              u: u,
              checkcode: checkcode
            },
            success: function (data) {
              if (data.error) {
                $("#wBox_username_login_pwd").val("");
                $("#wBox_login_name_errormsg").html(data.msg);
                $("#wBox_login_name_errordiv").show();
                if (data.error == 3) {
                  $("#wBox_username_login_name").addClass("error");
                  $("#wBox_username_login_pwd").removeClass("error");
                  $("#wBox_username_login_codeinput").removeClass("error");
                } else if (data.error == 4) {
                  $("#wBox_username_login_pwd").addClass("error");
                  $("#wBox_username_login_name").removeClass("error");
                  $("#wBox_username_login_codeinput").removeClass("error");
                } else if (data.error == 2) {
                  $("#wBox_username_login_name").removeClass("error");
                  $("#wBox_username_login_pwd").removeClass("error");
                  $("#wBox_username_login_codeinput").addClass("error");
                }
                if (data.showcode) {
                  $("#wBox_usrlog_showcode").show();
                  //$('#wBox_username_login_changecode').click();
                  $.ajax({
                    type: "get",
                    url:
                      "https://reg.xcar.com.cn/ajax/ajax_box_login_code.php?callback=?",
                    async: false,
                    dataType: "jsonp",
                    data: "action=getu&t=" + Date.parse(new Date()),
                    success: function (u) {
                      $("#wBox_username_login_unistr").val(u);
                      imgurl =
                        "https://reg.xcar.com.cn/ajax/ajax_box_login_code.php?u=" +
                        u +
                        "&t=" +
                        Date.parse(new Date());
                      $("#wBox_username_login_codeimg").attr("src", imgurl);
                      $("#wBox_username_login_codeinput").val("");
                    }
                  });
                }
                return false;
              } else {
                if (data.secques == 1) {
                  //ѡ��չʾ��ȫ��¼ҳ��
                  show_secques_div(data.auth);
                } else {
                  set_cookie("_discuz_uid", data.discuz_uid, data.secure);
                  set_cookie("_discuz_pw", data.discuz_pw, data.secure);
                  set_cookie("_xcar_name", data.xcar_name, data.secure);
                  set_cookie("_discuz_vip", data.discuz_vip, data.secure);
                  set_cookie("bbs_auth", data.bbs_auth, data.secure);

                  set_cookie(
                    "bbs_cookietime",
                    data.bbs_cookietime,
                    data.secure
                  );

                  //��¼�ɹ�������Ƿ���Ҫ�������ֻ�����
                  if (_this.AZ.step == 2 && data.bandmo) {
                    //չʾ���ֻ�����
                    AjaxUid = data.banduid;
                    show_band_mobile_div(data.banduid);
                  } else {
                    //���ûص�����
                    $("#wBox_overlay_LoginBox").hide(); //���ֲ�����
                    $("#wBox_logindiv").hide(); //��������
                    login_zhuge(
                      "�����˺ŵ�¼",
                      data.discuz_uid,
                      data.xcar_name,
                      callbackrun
                    );
                    // callbackrun();

                    return false;
                  }
                }
              }
            }
          });
        }
      }).on("click", ".law", function () {
        var law_checked = $(this).find("input").is(':checked');
        if (!law_checked) {
          $(".landed_btn").addClass('disabled');
        }
        else {
          $(".landed_btn").removeClass('disabled');
        }
      })

    window.zhugeHref = function (name, url) {
      if (!window.x_tongji) {
        window.location.href = url;
        return false;
      }
      zhuge.track(
        "submit_login",
        {
          login_method: name,
          page_name: window.current_page_zhuge
        },
        function () {
          window.location.href = url;
        }
      );
    };

    function login_zhuge(login_method, uid, uname, callback) {
      //���ͳ�ƴ��룬ȷ��ҳ���ϵĻص�����������ϱ������ִ�У�ˢ�£�
      var dtd = $.Deferred();
      var wait = function (dtd) {
        if (!window.x_tongji) {
          return false;
        }
        zhuge.identify(uid, {
          user_name: uname ? uname : ""
        });
        zhuge.track(
          "submit_login",
          {
            login_method: login_method,
            page_name: window.current_page_zhuge,
            account: uname ? uname : ""
          },
          function () {
            dtd.resolve();
          }
        );
        return dtd;
      };
      $.when(wait(dtd)).done(function () {
        callback && callback();
      });
    }

    //�س�����¼
    $(document).keypress(function (e) {
      var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
      if (eCode == 13) {
        $("#wBox_do_login").click();
      }
    });

    //չʾ���ֻ��� start

    function show_band_mobile_div(uid) {
      $("#wBox_overlay_LoginBox").remove();
      $("#wBox_logindiv").remove(); //��¼����ȥ��
      var bandmobilhtml =
        '<div id="wBox_overlay_LoginBox" class="wBox_hide wBox_overlayBG" style="position: fixed;_position: absolute;top: 0px;left: 0px;height: 100%;width: 100%;background-color: #000;opacity: 0.6;filter: Alpha(Opacity=60);z-index: 10000;"></div>'; //���ֲ�
      bandmobilhtml +=
        '<div id="wBox_bandmo_div" class="ie6fixed_m wBox_phone" style="display: block">';
      bandmobilhtml += '<div class="wBox_content" >';
      bandmobilhtml += '<div class="landing_contain active_contain">';
      bandmobilhtml +=
        '<div class="landing_tit"><a href="javascript:void(0)" id="wBox_bandmo_div_close" class="wBox_close" title="�ر�"></a>�ʺż���</div>'; //����
      bandmobilhtml += '<div class="main">'; //���ݲ��ֿ�ʼ
      bandmobilhtml += '<div class="left">'; //��࿪ʼ
      bandmobilhtml +=
        '<div class="prompt">�ף������ʺ�֮����ܼ�����ǰ�Ĳ�����</div>';
      bandmobilhtml += '<ul><li class="current">���ֻ�����</li></ul>';
      bandmobilhtml += '<div class="landing_prompt">'; //������ʾ��ʼ
      bandmobilhtml += '<div id="wBox_bandmo_errdiv" style="display:none;">';
      bandmobilhtml += '<span></span><font id="wBox_bandmo_errmsg"></font>';
      bandmobilhtml += "</div>";
      bandmobilhtml += "</div>"; //������ʾ����
      bandmobilhtml += "<form>"; //�󶨿�ʼ
      bandmobilhtml +=
        '<input type="text" id="wBox_bandmo_txtinput" value="�����������ֻ���" class="landing_text">';
      bandmobilhtml +=
        '<a id="wBox_bandmo_sendcode" class="proving" href="javascript:void(0)" style="background: #ff9400;color: #fff;">��ѻ�ȡ��֤��</a>';
      bandmobilhtml +=
        '<a id="wBox_bandmo_sendcode_success" class="proving" style="display:none;text-decoration: none;"></a>';
      bandmobilhtml +=
        '<input type="text" id="wBox_bandmo_pincode" value="��������֤��,2Сʱ����Ч" class="landing_text">';
      bandmobilhtml +=
        '<div class="landing_button"><button id="wBox_bandmo_dosubmit" type="button">��������</button></div>';
      bandmobilhtml += "</form>"; //�󶨽���
      bandmobilhtml += "</div>"; //������
      bandmobilhtml +=
        '<div class="right">	��������Ϳ��Խ���<em>�������������μӻ��</em>��������ˡ�</div>'; //�Ҳ�����
      bandmobilhtml += "</div>"; //���ݲ��ֽ���
      bandmobilhtml += '<div class="landgin_link"></div>'; //�ָ���
      bandmobilhtml += "</div>";
      bandmobilhtml += "</div>";
      bandmobilhtml += "</div>";
      //��ʾ��������
      $(bandmobilhtml).appendTo("body");
    }
    //չʾ���ֻ��� end

    //ʱ�䵹��ʱ 60s

    function settime(num) {
      if (num == 0) {
        $("#wBox_login_mobile_getmsgcode").show();
        $("#wBox_login_mobile_sendmsgcode").hide();
        //$('#wBox_login_mobile_changecode').click();
        return;
      } else {
        $("#wBox_login_mobile_sendmsgcode").html(num + "������»�ȡ");
        num--;
      }
      setTimeout(function () {
        settime(num);
      }, 1000);
    }

    //�������¼�
    $t.on("click", function () {
      login_box();
      return false;
    });

    var band_send_msg = 0; //��ֹ������������Ͷ���

    $("body")
      .on("focusin", "#wBox_bandmo_txtinput", function () {
        if ($("#wBox_bandmo_txtinput").val() == "�����������ֻ���") {
          $("#wBox_bandmo_txtinput").val("");
        }
      })
      .on("click", "#wBox_bandmo_pincode", function (event) {
        event.preventDefault();
        if ($("#wBox_bandmo_pincode").val() == "��������֤��,2Сʱ����Ч") {
          $("#wBox_bandmo_pincode").val("");
        }
      })
      //������֤��
      .on("click", "#wBox_bandmo_sendcode", function (event) {
        event.preventDefault();
        if (band_send_msg > 0) {
          return false;
        }
        band_send_msg = 1;
        var bindmobile = $.trim($("#wBox_bandmo_txtinput").val());
        var myreg = /^(1+\d{10})$/;
        if (!myreg.test(bindmobile)) {
          $("#wBox_bandmo_errmsg").html("����������ȷ���ֻ���");
          $("#wBox_bandmo_errdiv").show();
          band_send_msg = 0;
          return false;
        }
        //ajaxִ�е�¼����,���Ͱ��ֻ�����֤��

        $.ajax({
          type: "get",
          url: "https://reg.xcar.com.cn/ajax/ajax_box_login_code.php?callback=?",
          async: false,
          dataType: "jsonp",
          data: "action=getu&t=" + Date.parse(new Date()),
          success: function (u) {
            $.ajax({
              type: "get",
              url: "https://reg.xcar.com.cn/ajax/ajax_bind_mo_send.php?callback=?",
              async: false,
              dataType: "jsonp",
              data:
                "uid=" +
                AjaxUid +
                "&u=" +
                u +
                "&mobile=" +
                bindmobile +
                "&t=" +
                Date.parse(new Date()),
              success: function (data) {
                band_send_msg = 0;
                if (data.error) {
                  $("#wBox_bandmo_errmsg").html(data.msg);
                  $("#wBox_bandmo_errdiv").show();
                  return false;
                } else {
                  $("#wBox_bandmo_sendcode").hide();
                  $("#wBox_bandmo_sendcode_success").html("�ѷ���,2Сʱ����Ч");
                  $("#wBox_bandmo_sendcode_success").show();
                }
              }
            });
          }
        });
      })
      //���ֻ��������˺�
      .on("click", "#wBox_bandmo_dosubmit", function (event) {
        event.preventDefault();
        var bindmobile = $.trim($("#wBox_bandmo_txtinput").val());
        var myreg = /^(1+\d{10})$/;
        if (!myreg.test(bindmobile)) {
          $("#wBox_bandmo_errmsg").html("����������ȷ���ֻ���");
          $("#wBox_bandmo_errdiv").show();
          return false;
        }
        var msgcode = $.trim($("#wBox_bandmo_pincode").val());
        if (msgcode == "" || msgcode == "��������֤��,2Сʱ����Ч") {
          $("#wBox_bandmo_errmsg").html("��������֤��,2Сʱ����Ч");
          $("#wBox_bandmo_errdiv").show();
          return false;
        }
        $.ajax({
          type: "get",
          url: "https://reg.xcar.com.cn/ajax/ajax_boxlogin_dobind.php?callback=?",
          async: false,
          dataType: "jsonp",
          data:
            "uid=" +
            AjaxUid +
            "&msgcode=" +
            msgcode +
            "&mobile=" +
            bindmobile +
            "&t=" +
            Date.parse(new Date()),
          success: function (data) {
            if (data.error) {
              $("#wBox_bandmo_errmsg").html(data.msg);
              $("#wBox_bandmo_errdiv").show();
              return false;
            } else {
              //�󶨳ɹ���ִ�лص�����
              callbackrun(); //ִ�лص�����
              return false;
            }
          }
        });
      })
      //�رյ���
      .on("click", "#wBox_bandmo_div_close", function (event) {
        event.preventDefault();
        $("#wBox_overlay_LoginBox").remove();
        $("#wBox_bandmo_div").remove();
        return false;
      });

    if (_this.AZ.show) {
      if (_this.AZ.step == 3) {
        login_box();
        return false;
      } else {
        $t.click();
      }
    }
  };
})(jQuery);

function GUID() {
  this.date = new Date();

  /* ����GUID�� */
  GUID.prototype.newGUID = function () {
    this.date = new Date();
    var guidStr = "";
    var sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16),
      sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16),
      sexadecimalCook = this.hexadecimal(this.getCookiePV(), 10);
    for (var i = 0; i < 9; i++) {
      guidStr += Math.floor(Math.random() * 16).toString(16);
    }
    guidStr += sexadecimalCook;
    guidStr += sexadecimalDate;
    guidStr += sexadecimalTime;

    while (guidStr.length < 32) {
      guidStr += Math.floor(Math.random() * 16).toString(16);
    }
    return this.formatGUID(guidStr);
  };
  /* ǰ���޷���֤GUID��Ψһ�� �������������� �������PVCookie���� */
  GUID.prototype.getCookiePV = function () {
    var name = "_PVXuv";
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return "";
  };
  /*
   * ���ܣ���ȡ��ǰ���ڵ�GUID��ʽ����8λ�������ڣ�19700101
   * ����ֵ������GUID���ڸ�ʽ��������
   */
  GUID.prototype.getGUIDDate = function () {
    return (
      this.date.getFullYear() +
      this.addZero(this.date.getMonth() + 1) +
      this.addZero(this.date.getDay())
    );
  };

  /*
   * ���ܣ���ȡ��ǰʱ���GUID��ʽ����8λ����ʱ�䣬�������룬����Ϊ2λ����12300933
   * ����ֵ������GUID���ڸ�ʽ��������
   */
  GUID.prototype.getGUIDTime = function () {
    return (
      this.addZero(this.date.getHours()) +
      this.addZero(this.date.getMinutes()) +
      this.addZero(this.date.getSeconds()) +
      this.addZero(parseInt(this.date.getMilliseconds() / 10))
    );
  };

  /*
   * ����: Ϊһλ����������ǰ�����0������ǿ���ת�ɷ�NaN���ֵ��ַ���Ҳ����ʵ��
   * ����: ������ʾ׼����ǰ�����0�����ֻ����ת�������ֵ��ַ���
   * ����ֵ: ��������������������0������������ͣ����򷵻�������ַ���
   */
  GUID.prototype.addZero = function (num) {
    if (Number(num).toString() != "NaN" && num >= 0 && num < 10) {
      return "0" + Math.floor(num);
    } else {
      return num.toString();
    }
  };

  /*
   * ���ܣ���y���Ƶ���ֵ��ת��Ϊx���Ƶ���ֵ
   * ��������1��������ʾ��ת������ֵ����2��������ʾ��ת���Ľ��ƣ���3��������ѡ����ʾ��ǰ�Ľ��������粻д��Ϊ10
   * ����ֵ������ת������ַ���
   */
  GUID.prototype.hexadecimal = function (num, x, y) {
    if (y != undefined) {
      return parseInt(num.toString(), y).toString(x);
    } else {
      return parseInt(num.toString()).toString(x);
    }
  };

  /*
   * ���ܣ���ʽ��32λ���ַ���ΪGUIDģʽ���ַ���
   * ��������1��������ʾ32λ���ַ���
   * ����ֵ����׼GUID��ʽ���ַ���
   */
  GUID.prototype.formatGUID = function (guidStr) {
    var str1 = guidStr.slice(0, 8) + "-",
      str2 = guidStr.slice(8, 12) + "-",
      str3 = guidStr.slice(12, 16) + "-",
      str4 = guidStr.slice(16, 20) + "-",
      str5 = guidStr.slice(20);
    return str1 + str2 + str3 + str4 + str5;
  };
}

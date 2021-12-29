// 加载弹窗 js css 文件方法
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
// 设置cookie

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
 * 爱卡登录注册弹窗插件
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

    //回调函数参数
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

    ////执行回调函数

    function callbackrun() {
      var func = mycallbackz;
      var args = mycallbackargsz;
      if (func != "") {
        //没有参数
        if (args == "") {
          func();
        } else {
          //有参数
          //参数个数
          count = args.length;
          //此处不能用循环，循环当中包含+符号的话，如果传object对象，会报错，object自动转化成string
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
      is_send_msg = 0; //防止连续点击，发送短信

    function login_box() {
      //AJAX执行检查用户是否登录，未登录并返回登录错误次数
      $.ajax({
        type: "POST",
        url: "https://reg.xcar.com.cn/ajax/checklogin.php?callback=?",
        dataType: "jsonp",
        success: function (res) {
          if (res.islogin == 1) {
            //已经登录,检查是否绑定了手机，step = 2 时，需要展示绑定手机弹层
            if (_this.AZ.step == 2 && res.bandmo == 0) {
              //展示绑定手机弹层
              //alert('绑定手机');
              AjaxUid = res.binduid;
              show_band_mobile_div(res.binduid);
              return false;
            } else {
              callbackrun(); //执行回调函数
            }
          } else {
            //未登录
            $("#wBox_overlay_LoginBox").remove();
            $("#wBox_logindiv").remove();
            boxContent =
              '<div id="wBox_overlay_LoginBox" class="wBox_hide wBox_overlayBG" style="position: fixed;_position: absolute;top: 0px;left: 0px;height: 100%;width: 100%;background-color: #000;opacity: 0.6;filter: Alpha(Opacity=60);z-index: 10000;"></div>'; //遮罩层
            boxContent +=
              '<div class="layer_landed ie6fixed_m"  id="wBox_logindiv" >'; //弹层开始
            boxContent += '<div class="bg">';
            boxContent += '<table border="0" cellspacing="0" cellpadding="0">';
            boxContent += "<tbody>";
            boxContent += "<tr>";
            boxContent += "<td>";
            boxContent += '<div class="layer_l_box">';
            boxContent +=
              '<div class="title"><span style="color: #fff;font-size:16px;line-height:46px;text-align:left;">登录爱卡</span><a href="javascript:void(0);" class="close" title="关闭" node-type="close" id="wBox_closediv"></a></div>'; //标题栏
            boxContent += '<div class="layer_l_cont">'; //具体弹层内容
            boxContent += '<ul class="landed_ul clearfix">';
            boxContent +=
              '<li class="current" id="wBox_login_mobile"><em>动态密码登录</em><i class="line" style="position: inherit;">|</i></li>';
            boxContent += '<li id="wBox_login_name"><em>爱卡帐号登录</em></li>';
            boxContent += "</ul>";
            boxContent += '<div class="clearfix">'; //登录方式开始
            boxContent += '<div class="landed_con" id="wBox_login_mobile_div">'; //动态密码登录start
            boxContent += '<ul class="landed_c_line">';
            boxContent +=
              '<li class="clearfix"><input type="text" id="wBox_mobile_num" value="请输入您的手机号" class="tel_text"/></li>';
            boxContent +=
              '<input type="hidden" value="" id="wBox_login_mobile_unistr">';
            boxContent += '<li id="captcha" style="height:40px;">';
            boxContent += '<div class="tel_text">安全检测中...</div>';
            boxContent += "</li>";
            boxContent += '<li class="clearfix last">';
            boxContent +=
              '<input type="text" value="请输入6位动态密码" class="dynamic_passwrod" id="wBox_login_mobile_msgcode" style="width:190px;"/>';
            boxContent +=
              '<a href="javascript:void(0)" class="obtain_code" id="wBox_login_mobile_getmsgcode" onfocus="this.blur();">获取验证码</a>';
            boxContent +=
              '<a href="javascript:void(0)" class="obtain_code recovery_code" id="wBox_login_mobile_sendmsgcode" style="display: none">59秒后重新获取</a>';
            boxContent += '</li">';
            boxContent +=
              '<li class="law"><label for="law" class="checkk"><input type="checkbox" id="law" checked="checked"/>同意<a href="//www.xcar.com.cn/register/terms.htm" target="_blank">《用户服务协议》</a>和 <a target="_blank" href="//www.xcar.com.cn/register/yinsi.htm">《隐私权声明》</a></label></li>';
            boxContent += "</ul>";
            boxContent +=
              '<div id="wBox_login_mobile_errordiv" class="error_div clearfix" style="display: none;">'; //错误提示
            boxContent +=
              '<span class="error_icon"></span><font id="wBox_login_mobile_errormsg" class="error_msg"> </font>';
            boxContent += "</div>";
            boxContent += "</div>"; //动态密码登录end
            boxContent +=
              '<div class="landed_con landed_xcar" style="display:none;" id="wBox_login_name_div">'; //用户名密码登录start
            boxContent += '<ul class="landed_c_line">';
            boxContent += '<li class="clearfix pass_li">';
            boxContent += '<span class="landed_c_tel">帐号 | </span>';
            boxContent +=
              '<input type="text" value="请输入用户名/手机号" class="tel_text" id="wBox_username_login_name"/>';
            boxContent += "</li>";
            boxContent += '<li class="clearfix pass_li">';
            boxContent += '<span class="landed_c_password">密码 | </span>';
            boxContent +=
              '<input type="password" value="请输入密码" class="tel_text" id="wBox_username_login_pwd"/>';
            boxContent += "</li>";
            boxContent +=
              '<li class="last" style="display:' +
              (res.show_checkcode == 1 ? "block" : "none") +
              '" id="wBox_usrlog_showcode">';
            boxContent +=
              '<input type="hidden" value="" id="wBox_username_login_unistr" >';
            boxContent +=
              '<input type="text" value="请输入验证码" class="codes_text" id="wBox_username_login_codeinput"/>';
            boxContent +=
              '<span class="verify_span" style="padding-left: 10px;"><img src="" width="64" height="23" id="wBox_username_login_codeimg" style="display: inline-block;"/><a href="javascript:void(0);" id="wBox_username_login_changecode" onfocus="this.blur();">换一组</a></span>';
            boxContent += "</li>";
            boxContent += '<li class="clearfix">';
            boxContent +=
              '<label for="chek1" class="tinblock"><input type="checkbox" checked="checked"/><i>记住密码</i></label>';
            boxContent +=
              '<a href="//reg.xcar.com.cn/setpwd.php" class="forget_password">忘记密码了？</a>';
            boxContent += "</li>";
            boxContent += "</ul>";
            boxContent +=
              '<div id="wBox_login_name_errordiv" class="error_div clearfix" style="display: none;">'; //错误提示
            boxContent +=
              '<span class="error_icon"></span><font id="wBox_login_name_errormsg" class="error_msg"></font>';
            boxContent += "</div>";
            boxContent += "</div>"; //用户名密码登录 end
            boxContent +=
              '<input type="hidden" value="1" id="wBox_login_type_input">'; //登录方式切换
            boxContent +=
              '<div class="landed_btn"><a href="javascript:void(0)" id="wBox_do_login" class="btn" onfocus="this.blur();">登录</a></div>'; //登录按钮

            boxContent +=
              '<div class="autoLogin"><label for="checkk" class="checkk"><input type="checkbox" id="checkk" checked="checked"/>下次自动登录</label></div>';
            boxContent += "</div>"; //登录方式结束
            boxContent += "</div>"; //具体弹层内容结束
            boxContent += '<div class="other_accounts clearfix">'; //其他登陆方式
            boxContent += "<span>使用以下帐号登录</span>";
            boxContent += '<div class="other_a_icon">';
            boxContent +=
              "<i class=\"sina\" onclick=\"zhugeHref('微博','//www.xcar.com.cn/register/weibo_api/sina/index.php')\"><a><em></em></a></i>"; //新浪
            boxContent +=
              "<i class=\"tbao\" onclick=\"zhugeHref('百度','//www.xcar.com.cn/register/weibo_api/baidu/index.php')\"><a><em></em></a></i>"; //百度
            boxContent +=
              "<i class=\"qq\" onclick=\"zhugeHref('QQ','//reg.xcar.com.cn/third_party_login/new_qq/index.php')\"><a><em></em></a></i>"; //QQ
            boxContent +=
              '<i class="weixin" onclick="zhugeHref(\'微信\',\'//www.xcar.com.cn/register/weibo_api/weixin/index.php\')"><a><em></em></a></i>'//微信
            boxContent += "</div>";
            boxContent += "</div>"; //其他登陆方式结束
            boxContent += "</div>";
            boxContent += "</td>";
            boxContent += "</tr>";
            boxContent += "</tbody>";
            boxContent += "</table>";
            boxContent += "</div>";
            boxContent += '<div class="landed_l_floatbox"></div>';
            boxContent += "</div>"; //弹层结束
            //显示弹层内容
            $(boxContent).appendTo("body");

            //网易云盾验证
            initNECaptcha(
              {
                captchaId: "2305803321634d2d8332d70002b8a0d6",
                element: "#captcha",
                mode: "float",
                width: 320,
                onReady: function (instance) {
                  // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                },
                onVerify: function (err, data) {
                  /**
                   * 第一个参数是err（Error的实例），验证失败才有err对象
                   * 第二个参数是data对象，验证成功后的相关信息，data数据结构为key-value，如下：
                   * {
                   *   validate: 'xxxxx' // 二次验证信息
                   * }
                   */
                  if (err == null) {
                    $("#wBox_login_mobile_unistr").val(data.validate);
                  }
                }
              },
              function onload(instance) {
                // 初始化成功
                initWangYi = instance;
                // 初始化成功统计
                clicklog("126786");
              },
              function onerror(err) {
                // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                $("#wBox_secq_errmsg").html("初始化失败,请刷新页面重试");
                $("#wBox_secq_errdiv").show();
                // 初始化失败统计
                clicklog("126788");
                // 重新初始化
                initWangYi.refresh();
              }
            );
            //验证码是否显示，登录错误次数大于5则显示
            if (res.show_checkcode) {
              //验证码显示
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
      //AJAX执行end
    }

    //显示安全提问层

    function show_secques_div(authstr) {
      $("#wBox_logindiv").remove(); //登录弹窗去掉，展示安全问题弹层
      var secquesdiv = '<div id="wBox_secques" class="ie6fixed_m">';
      secquesdiv +=
        '<div class="wBox_content" id="wBoxContent" style="position: static;">';
      secquesdiv += '<div class="landing_contain">';
      secquesdiv +=
        '<div class="landing_tit"><a class="wBox_close" id="wBox_seqque_closebox" href="javascript:void(0)" title="关闭"></a>登录爱卡</div>';
      secquesdiv += '<div class="landing_registerMain question_box">';
      secquesdiv +=
        '<div class="question_txt">您的帐户设置了安全问题，请在此输入正确的问题和答案。</div>';
      secquesdiv += '<div class="landing_prompt">'; //错误提示开始
      secquesdiv +=
        '<div id="wBox_secq_errdiv" style="display:none;"><span></span><font id="wBox_secq_errmsg"></font></div>';
      secquesdiv += "</div>"; //错误提示结束
      secquesdiv += "<form>";
      secquesdiv += '<div class="mod_select">';
      secquesdiv += "<ul>";
      secquesdiv += "<li>";
      secquesdiv += '<div class="select_box">';
      secquesdiv +=
        '<span id="wBox_quest_content" class="select_txt">请选择您设置的安全提问问题</span>';
      secquesdiv +=
        '<a class="selet_open" id="wBox_show_secque_btn"><b></b></a>';
      secquesdiv +=
        '<div class="question_option" id="wBox_secque_ask" style="display: none;">';
      secquesdiv += "<a setval=1>母亲的名字</a>";
      secquesdiv += "<a setval=2>爷爷的名字</a>";
      secquesdiv += "<a setval=3>父亲出生的城市</a>";
      secquesdiv += "<a setval=4>您其中一位老师的名字</a>";
      secquesdiv += "<a setval=5>您个人计算机的型号</a>";
      secquesdiv += "<a setval=6>您最喜欢的餐馆名称</a>";
      secquesdiv += "<a setval=7>驾驶执照的最后四位数字</a>";
      secquesdiv += "</div>";
      secquesdiv += "</div>";
      secquesdiv += "</li>";
      secquesdiv += "</ul>";
      secquesdiv += "</div>";
      secquesdiv += "<br>";
      secquesdiv +=
        '<input type="text" id="wBox_secque_answer_txt" value="请输入您设置的安全提问回答" class="landing_text"><br><br>';
      secquesdiv += '<div class="landing_button landing_buttonT">';
      secquesdiv +=
        '<button id="wBox_do_question_btn" type="button">提交</button>';
      //secquesdiv +=                  '<a href="javascript:void(0)" id="question_return" title="用户名注册">返回</a>';
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
      //显示弹层内容
      $(secquesdiv).appendTo("body");

      //点击显示问题
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
          $("#wBox_secque_answer_txt").val() == "请输入您设置的安全提问回答"
        ) {
          $("#wBox_secque_answer_txt").val("");
        }
      });
      //提交
      $("#wBox_do_question_btn").click(function () {
        var quesnumid = $("#wBox_secques_asknumid").val();
        if (quesnumid == 0) {
          $("#wBox_secq_errmsg").html("请选择安全登录问题");
          $("#wBox_secq_errdiv").show();
          return false;
        }
        var quesanstxt = $.trim($("#wBox_secque_answer_txt").val());
        if (quesanstxt == "") {
          $("#wBox_secq_errmsg").html("答案不能为空");
          $("#wBox_secq_errdiv").show();
          return false;
        }
        var userauth = $("#wBox_secques_askauth").val();
        //ajax执行登录请求
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
              //登录成功
              location.reload();
              //callbackrun();
            }
          }
        });
      });

      //关闭弹窗
      $("#wBox_seqque_closebox").click(function () {
        $("#wBox_overlay_LoginBox").remove();
        $("#wBox_secques").remove();
        return false;
      });
    }
    var canClick = true;
    var login_law_canClick = false;
    //点击关闭按钮
    $("body")
      .on("click", "#wBox_closediv", function (event) {
        event.preventDefault();
        $("#wBox_overlay_LoginBox").remove();
        $("#wBox_logindiv").remove();
      })
      //登录方式切换
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
        if ($("#wBox_mobile_num").val() == "请输入您的手机号") {
          $("#wBox_mobile_num").val("");
        }
      })
      .on("focusin", "#wBox_login_mobile_msgcode", function (event) {
        event.preventDefault();
        if ($("#wBox_login_mobile_msgcode").val() == "请输入6位动态密码") {
          $("#wBox_login_mobile_msgcode").val("");
        }
      })
      //输入框获取角度效果
      .on("focusout", "#wBox_mobile_num", function (event) {
        event.preventDefault();
        if ($("#wBox_mobile_num").val() == "") {
          $("#wBox_mobile_num").val("请输入您的手机号");
        }
      })
      .on("focusout", "#wBox_login_mobile_msgcode", function (event) {
        event.preventDefault();
        if ($("#wBox_login_mobile_msgcode").val() == "") {
          $("#wBox_login_mobile_msgcode").val("请输入6位动态密码");
        }
      })
      //点击发送短信动态密码
      .on("click", "#wBox_login_mobile_getmsgcode", function (event) {
        event.preventDefault();
        if (is_send_msg > 0) {
          return false;
        }
        is_send_msg = 1;
        var loginmo = $.trim($("#wBox_mobile_num").val());
        if (loginmo == "" || loginmo == "请输入您的手机号") {
          $("#wBox_login_mobile_errormsg").html("请输入手机号");
          $("#wBox_login_mobile_errordiv").show();
          is_send_msg = 0;
          return false;
        }
        var myreg = /^1[3456789]{1}\d{9}$/;
        if (!myreg.test(loginmo)) {
          $("#wBox_login_mobile_errormsg").html("请您输入正确的手机号");
          $("#wBox_login_mobile_errordiv").show();
          is_send_msg = 0;
          return false;
        }
        var loginmocheckcode = $.trim($("#wBox_login_mobile_unistr").val());
        if (loginmocheckcode == "") {
          is_send_msg = 0;
          $("#wBox_login_mobile_errormsg").html("请点击按钮进行验证");
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
            $("#wBox_login_mobile_errormsg").html("网络异常，请重试！");
            $("#wBox_login_mobile_errordiv").show();
          });
      })
      //用户名、密码登录方式开始
      //获取焦点时动作
      .on("focusin", "#wBox_username_login_name", function (event) {
        event.preventDefault();
        if ($("#wBox_username_login_name").val() == "请输入用户名/手机号") {
          $("#wBox_username_login_name").val("");
        }
      })
      .on("focusin", "#wBox_username_login_pwd", function (event) {
        event.preventDefault();
        if ($("#wBox_username_login_pwd").val() == "请输入密码") {
          $("#wBox_username_login_pwd").val("");
        }
      })
      .on("focusin", "#wBox_username_login_codeinput", function (event) {
        event.preventDefault();
        if ($("#wBox_username_login_codeinput").val() == "请输入验证码") {
          $("#wBox_username_login_codeinput").val("");
        }
      })
      //点击跟换验证码
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
      //点击登录
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
          //防止重复点击
          if (!canClick) return;
          canClick = false;

          //手机动态密码登录
          var login_mobile = $.trim($("#wBox_mobile_num").val());
          if (login_mobile == "") {
            $("#wBox_login_mobile_errormsg").html("请您输入正确的手机号");
            $("#wBox_login_mobile_errordiv").show();
            document.getElementById("wBox_mobile_num").className =
              "tel_text error";
            return false;
          }
          var myreg = /^1[3456789]{1}\d{9}$/;
          if (!myreg.test(login_mobile)) {
            $("#wBox_login_mobile_errormsg").html("请您输入正确的手机号");
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
            $("#wBox_login_mobile_errormsg").html("请点击按钮进行验证");
            $("#wBox_login_mobile_errordiv").show();
            // document.getElementById("wBox_login_mobile_checkcode").className = "codes_text error";
            document.getElementById("wBox_mobile_num").className = "tel_text";
            document.getElementById("wBox_login_mobile_msgcode").className =
              "dynamic_passwrod";
            return false;
          }
          var msgcode = $.trim($("#wBox_login_mobile_msgcode").val());
          if (msgcode == "" || msgcode == "请输入6位动态密码") {
            $("#wBox_login_mobile_errormsg").html("请输入动态密码");
            $("#wBox_login_mobile_errordiv").show();
            document.getElementById("wBox_login_mobile_msgcode").className =
              "dynamic_passwrod error";
            document.getElementById("wBox_mobile_num").className = "tel_text";
            // document.getElementById("wBox_login_mobile_checkcode").className = "codes_text";
            return false;
          }
          //clicklog 上报注册统计
          var _guid = new GUID();
          var _uuid = _guid.newGUID();
          clicklog("register", _uuid);
          //ajax执行登录请求
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
                  //动态密码错误
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
                  //选择展示安全登录页面
                  show_secques_div(data.auth);
                } else {
                  set_cookie("_discuz_uid", data.discuz_uid, data.secure);
                  set_cookie("_discuz_pw", data.discuz_pw, data.secure);
                  set_cookie("_xcar_name", data.xcar_name, data.secure);
                  //20200426诸葛统计取用户名，因my.xcar.com.cn存的用户名编码有问题，所以单独存个新的
                  set_cookie("_xcar_name_utf8", data.xcar_name, data.secure);
                  set_cookie("_discuz_vip", data.discuz_vip, data.secure);
                  set_cookie("bbs_auth", data.bbs_auth, data.secure);
                  set_cookie(
                    "bbs_cookietime",
                    data.bbs_cookietime,
                    data.secure
                  );
                  $("#wBox_overlay_LoginBox").hide(); //遮罩层隐藏
                  $("#wBox_logindiv").hide(); //弹窗隐藏
                  //登录成功
                  //location.reload();
                  login_zhuge(
                    "动态密码登录",
                    data.discuz_uid,
                    data.xcar_name,
                    callbackrun
                  );
                  // callbackrun(); //执行回调函数
                }
              }
            }
          });
        } else if (login_box_type == 2) {
          //用户名密码登录
          var username = $.trim($("#wBox_username_login_name").val());
          if (username == "" || username == "请输入用户名/手机号") {
            $("#wBox_login_name_errormsg").html("请输入用户名");
            $("#wBox_login_name_errordiv").show();
            $("#wBox_username_login_name").addClass("error");
            $("#wBox_username_login_pwd").removeClass("error");
            return false;
          }
          var password = $("#wBox_username_login_pwd").val();
          if (password == "" || password == "请输入密码") {
            $("#wBox_username_login_pwd").val("");
            $("#wBox_login_name_errormsg").html("请输入密码");
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
            if (checkcode == "" || checkcode == "请输入验证码") {
              $("#wBox_login_name_errormsg").html("请输入验证码");
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

          //ajax执行登录请求
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
                  //选择展示安全登录页面
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

                  //登录成功，检查是否需要弹出绑定手机弹层
                  if (_this.AZ.step == 2 && data.bandmo) {
                    //展示绑定手机弹层
                    AjaxUid = data.banduid;
                    show_band_mobile_div(data.banduid);
                  } else {
                    //调用回调函数
                    $("#wBox_overlay_LoginBox").hide(); //遮罩层隐藏
                    $("#wBox_logindiv").hide(); //弹窗隐藏
                    login_zhuge(
                      "爱卡账号登录",
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
      //诸葛统计代码，确保页面上的回调必须在诸葛上报完后再执行（刷新）
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

    //回车键登录
    $(document).keypress(function (e) {
      var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
      if (eCode == 13) {
        $("#wBox_do_login").click();
      }
    });

    //展示绑定手机层 start

    function show_band_mobile_div(uid) {
      $("#wBox_overlay_LoginBox").remove();
      $("#wBox_logindiv").remove(); //登录弹窗去掉
      var bandmobilhtml =
        '<div id="wBox_overlay_LoginBox" class="wBox_hide wBox_overlayBG" style="position: fixed;_position: absolute;top: 0px;left: 0px;height: 100%;width: 100%;background-color: #000;opacity: 0.6;filter: Alpha(Opacity=60);z-index: 10000;"></div>'; //遮罩层
      bandmobilhtml +=
        '<div id="wBox_bandmo_div" class="ie6fixed_m wBox_phone" style="display: block">';
      bandmobilhtml += '<div class="wBox_content" >';
      bandmobilhtml += '<div class="landing_contain active_contain">';
      bandmobilhtml +=
        '<div class="landing_tit"><a href="javascript:void(0)" id="wBox_bandmo_div_close" class="wBox_close" title="关闭"></a>帐号激活</div>'; //标题
      bandmobilhtml += '<div class="main">'; //内容部分开始
      bandmobilhtml += '<div class="left">'; //左侧开始
      bandmobilhtml +=
        '<div class="prompt">亲，激活帐号之后才能继续当前的操作。</div>';
      bandmobilhtml += '<ul><li class="current">用手机激活</li></ul>';
      bandmobilhtml += '<div class="landing_prompt">'; //错误提示开始
      bandmobilhtml += '<div id="wBox_bandmo_errdiv" style="display:none;">';
      bandmobilhtml += '<span></span><font id="wBox_bandmo_errmsg"></font>';
      bandmobilhtml += "</div>";
      bandmobilhtml += "</div>"; //错误提示结束
      bandmobilhtml += "<form>"; //绑定开始
      bandmobilhtml +=
        '<input type="text" id="wBox_bandmo_txtinput" value="请输入您的手机号" class="landing_text">';
      bandmobilhtml +=
        '<a id="wBox_bandmo_sendcode" class="proving" href="javascript:void(0)" style="background: #ff9400;color: #fff;">免费获取验证码</a>';
      bandmobilhtml +=
        '<a id="wBox_bandmo_sendcode_success" class="proving" style="display:none;text-decoration: none;"></a>';
      bandmobilhtml +=
        '<input type="text" id="wBox_bandmo_pincode" value="请输入验证码,2小时内有效" class="landing_text">';
      bandmobilhtml +=
        '<div class="landing_button"><button id="wBox_bandmo_dosubmit" type="button">立即激活</button></div>';
      bandmobilhtml += "</form>"; //绑定结束
      bandmobilhtml += "</div>"; //左侧结束
      bandmobilhtml +=
        '<div class="right">	激活后您就可以进行<em>发帖、回帖、参加活动等</em>更多操作了。</div>'; //右侧内容
      bandmobilhtml += "</div>"; //内容部分结束
      bandmobilhtml += '<div class="landgin_link"></div>'; //分割线
      bandmobilhtml += "</div>";
      bandmobilhtml += "</div>";
      bandmobilhtml += "</div>";
      //显示弹层内容
      $(bandmobilhtml).appendTo("body");
    }
    //展示绑定手机层 end

    //时间倒计时 60s

    function settime(num) {
      if (num == 0) {
        $("#wBox_login_mobile_getmsgcode").show();
        $("#wBox_login_mobile_sendmsgcode").hide();
        //$('#wBox_login_mobile_changecode').click();
        return;
      } else {
        $("#wBox_login_mobile_sendmsgcode").html(num + "秒后重新获取");
        num--;
      }
      setTimeout(function () {
        settime(num);
      }, 1000);
    }

    //插件点击事件
    $t.on("click", function () {
      login_box();
      return false;
    });

    var band_send_msg = 0; //防止连续点击，发送短信

    $("body")
      .on("focusin", "#wBox_bandmo_txtinput", function () {
        if ($("#wBox_bandmo_txtinput").val() == "请输入您的手机号") {
          $("#wBox_bandmo_txtinput").val("");
        }
      })
      .on("click", "#wBox_bandmo_pincode", function (event) {
        event.preventDefault();
        if ($("#wBox_bandmo_pincode").val() == "请输入验证码,2小时内有效") {
          $("#wBox_bandmo_pincode").val("");
        }
      })
      //发送验证码
      .on("click", "#wBox_bandmo_sendcode", function (event) {
        event.preventDefault();
        if (band_send_msg > 0) {
          return false;
        }
        band_send_msg = 1;
        var bindmobile = $.trim($("#wBox_bandmo_txtinput").val());
        var myreg = /^(1+\d{10})$/;
        if (!myreg.test(bindmobile)) {
          $("#wBox_bandmo_errmsg").html("请您输入正确的手机号");
          $("#wBox_bandmo_errdiv").show();
          band_send_msg = 0;
          return false;
        }
        //ajax执行登录请求,发送绑定手机号验证码

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
                  $("#wBox_bandmo_sendcode_success").html("已发送,2小时内有效");
                  $("#wBox_bandmo_sendcode_success").show();
                }
              }
            });
          }
        });
      })
      //绑定手机，激活账号
      .on("click", "#wBox_bandmo_dosubmit", function (event) {
        event.preventDefault();
        var bindmobile = $.trim($("#wBox_bandmo_txtinput").val());
        var myreg = /^(1+\d{10})$/;
        if (!myreg.test(bindmobile)) {
          $("#wBox_bandmo_errmsg").html("请您输入正确的手机号");
          $("#wBox_bandmo_errdiv").show();
          return false;
        }
        var msgcode = $.trim($("#wBox_bandmo_pincode").val());
        if (msgcode == "" || msgcode == "请输入验证码,2小时内有效") {
          $("#wBox_bandmo_errmsg").html("请输入验证码,2小时内有效");
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
              //绑定成功，执行回调函数
              callbackrun(); //执行回调函数
              return false;
            }
          }
        });
      })
      //关闭弹窗
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

  /* 生成GUID码 */
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
  /* 前端无法保证GUID的唯一性 必须依赖服务器 所以添加PVCookie因素 */
  GUID.prototype.getCookiePV = function () {
    var name = "_PVXuv";
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return "";
  };
  /*
   * 功能：获取当前日期的GUID格式，即8位数的日期：19700101
   * 返回值：返回GUID日期格式的字条串
   */
  GUID.prototype.getGUIDDate = function () {
    return (
      this.date.getFullYear() +
      this.addZero(this.date.getMonth() + 1) +
      this.addZero(this.date.getDay())
    );
  };

  /*
   * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933
   * 返回值：返回GUID日期格式的字条串
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
   * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现
   * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串
   * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串
   */
  GUID.prototype.addZero = function (num) {
    if (Number(num).toString() != "NaN" && num >= 0 && num < 10) {
      return "0" + Math.floor(num);
    } else {
      return num.toString();
    }
  };

  /*
   * 功能：将y进制的数值，转换为x进制的数值
   * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10
   * 返回值：返回转换后的字符串
   */
  GUID.prototype.hexadecimal = function (num, x, y) {
    if (y != undefined) {
      return parseInt(num.toString(), y).toString(x);
    } else {
      return parseInt(num.toString()).toString(x);
    }
  };

  /*
   * 功能：格式化32位的字符串为GUID模式的字符串
   * 参数：第1个参数表示32位的字符串
   * 返回值：标准GUID格式的字符串
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

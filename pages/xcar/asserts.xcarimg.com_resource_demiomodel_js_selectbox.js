$(document).ready(function() {
  /* 下拉插件JS */
  $(".selectbox").hover(
    function() {
      $(this).addClass("selectbox_hover");
    },
    function() {
      $(this).removeClass("selectbox_hover");
    }
  );
  $(".option li").hover(
    function() {
      $(this).addClass("active");
    },
    function() {
      $(this).removeClass("active");
    }
  );
  $(".selecttxt").on("click", function(event) {
    //停止冒泡
    event.stopPropagation();

    /* 定义下拉内容最大高度 */
    if (
      $(this)
        .siblings(".option")
        .height() >= 300
    ) {
      $(this)
        .siblings(".option")
        .height(300);
    } else {
      $(this)
        .siblings(".option")
        .height("auto");
    }

    /* 判断当前状态如果打开则关闭 */
    if (
      $(this)
        .parents(".basic_select")
        .hasClass("selectbox_on") == true
    ) {
      $(this)
        .parent()
        .find(".option")
        .hide();
      $(this)
        .parent()
        .removeClass("selectbox_on");
      return;
    }
    $(".selectbox").removeClass("selectbox_on");
    $(this)
      .parent()
      .addClass("selectbox_on");
    $(".selectbox")
      .find(".option")
      .hide();
    $(this)
      .parent()
      .find(".option")
      .show();
  });

  /* 点击页面其他地方，清除当前下拉框状态 */
  $(document).live("click", function(event) {
    var eo = $(event.target);
    if (
      $(".selectbox").is(":visible") &&
      eo.attr("class") != "option" &&
      !eo.parent(".option").length
    )
      $(".option").hide();
    $(".selectbox").removeClass("selectbox_on");
  });
  /* 赋值给文本框 */
  $(".option li:not(.onblur)").live("click", function() {
    var value = $(this)
      .children("a")
      .text();
    $(this)
      .parents(".option")
      .siblings(".selecttxt")
      .children(".selectem")
      .text(value);
    $("#select_value").val(value);
    $(".option").hide();
    $(".selectbox").removeClass("selectbox_on");
    $(this)
      .parents(".option")
      .siblings(".selecttxt")
      .css("color", "#666");
  });
  /* 下拉插件JS end */
});

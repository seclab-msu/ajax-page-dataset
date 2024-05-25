/* 所有短视频关注功能，瀑布流分页加载功能 */
/* short_video_utf8.js and short_video_gbk.js 两文件自 2019/11/12 起不可相互复制覆盖代码 */
// eg：方法使用示例
// shortVideoInit({
//   list_url: "//newcar.xcar.com.cn/auto/index.php?r=service/SeriseParentApiIndex/GetShortVideo", // 分页接口url
//   attention_url: "//newcar.xcar.com.cn/auto/index.php?r=service/AttentionApi/AddFollow", // 关注接口url
//   cancel_attention_url: "//newcar.xcar.com.cn/auto/index.php?r=service/AttentionApi/CancelFollow", // 取消关注接口url
//   rows: 20, // 每页显示条数(非必传参数,默认20)
//   clickLog: "carType", // 埋点字段，需要先查看 CLICK_LOG 对象是否包含埋点配置信息
//   isJump: false, // 点击视频封面图是否跳转url(非必传参数,默认false)，视频详情页点击跳转url需要传true
//   lastVideoId: 0, // 当前页最后一个视频id (早期车型车系瀑布流接口用此参数，如果不用传0)
//   params: {bvid:0, cvid:0, hasMore:0} // 论坛相关接口用此参数(参数在接口文档上：http://wiki.xcar.com.cn/pages/viewpage.action?pageId=14240442)
// }); 
;(function() {
  var utils = {
    getCookie: function(name) {
      // 获取cookie
      var cookieName = encodeURIComponent(name) + "=",
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;
      if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(
          document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
        );
      }
      return cookieValue;
    }
  };
  // 供弹窗调登录框
  window.showLoginDialog = function () {
    $('#xlogin').trigger("click");
  }
  window.refreshAttention = function(author_id){
    // 弹框关注功能刷新页面关注状态
    $('.attention').each(function(i, v){
      if ($(this).attr('author_id') == author_id) {
        if($(this).hasClass('attention_the')){
          $(this).text()
            ? $(this).text("关注").removeClass("attention_the")
            : $(this).removeClass("attention_the")
        } else {
          $(this).text()
            ? $(this).text("已关注").addClass("attention_the")
            : $(this).addClass("attention_the")
        }
      }
    })
  }
  // 初始化方法
  window.shortVideoInit = function(opt) {
    if (!ShortVideo.isInit) {
      ShortVideo.init(opt);
    }
    return ShortVideo;
  };
  // 短视频
  var ShortVideo = {
    LIST_URL: "", // 列表接口地址
    ATTENTION_URL: "", // 关注接口地址;
    CANCEL_ATTENTION_URL: "", // 取消关注接口地址
    UID: "", // 用户id
    page: 1,
    rows: 20,
    stop: false, // 是否停止滚动
    isInit: false, // 是否初始化过
    clickLog: "", // clickLog字段
    isJump: false, // 是否跳转url
    lastVideoId: 0, // 最后一个视频id
    params: "", // 接口参数
    init: function(opt) {
      // 初始化方法
      this.isInit = true;
      this.LIST_URL = opt.list_url ? opt.list_url : '';
      this.ATTENTION_URL = opt.attention_url ? opt.attention_url : '';
      this.CANCEL_ATTENTION_URL = opt.cancel_attention_url ? opt.cancel_attention_url : '';
      this.rows = opt.rows ? opt.rows : 20;
      this.clickLog = opt.clickLog ? opt.clickLog : '';
      this.isJump = opt.isJump ? opt.isJump : false;
      this.lastVideoId = opt.lastVideoId ? opt.lastVideoId : 0;
      this.params = opt.params ? opt.params : { bvid: 0, cvid: 0, hasMore: 1};
      this.UID = utils.getCookie("_discuz_uid") || 0;

      this.$shortVideoFlowBox = $(".short_video_flow_box"); // 短视频瀑布流盒子
      this.$shortVideoTagList = $(".short_video_tag_ul"); // 短视频和视频标签切换，如果有

      var _this = this;
      // 首屏选然后是否有下一页
      if(_this.params.hasMore != undefined && _this.params.hasMore == 0){
        _this.stop = true; // 暂无数据阻止滚屏
        _this.$shortVideoFlowBox.find(".load_more").addClass("empty").html("当前已没有更多内容"); // 暂无数据
      }
      if (_this.$shortVideoTagList.length) {
        // 包含短视频多个标签切换
        _this.$shortVideoTagList.on("click", "li", function(evt) {
          // evt.stopPropagation();
          var $target = null;
          if($(evt.target)[0].localName == 'li'){
            $target = $(evt.target).find('a');
          } else {
            $target = $(evt.target);
          }
          if ($target.attr('data-active')) {
            _this.offWindowScroll();
            _this.windowScroll(); // 绑定事件
          } else {
            _this.offWindowScroll();
          }
        });
      }
      if(_this.$shortVideoFlowBox.length && _this.$shortVideoFlowBox.is(':visible')){
        _this.windowScroll(); // 绑定滚屏事件
      }
      _this.bindEvent();
      // 图片增加默认图片自定义路径
      _this.$shortVideoFlowBox.find('.video_item dt img').each(function(i, v){
        $(this).attr('default-src', $(this).attr('src'));
      });
    },
    bindEvent: function() {
      var _this = this;
      // 加载更多按钮
      /* _this.$shortVideoFlowBox.find(".load_more").on("click", function(evt) {
        evt.stopPropagation();
        if (_this.stop || $(this).hasClass("empty")) {
          return false; // 正在加载中或者无数据时返回
        }
        if (_this.page % 2 == 0) {
          _this.$shortVideoFlowBox.find(".load_more").html("数据加载中,请稍候...");
          _this.page++;
          _this.stop = true;
          _this.loadData();
        }
      }); */
      // 调用播放器弹框
      _this.$shortVideoFlowBox.on("click", '.video_item dt a,.video_item .desc', function(evt) {
        var $target = null;
        if($(evt.target).hasClass('desc')){
          $target = $(evt.target).prev().find('a');
        } else {
          $target = $(evt.target).parents("a");
        }
        var video_id = $target.attr("video_id"), // 视频id
        page = $target.attr("page"), // 页码
        bvid = $target.attr('bvid'), // 取获取当前页数据的请求参数的 bvid，cvid 参数
        cvid = $target.attr('cvid'),
        author_id = $target.parents(".video_item").find(".attention").attr("author_id"); // 作者id
        if (!video_id || !page) {
          return false;
        }
        if(_this.isJump){
          // 页面跳转
          location.href = "//club.xcar.com.cn/microvideo/"+ video_id +".html"; // 视频详情页
        } else {
          var iframeUrl = _this.callDialogParamsFormat(video_id, page, bvid, cvid); // 调用视频弹框格式化参数
          // 视频播放弹框
          layer.open({
            type: 2,
            title: '',
            area: ['808px', '640px'],
            // scrollbar: false,
            content: [iframeUrl, 'no'],
            end: function () {
              clicklog('127713')
            },
            success: function(layero, index){}
          });
        }
      });
      // 短视频关注功能
      $(".short_video,.short_video_flow_box").on("click", ".attention", function(evt) {
        var that = $(this);
        var author_id = that.attr("author_id");
        var dataObj = {
          author_uid: author_id || 0,
          uid: _this.UID,
          fuid: _this.UID,
          tuid: author_id || 0
        }
        $(that).unbind("click");
        that.xLoginBox({
          func: function() {
            callLoginScript.call(null);
            reloadMsgInfo.call(null);
            var uid = utils.getCookie('_discuz_uid');
            dataObj.uid = uid; // 登陆成功之后取cookie
            dataObj.fuid = uid; // 登陆成功之后取cookie
            _this.UID = uid;
            if (!that.hasClass("attention_the")) {
              _this.Ajax('post', _this.ATTENTION_URL, dataObj, function(res) {
                if(res.data.code != 0){
                  return false;
                }
                $('.attention').each(function(i, v){
                  if ($(this).attr('author_id') == author_id) {
                    $(this).text()
                      ? $(this).text("已关注").addClass("attention_the")
                      : $(this).addClass("attention_the")
                  }
                })
              });
            } else {
              _this.Ajax('post', _this.CANCEL_ATTENTION_URL, dataObj, function(res) {
                if(res.data.code != 0){
                  return false;
                }
                $('.attention').each(function(i, v){
                  if ($(this).attr('author_id') == author_id) {
                    $(this).text()
                      ? $(this).text("关注").removeClass("attention_the")
                      : $(this).removeClass("attention_the")
                  }
                })
              });
            }
            return false;
          },
          args: [],
          show: true
        });
      });
      // 短视频瀑布流封面图hover状态切换封面图
      _this.$shortVideoFlowBox.on('mouseenter', '.flow_box .video_item dt img', function(evt){
        evt.stopPropagation();
        var dataSrc = $(this).attr('data-src');
        dataSrc && $(this).attr('src', dataSrc);
      })
      _this.$shortVideoFlowBox.on('mouseleave', '.flow_box .video_item dt img', function(evt){
        evt.stopPropagation();
        var defaultSrc = $(this).attr('default-src');
        defaultSrc && $(this).attr('src', defaultSrc);
      })
    },
    offWindowScroll: function() {
      // 取消滚屏事件
      $(window).off("scroll");
    },
    windowScroll: function() {
      // 滚屏事件
      var _this = this;
      function debounce(fn) {
        var timer = null;
        return function() {
          timer && clearTimeout(timer);
          timer = setTimeout(function() {
            fn.apply(null, arguments);
          }, 0);
        };
      }
      $(window).on(
        "scroll",
        debounce(function() {
          // 偶数页点击加载
          /* if (_this.stop || _this.page % 2 == 0) {
            return false;
          } */
          if (_this.stop) {
            return false;
          }
          var scrollTop = $(window).scrollTop(),
          clientHeight = $(window).height(),
          scrollHeight = $(document).height();
          // console.log('scrollTop: %d, clientHeight: %d, scrollHeight: %d', scrollTop, clientHeight, scrollHeight);
          if (scrollTop + clientHeight + 500 >= scrollHeight) {
            _this.stop = true
            _this.$shortVideoFlowBox.find(".load_more").html("数据加载中,请稍候...");
            _this.page++;
            _this.loadData(); // 加载列表
          }
        })
      );
    },
    loadData: function() {
      // 加载数据
      var _this = this,
      url = _this.LIST_URL,
      data = {
        pserid: window._pserid ? window._pserid : 0, // 车系id
        mid: window._nav_mid ? window._nav_mid : 0, // 车型id
        uid: _this.UID,
        page: _this.page,
        page_size: _this.rows,
        pagesize: _this.rows,
        lastId: _this.lastVideoId,
        bvid: _this.params.bvid ? _this.params.bvid : 0,
        cvid: _this.params.cvid ? _this.params.cvid : 0,
        st: Date.now()
      };
      _this.Ajax('get', url, data, function(res) {
        var data = res.data,
        href = location.href.toLowerCase();
        if(data.code != 0){
          layer.msg(data.info, {
            offset: "30px",
            time: 3000
          });
          return false;
        }
        if(data.hasMore == 0){
          if(data.videoData.length){
            if(href.indexOf('//newcar.xcar.com.cn') != -1){
              _this.renderDom(data.videoData, _this.lastVideoId, 0); // 渲染数据, bvid, cvid 车型车系短视频 bvid == lastVideoId，没有cvid概念
            } else {
              _this.renderDom(data.videoData, _this.params.bvid, _this.params.cvid); // 渲染数据, bvid, cvid 写到页面上和分页渲染请求参数一致
            }
          }
          _this.stop = true; // 暂无数据阻止滚屏
          _this.$shortVideoFlowBox.find(".load_more").addClass("empty").html("当前已没有更多内容"); // 暂无数据
          return false;
        }
        _this.stop = false;
        if(href.indexOf('//newcar.xcar.com.cn') != -1){
          _this.renderDom(data.videoData, _this.lastVideoId, 0); // 渲染数据, bvid, cvid 车型车系短视频 bvid == lastVideoId，没有cvid概念
        } else {
          _this.renderDom(data.videoData, _this.params.bvid, _this.params.cvid); // 渲染数据, bvid, cvid 写到页面上和分页渲染请求参数一致
        }

        // 记录bvid和cvid，分页查询回传
        _this.params.bvid = data.bvid;
        _this.params.cvid = data.cvid;
      });
    },
    renderDom: function(list, bvid, cvid){
      var _this = this,
      length = _this.$shortVideoFlowBox.find(".flow_box").length, // 瀑布流的列数
      resource_loc = $('input[name=resource_loc]').val(); // 获取页面隐藏域资源位id
      // 方法一: 按左右顺序依次插入(下标模列数)
      /* for (var i = 0; i < list.length; i++) {
        // 根据资源位去重
        if(resource_loc && resource_loc.indexOf(list[i].vid) != -1){
          list.splice(i,1);
          i--;
          continue;
        } else {
          var mod = i % length;
          // 渲染数据, bvid, cvid 写到页面上和分页渲染请求参数一致
          var html = _this.template(list[i], _this.page, CLICK_LOG[_this.clickLog], bvid, cvid);  
          _this.$shortVideoFlowBox.find(".flow_box:eq(" + mod + ")").append(html);
        }
      } */
      // 方法二: 按列最小高度插入
      var heightArr = [];
      // 获取所有队列的高度;
      _this.$shortVideoFlowBox.find('.flow_box').each(function(i, v){
        heightArr.push($(this).height());
      });
      for (var i = 0; i < list.length; i++) {
        // 获取高度最小的下标;
        var min = Math.min.apply(null, heightArr);
        var ind = heightArr.indexOf(min);
        if(resource_loc && resource_loc.indexOf(list[i].vid) != -1){
          list.splice(i, 1);
          i--;
          continue;
        } else {
          // 渲染数据, bvid, cvid 写到页面上和分页渲染请求参数一致
          var html = _this.template(list[i], _this.page, CLICK_LOG[_this.clickLog], bvid, cvid);  
          _this.$shortVideoFlowBox.find(".flow_box:eq("+ ind +")").append(html); // 在高度最小列插入数据
        }
        // 重新获取插入数据列的高度更新到数组中;
        // var val = heightArr[ind]
        // heightArr.splice(ind, 1, (val + parseInt(list[i].coverHeight)));
        heightArr.splice(ind, 1, _this.$shortVideoFlowBox.find(".flow_box:eq("+ ind +")").height());
      }
      _this.lastVideoId = list[list.length - 1].vid; // 记录最后一个视频id
      _this.$shortVideoFlowBox.find(".load_more").html("加载更多");
    },
    template: function(item, page, clickLog, bvid, cvid){
      // 渲染数据, bvid, cvid 写到页面上和分页渲染请求参数一致
      var _this = this, 
      arr = clickLog.split(','),
      t = '',
      time = Math.floor(Date.now() / 60000), // 作者头像添加时间戳参数
      imgShowWidth = 0; // 图片显示宽度
      for (var i = 0; i < arr.length; i++) {
        arr[i].trim();
      }
      // 根据瀑布流列宽度不同计算封面图显示高度: imgShowWidth : imgShowHeight = coverWidth : coverHeight
      switch(_this.clickLog){
        case 'clubChannel':
          imgShowWidth = 222;
          break;
        case 'videoDetail':
          imgShowWidth = 203;
          break;
        default:
          imgShowWidth = 240;
          break;
      }
      t += '<li class="video_item"><dl><dt>';
      t += '<a href="javascript:;" video_id="'+ item.vid +'" page="'+ page +'" bvid="'+ bvid +'" cvid="'+ cvid +'" onclick="clicklog('+ arr[0] +')">';
      t += '<img src="'+ item.coverImg +'" height="'+ Math.ceil(item.coverHeight * imgShowWidth / item.coverWidth) +'" data-src="'+ item.coverGif +'" default-src="'+ item.coverImg +'" alt=""/></a></dt>';
      t += '<dd class="desc">'+ item.description +'</dd>';
      t += '<dd class="user_box">';
      t += '<a class="user_portrait" href="//my.xcar.com.cn/space.php?uid='+ item.userInfo.authorUid +'" target="_blank" onclick="clicklog('+ arr[1] +')">';
      t += '<img src="'+ item.userInfo.avatar + (item.userInfo.avatar.indexOf('?') != -1 ? '&t=' + time : '?t=' + time) +'" alt=""/>';
      t += '<i class="'+ (item.userInfo.user_type == 1 
          ? 'admit admit_nom' 
          : item.userInfo.user_type == 2 
          ? 'admit admit_organ' 
          : '') +'"></i>';
      t += '</a> ';
      t += '<a class="user_name" href="//my.xcar.com.cn/space.php?uid='+ item.userInfo.authorUid +'" target="_blank" onclick="clicklog('+ arr[1] +')">'+ item.userInfo.authorName +'</a>';
      t += (item.userInfo.is_follow != 2 ? ('<span class="attention '+ (item.userInfo.is_follow == 1 
            ? 'attention_the'
            : '') +'" author_id="'+ item.userInfo.authorUid +'" onclick="clicklog('+ arr[2] +')">'+ (item.userInfo.is_follow == 1
            ? '已关注'
            : '关注') +'</span>') : '');
      t += '</dd></dl></li>';
      return t;
    },
    Ajax: function(type, url, data, callback) {
      $.ajax({
        type: type,
        url: url,
        data: data,
        timeout: 30000,
        dataType: 'json',
        success: function(res) {
          callback(res);
        },
        error: function(err){
          layer.msg('请求失败,请刷新重试!', {
            offset: "30px",
            time: 3000
          });
        }
      });
    },
    callDialogParamsFormat: function(video_id, page, bvid, cvid){
      // 调用视频弹框格式化参数
      var _this = this,
      host = window.location.host,
      href = location.href.toLowerCase(),
      type = 5,
      params = 'vid='+ video_id +'&page='+ page + '&uid='+ (utils.getCookie('_discuz_uid') || 0) +'&pagesize='+ _this.rows +'&bvid='+ (page == 1 ? 0 : bvid) +'&cvid='+ (page == 1 ? 0 : cvid);
      if(href.indexOf('//club.xcar.com.cn/microvideo') != -1){
        type = 1; // 1 -> 频道情页
      } else if(href.indexOf('//www.xcar.com.cn/bbs/') != -1){
        type = 3; // 3 -> 论坛相关短视频
        var match = _this.LIST_URL.match(/(?:fid=(\d)*)/gmi)[0];
        params += ('&fid=' + match.substring(match.indexOf('fid=') + 4));
      } else if(href.indexOf('//newcar.xcar.com.cn') != -1){
        type = 6; // 6 -> 车型 车系
        params += ('&serid=' + (window._pserid ? window._pserid : 0) + '&midid=' + (window._nav_mid ? window._nav_mid : 0));
      }
      params += ('&type='+ type);
      var iframeUrl = ''
      if (host.indexOf('newcar') > -1) {
        iframeUrl = '//newcar.xcar.com.cn/shortvideo.php?' + params
      } else if(host.indexOf('club') > -1){
        iframeUrl = '//club.xcar.com.cn/microvideo/alertinfo.html?' + params
      } else {
        iframeUrl = '//www.xcar.com.cn/bbs/xbbsapi/microvideo/alert_video_info.php?' + params
      }
      return iframeUrl;
    }
  };
  // 瀑布流clicklog: 
  // 0->卡片(封面图)埋点,1->用户头像和用户名埋点,2->关注按钮埋点
  var CLICK_LOG = {
    clubChannel: "127688,127689,127690", // 论坛频道页
    clubList: "127765,127766,127767", // 论坛列表页
    topicDetail: "", // 话题详情页
    videoDetail: "127688,127689,127690", // 视频详情页
    carSeries: "127741,127742,127743", // 车系
    carType: "127750,127751,127752" // 车型
  };
})();
/* ****************************************************************************************************************** */
// xbb 短视频频道页发布按钮吸右
$(function(){
  var href  = location.href;
  // url为论坛短视频频道页 并且 发布按钮碎片维护为可见状态时
  if(href.toLowerCase().indexOf('//club.xcar.com.cn/microvideo') != -1 && $('.short_video_flow_box .video_item .publish').length){
    $('body').append('<a href="javascript:;" class="publish publish_fixed_right">发布</a>');
    // 发布按钮弹框
    $('body').on('click', '.publish', function(evt){
      $('.publish_mask').show();
      $('.publish_modal').show();
    });
    $('.publish_modal .close').on('click', function(evt){
      $('.publish_mask').hide();
      $('.publish_modal').hide();
    });
    function debounce(fn) {
        var timer = null;
        return function () {
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(this, arguments)
            }, 10)
        }
    }
    var $publishBtn = $('.short_video_flow_box .publish'); // 发布按钮
    var btnOffsetTop = $publishBtn.offset().top + $publishBtn.height();
    $(window).scroll(debounce(function () {
        var winScrollTop = $(this).scrollTop();
        if(winScrollTop >= btnOffsetTop){
            $publishBtn.hide();
            $('.publish_fixed_right').show();
        } else {
            $publishBtn.show();
            $('.publish_fixed_right').hide();
        }
    }));
  }
})

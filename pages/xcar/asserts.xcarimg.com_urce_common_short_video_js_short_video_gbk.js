/* ���ж���Ƶ��ע���ܣ��ٲ�����ҳ���ع��� */
/* short_video_utf8.js and short_video_gbk.js ���ļ��� 2019/11/12 �𲻿��໥���Ƹ��Ǵ��� */
// eg������ʹ��ʾ��
// shortVideoInit({
//   list_url: "//newcar.xcar.com.cn/auto/index.php?r=service/SeriseParentApiIndex/GetShortVideo", // ��ҳ�ӿ�url
//   attention_url: "//newcar.xcar.com.cn/auto/index.php?r=service/AttentionApi/AddFollow", // ��ע�ӿ�url
//   cancel_attention_url: "//newcar.xcar.com.cn/auto/index.php?r=service/AttentionApi/CancelFollow", // ȡ����ע�ӿ�url
//   rows: 20, // ÿҳ��ʾ����(�Ǳش�����,Ĭ��20)
//   clickLog: "carType", // ����ֶΣ���Ҫ�Ȳ鿴 CLICK_LOG �����Ƿ�������������Ϣ
//   isJump: false, // �����Ƶ����ͼ�Ƿ���תurl(�Ǳش�����,Ĭ��false)����Ƶ����ҳ�����תurl��Ҫ��true
//   lastVideoId: 0, // ��ǰҳ���һ����Ƶid (���ڳ��ͳ�ϵ�ٲ����ӿ��ô˲�����������ô�0)
//   params: {bvid:0, cvid:0, hasMore:0} // ��̳��ؽӿ��ô˲���(�����ڽӿ��ĵ��ϣ�http://wiki.xcar.com.cn/pages/viewpage.action?pageId=14240442)
// }); 
;(function() {
  var utils = {
    getCookie: function(name) {
      // ��ȡcookie
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
  // ����������¼��
  window.showLoginDialog = function () {
    $('#xlogin').trigger("click");
  }
  window.refreshAttention = function(author_id){
    // �����ע����ˢ��ҳ���ע״̬
    $('.attention').each(function(i, v){
      if ($(this).attr('author_id') == author_id) {
        if($(this).hasClass('attention_the')){
          $(this).text()
            ? $(this).text("��ע").removeClass("attention_the")
            : $(this).removeClass("attention_the")
        } else {
          $(this).text()
            ? $(this).text("�ѹ�ע").addClass("attention_the")
            : $(this).addClass("attention_the")
        }
      }
    })
  }
  // ��ʼ������
  window.shortVideoInit = function(opt) {
    if (!ShortVideo.isInit) {
      ShortVideo.init(opt);
    }
    return ShortVideo;
  };
  // ����Ƶ
  var ShortVideo = {
    LIST_URL: "", // �б�ӿڵ�ַ
    ATTENTION_URL: "", // ��ע�ӿڵ�ַ;
    CANCEL_ATTENTION_URL: "", // ȡ����ע�ӿڵ�ַ
    UID: "", // �û�id
    page: 1,
    rows: 20,
    stop: false, // �Ƿ�ֹͣ����
    isInit: false, // �Ƿ��ʼ����
    clickLog: "", // clickLog�ֶ�
    isJump: false, // �Ƿ���תurl
    lastVideoId: 0, // ���һ����Ƶid
    params: "", // �ӿڲ���
    init: function(opt) {
      // ��ʼ������
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

      this.$shortVideoFlowBox = $(".short_video_flow_box"); // ����Ƶ�ٲ�������
      this.$shortVideoTagList = $(".short_video_tag_ul"); // ����Ƶ����Ƶ��ǩ�л��������

      var _this = this;
      // ����ѡȻ���Ƿ�����һҳ
      if(_this.params.hasMore != undefined && _this.params.hasMore == 0){
        _this.stop = true; // ����������ֹ����
        _this.$shortVideoFlowBox.find(".load_more").addClass("empty").html("��ǰ��û�и�������"); // ��������
      }
      if (_this.$shortVideoTagList.length) {
        // ��������Ƶ�����ǩ�л�
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
            _this.windowScroll(); // ���¼�
          } else {
            _this.offWindowScroll();
          }
        });
      }
      if(_this.$shortVideoFlowBox.length && _this.$shortVideoFlowBox.is(':visible')){
        _this.windowScroll(); // �󶨹����¼�
      }
      _this.bindEvent();
      // ͼƬ����Ĭ��ͼƬ�Զ���·��
      _this.$shortVideoFlowBox.find('.video_item dt img').each(function(i, v){
        $(this).attr('default-src', $(this).attr('src'));
      });
    },
    bindEvent: function() {
      var _this = this;
      // ���ظ��ఴť
      /* _this.$shortVideoFlowBox.find(".load_more").on("click", function(evt) {
        evt.stopPropagation();
        if (_this.stop || $(this).hasClass("empty")) {
          return false; // ���ڼ����л���������ʱ����
        }
        if (_this.page % 2 == 0) {
          _this.$shortVideoFlowBox.find(".load_more").html("���ݼ�����,���Ժ�...");
          _this.page++;
          _this.stop = true;
          _this.loadData();
        }
      }); */
      // ���ò���������
      _this.$shortVideoFlowBox.on("click", '.video_item dt a,.video_item .desc', function(evt) {
        var $target = null;
        if($(evt.target).hasClass('desc')){
          $target = $(evt.target).prev().find('a');
        } else {
          $target = $(evt.target).parents("a");
        }
        var video_id = $target.attr("video_id"), // ��Ƶid
        page = $target.attr("page"), // ҳ��
        bvid = $target.attr('bvid'), // ȡ��ȡ��ǰҳ���ݵ���������� bvid��cvid ����
        cvid = $target.attr('cvid'),
        author_id = $target.parents(".video_item").find(".attention").attr("author_id"); // ����id
        if (!video_id || !page) {
          return false;
        }
        if(_this.isJump){
          // ҳ����ת
          location.href = "//club.xcar.com.cn/microvideo/"+ video_id +".html"; // ��Ƶ����ҳ
        } else {
          var iframeUrl = _this.callDialogParamsFormat(video_id, page, bvid, cvid); // ������Ƶ�����ʽ������
          // ��Ƶ���ŵ���
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
      // ����Ƶ��ע����
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
            dataObj.uid = uid; // ��½�ɹ�֮��ȡcookie
            dataObj.fuid = uid; // ��½�ɹ�֮��ȡcookie
            _this.UID = uid;
            if (!that.hasClass("attention_the")) {
              _this.Ajax('post', _this.ATTENTION_URL, dataObj, function(res) {
                if(res.data.code != 0){
                  return false;
                }
                $('.attention').each(function(i, v){
                  if ($(this).attr('author_id') == author_id) {
                    $(this).text()
                      ? $(this).text("�ѹ�ע").addClass("attention_the")
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
                      ? $(this).text("��ע").removeClass("attention_the")
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
      // ����Ƶ�ٲ�������ͼhover״̬�л�����ͼ
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
      // ȡ�������¼�
      $(window).off("scroll");
    },
    windowScroll: function() {
      // �����¼�
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
          // ż��ҳ�������
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
            _this.$shortVideoFlowBox.find(".load_more").html("���ݼ�����,���Ժ�...");
            _this.page++;
            _this.loadData(); // �����б�
          }
        })
      );
    },
    loadData: function() {
      // ��������
      var _this = this,
      url = _this.LIST_URL,
      data = {
        pserid: window._pserid ? window._pserid : 0, // ��ϵid
        mid: window._nav_mid ? window._nav_mid : 0, // ����id
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
              _this.renderDom(data.videoData, _this.lastVideoId, 0); // ��Ⱦ����, bvid, cvid ���ͳ�ϵ����Ƶ bvid == lastVideoId��û��cvid����
            } else {
              _this.renderDom(data.videoData, _this.params.bvid, _this.params.cvid); // ��Ⱦ����, bvid, cvid д��ҳ���Ϻͷ�ҳ��Ⱦ�������һ��
            }
          }
          _this.stop = true; // ����������ֹ����
          _this.$shortVideoFlowBox.find(".load_more").addClass("empty").html("��ǰ��û�и�������"); // ��������
          return false;
        }
        _this.stop = false;
        if(href.indexOf('//newcar.xcar.com.cn') != -1){
          _this.renderDom(data.videoData, _this.lastVideoId, 0); // ��Ⱦ����, bvid, cvid ���ͳ�ϵ����Ƶ bvid == lastVideoId��û��cvid����
        } else {
          _this.renderDom(data.videoData, _this.params.bvid, _this.params.cvid); // ��Ⱦ����, bvid, cvid д��ҳ���Ϻͷ�ҳ��Ⱦ�������һ��
        }

        // ��¼bvid��cvid����ҳ��ѯ�ش�
        _this.params.bvid = data.bvid;
        _this.params.cvid = data.cvid;
      });
    },
    renderDom: function(list, bvid, cvid){
      var _this = this,
      length = _this.$shortVideoFlowBox.find(".flow_box").length, // �ٲ���������
      resource_loc = $('input[name=resource_loc]').val(); // ��ȡҳ����������Դλid
      // ����һ: ������˳�����β���(�±�ģ����)
      /* for (var i = 0; i < list.length; i++) {
        // ������Դλȥ��
        if(resource_loc && resource_loc.indexOf(list[i].vid) != -1){
          list.splice(i,1);
          i--;
          continue;
        } else {
          var mod = i % length;
          // ��Ⱦ����, bvid, cvid д��ҳ���Ϻͷ�ҳ��Ⱦ�������һ��
          var html = _this.template(list[i], _this.page, CLICK_LOG[_this.clickLog], bvid, cvid);  
          _this.$shortVideoFlowBox.find(".flow_box:eq(" + mod + ")").append(html);
        }
      } */
      // ������: ������С�߶Ȳ���
      var heightArr = [];
      // ��ȡ���ж��еĸ߶�;
      _this.$shortVideoFlowBox.find('.flow_box').each(function(i, v){
        heightArr.push($(this).height());
      });
      for (var i = 0; i < list.length; i++) {
        // ��ȡ�߶���С���±�;
        var min = Math.min.apply(null, heightArr);
        var ind = heightArr.indexOf(min);
        if(resource_loc && resource_loc.indexOf(list[i].vid) != -1){
          list.splice(i, 1);
          i--;
          continue;
        } else {
          // ��Ⱦ����, bvid, cvid д��ҳ���Ϻͷ�ҳ��Ⱦ�������һ��
          var html = _this.template(list[i], _this.page, CLICK_LOG[_this.clickLog], bvid, cvid);  
          _this.$shortVideoFlowBox.find(".flow_box:eq("+ ind +")").append(html); // �ڸ߶���С�в�������
        }
        // ���»�ȡ���������еĸ߶ȸ��µ�������;
        // var val = heightArr[ind]
        // heightArr.splice(ind, 1, (val + parseInt(list[i].coverHeight)));
        heightArr.splice(ind, 1, _this.$shortVideoFlowBox.find(".flow_box:eq("+ ind +")").height());
      }
      _this.lastVideoId = list[list.length - 1].vid; // ��¼���һ����Ƶid
      _this.$shortVideoFlowBox.find(".load_more").html("���ظ���");
    },
    template: function(item, page, clickLog, bvid, cvid){
      // ��Ⱦ����, bvid, cvid д��ҳ���Ϻͷ�ҳ��Ⱦ�������һ��
      var _this = this, 
      arr = clickLog.split(','),
      t = '',
      time = Math.floor(Date.now() / 60000), // ����ͷ�����ʱ�������
      imgShowWidth = 0; // ͼƬ��ʾ���
      for (var i = 0; i < arr.length; i++) {
        arr[i].trim();
      }
      // �����ٲ����п�Ȳ�ͬ�������ͼ��ʾ�߶�: imgShowWidth : imgShowHeight = coverWidth : coverHeight
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
            ? '�ѹ�ע'
            : '��ע') +'</span>') : '');
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
          layer.msg('����ʧ��,��ˢ������!', {
            offset: "30px",
            time: 3000
          });
        }
      });
    },
    callDialogParamsFormat: function(video_id, page, bvid, cvid){
      // ������Ƶ�����ʽ������
      var _this = this,
      host = window.location.host,
      href = location.href.toLowerCase(),
      type = 5,
      params = 'vid='+ video_id +'&page='+ page + '&uid='+ (utils.getCookie('_discuz_uid') || 0) +'&pagesize='+ _this.rows +'&bvid='+ (page == 1 ? 0 : bvid) +'&cvid='+ (page == 1 ? 0 : cvid);
      if(href.indexOf('//club.xcar.com.cn/microvideo') != -1){
        type = 1; // 1 -> Ƶ����ҳ
      } else if(href.indexOf('//www.xcar.com.cn/bbs/') != -1){
        type = 3; // 3 -> ��̳��ض���Ƶ
        var match = _this.LIST_URL.match(/(?:fid=(\d)*)/gmi)[0];
        params += ('&fid=' + match.substring(match.indexOf('fid=') + 4));
      } else if(href.indexOf('//newcar.xcar.com.cn') != -1){
        type = 6; // 6 -> ���� ��ϵ
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
  // �ٲ���clicklog: 
  // 0->��Ƭ(����ͼ)���,1->�û�ͷ����û������,2->��ע��ť���
  var CLICK_LOG = {
    clubChannel: "127688,127689,127690", // ��̳Ƶ��ҳ
    clubList: "127765,127766,127767", // ��̳�б�ҳ
    topicDetail: "", // ��������ҳ
    videoDetail: "127688,127689,127690", // ��Ƶ����ҳ
    carSeries: "127741,127742,127743", // ��ϵ
    carType: "127750,127751,127752" // ����
  };
})();
/* ****************************************************************************************************************** */
// xbb ����ƵƵ��ҳ������ť����
$(function(){
  var href  = location.href;
  // urlΪ��̳����ƵƵ��ҳ ���� ������ť��Ƭά��Ϊ�ɼ�״̬ʱ
  if(href.toLowerCase().indexOf('//club.xcar.com.cn/microvideo') != -1 && $('.short_video_flow_box .video_item .publish').length){
    $('body').append('<a href="javascript:;" class="publish publish_fixed_right">����</a>');
    // ������ť����
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
    var $publishBtn = $('.short_video_flow_box .publish'); // ������ť
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

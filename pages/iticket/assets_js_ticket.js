var capcha_load;
$(function(){
  $('body').on('change','[data-action="ticket-date"]', function(event) {
    ticketDate(this);
  });
  $('body').on('click','[data-action="ticket-date"]', function(event) {
    ticketDate(this);
  });
  $('body').on('click','.decrease', function(event) {
    addSeat($(this).next(),$(this).next().val());
  });
  $('body').on('click','.increase', function(event) {
    addSeat($(this).prev(),$(this).prev().val());
  });
  $('body').on('change','[data-action="change-quantity"]', function(event) {
    addSeat(this,$(this).val());
  });
  $('body').on('click','[data-action="ticket-add"]', function(event) {
    addSeat(this);
  });



  $(".item_ticket_rotate").flip({
    trigger: 'manual'
  });


  $('body').on('click','[data-action="refund-payment"]', function(event) {
    $(this).parents(".item_ticket_rotate").flip(true);
  });

  $('body').on('click','[data-action="refund-cancel"]', function(event) {
    $(this).parents(".item_ticket_rotate").flip(false);
  });


  $('body').on('click','.item_ticket .payment_method div', function(event) {
    if (!$(this).hasClass('active')) {
      $('.item_ticket .payment_method div').removeClass('active');
      $(this).addClass('active');
      var target = $(this).data('type');
      $('.tab-type').hide();
      $('#tab_' + target).show();
    }

  });


  $( window ).resize(function() {
    if ($(window).width() <= 1024) {

      if ($('.price_for_place').length) {

        if (!$('.price_for_place').hasClass('resize')) {

          var width = 0;
          var count = $('.price_for_place .price_for_place_wrap > div').size();
          // console.log(window_w);
          $('.price_for_place .price_for_place_wrap > div').each(function() {
            width += $(this).outerWidth();
            // console.log(width);
            // console.log($(this).outerWidth());
          });
          $('.price_for_place .price_for_place_wrap').css('min-width', width + count);
          // console.log(width);
          $('.price_for_place').addClass('resize');
        }
      }
    } else {
      $('.price_for_place').removeClass('resize');
      $('.price_for_place_wrap').removeAttr('style');
    }
  });








  // plateste cu bani din cont
  $('body').on('click','[data-action="cash-pay"]', function(event) {
    document.domain = window.location.host;
    event.preventDefault();
    item = this;
    $('.cssload-loader').show();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/VerifyDiscountKey',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        ev:ev,
        id:$(item).prev().val(),
      },
    }).done(function(data) {
      $('.cssload-loader').hide();
      $('.total_price span').html(data.total);
      PNotify.removeAll();
      if(data.success){
        $(item).parent().parent().remove();
      }
      userNotification(data);
    },'json');
  })
  $('body').on('click','[data-action="ticket-discount"]', function(event) {
    document.domain = window.location.host;
    event.preventDefault();
    item = this;
    $('.cssload-loader').show();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/VerifyDiscountKey',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        ev:ev,
        id:$(item).parents('li').find('input').val()
      },
    }).done(function(data) {
      $('.cssload-loader').hide();
      $('.you_choosed .total .right').html(data.total+' lei');
      PNotify.removeAll();
      if(data.success){
        $(item).parents('li').remove();
      }
      userNotification(data);
    },'json');
  })
  function ticketDate(item){
    document.domain = window.location.host;
    $('.cssload-loader').show();
    // $('.wrap_hall_map').html('');
    $('.item_calendar_slide').removeClass('orange');
    if($(item).hasClass('next_step')){
      $('.item_calendar_slide').eq(0).addClass('orange');
      $('.event-dates').removeClass('hidden');
    }else{
      $(item).parent().addClass('orange');
    }
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/Date',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        ev:ev,
        id:$(item).attr('data-id'),
        iframe:iframe
        // id:$('.ticket_date_select').val(),
      },
    }).done(function(data) {
      setStep(1);
      $('.cssload-loader').hide();
      userNotification(data);
      $('.wrap_hall_map').html(data.html);
      $("html, body").animate({ scrollTop: $('.wrap_hall_map').offset().top - 150 }, 500);
    },'json');
  }
  function addSeat(item,qt){
    if(!qt){
      qt = 1;
    }
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/addSeat',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        ev:ev,
        iframe:iframe,
        id:$(item).attr('data-id'),
        prc:$(item).attr('data-price'),
        dt:$(item).attr('data-date'),
        qt:qt
      },
    }).done(function(data) {
      $('.total_price span').html(data.total);
      if(data.success){
        $('.you_choosed').html(data.html);
        if(data.remove){
          $(item).removeClass('selected-seat');
        }else{
          if($(item).attr('data-id') != -1){
            $(item).addClass('selected-seat');
          }
        }
      }
      userNotification(data);
    },'json');
  }


  // *******************************************************************
  $('body').on('click','[data-action="payment-info"]', function(event) {
    document.domain = window.location.host;
    event.preventDefault();
    item = this;

    // alert(si+"-"+cli+"-"+ev+"  paiment info");
    $('.cssload-loader').show();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/paymentInfo',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        ev:ev,
        iframe:iframe
      },
    }).done(function(data) {
      $('.cssload-loader').hide();
      if(data.success){
        setStep(2);
        $('.wrap_hall_map').html(data.html);
        $('.event-dates').addClass('hidden');
        $("html, body").animate({ scrollTop: $('.wrap_hall_map').offset().top - 150 }, 500);
      }
      userNotification(data);
    },'json');
  })
  $('body').on('click','[data-action="payment-end"]', function(event) {
    document.domain = window.location.host;
    event.preventDefault();
    item = this;
    $('.cssload-loader').show();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/PaymentEnd',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        ev:$('#evid').val(),
        type: $('.payment_method').find('input').val(),
        tid:$('#tid').val(),
        juridic:$('#user-payment-juridic-form').serialize(),
        rf: getCookie('rf'),
        tfb: $('#take-from-balance').prop('checked') ? 1 : 0
      },
    }).done(function(data) {
      $('.cssload-loader').hide();
      if(data.success){
        if(data.redirect === false){
          $('.wrap_hall_map').html(data.html);
          $("html, body").animate({ scrollTop: $('.wrap_hall_map').offset().top - 150 }, 500);
        }else{
          ga('require', 'ec');
          $.each(data.tickets,function(i){
            ga('ec:addProduct',
              {
                'id': data.tickets[i].id,
                'name': data.event_title + '('+data.event_date+')',
                // 'sku': 'DD23444',
                'category': data.event_title,
                'variant': data.event_title + ' - '+data.tickets[i].price + ' Lei',
                'price': data.tickets[i].price,
                'quantity': data.tickets[i].count
              });
          })
          ga('ec:setAction', 'purchase', {
            'id': data.order_id,
            'affiliation': 'iticket.md',
            'revenue': data.order_total,
            // 'shipping': 5,
            // 'tax': 1.29
          });
          ga('send', 'pageview');
          if(data.trans_id){
            $('#trans_id input').val(data.trans_id);
            $('#trans_id').submit();
          }else{
            window.location.href = data.redirect;
          }
        }
      }
      userNotification(data);
    },'json');
  })



  $('body').on('click','[data-action="payment-method"]', function(event) {
    document.domain = window.location.host;
    event.preventDefault();
    var item = this;
    var itemEv = event;

    // alert(si+"-"+cli+"-"+ev+" paiment method");

    // alert($(item).parent().parent().parent().serialize());
    // console.log($(item).parent().parent().parent());


    $('.cssload-loader').show();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/PaymentMethod',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        ev:ev,
        info: $(item).parents('form').serialize(),
        iframe:iframe
      },
    }).done(function(data) {
      if(data.redirect && data.success && iframe){
        LoadSeats();
        window.open(data.redirect, '_parent');
      }else{
        $('.cssload-loader').hide();
        if(data.success){
          setStep(3);
          $('.wrap_hall_map').html(data.html);
          $("html, body").animate({ scrollTop: $('.wrap_hall_map').offset().top - 150 }, 500);
        }
        userNotification(data);
      }
    },'json');
  });
  // select payment method from my account
  $('body').on('click','[data-action="payment-method-account"]', function(event) {
    document.domain = window.location.host;
    event.preventDefault();
    var item = this;
    $('#byTicket').on('hide.bs.modal', function (e) {
      $('#byTicket .modal-body .content').html('');
    });
    $('.cssload-loader').show();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/ProfilePay',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        tid:$(item).attr('data-id'),
        ev:$(item).attr('data-ev'),
        info: $(item).parent().parent().parent().serialize()
      }
    }).done(function(data) {
      $('.cssload-loader').hide();
      if(data.success){
        $('#byTicket .modal-title').html(data.title);
        $('#byTicket .modal-body .content').html(data.html);
      }
      userNotification(data);
    },'json');
  }) ;

  // payment end account
  $('body').on('click','[data-action="payment-end-account"]', function(event) {
    document.domain = window.location.host;
    event.preventDefault();
    item = this;
    ev = $(this).attr('data-id');
    $('.cssload-loader').show();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/PaymentEndAccount',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        booking:$(this).attr('data-id-booking'),
        ev:ev,
        type: $('.payment_method').find('input').val()
      },
    }).done(function(data) {
      $('.cssload-loader').hide();
      if(data.success){
        if(data.redirect === false){
          $('.wrap_hall_map').html(data.html);
          $("html, body").animate({ scrollTop: $('.wrap_hall_map').offset().top - 150 }, 500);
        }else{
          if(data.trans_id){
            $('#trans_id input').val(data.trans_id);
            $('#trans_id').submit();
          }else{
            window.location.href = data.redirect;
          }
        }
      }
      userNotification(data);
    },'json');
  });


  $('body').on('click','[data-action="payment-invoice"]', function(event) {
    $('.cssload-loader').show();
    item = this;
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/invoice',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        ev:ev
      },
    }).done(function(data) {
      $('.cssload-loader').hide();
      if(data.success){
        $('.wrap_hall_map').html(data.html);
        $("html, body").animate({ scrollTop: $('.wrap_hall_map').offset().top - 150 }, 500);
      }
    },'json');
  });


  $('body').on('click','[data-action="change-method"]', function(event) {
    item = this;

    $(this).parent().find('div').removeClass('active');
    $(this).addClass('active');
    $(this).parent().find('input').val($(this).attr('data-type'));

    if($(item).attr('data-type') == 'invoice'){
      $('.next_step[name=next]').attr('data-action','payment-invoice');
    }else{
      $('.next_step[name=next]').attr('data-action','payment-end');
    }

    // open terminal

    document.domain = window.location.host;
    item = this;
    $('.cssload-loader').show();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.'+window.location.host+'/booking/calculateTax',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        ev:$(item).attr('data-ev'),
        type: $('.payment_method').find('input').val(),
        tid:$('#tid').val(),
        tfb: $('#take-from-balance').prop('checked') ? 1 : 0
      },
    }).done(function(data) {
      $('.cssload-loader').hide();
      if(data.success){
        $('#tab_terminal').hide();
        $('#tab_delivery').hide();
        if($('.payment_method').find('input').val() == 'terminal'){
          $('#tab_terminal').show();
        }else if($('.payment_method').find('input').val() == 'delivery'){
          $('#tab_delivery').show();
        }
        $('.your_tax span').html(data.tax);
        if(parseInt(data.tax) > 0){
          $('.your_tax').removeClass('hidden')
        }else{
          $('.your_tax').addClass('hidden')
        }
        $('.your_total_price span').html(data.total);
        if ($('.payment_method').find('input').val() == 'delivery') {
          $('.your_balance').addClass('hidden')
        } else {
          $('.your_balance').removeClass('hidden')
        }
      }
    },'json');
  })
})
// *********************************************************************
function setStep(step){
  $('.ticket_order_step div').removeClass('active');
  $('.ticket_order_step div').eq(step-1).addClass('active');
}
function userNotification(data){
  PNotify.removeAll();
  if(data.success === true){
    new PNotify({
      title: data.message,
      text: '',
      type: 'success',
    });
  }else if(data.success === false){
    new PNotify({
      title: data.message,
      text: '',
      type: 'error',
    });
  }else if(data.success === 'info'){
    new PNotify({
      title: data.message,
      text: '',
      type: 'info',
    });
  }
}
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}


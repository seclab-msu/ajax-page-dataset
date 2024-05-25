/**
 * 经销商400电话判断是否认证
 * 点击后本地localStorage缓存
 * xu.qiang
 * 2018.09.04
 */
	var localDealers = localStorage.getItem('dealers') !=null?localStorage.getItem('dealers').split(','):[];

	// 1.初始化页面经销商号码状态
	checkDealer();

	//2.点击同意协议显示电话号码事件
	$('body').on('click', '.btn_phone',function(event) {
		event.preventDefault();
		var $self = $(this),
			dealerId = $self.closest('.tel').attr('data-did');

		if(localDealers.indexOf(dealerId) === -1){
			localDealers.push(dealerId);
			localStorage.setItem('dealers',localDealers);
			$self.hide().siblings('em').show();
		}
	});

	// 通用检查函数,初始化经销商小号状态
	function checkDealer(){
		if($('.tel').length>0){
			$('.tel').each(function(index, el) {

				localDealers.indexOf($(this).attr('data-did')) != -1 ? $(this).find('.btn_phone').hide().siblings('em').show():false;
				
			});

		}
	}

	//添加数组IndexOf方法==>IE8兼容性
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(elt /*, from*/ ) {
			var len = this.length >>> 0;

			var from = Number(arguments[1]) || 0;
			from = (from < 0) ?
				Math.ceil(from) :
				Math.floor(from);
			if (from < 0)
				from += len;

			for (; from < len; from++) {
				if (from in this && this[from] === elt)
					return from;
			}
			return -1;
		};
	}
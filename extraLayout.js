/**
 * @preserve
 * jquery.extraLayout 1.0.0
 * $Date: 2017-03-25
 * $auth: fukun
 * $email: heshi_fk@163.com
 * notices:
   el是需要布局的最外层div，将div子节点中，需要布局的div中，class里面加上extra-layout
 */
;(function ($) {
	jQuery.extraLayout = function(el, config){		
		var opts = $.extend({}, jQuery.extraLayout.defaults, config);
		this.version = "1.0.0";
		this.el = el;
		if ($(el).length > 0) {
			var totals = 0;
			if (opts.method == "row") {			
				for(var i=0;i<opts.nums;i++){
					if(!opts.widths[i] || opts.widths[i] < 0){
						opts.widths[i] = (100 - totals)/(opts.nums - i);						
					}
					totals += opts.widths[i];					
				}				
			} else if (opts.method == "column") {
				for(var i=0;i<opts.nums;i++){
					if(!opts.heights[i] || opts.heights[i] < 0){
						opts.heights[i] = (100 - totals)/(opts.nums - i);						
					}
					totals += opts.heights[i];
				}
			}
			$.extraLayout._init(el,opts);
		}
	};
	jQuery.extend(jQuery.extraLayout,{	
		_init : function(el,opts){			
			this._calculateLayout(el,opts);
		},
		
		/**
		  *计算布局宽、高
		  */
		_calculateLayout:function(el,opts){
			var objMe = this;			
			if (opts.method == "row") {
				$(el).children(".extra-layout").css("float","left");
				$(el).css("overflow","hidden");
				this._calculateLRLayout(el,opts);
				this._resizeLayoutRow(el,opts);
				if(opts.resize && opts.resize){
					$(window).resize(function(){
						objMe._resizeLayoutRow(el,opts);
					});
				}				
			} else if (opts.method == "column") {				
				this._calculateTBLayout(el,opts);
				this._resizeLayoutColumn(el,opts);
				if(opts.resize && opts.resize){
					$(window).resize(function(){
						objMe._resizeLayoutColumn(el,opts);
					});
				}
			}
		},
		
		/**
		  *	计算左、右固定块的宽度
		  * 如果没有左边固定块或者右边固定块，不进行相应的计算
		  */
		_calculateLRLayout:function(el,opts){
			if (opts.leftBlock) {
				var leftBlockWidth;
				if(opts.leftBlockWidth && opts.leftBlockWidth > 0){
					if (opts.leftBlockWidth >= $(el).width()) {
						leftBlockWidth = $(el).width();
					} else {
						leftBlockWidth = opts.leftBlockWidth;
					}
				}
				$(el).children(".extra-layout").first().width(leftBlockWidth);
				if (opts.rightBlock) {
					var rightBlockWidth;
					if(opts.rightBlockWidth && opts.rightBlockWidth > 0){
						if (opts.rightBlockWidth >= $(el).width() - $(el).children(".extra-layout").first().outerWidth() ) {
							rightBlockWidth = $(el).width() - $(el).children(".extra-layout").first().outerWidth() ;
						} else {
							rightBlockWidth = opts.rightBlockWidth;
						}
					}				
					$(el).children(".extra-layout").last().width(rightBlockWidth);
				}
			} else if (opts.rightBlock){
				var rightBlockWidth;
				if(opts.rightBlockWidth && opts.rightBlockWidth > 0){
					if (opts.rightBlockWidth >= $(el).width()) {
						rightBlockWidth = $(el).width();
					} else {
						rightBlockWidth = opts.rightBlockWidth;
					}
				}				
				$(el).children(".extra-layout").last().width(rightBlockWidth);
			}
		},
		
		/**
		  *	计算上、下固定块的高度
		  * 如果没有顶部固定块或者尾部固定块，不进行相应的计算
		  */
		_calculateTBLayout:function(el,opts){
			if (opts.topBlock) {
				var leftBlockHeight;
				if(opts.topBlockHeight && opts.topBlockHeight > 0){
					if (opts.topBlockHeight >= $(el).height()) {
						topBlockHeight = $(el).height();
					} else {
						topBlockHeight = opts.topBlockHeight;
					}
				}
				$(el).children(".extra-layout").first().height(topBlockHeight);
				if (opts.bottomBlock){
					var bottomBlockHeight;
					if(opts.bottomBlockHeight && opts.bottomBlockHeight > 0){
						if (opts.bottomBlockHeight >= $(el).height() - $(el).children(".extra-layout").first().outerHeight() ) {
							bottomBlockHeight = $(el).height() - $(el).children(".extra-layout").first().outerHeight() ;
						} else {
							bottomBlockHeight = opts.bottomBlockHeight;
						}
					}				
					$(el).children(".extra-layout").last().height(bottomBlockHeight);
				}
			} else if (opts.bottomBlock) {
				var bottomBlockHeight;
				if(opts.bottomBlockHeight && opts.bottomBlockHeight > 0){
					if (opts.bottomBlockHeight >= $(el).height()) {
						bottomBlockHeight = $(el).height() ;
					} else {
						bottomBlockHeight = opts.bottomBlockHeight;
					}
				}				
				$(el).children(".extra-layout").last().height(bottomBlockHeight);
			}			
		},
		
		/**
		  *计算横向布局中间区块宽度
		  */
		_resizeLayoutRow:function(el,opts){
			var elHeight = $(el).height();
			var hasLeftBlock = 0;
			if(opts.leftBlock){
				 hasLeftBlock = 1;
			}
			for(var i=0;i<$(el).children(".extra-layout").length;i++){
				var borderHeight = $(el).children(".extra-layout").eq(i).outerHeight(true) - $(el).children(".extra-layout").eq(i).height();			
				$(el).children(".extra-layout").eq(i).height((elHeight - borderHeight) / elHeight * 100  + "%");
			}
			var parWidth = $(el).width();
			var restWidth = $(el).width() - 1;	//宽度百分比获取的值四舍五入，没想到解决方案，因此暂时建议解决
			if (opts.leftBlock) {
				restWidth = restWidth - $(el).children(".extra-layout").first().outerWidth(true);
			}
			if (opts.rightBlock) {
				restWidth = restWidth - $(el).children(".extra-layout").last().outerWidth(true);
			}
			var borderWidth = 0;
			for(var i=0;i<opts.nums;i++){
				borderWidth += $(el).children(".extra-layout").eq(i + hasLeftBlock).outerWidth(true) - $(el).children(".extra-layout").eq(i + hasLeftBlock).width();
			}
			restWidth = restWidth - borderWidth;
			for(var i=0;i<opts.nums;i++){					
				$(el).children(".extra-layout").eq(i + hasLeftBlock).width((restWidth * opts.widths[i]/parWidth) + "%");
			}
		},
		
		/**
		  *计算纵向布局中间区块高度
		  */
		_resizeLayoutColumn:function(el,opts){
			var elWidth = $(el).width();
			var hasTopBlock = 0;
			if(opts.topBlock){
				 hasTopBlock = 1;
			}
			for(var i=0;i<$(el).children(".extra-layout").length;i++){
				var borderWidth = $(el).children(".extra-layout").eq(i).outerWidth(true) - $(el).children(".extra-layout").eq(i).width();			
				$(el).children(".extra-layout").eq(i).width((elWidth - borderWidth) / elWidth * 100  + "%");				
			}
			var parHeight = $(el).height();
			var restHeight = $(el).height() - 1 ;//高度百分比获取的值四舍五入，没想到解决方案，因此暂时建议解决
			if (opts.topBlock) {
				restHeight = restHeight - $(el).children(".extra-layout").first().outerHeight(true);
			}
			if (opts.bottomBlock) {
				restHeight = restHeight - $(el).children(".extra-layout").last().outerHeight(true);
			}
			var borderHeight = 0;
			for(var i=0;i<opts.nums;i++){
				borderHeight += $(el).children(".extra-layout").eq(i + hasTopBlock).outerHeight(true) - $(el).children(".extra-layout").eq(i + hasTopBlock).height();
			}
			restHeight = restHeight - borderHeight;
			for(var i=0;i<opts.nums;i++){					
				$(el).children(".extra-layout").eq(i + hasTopBlock).height((restHeight * opts.heights[i]/parHeight) + "%");
			}
		}
	});
	jQuery.extraLayout.defaults = {
		method : "row",
		nums : 2,
		widths : [
		],
		heights : [
		],
		leftBlock : false,
		rightBlock : false,
		topBlock : false,
		bottomBlock : false,
		leftBlockWidth : 200,
		rightBlockWidth : 200,
		topBlockHeight : 150,
		bottomBlockHeight : 150,
		resize : true
	};
})( jQuery );

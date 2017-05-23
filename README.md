# extraLayout
show a special layout method

不像jqueryui的东南西北方式布局，该布局为采用一种可配置的布局方式，可以选择上下左右固定块，中间的结构采用百分比方式布局。

jQuery.extraLayout.defaults = {
		method : "row",  
		//横向布局或者纵向布局 可选参数为'row'、'column'
		nums : 2,   
		//中间块的数量
		widths : [   
		],
		 //横向布局，各个中间块所占的宽度
		heights : [  
		],
		 //纵向布局，各个中间块所占的高度
		leftBlock : false,    
		//横向布局，是否存在左边固定块
		rightBlock : false,  
		//横向布局，是否存在右边固定块
		topBlock : false,   
		//纵向布局，是否存在头部固定块
		bottomBlock : false, 
		//纵向布局，是否存在底固定块
		leftBlockWidth : 200, 
		//横向布局，左边固定块所占的宽度
		rightBlockWidth : 200,
		//横向布局，左边固定块所占的宽度
		topBlockHeight : 150, 
		//纵向布局，头部固定块所占的高度
		bottomBlockHeight : 150,
		//纵向布局，底部固定块所占的高度
		resize : true 
		//布局是否需要自动resize
	};

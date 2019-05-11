(function(){
	var requestAnimationFrame = window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(unSpeed){
			return setTimeout(unSpeed, 1000 / 60);
		}
	function Move(obj,json,time,callback){
		var objCss = obj.currentStyle || getComputedStyle(obj);
		var startAttr = {};
		var endAttr = {};
		for(var key in json){
			startAttr[key] = parseFloat(objCss[key]) || 0;
			endAttr[key] = json[key] - startAttr[key];
			if(!endAttr[key]){
				delete endAttr[key];
				delete json[key];
			}
		}
		var startTime = new Date();
		unSpeed()
		function unSpeed(){
			var proTime = (new Date() - startTime) / time;
			if(proTime >= 1){
				proTime = 1;
			} else {
				requestAnimationFrame(unSpeed);
			}
			for(var key in json){
				if(key.toLowerCase()==="opacity"){//判断有没有opacity属性
					var val = endAttr[key]*proTime + startAttr[key];
						obj.style[key] = val;
						//IE兼容opacity的写法
						obj.style.filter = "alpha(opacity="+val*100+")";
				} else {
					obj.style[key] = endAttr[key]*proTime + startAttr[key] + "px";
				}
			}
			if(proTime===1){
                callback && callback.call(obj);
            }
		}
		requestAnimationFrame(unSpeed);
	}
	window.Move = Move;
})()
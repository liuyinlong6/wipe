/*aluthor:lyl
data:2018-11-16*/
function Wipe(obj){
	this.conID = obj.id;
	this.cas = document.getElementById(this.conID);
	this.context = cas.getContext('2d');
	this._w = obj.width;
	this._h = obj.height;
	this.coverType = obj.coverType;//覆盖的是圆还是图
	// this.color = obj.color;
	this.color = obj.color || "#666";
	this.imgUrl = obj.imgUrl;
	this.backImgUrl = obj.backImgUrl;
	this.x = 0;
	this.y = 0;
	this.t = 0;
	this.radius = obj.radius;//涂抹的半径
	this.isMouseDown = false;//表示鼠标的状态是否按下
	this.callback = obj.callback; //用户自定义的函数名称
	this.percentage = obj.percentage; 
	this.percent = 0;
	this.drawMasks();
	this.adds();
}
//画布
 Wipe.prototype.drawMasks = function(){
 	if(this.coverType==="color"){
 		this.context.fillStyle = this.color;
		this.context.fillRect(0,0,this._w,this._h);
		this.context.globalCompositeOperation = "destination-out";
 	}else if(this.coverType==="img"){
 		//将imgurl指定的画布填充颜色
 		var img1 = new Image();
 		img1.src = this.imgUrl;
 		var that = this;
 		var img_w = img1.width;
 		var img_h = img1.height;
	 	img1.onload = function(){	
	 		that.context.drawImage(img1,0,0,img_w,img_h,0,0,that._w,that._h);
	 		that.context.globalCompositeOperation = "destination-out";
	 	}
 	}else{
 		return false;
 	}
}
// optimize画点画线函数
//参数：如果只有两个参数，函数功能画圆，x1,y1即圆的中心坐标
//如果传递四个参数，函数功能画线，x1,y1为起始坐标，x2,y2为结束坐标
	Wipe.prototype.optimize = function(x,y,a,b){
		this.context.save();
		this.context.beginPath();
		if(arguments.length === 2){
			this.context.arc(x,y,this.radius,0,2*Math.PI);
			this.context.fillStyle = "red";
			this.context.fill();
		}else if(arguments.length ===4){
			this.context.lineCap = "round";
			this.context.moveTo(x,y);
			this.context.lineTo(a,b);
			this.context.lineWidth = this.radius*2;
			this.context.stroke();
		}else{
			return false;
		}
		this.context.restore();
	}
//清除画布
 Wipe.prototype.clearRect = function(){
	 context.clearRect(0,0,_w,_h);
}
//获取透明点占整个画布的百分比
Wipe.prototype.getTransparencyPercent = function(){
	var imgData = this.context.getImageData(0,0,this._w,this._h);
	for (var i = 0; i < imgData.data.length; i+=4) {
		var a = imgData.data[i+3];
		if(a===0){
			this.t++;
		}
	}
	var percent = (this.t/(this._w*this._h))*100;
	// console.log("透明点的个数:"+t);
	console.log("占总面积的"+ Math.ceil(percent) +"%");
	return ((this.t/(this._w*this._h))*100).toFixed(2);
}
//点击事件监听
Wipe.prototype.adds = function(){
	//device保存设备类型，如果是移动端则为true，PC端为false
	var device = (/android|webos|iPhone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
	//打印是PC还是移动端
	// console.log(device);
	var eventdown = device ? "touchstart" : "mousedown";
	var eventMover = device ? "touchmove" : "mousemove";
	var eventEnd = device ? "touchend" : "mouseup";
	var cons = this.context;
	var that = this;
	this.cas.addEventListener(eventdown,function(evt){
	that.isMouseDown = true;
	var event = evt||window.event;
	var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    that.x = event.pageX || event.clientX + scrollX;
    that.y = event.pageY || event.clientY + scrollY;
	that.optimize(that.x,that.y);
},false);
	this.cas.addEventListener(eventMover,fn1,false);
	function fn1(evt){
		if (that.isMouseDown === true) {
			var event = evt||window.event;
			event.preventDefault();
			var a = device ? event.touches[0].clientX : event.clientX;
			var b = device ? event.touches[0].clientY : event.clientY;
			that.optimize(that.x,that.y,a,b);
			that.x = a;
			that.y = b;
		}
	}
	this.cas.addEventListener(eventEnd,function(){
	that.isMouseDown = false;
	//借用外部的处理函数
	var percent = that.getTransparencyPercent();
	//调用同名的全局函数
	that.callback.call(window,percent);
	if(percent>that.percentage){
		that.context.clearRect(0,0,that._w,that._h);
	}
},false);	
}
var cas = document.getElementById('cas');
var context = cas.getContext('2d');
var _w = cas.width;
var _h = cas.height;
var x = 0;
var y = 0;
var t = 0;
var isMouseDown = false;//表示鼠标的状态是否按下
var radius = 20;//涂抹的半径
// context.fillStyle = "#666";
// context.fillRect(0,0,375,667);
// 生成画布上遮罩，默认颜色为#666
function drawMask(context){
	context.fillStyle = "#666";
	context.fillRect(0,0,_w,_h);
	context.globalCompositeOperation = "destination-out";
}
//在画布上画半径为30的圆
function drawPoint(context,x,y){
	// console.log(x,y);
	context.save();
	context.beginPath();
	context.arc(x,y,radius,0,2*Math.PI);
	context.fillStyle = "red";
	context.fill();
	context.restore();
}
function drawLine(context,x,y,a,b){
	context.save();
	context.lineCap = "round";
	context.beginPath();
	context.moveTo(x,y);
	context.lineTo(a,b);
	context.lineWidth = radius*2;
	context.stroke();
	context.restore();
}
//在canvas画布上监听自定义事件"mousedown",调用drawPoint函数
cas.addEventListener("mousedown",function(evt){
	isMouseDown = true;
	var event = evt||window.event;
	//获取鼠标在视口的坐标，传递参数到drawPoint
	x = event.clientX;
	y = event.clientY;
	drawPoint(context,x,y);
},false);
cas.addEventListener("mousemove",fn1,false);
function fn1(evt){
		// drawPoint(context,a,b);
		if (isMouseDown === true) {
			var event = evt||window.event;
			var a = event.clientX;
			var b = event.clientY;
			drawLine(context,x,y,a,b);
			x = a;
			y = b;
		}
		//每一次的结束点变成下一次划线的开始点
	}
cas.addEventListener("mouseup",function(){
	// cas.removeEventListener("mousemove",fn1,false);
	// 还原isMouseDown为false
	isMouseDown = false;
	if(getTransparencyPercent(context)>50){
		clearRect(context);
	}
},false);
function clearRect(context){
	 context.clearRect(0,0,_w,_h);
}
function getTransparencyPercent(context){
	var imgData = context.getImageData(0,0,_w,_h);
	for (var i = 0; i < imgData.data.length; i+=4) {
		var a = imgData.data[i+3];
		if(a===0){
			t++;
		}
	}
	var percent = (t/(_w*_h))*100;
	console.log("透明点的个数:"+t);
	console.log("占总面积的"+ Math.ceil(percent) +"%");
	return ((t/(_w*_h))*100).toFixed(2);
}
window.onload = function(){
	drawMask(context);

	// drawPoint(context,x,y);
};
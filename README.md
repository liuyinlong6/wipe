## 0.0.1 ##
PC端实现涂抹擦除效果，超过50%的涂抹面积就可以查看全部，代码优化.
## ver 1.0.0 ##
1.实现对移动端支持

1.函数优化
## ver 2.0.0 ##
实现了面像对象方式
增加了参数配置
## 3.0.0 ##
1.浏览器在滚动距离下的bug修复
2.canvas画布在有偏移和绝对定位下bug修复
3.增加了回调函数。让用户可以自己完成后续功能。

使用步骤说明：
1.在HTML中添加指定id的canvas标签。
例如：` <canvas id="cas" width="375" height="667"></canvas> `
2.编辑配置文件：
| 属性名| 取值类型 | 备注 |
||
| id | 字符串 | canvas标签的id|
|coverType| 字符串 | 取值"color" 或 "img"|
|color | 字符串 | 十六进制颜色码，或rgba()。如果不指定默认值为#666|
| imgUrl | 字符串 | 前面的覆盖图片|
| backImgUrl | 字符串 | canvas背景图片|
| width | 字符串 | canvas宽，必须和canvas标签中宽一致|
| height | 字符串 | canvas高，必须和canvas标签中高度一致|
|radius | 字符串 | 涂抹笔的半径 |
| transpercent | 数值 | 透明面积占整个画布的百分比，超出此数字显示全部画布|
| callback | 函数 | 用户自定义的回调函数名称 |
||

例如：
``` 
var wipeConfig = {
	id:"cas",
	coverType:"img", //取值类型
	color:"rgb(125,136,255)",
	imgUrl:"img/wipe2.jpg",  //前面的覆盖图
	backImgUrl:"img/wipe1.jpg",//背景图片 
	width:"375",//canvas宽
	height:"667",//canvas高
	radius:"10" , //涂抹笔的半径
	percentage:60, //超出多少后显示底层图片
	callback:wipeCallback //用户自定义回调函数名称
}
 ``` 3.初始化wipe插件，并将上面一步的配置作为参数传入列如：``` 
new Wipe(wipeConfig);
 ```4.编写回调函数。用户在涂抹完成后继续操作必须写在此回调函数中。例如：``` 
function wipeCallback(percent){	if(percent>wipeCallback.percentage){		console.log("透明面积超过"+wipeConfig.percentage+",查看底图");	}}
 ```
# slider plug-in
<h3>左右滑动的自适应、多样式全能插件。多次调用传入最外层盒子ID即可。</h3>
<h4>1.根据html中的Dom结构引入图片。</h4>
<h4>2.引入css和js文件</h4>
<h4>3.调用pomeloSlider.doslide(obj)</h4>
<h5>sliderwidth:轮播图宽度，单位为像素，默认自适应全屏。</h5>
<h5>outer:最外层盒子ID，默认为"outer"</h5>
<h5>time:轮播的时间间隔，单位为毫秒，默认为3000</h5>
<h5>style:轮播样式：默认为"easeBothStrong"，其他还有"linear","easeIn","easeOut","easeBoth"等</h5>
pomeloSlider.doslide({<br>
sliderwidth:800,
outer:"outer"，<br>
time:3000,<br>
style:"easeBothStrong"<br>
});

/**
 * Created by Administrator on 2017/4/4 0004.
 */
var pomeloSlider=(function(){
    function doMove(obj,json,times,fx,fn){

        var iCur = {};

        var startTime = now();

        for(var attr in json){
            iCur[attr] = 0;
            if(attr == 'opacity'){

                iCur[attr] = Math.round(getStyle(obj,attr)*100);

            }
            else{

                iCur[attr] = parseInt(getStyle(obj,attr));

            }
        }

        clearInterval(obj.timer);
        obj.timer = setInterval(function(){

            var changeTime = now();

            var scale = 1 -  Math.max(0,startTime  -  changeTime + times)/times ; //1000 - 0  ->  1 - 0  -> 0 - 1

            for(var attr in json){

                var value = Tween[fx]( scale*times ,iCur[attr] , json[attr] - iCur[attr] , times );

                if(attr == 'opacity'){

                    obj.style.filter = 'alpha(oapcity='+value+')';
                    obj.style.opacity = value/100;

                }
                else{

                    obj.style[attr] = value + 'px';

                }

            }

            if(scale == 1){
                clearInterval(obj.timer);
                if(fn){
                    fn.call(obj);
                }
            }

        },13);


        function now(){

            return (new Date()).getTime();

        }


    }
    function isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            return true;
        else
            return false;
    }
    function getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }
        else{
            return getComputedStyle(obj,false)[attr];
        }
    }
    var Tween = {

        //t : 当前时间   b : 初始值  c : 变化值   d : 总时间
        //return : 当前的位置

        linear: function (t, b, c, d){  //匀速
            return c*t/d + b;
        },
        easeIn: function(t, b, c, d){  //加速曲线
            return c*(t/=d)*t + b;
        },
        easeOut: function(t, b, c, d){  //减速曲线
            return -c *(t/=d)*(t-2) + b;
        },
        easeBoth: function(t, b, c, d){  //加速减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInStrong: function(t, b, c, d){  //加加速曲线
            return c*(t/=d)*t*t*t + b;
        },
        easeOutStrong: function(t, b, c, d){  //减减速曲线
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t*t*t + b;
            }
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p/4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        elasticBoth: function(t, b, c, d, a, p){
            if (t === 0) {
                return b;
            }
            if ( (t /= d/2) == 2 ) {
                return b+c;
            }
            if (!p) {
                p = d*(0.3*1.5);
            }
            if ( !a || a < Math.abs(c) ) {
                a = c;
                var s = p/4;
            }
            else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            if (t < 1) {
                return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            }
            return a*Math.pow(2,-10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
        },
        backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        backOut: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 3.70158;  //回缩的距离
            }
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        backBoth: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            if ((t /= d/2 ) < 1) {
                return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            }
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
            return c - Tween['bounceOut'](d-t, 0, c, d) + b;
        },
        bounceOut: function(t, b, c, d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            }
            return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
        },
        bounceBoth: function(t, b, c, d){
            if (t < d/2) {
                return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
            }
            return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
        }
    };
    function doSlide(obj){
        console.log("欢迎使用pomeloTT的万能轮播图插件！作者博客地址:http://www.cnblogs.com/pomelott/")
        if(!obj.outer){
            obj.outer="outer";
        }
        if(!obj.style){
            obj.style="easeBothStrong";
        }
        if(!obj.time){
            obj.time=3000;
        }
        var outer=document.getElementById(obj.outer);
        var oSliderBox=outer.getElementsByClassName("sliderBox")[0];
        var oUl=oSliderBox.getElementsByClassName("slider")[0];
        var oSpotsBox=oSliderBox.getElementsByClassName("spotsBox")[0];
        var aLi=oUl.getElementsByTagName("li");
        var aA=oSpotsBox.getElementsByTagName("a");
        var iNow=0;
        var iNow2=0;
        var autoTimer=null;
        var delayTimer=null;
        if(!obj.sliderwidth){
            if(isIE()){
                obj.sliderwidth=document.body.clientWidth;
            }else{
                oSliderBox.style.width="100%";
                obj.sliderwidth=parseInt(getStyle(oSliderBox,"width"));
            }

        }
        for(var i=0;i<aLi.length;i++){
            aLi[i].style.width=obj.sliderwidth+"px";
        }
        oUl.style.width=(aLi.length*obj.sliderwidth)+"px";
        oSliderBox.style.width=obj.sliderwidth+"px";
        for(var i=0;i<aA.length;i++){
            aA[i].index=i;
            aA[i].onmousedown=function(){
                clearInterval(autoTimer);
                clearTimeout(delayTimer)
                for(var j=0;j<aA.length;j++){
                    aA[j].className=" ";
                }
                this.className="active";
                if(iNow==0&&iNow2==4&&this.index==0){
                }else{
                    doMove(oUl,{"marginLeft":-this.index*obj.sliderwidth},1000,obj.style);
                }
                this.onmouseup=function(){
                        iNow=this.index;
                        iNow2=this.index;
                    delayTimer=setTimeout(function(){
                        autoTimer=setInterval(autoMove,obj.time);
                    },1000)
                }
            }
        }
        function autoMove(){
            if(iNow==aLi.length-1){
                aLi[0].style.position="relative";
                aLi[0].style.left=aLi.length*obj.sliderwidth+"px";
                iNow=0;
            }else{
                iNow++
            }
            iNow2++;
            for(var i=0;i<aA.length;i++){
                aA[i].className=""
            }
            aA[iNow].className="active";
            doMove(oUl,{"marginLeft":-iNow2*obj.sliderwidth},1000,obj.style,function(){
                if(iNow==0){
                    aLi[0].style.position="static";
                    oUl.style.marginLeft=0;
                    iNow2=0;
                }
            });
        }
        autoTimer=setInterval(autoMove,obj.time);
    }
    return {doslide:doSlide}
})();

pomeloSlider.doslide({sliderwidth:600});
pomeloSlider.doslide({outer:"outer2"});
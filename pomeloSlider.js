/**
 * Created by pomeloTT on 2017/4/4 0004.
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
            var scale = 1 -  Math.max(0,startTime  -  changeTime + times)/times ;
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
pomeloSlider.doslide({
    sliderwidth:800,
    outer:"outer",
    time:3000,
    style:"easeBothStrong"
});
pomeloSlider.doslide({outer:"outer2"});
/**
 * Created by chenhuichao on 2016/3/22.
 */
(function () {
    /*
     在注释下方写下代码
     给按钮button绑定一个点击事件
     在事件处理函数中
     获取aqi-input输入的值，并显示在aqi-display中
     */
    window.onload = function () {
        var input = $('aqi-input');
        var commit = $('button');
        var display = $('aqi-display');
        commit.onclick = function(){
            console.log(input.value);
            if(input.value != ''){
                display.innerText = input.value;
            }
            else{
                display.innerText = '请输入值';
            }
        }
    }
    /**
     * 获取元素
     * @param element
     * @returns {Element}
     */
    function $(element){
        if(!element) return null;
        return document.getElementById(element);
    }
})();
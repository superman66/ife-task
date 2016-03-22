/**
 * Created by chenhuichao on 2016/3/22.
 */
/*任务目的

 在上一任务基础上继续JavaScript的体验
 学习JavaScript中的if判断语法，for循环语法
 学习JavaScript中的数组对象
 学习如何读取、处理数据，并动态创建、修改DOM中的内容*/
(function () {
    var aqiData = [
        ["北京", 90],
        ["上海", 50],
        ["福州", 10],
        ["广州", 50],
        ["成都", 90],
        ["西安", 100]
    ];
    /*
     在注释下方编写代码
     遍历读取aqiData中各个城市的数据
     将空气质量指数大于60的城市显示到aqi-list的列表中
     */
    var target = document.getElementById('aqi-list');
    var cities = (function () { // 利用IIFE模块化写法
        var _show = function (data, target, condition) {
            if (!data) {
                return;
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i][1] > condition) {
                    var li = document.createElement('li');
                    li.innerText = data[i][0] + ':' + data[i][1];
                    target.appendChild(li);
                }
            }
        }

        return {
            show: _show
        }
    })()

    cities.show(aqiData, target, 60);

})();

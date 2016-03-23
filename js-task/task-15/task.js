/**
 * Created by chenhuichao on 2016/3/23.
 */

/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
    var data = [];
    var list = document.querySelectorAll('#source li');
    /**
     * 考查知识点：遍历元素节点及获取元素的值
     */
    for (var i = 0, len = list.length; i < len; i++) {//遍历li以及旗下的节点
        //console.log(list[i].childNodes[1].childNodes[0].nodeValue);
        var array = new Array();
        array.push(list[i].childNodes[0].nodeValue.slice(0, 2));
        array.push(list[i].childNodes[1].childNodes[0].nodeValue);
        data.push(array);
    }
    /*
     data = [
     ["北京", 90],
     ["北京", 90]
     ……
     ]
     */
    return data;
}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    for (var i = 0; i < data.length; i++) {
        var temp = data[i];
        for (var j = i + 1; j < data.length; i++) {
            if (data[i] > data[j]) {
                data[i] = data[j];
            }
        }
        data[j] = temp;
    }
    return data;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
    var resort = document.getElementById('resort');
    for (var i = data.length; i >= 0; i--) {
        var li = document.createElement('li');
        var text = '第' + i + 1 + '名：' + data[i][0] + '<b>' + data[i][1] + '</b>';
        li.innerHTML = text;
        resort.appendChild(li);
    }
}

function btnHandle() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
}


function init() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    console.log(aqiData);
    // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
    //document.getElementById('sort-btn').onclick = btnHandle();
}

init();
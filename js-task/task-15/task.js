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
    var len = data.length,     // 数组的长度
        value,                      // 当前比较的值
        i,                          // 未排序部分的当前位置
        j;                          // 已排序部分的当前位置

    for (i = 0; i < len; i++) {
        // 储存当前位置的值
        value = data[i];
        /*
         * 当已排序部分的当前元素大于value，
         * 就将当前元素向后移一位，再将前一位与value比较
         */
        for (j = i - 1; j > -1 && data[j][1] > value[1]; j--) {
            data[j + 1] = data[j];
        }

        data[j + 1] = value;
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
    var list = document.querySelectorAll('#resort li');
    if (list.length == 0) {
        data.forEach(function (item, index) {
            console.log(index);
            var idx = data.length - index;
            var li = document.createElement('li');
            var text = '第' + idx + '名：' + item[0] + '空气质量：<b>' + item[1]+ '</b>';
            li.innerHTML = text;
            resort.appendChild(li);
        })
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
    document.getElementById('sort-btn').onclick = btnHandle;
}

init();
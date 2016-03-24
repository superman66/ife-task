/**
 * Created by chenhuichao on 2016/3/24.
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
*    "北京": 90,
*    "上海": 40
* };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input').value;
    var value = document.getElementById('aqi-value-input').value;
    var error_city = document.getElementById('error-city');
    var error_value = document.getElementById('error-value');
    if (city == '') {
        error_city.innerText = '城市不能为空'
    }
    else if (new RegExp("^[\u4e00-\u9fa5_a-zA-Z]+$").test(city)) {
        city = city.trim();
    }
    else {
        error_city.innerText = '请输入中英文字符';
    }
    if (value == '') {
        error_value.innerText = '空气质量指数不能为空';
    }
    else if (new RegExp("^[1-9]\d*$").test(value)) {
        value = value.trim();
    }
    else {
        error_value.innerText = '请输入整数';
    }
    aqiData[city] = value;
    console.log(aqiData);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
// do sth.

    renderAqiList();
}

function init() {

// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
window.onload = function () {
    addAqiData();
}

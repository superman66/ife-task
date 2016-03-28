/**
 * Created by chenhuichao on 2016/3/24.
 */
'use strict';
(function (window, undefined) {
    window.onload = function () {
        /**
         * aqiData，存储用户输入的空气指数数据
         * 示例格式：
         * aqiData = {
            *    "北京": 90,
            *    "上海": 40
            * };
         */
        var aqiData = {};
        var EventUtil = {
            addEventHandler: function (element, type, handler) {
                if (element.addEventHandler) {    //使用功能检测
                    element.addEventListener(type, handler, false);
                }
                else if (element.attachEvent) {
                    element.attachEvent('on' + type, handler)
                }
                else {
                    element['on' + type] = handler;
                }
            },

            getEvent: function (event) {
                return event ? event : window.event;
            },

            getTarget: function (event) {
                return event.target || event.srcElement;
            }
        };
        var city = document.getElementById('aqi-city-input');
        var value = document.getElementById('aqi-value-input');
        var error_city = document.getElementById('error-city');
        var error_value = document.getElementById('error-value');
        var add_btn = document.querySelector('#add-btn');
        var aqi_table = document.querySelector('#aqi-table');

        /**
         * 从用户输入中获取数据，向aqiData中增加一条数据
         * 然后渲染aqi-list列表，增加新增的数据
         */
        function addAqiData() {
            if (city.value == '') {
                error_city.innerText = '城市不能为空';
                return false;
            }
            else if (new RegExp("^[\u4e00-\u9fa5_a-zA-Z]+$").test(city.value)) {
                city.value = city.value.trim();
            }
            else {
                error_city.innerText = '请输入中英文字符';
                return false;
            }
            if (value.value == '') {
                error_value.innerText = '空气质量指数不能为空';
                return false;
            }
            else if (new RegExp("^[1-9]{1,4}\d*$").test(value.value)) {
                value.value = value.value.trim();
            }
            else {
                error_value.innerText = '请输入整数';
                return false;
            }
            aqiData[city.value] = value.value;
            console.log(aqiData);
        }

        /**
         * 渲染aqi-table表格
         */
        function renderAqiList() {
            var table = document.querySelector('#aqi-table');
            table.innerHTML = '<tr><td>城市</td><td>空气质量</td><td><button>操作</button></td></tr>';
            for (var data in aqiData) { //涉及如何遍历一个对象,以及对象如何赋值取值
                var tr_node = document.createElement('tr');
                tr_node.innerHTML = '<tr><td>' + data + '</td><td>' + aqiData[data] + '</td><td><button>删除</button></td></tr>';
                table.appendChild(tr_node);
            }
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
         *对每个按钮进行的事件委托
         * @constructor
         */
        function delEvent() {
            var event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            if (target.tagName.toLowerCase() === 'button') {
                var delNode = target.parentNode.parentNode; //获取点击按钮所在的tr
                aqi_table.deleteRow(delNode.rowIndex);  //删除table中的对应的tr
                delete aqiData[target.parentNode.parentNode.firstChild.innerHTML];
                console.log(aqiData);
            }
        }

        /**
         * 点击各个删除按钮的时候的处理逻辑
         * 获取哪个城市数据被删，删除数据，更新表格显示
         */
        function delBtnHandle() {
            // do sth.涉及到事件委托
            EventUtil.addEventHandler(aqi_table, 'click', delEvent, false);
            renderAqiList();
        }

        function init() {

            // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
            EventUtil.addEventHandler(add_btn, 'click', addBtnHandle, false);
            // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
            delBtnHandle();

        }

        init();
    };
})(window);

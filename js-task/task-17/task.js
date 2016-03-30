/**
 * Created by chc10 on 2016/3/29.
 *
 */

(function (window, undefined) {
    window.onload = function () {
        /* 数据格式演示
         var aqiSourceData = {
         "北京": {
         "2016-01-01": 10,
         "2016-01-02": 10,
         "2016-01-03": 10,
         "2016-01-04": 10
         }
         };
         */
        // 用于渲染图表的数据
        var chartData = {};

        // 记录当前页面的表单选项
        var pageState = {
            nowSelectCity: -1,
            nowGraTime: "day"
        };

        var aqiSourceData = {
            "北京": randomBuildData(500),
            "上海": randomBuildData(300),
            "广州": randomBuildData(200),
            "深圳": randomBuildData(100),
            "成都": randomBuildData(300),
            "西安": randomBuildData(500),
            "福州": randomBuildData(100),
            "厦门": randomBuildData(100),
            "沈阳": randomBuildData(500)
        };
        //获取表单元素和页面元素
        var radios_form = document.querySelector('#form-gra-time');
        var radios = document.querySelectorAll('input[type=radio');
        var city_select = document.querySelector('#city-select');
        var chart = document.querySelector('.aqi-chart-wrap');

        //事件处理工具类
        var EventUtil = {
            addEventHandler: function (element, type, handler) {
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                }
                else if (element.attachEvent) {
                    element.attachEvent('on' + type, handler, false);
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
            },

            delegateEvent: function (element, tag, type, handler) {
                this.addEventHandler(element, type, function () {
                    var event = arguments[0] || window.event,
                        target = event.target || event.srcElement;
                    if (target && target.tagName === tag.toUpperCase()) {
                        handler.call(target, event);
                    }
                });
            }

        };

        /**
         * 日期工具类
         * 日期参数格式为：xxxx-xx-xx
         * @type {{getYearWeek: DateUtil.getYearWeek}}
         */
        var DateUtil = {
            //根据日期获得周次
            getYearWeek: function (date) {
                date = date.split('-');
                var year = date[0];
                var month = date[1];
                var day = date[2];
                var d1 = new Date(year, month - 1, day), d2 = new Date(year, 0, 1),
                    d = Math.round((d1 - d2) / 86400000);
                return Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7);
            },
            getDay: function (date) {

            },
            //根据日期获得当前月份
            getMonth: function (date) {
                date = date.split('-');
                return date[1];
            }
        };

        // 以下两个函数用于随机模拟生成测试数据
        function getDateStr(dat) {
            var y = dat.getFullYear();
            var m = dat.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = dat.getDate();
            d = d < 10 ? '0' + d : d;
            return y + '-' + m + '-' + d;
        }

        function randomBuildData(seed) {
            var returnData = {};
            var dat = new Date("2016-01-01");
            var datStr = '';
            for (var i = 1; i < 92; i++) {
                datStr = getDateStr(dat);
                returnData[datStr] = Math.ceil(Math.random() * seed);
                dat.setDate(dat.getDate() + 1);
            }
            return returnData;
        }

        function colorRandom() {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        }

        function clearChartData() {
            chartData = {};
        }

        /**
         * 清除图表
         */
        function clearChart() {
            chart.innerHTML = '';
        }

        /**
         * 渲染图表
         */
        function renderChart() {
            //渲染之前先清除图表
            clearChart();
            for (var data in chartData[pageState.nowSelectCity]) {
                var line = document.createElement('div');
                line.className = 'line';
                line.style.height = chartData[pageState.nowSelectCity][data] + 'px';
                line.style.background = colorRandom();
                line.title = '日期：' + data + '指数: ' + chartData[pageState.nowSelectCity][data];
                chart.appendChild(line);
            }
        }

        /**
         * 获取raido的值
         * @param target
         * @returns {string|Number|*}
         */
        function getRadioValue(target) {
            if (target != null) {
                for (var i = 0; i < target.length; i++) {
                    if (target[i].checked) {
                        return target[i].value;
                    }
                }
            }
        }

        /**
         * 日、周、月的radio事件点击时的处理函数
         */
        function graTimeChange(event) {
            var value = getRadioValue(radios);
            console.log('选中的值：' + value);
            if (value != pageState.nowGraTime) {
                // 设置对应数据
                pageState.nowGraTime = value;
                console.log(pageState);
                // 调用图表渲染函数
                renderChart();
            }

        }

        /**
         * select发生变化时的处理函数
         */
        function citySelectChange() {
            // 确定是否选项发生了变化
            console.log('选中的值：' + city_select.value);
            if (city_select.value != pageState.nowSelectCity) {
                // 设置对应数据
                pageState.nowSelectCity = city_select.value;
                console.log(pageState);
                // 调用图表渲染函数
                renderChart();
            }
        }

        /**
         * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
         */
        function initGraTimeForm() {
            EventUtil.delegateEvent(radios_form, 'input', 'click', graTimeChange);
        }

        /**
         * 初始化城市Select下拉选择框中的选项
         */
        function initCitySelector() {
            // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
            var defaultOption = document.createElement('option');
            defaultOption.innerHTML = '<option value="-1">--请选择--</option>';
            city_select.appendChild(defaultOption);
            for (var city in aqiSourceData) { //city 是属性值
                var option = document.createElement('option');
                option.innerHTML = '<option value=' + city + '>' + city + '</option>';
                city_select.appendChild(option);
            }
            // 给select设置事件，当选项发生变化时调用函数citySelectChange
            EventUtil.addEventHandler(city_select, 'change', citySelectChange);

        }

        /**
         * 初始化图表需要的数据格式
         */
        function initAqiChartData() {
            var weekData = {};
            var monthData = {};
            //初始化日视图数据格式
            chartData[pageState.nowGraTime] = aqiSourceData;

            // 初始化周视图数据格式
            for (var city in aqiSourceData) {
                for (var date in aqiSourceData[city]) {
                    var currentWeek = DateUtil.getYearWeek(date);
                    //通过判断当前时期是否为周日来作为条件
                    console.log('第'+currentWeek+'周 :'+date);
                }
            }


            renderChart();
        }

        /**
         * 周视图数据处理
         * @param data
         */
        function weekSourceData(data) {
            var chartDataTemp = {};
            for (var date in data) {

            }
        }

        /**
         * 月视图数据处理
         * @param data
         */
        function monthSourceData(data) {
            for (var month in data) {

            }
        }

        /**
         * 初始化函数
         */
        function init() {
            initGraTimeForm();
            initCitySelector();
            initAqiChartData();
            console.log(aqiSourceData);
        }

        init();
    };
})(window);


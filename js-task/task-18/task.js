/**
 * Created by superman on 2016/4/4.
 */
(function (window, undefined) {
    window.onload = function () {
        var numArray = [];
        var inputNum = document.getElementById('num');
        //inputNum = parseInt(inputNum);
        var leftIn = document.querySelector('#left-in');
        var rightIn = document.querySelector('#right-in');
        var leftOut = document.querySelector('#left-out');
        var rightOut = document.querySelector('#right-out');
        var displayArray = document.querySelector('#array');
        var EventUtil = {
            addEvent: function (element, type, handler) {
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                }
                //兼容ie8及以下
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
                var self = this;
                self.addEvent(element, type, function () {
                    var event = self.getEvent(event),
                        target = self.getTarget(event);
                    if (target && target.tagName === tag.toUpperCase()) {
                        handler.call(target, event);
                    }
                })
            }
        };

        /**
         * 渲染数组
         */
        function renderArray() {
            displayArray.innerHTML = '';
            for (var i = 0, len = numArray.length; i < len; i++) {
                var item = document.createElement('div');
                item.className = 'item';
                item.innerText = numArray[i];
                item.setAttribute('index', i);
                displayArray.appendChild(item);
            }
        }

        /**
         * 左侧入
         * unshift()：向一个数组的开头添加一个或者多个元素，并返回新的长度
         */
        function leftInArray() {
            if (checkNum(inputNum.value)) {
                numArray.unshift(inputNum.value);
                console.log('After leftIn' + numArray);
            }
            inputNum.value = '';
            renderArray();
        }

        /**
         * 右侧入
         * push() 向一个数组的末尾添加一个或者多个元素，并返回新的长度
         */
        function rightInArray() {
            if (checkNum(inputNum.value)) {
                numArray.push(inputNum.value);
                console.log('After rightIn' + numArray);
            }
            inputNum.value = '';
            renderArray();
        }

        /**
         * 左侧出
         * shift(): 删除并返回数组的第一个元素
         */
        function leftOutArray() {
            var delItem = numArray.shift();
            alert('删除的值为：' + delItem);
            renderArray();
        }

        /**
         * 右侧出
         */
        function rightOutArray() {
            var delItem = numArray.pop();
            alert('删除的值为：' + delItem);
            renderArray();
        }

        /**
         * 检查输入的数字是否正确
         * @param num
         * @returns {boolean}
         */
        function checkNum(num) {
            var flag = false;
            if (new RegExp("^[1-9]{1,4}\d*$").test(num)) {
                flag = true;
            }
            return flag;
        }

        /**
         * 删除数组的元素
         * splice(index, howmany, item1,..., itemX)
         */
        function delItem() {
            var event = EventUtil.getEvent(event),
                target = EventUtil.getTarget(event);
            //console.log(target.getAttribute('index'));
            //获得数字对应在数组的下标
            var index = target.getAttribute('index');
            numArray.splice(index, 1);
            console.log('After del:' + numArray);
            renderArray();
        }

        function init() {
            EventUtil.addEvent(leftIn, 'click', leftInArray);
            EventUtil.addEvent(rightIn, 'click', rightInArray);
            EventUtil.addEvent(leftOut, 'click', leftOutArray);
            EventUtil.addEvent(rightOut, 'click', rightOutArray);
            EventUtil.delegateEvent(displayArray, 'div', 'click', delItem);
        }

        init();
    }
})(window);

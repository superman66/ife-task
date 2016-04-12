/**
 * Created by superman on 2015/10/22.
 */
'use strict';
angular.module('myApp.index', ['ngRoute'])
    .directive('ngFocus', function () {
        var FOCUS_CLASS = "ng-focused";
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$focused = false;
                element.bind('focus', function (evt) {
                    element.addClass(FOCUS_CLASS);
                    scope.$apply(function () {
                        ctrl.$focused = true;
                    });
                }).bind('blur', function () {
                    element.removeClass(FOCUS_CLASS);
                    scope.$apply(function () {
                        ctrl.$focused = false;
                    })
                })
            }
        }
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/index', {
                templateUrl: 'views/index.html',
                controller: 'IndexCtrl'
            })
            .when('/cart', {
                templateUrl: 'views/cart.html',
                controller: 'CartCtrl'
            })
            .when('/order', {
                templateUrl: 'views/order.html',
                controller: 'OrderCtrl'
            });
    }])
    .factory('ProductService', function () {
        var _getProduct = function (arr, id) {
            for (var i = 0; i < arr.length; i++) {
                if (id == i) {
                    return arr[i];
                }
            }
        };

        var reduceInventory = function (arr, id) {
            var product = _getProduct(arr, id);
        };
        return {
            getProduct: _getProduct
        }
    })
    .controller('IndexCtrl', ['$scope', '$cookieStore', 'ProductService', function ($scope, $cookieStore, ProductService) {
        $scope.productList = [];
        $scope.cartList = [];
        if ($cookieStore.get('cartList') != null) {
            $scope.cartList = $cookieStore.get('cartList')
        }


        var generator = function () {
            for (var i = 0; i < 20; i++) {
                var product = {
                    id: i,
                    product_name: '商品' + i,
                    desc: '这是商品' + i + '的描述',
                    imgUrl: 'static/images/cup.jpg',
                    num: '999',
                    price: '33'
                };
                $scope.productList.push(product);
            }
        };
        generator();

        $scope.addCart = function (id) {
            var product = ProductService.getProduct($scope.productList, id);
            $scope.cartList.push(product);
            $cookieStore.put('cartList', $scope.cartList);
            alert(product.product_name + '已成功添加到购物车');
        }
    }])
    .controller('CartCtrl', ['$scope', '$cookieStore', '$location', function ($scope, $cookieStore, $location) {
        $scope.cartList = $cookieStore.get('cartList');

        $scope.buy = function () {
            if ($cookieStore.get('cartList') == null) {
                alert('购物车没有商品,请返回首页购买');
            }
            else {
                $cookieStore.remove('cartList');
                $location.path('/order');
            }

        }
    }])
    .controller('OrderCtrl', [function () {

    }]);

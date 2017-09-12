'use strict';
// --------------------------------------------------
// APP.JS
// --------------------------------------------------

//
// Initialize Foundation
// --------------------------------------------------

// $(document).foundation();

//
// Custom JS
// --------------------------------------------------
$(window).bind("load", function () {
    var footer = $("footer");
    var pos = footer.position();
    var height = $(window).height();
    height = height - pos.top;
    height = height - footer.height();
    if (height > 0) {
        footer.css({
            'margin-top': height + 'px'
        });
    }
});

//
// Angular App
// --------------------------------------------------
var app = angular.module('fast-charge', ['ngRoute', 'angular-loading-bar']);

// Angular Routing
// ---------------
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : '../partials/login.html'
    })
    .when("/step-2", {
      templateUrl : "../partials/step-2.html"
    })
    .when("/volume", {
      templateUrl : "../partials/volume.html"
    });
  });
// Bind Access Token
// -----------------
app.factory('httpRequestInterceptor',function () {
    return {
        request: function (config) {
            config.headers['Authorization'] = 'Bearer Rr3R8QDjkqz5hZ1MZGE7aTqx0ajc7SmcKlr03Xxv';
            return config;
        }
    };
})
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
})

// Main Controller
// ---------------
app.controller('mainCtrl', ($scope, $http, $location, $rootScope) => {
    $(document).foundation();
    console.log('MainCtrl init');
    $rootScope.$on('cfpLoadingBar:started', () => {
        $scope.disBtn = true;
    });
    $rootScope.$on('cfpLoadingBar:loaded', () => {
        $scope.disBtn = false;
    });
    function getProducts(cid, pid, type, phone) {
        let url = `https://core.fibernet.ir/2.0/web/products/city/${cid}/provider/${pid}/types/${type}?phone=${phone}`;
        return $http.get(url);
    }
    $scope.createOrder = (pid) => {
        var popup = new Foundation.Reveal($('#recipe'));
        popup.open();
        $scope.pid = pid;
        console.log('phone : ', $scope.phone);
        console.log('mobile : ', $scope.mobile);
        console.log('pid : ', $scope.pid);
        let url = 'https://core.fibernet.ir/2.0/web/orders/withGateway';
        let data = {};
        data.mobile = $scope.mobile;
        data.rows = [
            {
                "id" : $scope.pid,
                "qty": 1,
                "params": {"land_line": $scope.phone}
            }
        ]
        $http.post(url, data).then(
            (response) => {
                $scope.order = response.data;
                console.log($scope.order);
            },
            (error) => {
                $scope.order = error.data;
                console.log($scope.order);
            }
        );
    }
    $scope.initVolume = () => {
        console.log('initVolume');
        $location.path('volume');
    }
    $scope.clickTest = () => {
        console.log('clickTest');
    }
    $scope.fetchAllAvailableProducts = (phone, mobile) => {
        $scope.phone = phone;
        $scope.mobile = mobile;
        var code = phone.toString().substring(0,2);
        switch (code) {
            case '11':
                var city = 8;
                var provider = 1;
                break;
            case '17':
                var city = 1;
                var provider = 3;
                break;
            case '83':
                var city = 29;
                var provider = 4;
                break;
        }
        getProducts(city, provider, 'ADSL', phone).then(
            (response) => {
                $scope.result = response.data;
                console.log($scope.result);
                $location.path('step-2');
            },
            (error) => {
                $scope.showError = true;
                $scope.result = error.data;
            }
        );
    }
    $scope.traffics = [
        {id: 1482, price: 12003, title: "10 کیلوبیت", vol: 1, scale: "گیگابایت", description: "4 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)" },
        {id: 1482, price: 12003, title: "حجک ۳۰ کیلوبیت", vol: 1, scale: "گیگابایت", description: "5گیگ ترافیک- طرح همسفر (باتاریخ مصرف نامحدود و انتقال مانده به سرویس بعدی و قابلیت خرید هم زمان چند بسته، فقط با 12000تومان) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)" },
        {id: 1482, price: 12003, title: "جحم ۲۰ کیلوبیت", vol: 1, scale: "گیگابایت", description: "4 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)" },
        {id: 1482, price: 12003, title: "کیلوبیت", vol: 1, scale: "گیگابایت", description: "4 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)" },
        {id: 1482, price: 12003, title: "بق ۳۰ کیلوبیت", vol: 1, scale: "گیگابایت", description: "بسته ترافیکی کوتاه مدت (فوتون) - 5گیگ ترافیک با زمان مصرف30روزه 10000 تومان -(با داشتن زمان کافی از سرویسADSL) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)" },
        {id: 1482, price: 12003, title: "کیلوبیت", vol: 1, scale: "گیگابایت", description: "4 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)" },
        {id: 1482, price: 12003, title: "کیلوبیت", vol: 1, scale: "گیگابایت", description: "4 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)" }
    ]
});
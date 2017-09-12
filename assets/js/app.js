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
var app = angular.module('fast-charge', ['ngRoute', 'angular-loading-bar', 'angular.filter']);

// Angular Routing
// ---------------
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : '../partials/login.html'
    })
    .when("/status", {
      templateUrl : "../partials/status.html"
    })
    .when("/service", {
      templateUrl : "../partials/service.html"
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
        $location.path('volume');
    }
    $scope.initService = () => {
        $location.path('service');
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
                $location.path('status');
            },
            (error) => {
                $scope.showError = true;
                $scope.result = error.data;
            }
        );
    }
    $scope.mockResult = {
        "result": "OK",
        "message": "",
        "provider": {
          "id": 1,
          "title": "mzn",
          "name": "مخابرات استان مازندران",
          "created_at": "2016-05-14 15:13:33",
          "updated_at": "2017-09-11 11:42:11",
          "enabled": true,
          "pic_url": null,
          "longitude": null,
          "latitude": null,
          "details": null,
          "start1": "00:01",
          "finish1": "23:59",
          "start2": "00:00",
          "finish2": "00:00",
          "start3": "00:00",
          "finish3": "00:00",
          "min_order_value": 10000,
          "sat": true,
          "sun": true,
          "mon": true,
          "tue": true,
          "wed": true,
          "thu": true,
          "fri": true,
          "mobile": null,
          "phone": null,
          "address": null,
          "contact_name": null,
          "weight": 0,
          "category": null,
          "avg_delivery_time": null,
          "tax": 0.09,
          "delivery_cost": 0,
          "about": "بزودی ...",
          "payable": true,
          "customer_access": true,
          "processing_fee": 5000,
          "available": true
        },
        "products": {
          "traffics": [
            {
              "id": 1482,
              "partaak_id": 12003,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 1,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک1 گیگابایت",
              "description": "1 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 30000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9496,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1482,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1483,
              "partaak_id": 12004,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 2,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 1,
              "period": 0,
              "title": " ترافیک2 گیگابایت",
              "description": "2 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 60000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9497,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1483,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1484,
              "partaak_id": 12005,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 3,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک3 گیگابایت",
              "description": "3 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 90000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9498,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1484,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1485,
              "partaak_id": 12006,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 4,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک4 گیگابایت",
              "description": "4 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 112000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9499,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1485,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1508,
              "partaak_id": 12506,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 5,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 2,
              "period": 0,
              "title": " ترافیک5 گیگابایت-طرح همسفر",
              "description": "5گیگ ترافیک- طرح همسفر (باتاریخ مصرف نامحدود و انتقال مانده به سرویس بعدی و قابلیت خرید هم زمان چند بسته، فقط با 12000تومان) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 120000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9522,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1508,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1486,
              "partaak_id": 12007,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 5,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک5 گیگابایت",
              "description": "5 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 134000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9500,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1486,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1516,
              "partaak_id": 12514,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 5,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک5گیگ-15روزه-طرح فوتون",
              "description": "بسته ترافیکی کوتاه مدت ( فوتون )- 5گیگ ترافیک با زمان مصرف15روزه 8500 تومان -(با داشتن زمان کافی از سرویسADSL) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 85000,
              "visible": true,
              "created_at": "2017-05-26 12:28:27",
              "updated_at": "2017-05-26 12:28:27",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9530,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1516,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:27",
                  "updated_at": "2017-05-26 12:28:27"
                }
              ]
            },
            {
              "id": 1517,
              "partaak_id": 12513,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 5,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک5گیگ-30روزه-طرح فوتون",
              "description": "بسته ترافیکی کوتاه مدت (فوتون) - 5گیگ ترافیک با زمان مصرف30روزه 10000 تومان -(با داشتن زمان کافی از سرویسADSL) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 100000,
              "visible": true,
              "created_at": "2017-05-26 12:28:27",
              "updated_at": "2017-05-26 12:28:27",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9531,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1517,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:27",
                  "updated_at": "2017-05-26 12:28:27"
                }
              ]
            },
            {
              "id": 1487,
              "partaak_id": 12008,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 6,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک6 گیگابایت",
              "description": "6 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 156000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9501,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1487,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1488,
              "partaak_id": 12009,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 7,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک7 گیگابایت",
              "description": "7 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 178000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9502,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1488,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1489,
              "partaak_id": 12010,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 8,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک8 گیگابایت",
              "description": "8 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 200000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9503,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1489,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1490,
              "partaak_id": 12011,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 9,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک9 گیگابایت",
              "description": "9 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 222000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9504,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1490,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1507,
              "partaak_id": 12505,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 10,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 3,
              "period": 0,
              "title": " ترافیک10 گیگابایت-طرح همسفر",
              "description": "10گیگ ترافیک- طرح همسفر (باتاریخ مصرف نامحدود و انتقال مانده به سرویس بعدی و قابلیت خرید هم زمان چند بسته، فقط با 21000تومان) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 210000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9521,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1507,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1491,
              "partaak_id": 12012,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 10,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک10 گیگابایت",
              "description": "10 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 244000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9505,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1491,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1492,
              "partaak_id": 12013,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 20,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک20 گیگابایت",
              "description": "20 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 424000,
              "visible": true,
              "created_at": "2017-05-26 12:28:25",
              "updated_at": "2017-05-26 12:28:25",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9506,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1492,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:25",
                  "updated_at": "2017-05-26 12:28:25"
                }
              ]
            },
            {
              "id": 1513,
              "partaak_id": 12511,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 25,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک25 گیگابایت-طرح یاقوت ",
              "description": "بسته ترافیک اضافه 25گیگی طرح یاقوت با  25 ساعت مکالمه رایگان سالانه درون شبکه ای تلفن ثابت   (فقط 47000تومان بدون محدودیت زمان مصرف ) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 470000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9527,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1513,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1506,
              "partaak_id": 12504,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 30,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 4,
              "period": 0,
              "title": " ترافیک30 گیگابایت-طرح همسفر",
              "description": "30گیگ ترافیک- طرح همسفر (باتاریخ مصرف نامحدود و انتقال مانده به سرویس بعدی و قابلیت خرید هم زمان چند بسته، فقط با 45000تومان) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 450000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9520,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1506,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1515,
              "partaak_id": 12282,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 30,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک30گیگ-15روزه-طرح فوتون",
              "description": "بسته ترافیکی طرح فوتون - 30گیگ ترافیک با زمان مصرف15روزه-(با داشتن زمان کافی از سرویسADSL) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 195000,
              "visible": true,
              "created_at": "2017-05-26 12:28:27",
              "updated_at": "2017-05-26 12:28:27",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9529,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1515,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:27",
                  "updated_at": "2017-05-26 12:28:27"
                }
              ]
            },
            {
              "id": 1493,
              "partaak_id": 12014,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 30,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک30 گیگابایت",
              "description": "30 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 604000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9507,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1493,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1494,
              "partaak_id": 12015,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 40,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک40 گیگابایت",
              "description": "40 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 754000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9508,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1494,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1495,
              "partaak_id": 12016,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 50,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک50 گیگابایت",
              "description": "50 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 904000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9509,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1495,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1512,
              "partaak_id": 12510,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 50,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک50 گیگابایت-طرح یاقوت ",
              "description": "بسته ترافیک اضافه 50گیگی طرح یاقوت با  50 ساعت مکالمه رایگان سالانه درون شبکه ای تلفن ثابت (فقط 87000تومان بدون محدودیت زمان مصرف ) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 870000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9526,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1512,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1511,
              "partaak_id": 12509,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 60,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 5,
              "period": 0,
              "title": " ترافیک60 گیگابایت-طرح همسفر",
              "description": "60گیگ ترافیک- طرح همسفر (باتاریخ مصرف نامحدود و انتقال مانده به سرویس بعدی و قابلیت خرید هم زمان چند بسته، فقط با 80000تومان) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 800000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9525,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1511,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1496,
              "partaak_id": 12017,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 60,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک60 گیگابایت",
              "description": "60 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 1054000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9510,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1496,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1497,
              "partaak_id": 12018,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 70,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک70 گیگابایت",
              "description": "70 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 1204000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9511,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1497,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1498,
              "partaak_id": 12019,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 80,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک80 گیگابایت",
              "description": "80 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 1354000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9512,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1498,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1499,
              "partaak_id": 12020,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 90,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک90 گیگابایت",
              "description": "90 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 1504000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9513,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1499,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1500,
              "partaak_id": 12021,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 100,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک100 گیگابایت",
              "description": "100 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 1654000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9514,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1500,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1514,
              "partaak_id": 12512,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 100,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک100 گیگابایت-طرح یاقوت ",
              "description": "بسته ترافیک اضافه 100گیگی طرح یاقوت با  100ساعت مکالمه رایگان سالانه درون  شبکه ای تلفن ثابت (فقط 147000تومان بدون محدودیت زمان مصرف ) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 1470000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9528,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1514,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1510,
              "partaak_id": 12508,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 120,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک120 گیگابایت-طرح همسفر",
              "description": "120گیگ ترافیک- طرح همسفر (باتاریخ مصرف نامحدود و انتقال مانده به سرویس بعدی و قابلیت خرید هم زمان چند بسته، فقط با 150000تومان) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 1500000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9524,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1510,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1502,
              "partaak_id": 12155,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 200,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک200 گیگابایت",
              "description": "200گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 3154000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9516,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1502,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1509,
              "partaak_id": 12507,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 300,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک300 گیگابایت- طرح همسفر",
              "description": "300گیگ ترافیک- طرح همسفر (باتاریخ مصرف نامحدود و انتقال مانده به سرویس بعدی و قابلیت خرید هم زمان چند بسته، فقط با 300000تومان) (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 3000000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9523,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1509,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1503,
              "partaak_id": 12179,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 300,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک300 گیگابایت",
              "description": "300گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 4654000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9517,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1503,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1504,
              "partaak_id": 12180,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 400,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک400 گیگابایت",
              "description": "400گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 6154000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9518,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1504,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            },
            {
              "id": 1501,
              "partaak_id": 12154,
              "rate": 0,
              "rate_scale": "کیلوبیت",
              "vol": 1000,
              "scale": "گیگابایت",
              "category": 1,
              "ussd_order": 0,
              "period": 0,
              "title": " ترافیک1000 گیگابایت",
              "description": "1000 گیگ ترافیک عمومی پیش پرداخت (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 15154000,
              "visible": true,
              "created_at": "2017-05-26 12:28:26",
              "updated_at": "2017-05-26 12:28:26",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9515,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1501,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-26 12:28:26",
                  "updated_at": "2017-05-26 12:28:26"
                }
              ]
            }
          ],
          "services": [
            {
              "id": 1383,
              "partaak_id": 11753,
              "rate": 256,
              "rate_scale": "کیلوبیت",
              "vol": 6,
              "scale": "گیگابایت",
              "category": 2,
              "ussd_order": 0,
              "period": 12,
              "title": "سرویس 256 کیلوبایت 12 ماهه ترافیک6 گیگابایت",
              "description": "کمپین تابستان 92-اینترنت یک ساله سرعت 256 کیلوبیت حجم ماهیانه 4 گیگابایت + م نیم (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 0,
              "visible": true,
              "created_at": "2017-05-25 16:39:46",
              "updated_at": "2017-05-25 16:39:46",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9397,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1383,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-25 16:39:46",
                  "updated_at": "2017-05-25 16:39:46"
                }
              ]
            },
            {
              "id": 1384,
              "partaak_id": 11772,
              "rate": 512,
              "rate_scale": "کیلوبیت",
              "vol": 6,
              "scale": "گیگابایت",
              "category": 2,
              "ussd_order": 0,
              "period": 12,
              "title": "سرویس 512 کیلوبایت 12 ماهه ترافیک6 گیگابایت",
              "description": "کمپین تابستان 92-اینترنت یک ساله سرعت 512 کیلوبیت حجم ماهیانه 4 گیگ + م نیم (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 0,
              "visible": true,
              "created_at": "2017-05-25 16:39:46",
              "updated_at": "2017-05-25 16:39:46",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9398,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1384,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-25 16:39:46",
                  "updated_at": "2017-05-25 16:39:46"
                }
              ]
            },
            {
              "id": 1385,
              "partaak_id": 11476,
              "rate": 1024,
              "rate_scale": "کیلوبیت",
              "vol": 8,
              "scale": "گیگابایت",
              "category": 2,
              "ussd_order": 0,
              "period": 12,
              "title": "سرویس 1024 کیلوبایت 12 ماهه ترافیک8 گیگابایت",
              "description": "کمپین تابستان 92 - اینترنت یک ساله سرعت 1 مگابیت حجم ماهیانه 4 گیگابایت + م (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 0,
              "visible": true,
              "created_at": "2017-05-25 16:39:46",
              "updated_at": "2017-05-25 16:39:46",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9399,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1385,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-25 16:39:46",
                  "updated_at": "2017-05-25 16:39:46"
                }
              ]
            },
            {
              "id": 1386,
              "partaak_id": 11605,
              "rate": 1024,
              "rate_scale": "کیلوبیت",
              "vol": 12,
              "scale": "گیگابایت",
              "category": 2,
              "ussd_order": 0,
              "period": 12,
              "title": "سرویس 1024 کیلوبایت 12 ماهه ترافیک12 گیگابایت",
              "description": "کمپین تابستان 92-اینترنت یک ساله سرعت 1 مگابیت حجم ماهیانه 8 گیگابایت + م (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 0,
              "visible": true,
              "created_at": "2017-05-25 16:39:46",
              "updated_at": "2017-05-25 16:39:46",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9400,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1386,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-25 16:39:46",
                  "updated_at": "2017-05-25 16:39:46"
                }
              ]
            },
            {
              "id": 1387,
              "partaak_id": 11633,
              "rate": 1024,
              "rate_scale": "کیلوبیت",
              "vol": 4,
              "scale": "گیگابایت",
              "category": 2,
              "ussd_order": 0,
              "period": 12,
              "title": "سرویس 1024 کیلوبایت 12 ماهه ترافیک4 گیگابایت",
              "description": "کمپین تابستان 92-اینترنت یک ساله سرعت 1 مگابیت حجم ماهیانه 2 گیگابایت + م ن (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 0,
              "visible": true,
              "created_at": "2017-05-25 16:39:46",
              "updated_at": "2017-05-25 16:39:46",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9401,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1387,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-25 16:39:46",
                  "updated_at": "2017-05-25 16:39:46"
                }
              ]
            },
            {
              "id": 1388,
              "partaak_id": 11560,
              "rate": 2048,
              "rate_scale": "کیلوبیت",
              "vol": 6,
              "scale": "گیگابایت",
              "category": 2,
              "ussd_order": 0,
              "period": 12,
              "title": "سرویس 2048 کیلوبایت 12 ماهه ترافیک6 گیگابایت",
              "description": "کمپین تابستان 92-اینترنت یک ساله سرعت 2 مگابیت حجم ماهیانه 2 گیگابایت + م (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 0,
              "visible": true,
              "created_at": "2017-05-25 16:39:46",
              "updated_at": "2017-05-25 16:39:46",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9402,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1388,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-25 16:39:46",
                  "updated_at": "2017-05-25 16:39:46"
                }
              ]
            },
            {
              "id": 1389,
              "partaak_id": 11582,
              "rate": 2048,
              "rate_scale": "کیلوبیت",
              "vol": 8,
              "scale": "گیگابایت",
              "category": 2,
              "ussd_order": 0,
              "period": 12,
              "title": "سرویس 2048 کیلوبایت 12 ماهه ترافیک8 گیگابایت",
              "description": "کمپین تابستان 92-اینترنت یک ساله سرعت 2 مگابیت حجم ماهیانه 4 گیگابایت + م (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 0,
              "visible": true,
              "created_at": "2017-05-25 16:39:46",
              "updated_at": "2017-05-25 16:39:46",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9403,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1389,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-25 16:39:46",
                  "updated_at": "2017-05-25 16:39:46"
                }
              ]
            },
            {
              "id": 1390,
              "partaak_id": 11656,
              "rate": 2048,
              "rate_scale": "کیلوبیت",
              "vol": 12,
              "scale": "گیگابایت",
              "category": 2,
              "ussd_order": 0,
              "period": 12,
              "title": "سرویس 2048 کیلوبایت 12 ماهه ترافیک12 گیگابایت",
              "description": "کمپین تابستان 92-اینترنت یک ساله سرعت 2 مگابیت حجم ماهیانه 8 گیگابایت + م (به مبلغ نهایی 5000 ﷼ کارمزد تراکنش بانکی افزوده می‌شود)",
              "price": 0,
              "visible": true,
              "created_at": "2017-05-25 16:39:46",
              "updated_at": "2017-05-25 16:39:46",
              "enabled": true,
              "recommended": false,
              "products": [
                {
                  "id": 9404,
                  "product_type_id": 1,
                  "provider_id": 1,
                  "entity_id": 1390,
                  "entity_type": "App\\PartaakProduct",
                  "created_at": "2017-05-25 16:39:46",
                  "updated_at": "2017-05-25 16:39:46"
                }
              ]
            }
          ],
          "defaultService": 1385,
          "current": {
            "id": 1385,
            "partaak_id": 11476,
            "rate": 1024,
            "rate_scale": "کیلوبیت",
            "vol": 8,
            "scale": "گیگابایت",
            "category": 2,
            "ussd_order": 0,
            "period": 12,
            "title": "سرویس 1024 کیلوبایت 12 ماهه ترافیک8 گیگابایت",
            "description": "کمپین تابستان 92 - اینترنت یک ساله سرعت 1 مگابیت حجم ماهیانه 4 گیگابایت + م",
            "price": 0,
            "visible": true,
            "created_at": "2017-05-25 16:39:46",
            "updated_at": "2017-05-25 16:39:46",
            "enabled": true,
            "recommended": false,
            "products": [
              {
                "id": 9399,
                "product_type_id": 1,
                "provider_id": 1,
                "entity_id": 1385,
                "entity_type": "App\\PartaakProduct",
                "created_at": "2017-05-25 16:39:46",
                "updated_at": "2017-05-25 16:39:46"
              }
            ]
          },
          "account": {
            "customerid": "705434",
            "name": "مهران عصائیان",
            "fname": null,
            "lname": null,
            "adsltel": "1155240551",
            "mobile": "09399786115",
            "email": "mehranasaeian@gmail.com",
            "codemeli": "2270066030",
            "codeposty": "4476635565",
            "address": "رامسر",
            "cityname": "رامسر",
            "mdfname": "کتالم(بهشتی)",
            "status": "بهره برداری",
            "statusdate": "2016-11-02 00:15:04",
            "regdate": "2013-10-28 10:31:00",
            "servicename": "کمپین تابستان 92 - اینترنت یک ساله سرعت 1 مگابیت حجم ماهیانه 4 گیگابایت + م",
            "serviceid": "11476",
            "servicetype": "POST",
            "totalcredit": "8192",
            "totalmah": "12",
            "totaldays": "365",
            "remaindays": "51",
            "username": "1155240551",
            "password": "540551",
            "group": "Mazandaran-1024K-Yekparche",
            "remaincredit": 1176.1775054764,
            "deposit": 0,
            "exp_date": "2017-11-02 00:15:00",
            "online": true,
            "lock": null
          }
        },
        "gateways": [
          {
            "id": 36,
            "title": "بانک رفاه",
            "fallback": false,
            "class_name": "App\\SamanKishPG",
            "enabled": true,
            "created_at": "2017-03-14 10:59:24",
            "updated_at": "2017-03-14 10:59:24",
            "visible": true,
            "description": "بانک رفاه",
            "logo": null,
            "wallet_register": true,
            "type": 1,
            "auto_ipg": true,
            "pivot": {
              "product_class_id": 1,
              "payment_gateway_id": 36
            }
          }
        ]
      };
});
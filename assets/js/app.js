'use strict';
// --------------------------------------------------
// APP.JS
// --------------------------------------------------

//
// Initialize Foundation
// --------------------------------------------------

$(document).foundation();

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
      templateUrl : 'login.html',
      controller : 'mainCtrl'
    })
    .when("/step-2", {
      templateUrl : "step-2.html",
      controller : 'mainCtrl'
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
app.controller('mainCtrl', ($scope, $http, $location) => {
    function getProducts(cid, pid, type, phone) {
        let url = `https://core.fibernet.ir/2.0/web/products/city/${cid}/provider/${pid}/types/${type}?phone=${phone}`;
        return $http.get(url);
    }
    $scope.fetchAllAvailableProducts = (phone, mobile) => {
        var code = phone.toString().substring(0,2);
        switch (code){
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
                console.log('SUCCESS : ', response);
                $location.path('step-2');
            },
            (error) => {
                console.log('ERROR : ', error);
            }
        );
    }
});
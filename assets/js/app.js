'use strict';
// --------------------------------------------------
// APP.JS
// --------------------------------------------------
$(document).foundation();
//
// Initialize Foundation
// --------------------------------------------------

// $(document).foundation();

//
// Custom JS
// --------------------------------------------------
$("#ios-btn").click(() => {
  $("#ios-btn").css("display", "none");
  $("#ios-loading").css("display", "block");
  var contactField = $( "#ios-contact" ).val();
  $.post( "https://getsimpleform.com/messages?form_api_token=7e18a0a7adda33f7f50e8fb90736fabb", { 'contact':  contactField} )
    .done(function(data){
      $("#ios-loading").css("display", "none");
      $("#ios-done").css("display", "block");
    });
});
//
// Angular App
// --------------------------------------------------
var app = angular.module('fast-charge', ['ngRoute', 'angular-loading-bar', 'angular.filter', 'ngMessages']);

// Angular Routing
// ---------------
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "../partials/login.html"
    })
    .when("/status", {
      templateUrl : "../partials/status.html"
    })
    .when("/service", {
      templateUrl : "../partials/service.html"
    })
    .when("/callback", {
      templateUrl : "../partials/callback.html"
    })
    .when("/quota", {
      templateUrl : "../partials/quota.html"
    });
  });
// Bind Access Token
// -----------------
app.factory('httpRequestInterceptor',function () {
    return {
        request: function (config) {
            config.headers['Authorization'] = 'Bearer XPTcfDHnrf72eCROEwzOsLigC5D3AD4EuwfwC5cf';
            return config;
        }
    };
})
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
})

// Add humanRate filter
// --------------------
app.filter('humanRate', function() {
    return function(input) {
        var out = "";
        if(input < 1024) {
            out = "512 کیلوبیت";
        } else {
            out = input/1024 + " مگابیت";
        }
      return out;
    };
  })


// Main Controller
// ---------------
app.controller('mainCtrl', ($scope, $http, $location, $rootScope, $routeParams) => {
    $(document).foundation();
    $scope.$on('$routeChangeSuccess', (angularEvent, next, current) => {
      ga('set', 'page', next.$$route.originalPath);
      ga('send', 'pageview');
    });
    $rootScope.$on('cfpLoadingBar:started', () => {
        $scope.disBtn = true;
    });
    $rootScope.$on('cfpLoadingBar:loaded', () => {
        $scope.disBtn = false;
    });
    function getProducts(phone) {
        let url = `https://core.fibernet.ir/fast/products/${phone}`;
        return $http.get(url);
    }
    $scope.createOrder = (pid) => {
        var popup = new Foundation.Reveal($('#recipe'));
        popup.open();
        $scope.pid = pid;
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
            },
            (error) => {
                $scope.order = error.data;
            }
        );
    }
    $scope.routeParams = $routeParams;
    $scope.initStatus = () => {
        $location.path('status');
    }
    $scope.initQuota = () => {
        $location.path('quota');
    }
    $scope.initService = () => {
        $location.path('service');
    }
    $scope.fetchAllAvailableProducts = (phone, mobile) => {
      if(typeof mobile == 'undefined' || typeof phone == 'undefined'){
        $scope.showError = true;
        $scope.result = [];
        var res = {};
        res.title = 'لطفاً شماره تلفن و موبایل را وارد کنید.';
        $scope.result.push(res);
      } else {
        $scope.phone = phone;
        $scope.mobile = mobile;
        getProducts(phone).then(
            (response) => {
                $scope.result = response.data;
                $location.path('status');
            },
            (error) => {
                $scope.showError = true;
                $scope.result = error.data;
            }
        );
      }
    }
});
"use strict";

angular.module('myApp.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
         templateUrl: 'partials/home.html',
         controller: 'HomeCtrl'
      });

      $routeProvider.when('/chat', {
         templateUrl: 'partials/chat.html',
         controller: 'ChatCtrl'
      });

      $routeProvider.when('/consumer', {
          templateUrl: 'partials/consumer.html',
          controller: 'ConsumerCtrl'
      });

      $routeProvider.when('/trade', {
          templateUrl: 'partials/trade.html',
          controller: 'TradeCtrl'
      });

      $routeProvider.when('/field', {
          templateUrl: 'partials/field.html',
          controller: 'FieldCtrl'
      });

      $routeProvider.when('/consumer/detail', {
          templateUrl: 'partials/consumerDetail.html',
          controller: 'ConsumerDetailCtrl'
      });

      $routeProvider.when('/trade/detail', {
          templateUrl: 'partials/tradeDetail.html',
          controller: 'TradeDetailCtrl'
      });

      $routeProvider.when('/field/detail', {
          templateUrl: 'partials/fieldDetail.html',
          controller: 'FieldDetailCtrl'
      });

      $routeProvider.when('/account', {
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/home'});
   }]);
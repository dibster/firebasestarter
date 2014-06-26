'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      syncData('syncedValue').$bind($scope, 'syncedValue');
   }])

  .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.newMessage = null;

      // constrain number of messages by limit into syncData
      // add the array into $scope.messages
      $scope.messages = syncData('messages', 10);

      // add new messages to the list
      $scope.addMessage = function() {
         if( $scope.newMessage ) {
            $scope.messages.$add({text: $scope.newMessage});
            $scope.newMessage = null;
         }
      };
   }])

  .controller('ConsumerCtrl', ['$scope', '$location', 'syncData', function($scope, $location, syncData) {
        $scope.scanBottle = function() {

            console.log('scan bottle');
            var scan = new ScanThng({scanType: 'QRCODE', redirect: false, successCb: function( data ){
                console.log('callback Done : ' + data);
                // want to reroute to new page when successful
                // route to new page
              }, errorCb: function( data ){
                console.log('In Error : ' + data);
                // route to new page in Error
              }
            });
            scan.identify();
            setTimeout(function(){$location.path('/consumer/detail');$scope.$apply()}, 1000);

//            $location.path('/consumer/detail');


        }

   }])


  .controller('FieldCtrl', ['$scope', '$location', 'syncData', function($scope, $location, syncData) {
        $scope.scanBottle = function() {

            console.log('scan bottle');
            var scan = new ScanThng({scanType: 'QRCODE', redirect: false, successCb: function( data ){
                console.log('callback Done : ' + data);
                // want to reroute to new page when successful
                // route to new page
              }, errorCb: function( data ){
                console.log('In Error : ' + data);
                // route to new page in Error
              }
            });
            scan.identify();
            setTimeout(function(){$location.path('/field/detail');$scope.$apply()}, 1000);

//            $location.path('/consumer/detail');


        }

   }])


  .controller('TradeCtrl', ['$scope', '$location', 'syncData', function($scope, $location, syncData) {
        $scope.scanBottle = function() {

            console.log('scan bottle');
            var scan = new ScanThng({scanType: 'QRCODE', redirect: false, successCb: function( data ){
                console.log('callback Done : ' + data);
                // want to reroute to new page when successful
                // route to new page
              }, errorCb: function( data ){
                console.log('In Error : ' + data);
                // route to new page in Error
              }
            });
            scan.identify();
            setTimeout(function(){$location.path('/trade/detail');$scope.$apply()}, 1000);

//            $location.path('/consumer/detail');


        }

   }])



  .controller('DashboardCtrl', ['$scope', 'syncData', function($scope, syncData) {

   }])


  .controller('ConsumerDetailCtrl', ['$scope', 'syncData', function($scope, syncData) {

   }])

  .controller('TradeDetailCtrl', ['$scope', 'syncData', function($scope, syncData) {

   }])

  .controller('FieldDetailCtrl', ['$scope', 'syncData', function($scope, syncData) {

   }])

   .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;

      $scope.login = function(cb) {
         $scope.err = null;
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else {
            loginService.login($scope.email, $scope.pass, function(err, user) {
               $scope.err = err? err + '' : null;
               if( !err ) {
                  cb && cb(user);
               }
            });
         }
      };

      $scope.createAccount = function() {
         $scope.err = null;
         if( assertValidLoginAttempt() ) {
            loginService.createAccount($scope.email, $scope.pass, function(err, user) {
               if( err ) {
                  $scope.err = err? err + '' : null;
               }
               else {
                  // must be logged in before I can write to my profile
                  $scope.login(function() {
                     loginService.createProfile(user.uid, user.email);
                     $location.path('/account');
                  });
               }
            });
         }
      };

      function assertValidLoginAttempt() {
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else if( $scope.pass !== $scope.confirm ) {
            $scope.err = 'Passwords do not match';
         }
         return !$scope.err;
      }
   }])

   .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function($scope, loginService, syncData, $location) {
      syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

      $scope.logout = function() {
         loginService.logout();
      };

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
         loginService.changePassword(buildPwdParms());
      };

      function buildPwdParms() {
         return {
            email: $scope.auth.user.email,
            oldpass: $scope.oldpass,
            newpass: $scope.newpass,
            confirm: $scope.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.oldpass = null;
                  $scope.newpass = null;
                  $scope.confirm = null;
                  $scope.msg = 'Password updated!';
               }
            }
         }
      }

   }]);
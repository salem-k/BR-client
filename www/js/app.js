// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var battelierrecords = angular.module('starter', ['ionic','ionic.service.core','ngCordova', 'ionic.service.push'])

.run(function($ionicPlatform,$ionicPush,$rootScope) {

  $ionicPlatform.ready(function() {
 events = new Object();
//###########################################################################################
    Ionic.io();

    $ionicPush.init({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        addEvent(events, notification, function(events){
          execOperation(events, 0, function(){

          });

        });
        alert(JSON.stringify(notification));
        console.log(notification, payload);


      },
      "onRegister": function(data) {


            // this will give you a fresh user or the previously saved 'current user'
            var user = Ionic.User.current();
            // if the user doesn't have an id, you'll need to give it one.
            if (!user.id) {
              user.id = Ionic.User.anonymousId();
              // user.id = 'your-custom-user-id';
            }
            //persist the user
            user.save();
            $rootScope.token = data.token;
            alert('register');
          console.log(data.token);
      }
    });

    $ionicPush.register();
//###########################################################################################
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('login', {
          url: '/login',
          views: {
            'content': {
              templateUrl: 'templates/login.html'
            }
          }
        })
        .state('homepage', {
              url: '/homepage',
              views: {
                'content': {
                  templateUrl: 'templates/homepage.html'
                }
              }
            });
            $urlRouterProvider.otherwise('/login');
});

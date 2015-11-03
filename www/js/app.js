// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var battelierrecords = angular.module('starter', ['ionic','ionic.service.core','ngCordova', 'ionic.service.push'])

.run(function($ionicPlatform,$ionicPush,$rootScope,eventService) {

  $ionicPlatform.ready(function() {
 events = new Object();
//###########################################################################################
    Ionic.io();

    $ionicPush.init({
      "debug": true,
      "onNotification": function(notification) {
        //console.log(notification, payload);

//alert(notification.title);
console.warn(notification);
console.warn(JSON.stringify(notification));
        var str = notification.text
        if(str.substring(0, 3)  != "###"){
//        var str = "fsqfdq;2010-01-01 00:00:00;2010-01-01 00:00:00;Couleur;FF0000;fsqfdq";
        events = str.split(";")
        var eventObj = new Object();

        eventObj.id = events[0];
        eventObj.start_time = events[1];
        eventObj.end_time = events[2];
        eventObj.type = events[3];
        eventObj.content = events[4];
        eventObj.comment = events[5];

        eventService.add(eventService.all(), eventObj, function(events){
            eventService.execOperation(events, 0, function(){});
          });


        }else{
          alert(notification.title +" : "+notification.text);
        }
      },
      "onRegister": function(data) {
/*
            // this will give you a fresh user or the previously saved 'current user'
            var user = Ionic.User.current();
            // if the user doesn't have an id, you'll need to give it one.
            if (!user.id) {
              user.id = Ionic.User.anonymousId();
              // user.id = 'your-custom-user-id';
            }
            //persist the user
            user.save();

*/
            localStorage.setItem('token',data.token);

            //alert('register');
          console.log("#########"+data.token);
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

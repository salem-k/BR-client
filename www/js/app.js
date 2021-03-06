// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var appContext = angular.module('starter', ['ionic', 'ionic.service.core', 'ngCordova', 'ionic.service.push', 'ngMessages'])

.run(function($ionicPlatform, $ionicPush) {

        $ionicPlatform.ready(function() {
            window.addEventListener('native.keyboardshow', function() {
                document.body.classList.add('keyboard-open');
            });
            window.plugins.insomnia.keepAwake();

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'template/home.html',
                cache: true
            })
            .state('event', {
                url: '/event',
                templateUrl: 'template/event.html',
                cache: false,
            })

        $urlRouterProvider.otherwise("/home");
    }).filter("countdonw", function() {

        //Defining the filter function
        return function(input) {



                var result = "";

                input = input || 0;

                if (input < 0) {
                    return 0;
                } else {
                try {
                    var hours = ((input / 1000) / 60) / 60;
                    var minutes = (hours - parseInt(hours)) * 60;
                    var secondes = (minutes - parseInt(minutes)) * 60;
                    if (0 == parseInt(hours) && 0 == parseInt(minutes) && 0 == parseInt(secondes)) {
                        return 0;
                    } else {
                        result = parseInt(hours) + "h " + parseInt(minutes)+ "mn " + parseInt(secondes)+"s";
                        return result;
                    }


                } catch (e) {
                    console.error(e);
                    return input;
                }
            }
        };
    });

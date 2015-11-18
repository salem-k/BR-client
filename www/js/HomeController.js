appContext.controller("HomeController", function($scope, $state, $ionicPush, RunService, $cordovaDevice, $ionicLoading, $rootScope, $ionicPlatform, $ionicPopup) {



  var popup ;
$ionicPlatform.ready(function() {
    $ionicLoading.show({
         template: 'Loading...'
       });
    //********************
      Ionic.io();
      $ionicPush.init({
        "debug": false,
        "onNotification": function(notification) {
          console.warn(JSON.stringify(notification));
            popup =  $ionicPopup.show({
           template: '<h4 style="text-align: center;vertical-align: middle; display:block ">'+notification.text+'<h4/><br><a class="button button-full" style="font-weight: bolder;" id="bwlogin" ng-click="ok()">Ok</a>',
           scope: $scope,
           title: "Batelier Records"
          });
        },
        "onRegister": function(data) {
              var deviceToken ;
              deviceToken = $cordovaDevice.getUUID();
              localStorage.setItem('deviceId', data.token);
              localStorage.setItem('deviceToken',deviceToken);
              RunService.register(deviceToken,data.token)
                  .success(function(response,status,headers,config){
                    $ionicLoading.hide();
                  }).error(function(response) {
                    $ionicLoading.hide();
                    alert("Network Error");
                  });
        }
      });
      $ionicPush.register();
      //********************q

  });


    $scope.start = function() {
        $state.go("event");
    };
    $rootScope.cancel = function() {
        $ionicLoading.hide();
    };
    $scope.ok = function() {
        popup.close();
    };
});

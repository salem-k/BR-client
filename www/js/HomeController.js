appContext.controller("HomeController",
  function(
    $scope,
    $state,
    $ionicPush,
    RunService,
    $cordovaDevice,
    $ionicLoading,
    $rootScope,
    $ionicPlatform,
    $ionicPopup,
    $ionicModal) {

      var signupPopup ;
      var popup;
      var netErr;

     $ionicPlatform.ready(function() {

       window.currentStatePatern = $rootScope.curentState = $state.current;

        $ionicLoading.show({
            template: 'Loading...'
        });
        //********************
        Ionic.io();
        $ionicPush.init({
            "debug": false,
            "onNotification": function(notification) {
                console.warn(JSON.stringify(notification));
                popup = $ionicPopup.show({
                    template: '<h4 style="text-align: center;vertical-align: middle; display:block ">' + notification.text + '<h4/><br><a class="button button-full" style="font-weight: bolder;" id="bwlogin" ng-click="ok()">Ok</a>',
                    scope: $scope,
                    title: "Batelier Records"
                });
            },
            "onRegister": function(data) {
                var deviceToken;
                //deviceToken = $cordovaDevice.getUUID();
                localStorage.setItem('deviceId', data.token);
                localStorage.setItem('deviceToken', deviceToken);
                RunService.register(deviceToken, data.token, "", "", "")
                    .success(function(response, status, headers, config) {
                        $ionicLoading.hide();
                    }).error(function(response) {
                        $ionicLoading.hide();
                        netErr = $ionicPopup.show({
                            template: '<h4 style="text-align: center;vertical-align: middle; display:block ">Network Error <h4/><br><a class="button button-full" style="font-weight: bolder;" id="bwlogin" ng-click="ok()">Ok</a>',
                            scope: $scope,
                            title: "Batelier Records"
                        });
                    });
            }
        });
        $ionicPush.register();
        //********************
 });




    $scope.start = function() {
        $state.go("event");
    };
    $rootScope.cancel = function() {
        $ionicLoading.hide();
    };

    $scope.ok = function() {
      if ("undefined" !== typeof(popup) )
        popup.close();
        if ("undefined" !== typeof(netErr) )
        netErr.close();
    };

});

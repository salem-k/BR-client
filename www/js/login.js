battelierrecords.controller('battelierRecordsCtrl', function($scope,$http, $state) {

  $scope.login = function() {
    $http({
       method: 'POST',
       url: 'http://ec2-52-32-10-107.us-west-2.compute.amazonaws.com/app_dev.php/register/create',
       //url : 'http://localhost:8000/register/create',
       headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for ( var p in obj)
              str.push(encodeURIComponent(p) + "="
                      + encodeURIComponent(obj[p]));
            return str.join("&");
          },

       data: {
         lastName: $scope.login.lastName,
         firstName: $scope.login.firstName,
         email: $scope.login.email,
         deviceToken: $scope.token
       }
     }).then(function successCallback(response) {
          console.log('success'+JSON.stringify(response));
          $state.go('homepage');
       }, function errorCallback(response) {
          console.log('erreur '+JSON.stringify(response));
    });
  };


});

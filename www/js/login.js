battelierrecords.controller('battelierRecordsCtrl', function($scope,$http, $state,$ionicLoading,$rootScope) {

  setTimeout(function(){

  if( localStorage.getItem('email')  != null && localStorage.getItem('token') != null ){
      doLogin(localStorage.getItem('firstName'),localStorage.getItem('lastName'),localStorage.getItem('email'),localStorage.getItem('token'));
  }

  }, 3000);

  $scope.login = function() {
    lastName = $scope.login.lastName;
    firstName = $scope.login.firstName;
    email = $scope.login.email;
    token = localStorage.getItem('token');

    doLogin(firstName,lastName,email,token);

  };

function doLogin(firstName,lastName,email,token){
  $ionicLoading.show({
      template: 'Login...'
    });
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
       lastName: lastName,
       firstName: firstName,
       email: email,
       deviceToken: token
     }
   }).then(function successCallback(response) {

        localStorage.setItem('lastName',lastName);
        localStorage.setItem('firstName',firstName);
        localStorage.setItem('email',email);
        localStorage.setItem('token',token);

        console.log('success'+JSON.stringify(response));

        $ionicLoading.hide();

        $state.go('homepage');
     }, function errorCallback(response) {
       $ionicLoading.hide();
        console.log('erreur '+JSON.stringify(response));
  });
}

});

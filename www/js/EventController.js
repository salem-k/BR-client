appContext.controller("EventController", function(HomeService, $scope, $interval, $ionicLoading, $cordovaMedia, $ionicPlatform, $timeout, $window, $ionicPopup, RunService) {

    $ionicLoading.show({
       template: 'Loading...'
     });

    var soundPlaying;
    var imgDisplaying;
    var sound;
    var stop ;
    var formPopup;
    var formName ;
    $scope.isForm = false;
    $scope.isCountdown = false;

    $ionicPlatform.ready(function() {
      $scope.height = $window.innerHeight;
      $scope.width = $window.innerWidth;
      callServer();

    });

   /**
    *
    * get file from server
    */
    function callServer(){
          HomeService.getOperation().success(function(data, status, headers, config, statusText){

            $ionicLoading.hide();

            var label = data[0];
            var text = data[1];
            var image = data[4];
            var sound = data[5];
            $scope.textColor = data[2];
            $scope.bgColor = data[3];

            //COUNTDOWN
            if("COUNTDOWN" == label.toUpperCase()){

              

            }//formulaire
            else if ("FORM" == label.toUpperCase()) {

              $scope.text = "";
              $scope.show = false;
              $scope.bgColor ="#FFFFFF";

              if( null == localStorage.getItem(text.toUpperCase()) ){
                formName = text.toUpperCase();
                console.warn(text);
                $scope.eventName = text;

                $scope.alreadySigned = false;

                var firstname = localStorage.getItem("firstname");
                var lastname = localStorage.getItem("lastname");
                var email = localStorage.getItem("email");

                if ("" != firstname )
                  $scope.firstname = firstname;
                if ("" != lastname)
                  $scope.lastname = lastname;
                if ("" != email)
                  $scope.email = email;

              }else {
                $scope.eventName = localStorage.getItem(text) ;
                $scope.alreadySigned = true;


              }
              $scope.isForm = true ;

              callServer();

            }else if ("" != text && "" == image && "" != sound) {
                $scope.text = text;
                $scope.isForm = false;
                console.warn("1111111111111111111111");
                  HomeService.fileExist(sound, function(fileName) {
                    /** if file does not exist */
                    if ("404" == fileName) {
                      HomeService.downloadImg(sound, "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + sound, function(mp3URL) { //prod
                      //HomeService.downloadImg(sound, "http://ec2-52-25-133-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + sound, function(mp3URL) { //dev
                        var media = new Media(mp3URL, null, null, mediaStatusCallback);

                        var iOSPlayOptions = {
                            numberOfLoops: 2,
                            playAudioWhenScreenIsLocked: false
                        }
                        if (ionic.Platform.isIOS() && soundPlaying != mp3URL) {
                            media.play(iOSPlayOptions);

                        } else if (soundPlaying != mp3URL) {
                            media.play();
                        }
                        soundPlaying = mp3URL;
                        callServer();
                      });
                      /** if file already exist */
                    } else {
                      var media = new Media(fileName, null, null, mediaStatusCallback);

                      var iOSPlayOptions = {
                          numberOfLoops: 2,
                          playAudioWhenScreenIsLocked: false
                      }

                      if (ionic.Platform.isIOS() && soundPlaying != fileName) {
                          media.play(iOSPlayOptions);
                          soundPlaying = fileName;

                      } else if (soundPlaying != fileName) {
                          media.play();
                          soundPlaying = fileName;

                      }

                        callServer();
                    }
                  });
            } else if("" != text && "" == image && "" == sound) {
              console.warn("2222222222222222222");
              $scope.isForm = false;
              $scope.text = text;
              $scope.show = false;
              callServer();

            } else if("" == text && "" != image && "" != sound) {
              console.warn("3333333333333333");
              $scope.isForm = false;
              HomeService.fileExist(image, function(fileName) {
                  if ("404" == fileName) {
                      HomeService.downloadImg(image, "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + image, function(imgURL) { //prod
                      //HomeService.downloadImg(image, "http://ec2-52-25-133-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + image, function(imgURL) { //dev
                          if (imgDisplaying != imgURL) {
                              $scope.imgSrc = imgURL + "?" + new Date().getTime();
                              $scope.show = true;
                              $scope.text = "";
                          }

                          imgDisplaying = imgURL;

                      });
                  } else {
                      if (imgDisplaying != fileName) {
                          $scope.imgSrc = fileName + "?" + new Date().getTime();
                          $scope.show = true;
                          $scope.text = "";
                      }
                      imgDisplaying = fileName;

                  }
              });
              //######################## for sound
              HomeService.fileExist(sound, function(fileName) {
                /** if file does not exist */
                if ("404" == fileName) {
                  //HomeService.downloadImg(sound, "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + sound, function(mp3URL) { //prod
                  HomeService.downloadImg(sound, "http://ec2-52-25-133-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + sound, function(mp3URL) { //dev
                    var media = new Media(mp3URL, null, null, mediaStatusCallback);

                    var iOSPlayOptions = {
                        numberOfLoops: 2,
                        playAudioWhenScreenIsLocked: false
                    }
                    if (ionic.Platform.isIOS() && soundPlaying != mp3URL) {
                        media.play(iOSPlayOptions);

                    } else if (soundPlaying != mp3URL) {
                        media.play();
                    }
                    soundPlaying = mp3URL;
                    callServer();
                  });
                  /** if file already exist */
                } else {
                  var media = new Media(fileName, null, null, mediaStatusCallback);

                  var iOSPlayOptions = {
                      numberOfLoops: 2,
                      playAudioWhenScreenIsLocked: false
                  }

                  if (ionic.Platform.isIOS() && soundPlaying != fileName) {
                      media.play(iOSPlayOptions);
                      soundPlaying = fileName;

                  } else if (soundPlaying != fileName) {
                      media.play();
                      soundPlaying = fileName;

                  }

                    callServer();
                }
              });
            } else if("" == text && "" != image && "" == sound ) {
              console.warn("4444444444444444444444");
              $scope.isForm = false;
              HomeService.fileExist(image, function(fileName) {
                  if ("404" == fileName) {
                      HomeService.downloadImg(image, "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + image, function(imgURL) { //prod
                      //HomeService.downloadImg(image, "http://ec2-52-25-133-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + image, function(imgURL) { //dev
                          if (imgDisplaying != imgURL) {
                              $scope.imgSrc = imgURL + "?" + new Date().getTime();
                              $scope.show = true;
                          }

                          imgDisplaying = imgURL;
                         callServer();
                      });
                  } else {
                      if (imgDisplaying != fileName) {
                          $scope.imgSrc = fileName + "?" + new Date().getTime();
                          $scope.show = true;
                      }
                      imgDisplaying = fileName;
                      callServer();
                  }
              });
            } else if("" == text && "" == image && "" != sound) {
              console.warn("555555555555555555");
              $scope.isForm = false;
              HomeService.fileExist(sound, function(fileName) {
                /** if file does not exist */
                if ("404" == fileName) {
                  HomeService.downloadImg(sound, "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + sound, function(mp3URL) { //prod
                  //HomeService.downloadImg(sound, "http://ec2-52-25-133-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + sound, function(mp3URL) { //dev
                    var media = new Media(mp3URL, null, null, mediaStatusCallback);

                    var iOSPlayOptions = {
                        numberOfLoops: 2,
                        playAudioWhenScreenIsLocked: false
                    }
                    if (ionic.Platform.isIOS() && soundPlaying != mp3URL) {
                        media.play(iOSPlayOptions);

                    } else if (soundPlaying != mp3URL) {
                        media.play();
                    }
                    soundPlaying = mp3URL;
                    callServer();
                  });
                  /** if file already exist */
                } else {
                  var media = new Media(fileName, null, null, mediaStatusCallback);

                  var iOSPlayOptions = {
                      numberOfLoops: 2,
                      playAudioWhenScreenIsLocked: false
                  }

                  if (ionic.Platform.isIOS() && soundPlaying != fileName) {
                      media.play(iOSPlayOptions);
                      soundPlaying = fileName;

                  } else if (soundPlaying != fileName) {
                      media.play();
                      soundPlaying = fileName;

                  }
                }
                    callServer();
              });
            }else if("" == text && "" == image && "" == sound) {
              console.warn("666666666666666666666666");
              $scope.isForm = false;
              callServer();

            }else if("" != text && "" != image && "" != sound) {
              console.warn("777777777777");
              $scope.isForm = false;
              $scope.text = text;
              $scope.show = false;
              HomeService.fileExist(sound, function(fileName) {
                /** if file does not exist */
                if ("404" == fileName) {
                  HomeService.downloadImg(sound, "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + sound, function(mp3URL) { //prod
                  //HomeService.downloadImg(sound, "http://ec2-52-25-133-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + sound, function(mp3URL) { //dev
                    var media = new Media(mp3URL, null, null, mediaStatusCallback);

                    var iOSPlayOptions = {
                        numberOfLoops: 2,
                        playAudioWhenScreenIsLocked: false
                    }
                    if (ionic.Platform.isIOS() && soundPlaying != mp3URL) {
                        media.play(iOSPlayOptions);

                    } else if (soundPlaying != mp3URL) {
                        media.play();
                    }
                    soundPlaying = mp3URL;
                    callServer();
                  });
                  /** if file already exist */
                } else {
                  var media = new Media(fileName, null, null, mediaStatusCallback);

                  var iOSPlayOptions = {
                      numberOfLoops: 2,
                      playAudioWhenScreenIsLocked: false
                  }

                  if (ionic.Platform.isIOS() && soundPlaying != fileName) {
                      media.play(iOSPlayOptions);
                      soundPlaying = fileName;

                  } else if (soundPlaying != fileName) {
                      media.play();
                      soundPlaying = fileName;

                  }
                }
                    callServer();
              });
            }else if ("" !=text && "" != image && "" == sound) {
              console.warn("8888888888888");
              $scope.isForm = false;
              $scope.text = text;
              $scope.show = false;
              callServer();
            }

          }).error(function(data, status, headers, config, statusText){
            console.warn("--------------------------- ");
              //callServer();
          })
    }


    var mediaStatusCallback = function(status) {
        if (false) {
            $ionicLoading.show({
                template: 'Loading...'
            });
        } else {
            $ionicLoading.hide();
        }
    }

    $scope.signup = function(signupForm){

console.log(signupForm.lastname);
      $scope.submitted = true;
      console.warn(signupForm.lastname.$modelValue);
      if ( signupForm.$valid) {

        $ionicLoading.show({
           template: 'Loading...'
         });

          localStorage.setItem('lastname', signupForm.lastname.$modelValue);
          localStorage.setItem('firstname', signupForm.firstname.$modelValue);
          localStorage.setItem('email', signupForm.email.$modelValue);
          RunService.register( localStorage.getItem("deviceToken"), localStorage.getItem("deviceId"), signupForm.firstname.$modelValue, signupForm.lastname.$modelValue, signupForm.email.$modelValue)
              .success(function(response, status, headers, config) {
                  localStorage.setItem(formName,formName);
                  $scope.alreadySigned = true;
                  $ionicLoading.hide();
              }).error(function(response) {
                  $ionicLoading.hide();
                  alert("Network Error");
              });
      }else {
        formPopup = $ionicPopup.show({
            template: '<h4 style="text-align: center;vertical-align: middle; display:block ">please fill all the form ! <h4/><br><a class="button button-full" style="font-weight: bolder;" id="bwlogin" ng-click="okPopup()">Ok</a>',
            scope: $scope,
            title: "Batelier Records"
        });
      }

    };

    $scope.okPopup = function() {
        formPopup.close();
    };

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
});

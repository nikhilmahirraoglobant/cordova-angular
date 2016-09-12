'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.CameraPageController
 * @description CameraPageController
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('CameraPageController', function($scope, $cordovaCamera) {

        document.addEventListener("deviceready", function() {

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            $scope.takePicture = function() {
                $cordovaCamera.getPicture(options).then(function(imageData) {
                    var image = document.getElementById('myImage');
                    image.src = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                    // error
                });
            };
            
        }, false);

    });

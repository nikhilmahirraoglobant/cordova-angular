'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.FlashlightPageController
 * @description FlashlightPageController
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('FlashlightPageController', function($scope, $cordovaFlashlight) {

        $cordovaFlashlight.available().then(function(availability) {
            var avail = availability; // is available
        }, function() {
            // unavailable
        });

        $scope.switchOn = function() {
            $cordovaFlashlight.switchOn()
                .then(
                    function(success) { /* success */ },
                    function(error) { /* error */ });
        };

        $scope.switchOff = function() {
            $cordovaFlashlight.switchOff()
                .then(
                    function(success) { /* success */ },
                    function(error) { /* error */ });
        };

        $scope.toggle = function() {
            $cordovaFlashlight.toggle()
                .then(function(success) { /* success */ },
                    function(error) { /* error */ });
        };
    });

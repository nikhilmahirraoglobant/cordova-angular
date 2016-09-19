'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.VibratorPageController
 * @description VibratorPageController
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('VibratorPageController', function($scope,$cordovaVibration) {

    	$scope.vibrate = function(miliSeconds)
    	{
    		$cordovaVibration.vibrate(miliSeconds);
    	}

    	$scope.vibrateWithPattern = function(miliSeconds)
    	{
    		$cordovaVibration.vibrateWithPattern(miliSeconds);
    	}
    });

'use strict';

/**
 * @ngdoc service
 * @name core.Services.CordovaVibration
 * @description CordovaVibration Factory
 */
angular
    .module('core')
    .factory('$cordovaVibration', function() {

        return {
            vibrate: function(times) {
                return navigator.notification.vibrate(times);
            },
            vibrateWithPattern: function(pattern, repeat) {
                return navigator.notification.vibrateWithPattern(pattern, repeat);
            },
            cancelVibration: function() {
                return navigator.notification.cancelVibration();
            }
        };
    });

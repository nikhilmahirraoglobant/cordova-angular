'use strict';

/**
 * @ngdoc service
 * @name core.Services.CordovaFlashlight
 * @description CordovaFlashlight Factory
 */
angular
    .module('core')
    .factory('$cordovaFlashlight', function($q, $window) {

        return {
            available: function() {
                var q = $q.defer();
                $window.plugins.flashlight.available(function(isAvailable) {
                    q.resolve(isAvailable);
                });
                return q.promise;
            },

            switchOn: function() {
                var q = $q.defer();
                $window.plugins.flashlight.switchOn(function(response) {
                    q.resolve(response);
                }, function(error) {
                    q.reject(error);
                });
                return q.promise;
            },

            switchOff: function() {
                var q = $q.defer();
                $window.plugins.flashlight.switchOff(function(response) {
                    q.resolve(response);
                }, function(error) {
                    q.reject(error);
                });
                return q.promise;
            },

            toggle: function() {
                var q = $q.defer();
                $window.plugins.flashlight.toggle(function(response) {
                    q.resolve(response);
                }, function(error) {
                    q.reject(error);
                });
                return q.promise;
            }
        };
    });

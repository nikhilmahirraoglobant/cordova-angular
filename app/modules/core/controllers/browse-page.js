'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.BrowsePageController
 * @description BrowsePageController
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('BrowsePageController', function($scope, $rootScope, $cordovaInAppBrowser) {
        
        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        document.addEventListener("deviceready", function() {
            
        	$scope.openBrowser = function(){
	            $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)
                .then(function(event) {
                    // success
                })
                .catch(function(event) {
                    // error
                });
            };
            
            $scope.closeBrowser = function(){    
	            $cordovaInAppBrowser.close();
	        }

        }, false);

        $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event) {

        });

        $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event) {
            // insert CSS via code / file
            $cordovaInAppBrowser.insertCSS({
                code: 'body {background-color:blue;}'
            });

            // insert Javascript via code / file
            $cordovaInAppBrowser.executeScript({
                file: 'script.js'
            });
        });

        $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event) {

        });

        $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event) {

        });


    });

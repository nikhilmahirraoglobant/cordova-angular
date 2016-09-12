'use strict';
var ApplicationConfiguration = (function() {
    var applicationModuleName = 'angularjsapp';
    var applicationModuleVendorDependencies = [
        'ngResource',
        
        'ngCookies', 
        
        'ngAnimate', 
        
        'ngTouch', 
        
        'ngSanitize', 
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
    ];
    var registerModule = function(moduleName) {
        angular
            .module(moduleName, []);
        angular
            .module(applicationModuleName)
            .requires
            .push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();

'use strict';

angular
    .module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular
    .module(ApplicationConfiguration.applicationModuleName)
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);
angular
    .element(document)
    .ready(function() {
        if (window.location.hash === '#_=_') {
            window.location.hash = '#!';
        }
        angular
            .bootstrap(document,
                [ApplicationConfiguration.applicationModuleName]);
    });

'use strict';

ApplicationConfiguration.registerModule('core');

'use strict';

angular
    .module('core')
    .config(function($stateProvider, $urlRouterProvider, $cordovaInAppBrowserProvider) {

        var defaultOptions = {
            location: 'no',
            clearcache: 'no',
            toolbar: 'no'
        };

        document.addEventListener("deviceready", function() {

            $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions)

        }, false);

        $urlRouterProvider.otherwise('/');

                                        $stateProvider
            .state('browse-page', {
                url: '/browse-page',
                templateUrl: 'modules/core/views/browse-page.html',
                controller: 'BrowsePageController'
            })
            .state('camera-page', {
                url: '/camera-page',
                templateUrl: 'modules/core/views/camera-page.html',
                controller: 'CameraPageController'
            })
            .state('menu', {
                url: '/menu',
                templateUrl: 'modules/core/views/menu.html',
                controller: 'MenuController'
            })
            .state('home', {
                url: '/',
                templateUrl: 'modules/core/views/home.html',
                controller: 'HomeController'
            });
    });

'use strict';

angular
    .module('core')
    .factory('$cordovaCamera',
        function($q) {
            return {
                getPicture: function(options) {
                    var q = $q.defer();

                    if (!navigator.camera) {
                        q.resolve(null);
                        return q.promise;
                    }

                    navigator.camera.getPicture(function(imageData) {
                        q.resolve(imageData);
                    }, function(err) {
                        q.reject(err);
                    }, options);

                    return q.promise;
                },

                cleanup: function() {
                    var q = $q.defer();

                    navigator.camera.cleanup(function() {
                        q.resolve();
                    }, function(err) {
                        q.reject(err);
                    });

                    return q.promise;
                }
            };
        });

'use strict';

angular
    .module('core')
    .provider('$cordovaInAppBrowser', function() {

        var ref;
        var defaultOptions = this.defaultOptions = {};

        this.setDefaultOptions = function(config) {
            defaultOptions = angular.extend(defaultOptions, config);
        };

        this.$get = ['$rootScope', '$q', '$window', '$timeout', function($rootScope, $q, $window, $timeout) {
            return {
                open: function(url, target, requestOptions) {
                    var q = $q.defer();

                    if (requestOptions && !angular.isObject(requestOptions)) {
                        q.reject('options must be an object');
                        return q.promise;
                    }

                    var options = angular.extend({}, defaultOptions, requestOptions);

                    var opt = [];
                    angular.forEach(options, function(value, key) {
                        opt.push(key + '=' + value);
                    });
                    var optionsString = opt.join();

                    ref = $window.open(url, target, optionsString);

                    ref.addEventListener('loadstart', function(event) {
                        $timeout(function() {
                            $rootScope.$broadcast('$cordovaInAppBrowser:loadstart', event);
                        });
                    }, false);

                    ref.addEventListener('loadstop', function(event) {
                        q.resolve(event);
                        $timeout(function() {
                            $rootScope.$broadcast('$cordovaInAppBrowser:loadstop', event);
                        });
                    }, false);

                    ref.addEventListener('loaderror', function(event) {
                        q.reject(event);
                        $timeout(function() {
                            $rootScope.$broadcast('$cordovaInAppBrowser:loaderror', event);
                        });
                    }, false);

                    ref.addEventListener('exit', function(event) {
                        $timeout(function() {
                            $rootScope.$broadcast('$cordovaInAppBrowser:exit', event);
                        });
                    }, false);

                    return q.promise;
                },

                close: function() {
                    ref.close();
                    ref = null;
                },

                show: function() {
                    ref.show();
                },

                executeScript: function(details) {
                    var q = $q.defer();

                    ref.executeScript(details, function(result) {
                        q.resolve(result);
                    });

                    return q.promise;
                },

                insertCSS: function(details) {
                    var q = $q.defer();

                    ref.insertCSS(details, function(result) {
                        q.resolve(result);
                    });

                    return q.promise;
                }
            };
        }];
    });

'use strict';

angular
    .module('core')
    .controller('BrowsePageController', function($scope, $cordovaInAppBrowser) {
        
        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        document.addEventListener("deviceready", function() {
            
        	$scope.openBrowser = function(){
	            $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)
                .then(function(event) {
                })
                .catch(function(event) {
                });
            };
            
            $scope.closeBrowser = function(){    
	            $cordovaInAppBrowser.close();
	        }

        }, false);

        $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event) {

        });

        $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event) {
            $cordovaInAppBrowser.insertCSS({
                code: 'body {background-color:blue;}'
            });
            $cordovaInAppBrowser.executeScript({
                file: 'script.js'
            });
        });

        $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event) {

        });

        $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event) {

        });


    });

'use strict';

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
                });
            };
            
        }, false);

    });

'use strict';

angular
    .module('core')
    .controller('HomeController', ['$scope',
        function($scope) {

        }
    ]);

'use strict';

angular
    .module('core')
    .controller('MenuController', [
        '$scope',
        function($scope) {


        }
]);

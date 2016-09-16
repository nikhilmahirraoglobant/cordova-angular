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
        'ui.utils',
        
        'LocalStorageModule', 
        'nvd3ChartDirectives', 
        'ngMap'
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

ApplicationConfiguration.registerModule('core', []);

'use strict';

angular
    .module('core')
    .config(function($stateProvider, $urlRouterProvider, $cordovaInAppBrowserProvider, localStorageServiceProvider) {

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
            .state('forecast-page', {
                url: '/forecast-page',
                templateUrl: 'modules/core/views/forecast-page.html',
                controller: 'ForecastPageController'
            })
            .state('forecast-page.days', {
                url: '/days',
                templateUrl: 'modules/core/views/days.htm'
            })
            .state('forecast-page.graph', {
                url: '/graph',
                templateUrl: 'modules/core/views/graph.htm'
            })
            .state('weather-page', {
                url: '/weather-page',
                templateUrl: 'modules/core/views/weather-page.html',
                controller: 'WeatherPageController'
            })
            .state('flashlight-page', {
                url: '/flashlight-page',
                templateUrl: 'modules/core/views/flashlight-page.html',
                controller: 'FlashlightPageController'
            })
            .state('vibrator-page', {
                url: '/vibrator-page',
                templateUrl: 'modules/core/views/vibrator-page.html',
                controller: 'VibratorPageController'
            })
            .state('contact-page', {
                url: '/contact-page',
                templateUrl: 'modules/core/views/contact-page.html',
                controller: 'ContactPageController'
            })
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
    .service('cityWeather',function($resource, $stateParams, $q){
    
    this.city = "Pune";
    this.cityHistroy = [];
    
    this.getWeatherInfo = function(myCity, successCB)
    {
        var deffered = $q.defer();
        
        var that = this;
        this.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
                                    {callback:"JSON_CALLBACK"},
                                    {get:{method:"JSONP"}}
                                   );
        
        this.appid = '8e667bfe426b3246f76f50f038bbabae';
    
        this.units= 'metric';
        
        this.days = $stateParams.days || 6;
    
        this.weatherAPI.get({units:this.units,q:myCity, cnt:this.days, appid:this.appid})
        .$promise.then(function(data) {
            
            deffered.resolve(data);
        },
        function(error) {
            deffered.reject("Error "+error);
            
        });        
        
        return deffered.promise;
        
    };
    
    this.getDates = function(tempWeatherData)
    {
        var maxData  = tempWeatherData.list.map(function(a) {return getGoodData(a,"max");});
        
        function getGoodData(dayObject,option)
        {
            return (dayObject.dt* 1000);
        };
        
        return maxData;
    }
    
    this.getMapData = function(tempWeatherData)
    {
        var mapData = {};
        
        var maxData  = tempWeatherData.list.map(function(a) {return getGoodData(a,"max");});
        var minData  = tempWeatherData.list.map(function(a) {return getGoodData(a,"min");});
        var dayData  = tempWeatherData.list.map(function(a) {return getGoodData(a,"day");});
        var nightData  = tempWeatherData.list.map(function(a) {return getGoodData(a,"night");});
        
        function getGoodData(dayObject,option)
        {
            return [dayObject.dt* 1000,dayObject.temp[option]];
        };  
        
        mapData = [
            {
                "key": "Max",
                "values": maxData,
                color: 'red'
            },

            {
                "key": "Min",
                "values": minData,
                color: 'blue'
            },

            {
                "key": "Day",
                "values": dayData,
                color: 'orange'
            },

            {
                "key": "Night",
                "values": nightData,
                color: 'black'
            }
        ];
        
        return mapData;
    }
    
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
    .factory('$cordovaContacts', function($q) {

        return {
            save: function(contact) {
                var q = $q.defer();
                var deviceContact = navigator.contacts.create({"displayName": contact});

                deviceContact.save(function(result) {
                    q.resolve(result);
                }, function(err) {
                    q.reject(err);
                });
                return q.promise;
            },

            remove: function(contact) {
                var q = $q.defer();
                var deviceContact = navigator.contacts.create({"displayName": contact});

                deviceContact.remove(function(result) {
                    q.resolve(result);
                }, function(err) {
                    q.reject(err);
                });
                return q.promise;
            },

            clone: function(contact) {
                var deviceContact = navigator.contacts.create(contact);
                return deviceContact.clone(contact);
            },

            find: function(searchTerm) {
                var q = $q.defer();
                
                var options = new ContactFindOptions();
                options.filter = searchTerm;
                options.multiple = true;
                options.desiredFields = [navigator.contacts.fieldType.id];
                options.hasPhoneNumber = true;
                
                var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
                
                if (Object.keys(options).length === 0) {
                    navigator.contacts.find(fields, function(results) {
                        q.resolve(results);
                    }, function(err) {
                        q.reject(err);
                    }, options);
                } else {
                    navigator.contacts.find(fields, function(results) {
                        q.resolve(results);
                    }, function(err) {
                        q.reject(err);
                    }, options);
                }
                return q.promise;
            },

            pickContact: function() {
                var q = $q.defer();

                navigator.contacts.pickContact(function(contact) {
                    q.resolve(contact);
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

'use strict';

angular
    .module('core')
    .service('historyService',function(cityWeather, localStorageService){
 
    var that = this;
    
    this.updateHistory = function(cityName)
    {
    
        var cities = [];
        
        if(localStorage["cities"] == undefined)
        {
            cities[0] = cityName;
            localStorage["cities"] = JSON.stringify(cities);
        }
        else
        {
            cities = JSON.parse(localStorage["cities"]);
            
            if(cities.indexOf(cityName) != -1)
            {
                cities.splice(cities.indexOf(cityName), 1);
            }
            
            cities.unshift(cityName);
            
            if(cities.length > 5)
            {
            }
            
            
            localStorage["cities"] = JSON.stringify(cities);
        }
        
        return cities;
    };
    
    this.getCities = function()
    {
        if(localStorage["cities"] == undefined)
        {
            return [cityWeather.city];
        }
        else
        {
            return JSON.parse(localStorage["cities"]);
        }
    };
    
});
angular
    .module('core')
    .directive('preLoader',function(){
   
    return{
        restrict: 'E',
        templateUrl: 'view/directives/preLoader.html',
        replace: true        
    }
});
angular
    .module('core')
    .directive('recentSearch',function(){
   
    return{
        restrict: 'E',
        templateUrl: 'view/directives/recentSearch.html',
        replace: true,
        scope:{
            weatherDay: "=",
            convertToDate: "&",
            dateFormate: "@"          
        }
    }
});

angular
    .module('core')
    .directive('weatherReport',function(){
   
    return{
        restrict: 'E',
        templateUrl: 'modules/core/views/directives/weatherReport.html',
        replace: true,
        scope:{
            weatherDay: "=",
            convertToDate: "&",
            dateFormate: "@"            
        }
    }
});
angular
    .module('core')
    .filter('convertToDate', function() {

    return function(dt) {
        return new Date(dt * 1000);
    }
});
angular
    .module('core')
    .filter('titlecase', function() {

    return function(str) {
        return (str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}));
    }
});
'use strict';

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
    .controller('ContactPageController', function($scope, $cordovaContacts) {

        $scope.contacts = [];

        $scope.addContact = function() {
            $cordovaContacts.save($scope.contactForm).then(function(result) {
                alert("Contact saved "+$scope.contactForm);
            }, function(err) {
                alert("Contact not saved "+err);
            });
        };

        $scope.getAllContacts = function() {
            $cordovaContacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
                $scope.contacts = allContacts;
                alert($scope.contacts[0]);
            }, function(err) {
                alert("Cant found Contact "+err);
            });
        };

        

        $scope.findContactsBySearchTerm = function(searchTerm) {
            /*var opts = { //search options
                filter: searchTerm, // 'Bob'
                multiple: true, // Yes, return any contact that matches criteria
                fields: [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name], // These are the fields to search for 'bob'.
                desiredFields: [navigator.contacts.fieldType.id] //return fields.
            };*/

            /*if ($ionicPlatform.isAndroid()) {
                opts.hasPhoneNumber = true; //hasPhoneNumber only works for android.
            };*/

            console.log(navigator.contacts);
            
            $cordovaContacts.find(searchTerm).then(function(contactsFound) {
                $scope.contacts = contactsFound;
                alert("Found contacts "+JSON.stringify(contactsFound[0]));
            }, function(err) {
                alert("Cant found Contact "+err);
            });
        };

        $scope.pickContactUsingNativeUI = function() {
            $cordovaContacts.pickContact().then(function(contactPicked) {
                $scope.contact = contactPicked;
                console.log(contactPicked);
            }, function(err) {
                alert("Cant Pick Contact "+err);
            })
        };

    });

'use strict';

angular
    .module('core')
    .controller('FlashlightPageController', function($scope, $cordovaFlashlight) {

        $cordovaFlashlight.available().then(function(availability) {
            var avail = availability; // is available
        }, function() {
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

'use strict';

angular
    .module('core')
    .controller('ForecastPageController', function($scope, $state, $timeout, $filter, cityWeather) {

        $scope.isPageLoaded = false;

        $scope.city = cityWeather.city;

        cityWeather.getWeatherInfo($scope.city)
            .then(function(data) {
                    $scope.weatherResult = data;
                    $scope.exampleData = cityWeather.getMapData($scope.weatherResult);
                    $scope.dates = cityWeather.getDates($scope.weatherResult);

                    $scope.isPageLoaded = true;

                    $state.go("forecast-page.days");
                },
                function(error) {
                });

        $scope.xAxisTickFormat = function() {
            return function(d) {
                return d3.time.format('%d-%b-%y')(new Date(d)); //uncomment for date format
            }
        }
        $scope.tabs = [{
            title: 'Days',
            stateName: 'forecast-page.days'
        }, {
            title: 'Graph',
            stateName: 'forecast-page.graph'
        }];
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

'use strict';

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

'use strict';

angular
    .module('core')
    .controller('WeatherPageController', function($scope, $location, $state, $filter, cityWeather, historyService, localStorageService, NgMap) {

        $scope.city = cityWeather.city;

        $scope.cityHistroy = cityWeather.cityHistroy;


        $scope.$watch('city', function(newValue, oldValue) {

            if (typeof(newValue) == 'object') {
                $scope.city = newValue.name;
            }

            $scope.city = $filter('titlecase')($scope.city);

            cityWeather.city = $scope.city;
        });

        $scope.$watch('cityHistroy', function() {

            cityWeather.cityHistroy = $scope.cityHistroy;

        });

        $scope.submit = function() {
            if ($scope.city.length) {
                var citiesArr = historyService.updateHistory($scope.city);

                $state.go("forecast-page.days");
            };
        };

        $scope.getHistoryWeather = function() {

            var citiesArr = historyService.getCities();

            this.setWeatherHistory = function(cityName) {
                var cityInfo = {};
                cityInfo.name = cityName;

                cityWeather.getWeatherInfo(cityInfo.name)
                    .then(function(data) {

                            cityInfo.weatherResult = data;
                        },
                        function(error) {
                        });

                return cityInfo;
            }

            $scope.cityHistroy = citiesArr.map(this.setWeatherHistory);

            if ($scope.cityHistroy.length > 0) {
                $scope.city = $scope.cityHistroy[0].name;
            }
        };

        $scope.map = {

            center: [18.5203, 73.8567],

            zoom: 10
        };

    });

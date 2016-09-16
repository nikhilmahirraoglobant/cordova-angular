'use strict';

/**
 * @ngdoc object
 * @name core.config
 * @requires ng.$stateProvider
 * @requires ng.$urlRouterProvider
 * @description Defines the routes and other config within the core module
 */
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

        /**
         * @ngdoc event
         * @name core.config.route
         * @eventOf core.config
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the path is `'/'`, route to home
         * */
        /**
         * @ngdoc event
         * @name core.config.route
         * @eventOf core.config
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'menu'`, route to menu
         *
         */
        /**
         * @ngdoc event
         * @name core.config.route
         * @eventOf core.config
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'camera-page'`, route to camera-page
         *
         */
        /**
         * @ngdoc event
         * @name core.config.route
         * @eventOf core.config
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'browse-page'`, route to browse-page
         *
         */
        /**
         * @ngdoc event
         * @name core.config.route
         * @eventOf core.config
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'contact-page'`, route to contact-page
         *
         */
        /**
         * @ngdoc event
         * @name core.config.route
         * @eventOf core.config
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'vibrator-page'`, route to vibrator-page
         *
         */
        /**
         * @ngdoc event
         * @name core.config.route
         * @eventOf core.config
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'flashlight-page'`, route to flashlight-page
         *
         */
        /**
         * @ngdoc event
         * @name core.config.route
         * @eventOf core.config
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'weather-page'`, route to weather-page
         *
         */
        /**
         * @ngdoc event
         * @name core.config.route
         * @eventOf core.config
         * @description
         *
         * Define routes and the associated paths
         *
         * - When the state is `'forecast-page'`, route to forecast-page
         *
         */
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

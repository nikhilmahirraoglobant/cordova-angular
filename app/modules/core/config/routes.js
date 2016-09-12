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

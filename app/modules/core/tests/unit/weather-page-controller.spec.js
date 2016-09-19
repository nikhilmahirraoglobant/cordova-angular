'use strict';

describe('Controller: WeatherPageController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var WeatherPageController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        WeatherPageController = $controller('WeatherPageController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});

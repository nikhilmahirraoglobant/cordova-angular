'use strict';

describe('Controller: ForecastPageController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var ForecastPageController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ForecastPageController = $controller('ForecastPageController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});

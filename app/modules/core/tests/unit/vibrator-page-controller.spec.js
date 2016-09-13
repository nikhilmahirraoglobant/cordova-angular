'use strict';

describe('Controller: VibratorPageController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var VibratorPageController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        VibratorPageController = $controller('VibratorPageController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});

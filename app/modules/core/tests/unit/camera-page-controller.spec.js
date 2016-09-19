'use strict';

describe('Controller: CameraPageController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var CameraPageController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        CameraPageController = $controller('CameraPageController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});

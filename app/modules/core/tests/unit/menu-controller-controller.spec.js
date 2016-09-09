'use strict';

describe('Controller: MenuControllerController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var MenuControllerController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MenuControllerController = $controller('MenuControllerController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});

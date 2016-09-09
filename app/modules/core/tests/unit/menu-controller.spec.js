'use strict';

describe('Controller: MenuController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var MenuController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MenuController = $controller('MenuController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});

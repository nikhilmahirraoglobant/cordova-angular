'use strict';

describe('Controller: ContactPageController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var ContactPageController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ContactPageController = $controller('ContactPageController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});

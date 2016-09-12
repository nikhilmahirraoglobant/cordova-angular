'use strict';

describe('Controller: BrowsePageController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var BrowsePageController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        BrowsePageController = $controller('BrowsePageController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});

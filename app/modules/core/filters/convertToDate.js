angular
    .module('core')
    .filter('convertToDate', function() {

    return function(dt) {
        return new Date(dt * 1000);
    }
});
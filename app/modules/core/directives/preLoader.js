angular
    .module('core')
    .directive('preLoader',function(){
   
    return{
        restrict: 'E',
        templateUrl: 'modules/core/views/preLoader.html',
        replace: true        
    }
});
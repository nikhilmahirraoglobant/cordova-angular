angular
    .module('core')
    .directive('preLoader',function(){
   
    return{
        restrict: 'E',
        templateUrl: 'view/directives/preLoader.html',
        replace: true        
    }
});
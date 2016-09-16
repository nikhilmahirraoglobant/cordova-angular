angular
    .module('core')
    .directive('weatherReport',function(){
   
    return{
        restrict: 'E',
        templateUrl: 'modules/core/views/directives/weatherReport.html',
        replace: true,
        scope:{
            weatherDay: "=",
            convertToDate: "&",
            dateFormate: "@"            
        }
    }
});
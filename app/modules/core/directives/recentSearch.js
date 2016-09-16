angular
    .module('core')
    .directive('recentSearch',function(){
   
    return{
        restrict: 'E',
        templateUrl: 'view/directives/recentSearch.html',
        replace: true,
        scope:{
            weatherDay: "=",
            convertToDate: "&",
            dateFormate: "@"          
        }
    }
});

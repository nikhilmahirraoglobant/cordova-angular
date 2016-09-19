angular
    .module('core')
    .directive('recentSearch',function(){
   
    return{
        restrict: 'E',
        templateUrl: 'modules/core/views/recentSearch.html',
        replace: true,
        scope:{
            weatherDay: "=",
            convertToDate: "&",
            dateFormate: "@"          
        }
    }
});

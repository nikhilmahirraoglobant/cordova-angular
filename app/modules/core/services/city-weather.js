'use strict';

/**
 * @ngdoc service
 * @name core.Services.CityWeather
 * @description CityWeather Service
 */
angular
    .module('core')
    .service('cityWeather',function($resource, $stateParams, $q){
    
    this.city = "Pune";
    this.cityHistroy = [];
    
    this.getWeatherInfo = function(myCity, successCB)
    {
        var deffered = $q.defer();
        
        var that = this;
        this.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
                                    {callback:"JSON_CALLBACK"},
                                    {get:{method:"JSONP"}}
                                   );
        
        this.appid = '8e667bfe426b3246f76f50f038bbabae';
    
        this.units= 'metric';
        
        this.days = $stateParams.days || 6;
    
        this.weatherAPI.get({units:this.units,q:myCity, cnt:this.days, appid:this.appid})
        .$promise.then(function(data) {
            
            deffered.resolve(data);
        },
        function(error) {
            console.log(JSON.stringify(error));
            deffered.reject(error);
            
        });        
        
        return deffered.promise;
        
    };
    
    this.getDates = function(tempWeatherData)
    {
        var maxData  = tempWeatherData.list.map(function(a) {return getGoodData(a,"max");});
        
        function getGoodData(dayObject,option)
        {
            return (dayObject.dt* 1000);
        };
        
        return maxData;
    }
    
    this.getMapData = function(tempWeatherData)
    {
        var mapData = {};
        
        var maxData  = tempWeatherData.list.map(function(a) {return getGoodData(a,"max");});
        var minData  = tempWeatherData.list.map(function(a) {return getGoodData(a,"min");});
        var dayData  = tempWeatherData.list.map(function(a) {return getGoodData(a,"day");});
        var nightData  = tempWeatherData.list.map(function(a) {return getGoodData(a,"night");});
        
        function getGoodData(dayObject,option)
        {
            return [dayObject.dt* 1000,dayObject.temp[option]];
        };  
        
        mapData = [
            {
                "key": "Max",
                "values": maxData,
                color: 'red'
            },

            {
                "key": "Min",
                "values": minData,
                color: 'blue'
            },

            {
                "key": "Day",
                "values": dayData,
                color: 'orange'
            },

            {
                "key": "Night",
                "values": nightData,
                color: 'black'
            }
        ];
        
        return mapData;
    }
    
});
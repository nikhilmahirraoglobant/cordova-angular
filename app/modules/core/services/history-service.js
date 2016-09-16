'use strict';

/**
 * @ngdoc service
 * @name core.Services.HistoryService
 * @description HistoryService Service
 */
angular
    .module('core')
    .service('historyService',function(cityWeather, localStorageService){
 
    var that = this;
    
    this.updateHistory = function(cityName)
    {
    
        var cities = [];
        
        if(localStorage["cities"] == undefined)
        {
            cities[0] = cityName;
            localStorage["cities"] = JSON.stringify(cities);
        }
        else
        {
            cities = JSON.parse(localStorage["cities"]);
            
            if(cities.indexOf(cityName) != -1)
            {
                cities.splice(cities.indexOf(cityName), 1);
            }
            
            cities.unshift(cityName);
            
            if(cities.length > 5)
            {
              // cities.pop(); 
            }
            
            
            localStorage["cities"] = JSON.stringify(cities);
        }
        
        return cities;
    };
    
    this.getCities = function()
    {
        if(localStorage["cities"] == undefined)
        {
            return [cityWeather.city];
        }
        else
        {
            return JSON.parse(localStorage["cities"]);
        }
    };
    
});
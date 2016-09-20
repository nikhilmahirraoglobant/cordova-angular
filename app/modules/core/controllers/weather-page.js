'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.WeatherPageController
 * @description WeatherPageController
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('WeatherPageController', function($scope, $location, $state, $filter, cityWeather, historyService, localStorageService, NgMap) {

        $scope.city = cityWeather.city;

        $scope.cityHistroy = cityWeather.cityHistroy;


        $scope.$watch('city', function(newValue, oldValue) {

            if (typeof(newValue) == 'object') {
                $scope.city = newValue.name;
            }

            $scope.city = $filter('titlecase')($scope.city);

            cityWeather.city = $scope.city;
        });

        $scope.$watch('cityHistroy', function() {

            cityWeather.cityHistroy = $scope.cityHistroy;

        });

        $scope.submit = function() {
            if ($scope.city.length) {
                var citiesArr = historyService.updateHistory($scope.city);

                $state.go("forecast-page.days");
            };
        };

        $scope.getHistoryWeather = function() {

            var citiesArr = historyService.getCities();

            this.setWeatherHistory = function(cityName) {
                var cityInfo = {};
                cityInfo.name = cityName;

                $scope.getWeatherInfo(cityInfo);

                return cityInfo;
            }

            $scope.cityHistroy = citiesArr.map(this.setWeatherHistory);

            if ($scope.cityHistroy.length > 0) {
                $scope.city = $scope.cityHistroy[0].name;
            }
        };

        $scope.getWeatherInfo = function (obj) {

          var cityDetails;
          if(obj.lat && obj.lon) {
            cityDetails = obj;
          } else if(obj.name) {
            cityDetails = obj.name;
          }
          //alert(cityDetails.lat);
          //alert(cityDetails.lon);
          cityWeather.getWeatherInfo(cityDetails)
              .then(function(data) {
                      console.log(data);
                      $scope.city = data.city.name + ', ' + data.city.country;
                      //cityInfo.weatherResult = data;
                  },
                  function(error) {
                      console.log('Error in getting weather information -- ', error);
                      //console.log(JSON.stringify(error));
                      //alert("Get weather info failed");
                  });
        };

        $scope.getGeoLocationWeather = function(){
            document.addEventListener('deviceready',function () {
              navigator.geolocation.getCurrentPosition(function (position) {
                var loc = {};
                loc.lat = position.coords.latitude;
                loc.lon = position.coords.longitude;

                $scope.getWeatherInfo(loc);

              });
            });
        };

        $scope.map = {

            center: [18.5203, 73.8567],

            zoom: 10
        };

    });

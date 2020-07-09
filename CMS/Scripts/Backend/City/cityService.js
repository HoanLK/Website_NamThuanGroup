(function (app) {
    'use strict';

    app.factory('CityService', CityService);

    CityService.$inject = ['$http', '$window'];

    function CityService($http, $window) {
        var services = {};

        var apiCity = "/API/CityAPI"

        //--- CRUD ---

        //Get Cities
        services.Gets = function () {
            return $http.get(apiCity);
        };

        return services;
    }


})(angular.module('backend'));

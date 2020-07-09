(function (app) {
    'use strict';

    app.factory('DistrictService', DistrictService);

    DistrictService.$inject = ['$http', '$window'];

    function DistrictService($http, $window) {
        var services = {};

        var apiDistrict = "/API/DistrictAPI"

        //--- CRUD ---

        //Get by CityId
        services.GetByCityId = function (cityId) {
            return $http.get(apiDistrict + '?request=CityId&&value=' + cityId);
        };

        return services;
    }


})(angular.module('backend'));

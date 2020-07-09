(function (app) {
    'use strict';

    app.factory('StreetService', StreetService);

    StreetService.$inject = ['$http', '$window'];

    function StreetService($http, $window) {
        var services = {};

        var apiStreet = "/API/StreetAPI"

        //--- CRUD ---

        //Get by DistrictId
        services.GetByDistrictId = function (districtId) {
            return $http.get(apiStreet + '?request=DistrictId&&value=' + districtId);
        };

        return services;
    }


})(angular.module('backend'));

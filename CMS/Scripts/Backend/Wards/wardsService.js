(function (app) {
    'use strict';

    app.factory('WardsService', WardsService);

    WardsService.$inject = ['$http', '$window'];

    function WardsService($http, $window) {
        var services = {};

        var apiWards = "/API/WardsAPI"

        //--- CRUD ---

        //Get by DistrictId
        services.GetByDistrictId = function (districtId) {
            return $http.get(apiWards + '?request=DistrictId&&value=' + districtId);
        };

        return services;
    }


})(angular.module('backend'));

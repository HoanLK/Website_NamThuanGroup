(function (app) {
    'use strict';

    app.factory('PropertyTypeService', PropertyTypeService);

    PropertyTypeService.$inject = ['$http', '$window'];

    function PropertyTypeService($http, $window) {
        var services = {};

        var apiPropertyType = "/API/PropertyTypeAPI"

        //--- CRUD ---

        //Gets
        services.Gets = function () {
            return $http.get(apiPropertyType);
        };

        return services;
    }


})(angular.module('backend'));

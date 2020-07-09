(function (app) {
    'use strict';

    app.factory('ArrayService', ArrayService);

    ArrayService.$inject = [];

    function ArrayService() {
        var services = {};

        //Get Array Ids
        services.GetArrayIds = function (array) {
            var arrayIds = "";

            angular.forEach(array, function (value, index) {
                if (index !== array.length - 1) {
                    arrayIds += value.Id + ",";
                } else {
                    arrayIds += value.Id;
                }
            });

            return arrayIds;
        };

        return services;
    }


})(angular.module('backend'));

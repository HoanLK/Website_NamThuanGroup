(function (app) {
    'use strict';

    app.factory('DateTimeService', DateTimeService);

    DateTimeService.$inject = ['$http'];

    function DateTimeService($http) {
        var services = {};

        //---DATE TIME---
        services.ToUTCDate = function (datetime) {
            return new Date(datetime + " UTC");
        };

        return services;
    }


})(angular.module('backend'));

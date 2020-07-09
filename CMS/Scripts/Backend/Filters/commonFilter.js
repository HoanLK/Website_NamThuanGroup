(function (app) {
    'use strict';

    //Trust Url
    app.filter('trustUrl', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    });

})(angular.module('backend'));

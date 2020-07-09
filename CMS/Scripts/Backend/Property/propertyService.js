(function (app) {
    'use strict';

    app.factory('PropertyService', PropertyService);

    PropertyService.$inject = ['$http', '$window', 'ArrayService', 'DateTimeService', 'DevExtremeService', 'StringService'];

    function PropertyService($http, $window, ArrayService, DateTimeService, DevExtremeService, StringService) {
        var services = {};

        var apiProperty = "/API/PropertyAPI";

        //--- CRUD ---

        //Create
        services.Create = function (categoryPost) {
            return $http.post(apiCategoryPost, categoryPost);
        };

        //Edit
        services.Edit = function (id, categoryPost) {
            return $http.put(apiCategoryPost + '/' + id, categoryPost);
        };

        //Get
        services.GetById = function (id) {
            return $http.get(apiCategoryPost + '/' + id);
        };

        //Get Selection List
        services.GetListViewModel = function (typeViewModel) {
            return $http.get(apiCategoryPost + '?viewmodel=true&&type=' + typeViewModel);
        };

        //Delete List
        services.DeleteList = function (ids) {
            return $http.delete(apiCategoryPost + '?ids=' + ids);
        };

        //--- REDIRECT ---

        //Redirect List
        services.RedirectList = function (id) {
            $window.location.href = '/Admin#!/category-post';
        };

        //Redirect Edit
        services.RedirectEdit = function (id) {
            $window.location.href = '/Admin#!/category-post/edit/' + id;
        };

        //Redirect After Edit
        services.RedirectAfterEdit = function (request) {
            switch (request) {
                case 'Edit':
                    Init();
                    break;
                case 'New':
                    $window.location.href = '/Admin#!/category-post/edit';
                    break;
                case 'Exit':
                    $window.location.href = '/Admin#!/category-post';
                    break;
            }
        };

        //Redirect Create
        services.RedirectCreate = function () {
            $window.location.href = '/Admin#!/category-post/edit';
        };

        //Redirect After Create
        services.RedirectAfterCreate = function (request, id) {
            switch (request) {
                case 'Edit':
                    $window.location.href = '/Admin#!/category-post/edit/' + id;
                    break;
                case 'New':
                    Init();
                    break;
                case 'Exit':
                    $window.location.href = '/Admin#!/category-post';
                    break;
            }
        };
        //Redirect Cancel
        services.RedirectCancel = function () {
            $window.location.href = '/Admin#!/category-post';
        };

        return services;
    }


})(angular.module('backend'));

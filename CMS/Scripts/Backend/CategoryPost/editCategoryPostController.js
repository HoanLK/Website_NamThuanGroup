(function (app) {
    'use strict';

    app.controller('editCategoryPostController', editCategoryPostController);

    editCategoryPostController.$inject = ['$scope', '$http', '$window', '$cookies', '$routeParams', 'ArrayService', 'CommonService', 'DateTimeService', 'DevExtremeService', 'StringService', 'CategoryPostService'];

    function editCategoryPostController($scope, $http, $window, $cookies, $routeParams, ArrayService, CommonService, DateTimeService, DevExtremeService, StringService, CategoryPostService) {
        //---VAR---
        //Page
        $scope.page = {};
        //Category Post
        $scope.categoryPosts = [];
        $scope.tempCategoryPosts = [];
        $scope.categoryPost = {};
        $scope.tempCategoryPost = {};
        $scope.selectedCategoryPosts = [];
        //Valid
        $scope.valid = {
            Title: false,
            Alias: false
        };

        $scope.statuses = [
            {
                text: "Xuất bản",
                value: true
            },
            {
                text: "Không xuất bản",
                value: false
            }
        ];

        Init();

        //---FUNCTION---
        function Init() {
            //Get Id from URL
            $scope.id = $routeParams.id;

            //Edit
            if (CommonService.CheckNull($scope.id)) {
                $scope.page.title = "Sửa Danh mục Bài viết";
                GetCategoryPost($scope.id);
            }
            //Create
            else {
                $scope.page.title = "Thêm Danh mục bài viết";
                SetDefaultCategoryPost();
            }

            //Get All Category
            GetCategoryPosts();

        }

        //Set Default Category Post
        function SetDefaultCategoryPost() {
            $scope.categoryPost = {
                Published: true
            };
        }

        //Get Category Post
        function GetCategoryPost(id) {
            CategoryPostService.GetById(id)
                .then(function success(response) {
                    $scope.categoryPost = angular.copy(response.data);
                    $scope.tempCategoryPost = angular.copy($scope.categoryPost);
                }, function error(response) {
                    toastr.error("Không tìm thấy Danh mục");
                    CategoryPostService.RedirectList();
                });
        }

        //Get All Category
        function GetCategoryPosts() {
            CategoryPostService.GetListViewModel('select')
                .then(function success(response) {
                    $scope.categoryPosts = angular.copy(CommonService.GenMultiLevel(response.data));
                }, function error(response) {
                    toastr.error("Không lấy được Danh sách danh mục");
                }
                );

        }

        //Save
        $scope.Save = function (request) {
            if (CheckValid()) {
                //Edit
                if (CommonService.CheckNull($scope.id)) {
                    if (CheckChangeCategoryPost()) {
                        CategoryPostService.Edit($scope.categoryPost.Id, $scope.categoryPost)
                            .then(function success(response) {
                                $scope.tempCategoryPost = angular.copy($scope.categoryPost);
                                toastr.success("Lưu thành công");

                                CategoryPostService.RedirectAfterEdit(request);
                            }, function error(response) {
                                toastr.error("Lưu thất bại");
                            }
                            );
                    } else {
                        CategoryPostService.RedirectAfterEdit(request);
                    }
                }
                //Create
                else {
                    CategoryPostService.Create($scope.categoryPost)
                        .then(function success(response) {
                            toastr.success("Thêm thành công");
                            CategoryPostService.RedirectAfterCreate(request, response.data.Id);
                        }, function error(response) {
                            toastr.error("Thêm thất bại");
                        }
                        );
                }
            }
        };

        //Cancel
        $scope.Cancel = function () {
            CategoryPostService.RedirectCancel();
        };

        //Tabs
        $scope.tab = 1;
        $scope.SetTab = function (newTab) {
            $scope.tab = newTab;
        };
        $scope.IsSet = function (tabNum) {
            return $scope.tab === tabNum;
        };

        //Generate Alias
        $scope.GenAlias = function () {
            if (!$scope.valid.Title) {
                toastr.error("Vui lòng nhập Tiêu đề");
            } else {
                $scope.categoryPost.Alias = StringService.GenAlias($scope.categoryPost.Title);
            }
        };

        //ChooseImage
        $scope.ChooseImage = function () {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.categoryPost.Image = fileUrl;
                $scope.$apply();
            };
            finder.SelectFunction = 'ShowFileInfo';
            finder.popup();
        };

        //---VALIDATE---
        //Check null
        $scope.CheckNullTitle = function () {
            if (CommonService.CheckNull($scope.categoryPost.Title)) {
                $scope.valid.Title = true;
                return true;
            } else {
                $scope.valid.Title = false;
                return false;
            }
        };
        $scope.CheckNullAlias = function () {
            if (CommonService.CheckNull($scope.categoryPost.Alias)) {
                $scope.valid.Alias = true;
                return true;
            } else {
                $scope.valid.Alias = false;
                return false;
            }
        };
        //Check valid
        function CheckValid() {
            var count = 0;
            angular.forEach($scope.valid, function (value, index) {
                if (!value) {
                    switch (index) {
                        case 'Title':
                            toastr.error("Nhập Tiêu đề");
                            break;
                        case 'Alias':
                            toastr.error("Nhập Alias");
                            break;
                    }
                    count++;
                }
            });
            if (count === 0) {
                return true;
            } else {
                return false;
            }

        }
        //Check Change Category Post
        function CheckChangeCategoryPost() {
            return !angular.equals($scope.categoryPost, $scope.tempCategoryPost);
        }
    }

})(angular.module('backend'));
import templateUrl from "./create.component.html";

export default class PostCreateController {
    constructor($scope, $http, $window, $cookies, $routeParams, CommonService, PostService) {
        this.commonService = CommonService;
        this.postService = PostService;
    }
}
export const PostCreateComponent = {
    template: templateUrl,
    controller: PostCreateController
}

/*
(function (app) {
    'use strict';

    app.controller('editPostController', editPostController);

    editPostController.$inject = ['$scope', '$http', '$window', '$cookies', '$routeParams', 'ArrayService', 'CommonService', 'DateTimeService', 'DevExtremeService', 'StringService', 'CategoryPostService', 'PostService'];

    function editPostController($scope, $http, $window, $cookies, $routeParams, ArrayService, CommonService, DateTimeService, DevExtremeService, StringService, CategoryPostService, PostService) {
        //---VAR---
        //Page
        $scope.page = {};
        //Post
        $scope.posts = [];
        $scope.post = {};
        $scope.tempPost = {};
        $scope.selectedPosts = [];
        //Category Post
        $scope.categoryPosts = [];
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
                $scope.page.title = "Sửa Bài viết";
                GetPost($scope.id);
            }
            //Create
            else {
                $scope.page.title = "Thêm Bài viết";
                SetDefaultPost();
            }

            //Get Categories
            GetCategoryPosts();

        }

        //Set Default Post
        function SetDefaultPost() {
            $scope.post = {
                Published: true,
                Featured: false,
                Views: 0
            };
        }

        //Get Post
        function GetPost(id) {
            PostService.GetById(id)
                .then(function success(response) {
                    $scope.post = angular.copy(response.data);
                    $scope.tempPost = angular.copy($scope.post);
                }, function error(response) {
                    toastr.error("Không tìm thấy Bài viết");
                    PostService.RedirectList();
                });
        }

        //Get Categories
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
                    if (CheckChangePost()) {
                        PostService.Edit($scope.post.Id, $scope.post)
                            .then(function success(response) {
                                $scope.tempPost = angular.copy($scope.post);
                                toastr.success("Lưu thành công");

                                PostService.RedirectAfterEdit(request);
                            }, function error(response) {
                                toastr.error("Lưu thất bại");
                            }
                            );
                    } else {
                        PostService.RedirectAfterEdit(request);
                    }
                }
                //Create
                else {
                    PostService.Create($scope.post)
                        .then(function success(response) {
                            toastr.success("Thêm thành công");
                            PostService.RedirectAfterCreate(request, response.data.Id);
                        }, function error(response) {
                            toastr.error("Thêm thất bại");
                        }
                        );
                }
            }
        };

        //Cancel
        $scope.Cancel = function () {
            PostService.RedirectCancel();
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
                $scope.post.Alias = StringService.GenAlias($scope.post.Title);
            }
        };

        //ChooseImage
        $scope.ChooseImage = function () {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.post.Image = fileUrl;
                $scope.$apply();
            };
            finder.SelectFunction = 'ShowFileInfo';
            finder.popup();
        };

        //---VALIDATE---
        //Check null
        $scope.CheckNullTitle = function () {
            if (CommonService.CheckNull($scope.post.Title)) {
                $scope.valid.Title = true;
                return true;
            } else {
                $scope.valid.Title = false;
                return false;
            }
        };
        $scope.CheckNullAlias = function () {
            if (CommonService.CheckNull($scope.post.Alias)) {
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
        //Check Change Post
        function CheckChangePost() {
            return !angular.equals($scope.post, $scope.tempPost);
        }
    }

})(angular.module('backend'));
*/
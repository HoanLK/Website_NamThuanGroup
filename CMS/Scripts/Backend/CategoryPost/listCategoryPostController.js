(function (app) {
    'use strict';

    app.controller('listCategoryPostController', listCategoryPostController);

    listCategoryPostController.$inject = ['$scope', '$http', '$window', 'ArrayService', 'CommonService', 'DevExtremeService', 'StringService', 'CategoryPostService'];

    function listCategoryPostController($scope, $http, $window, ArrayService, CommonService, DevExtremeService, StringService, CategoryPostService) {
        //---VAR---
        //Page
        $scope.page = {
            title: "Danh sách Danh mục Bài viết"
        };
        //Category Post
        $scope.categoryPosts = [];
        $scope.categoryPost = {};
        $scope.selectedCategoryPosts = [];

        //---POPUP---
        //Delete
        $scope.deleteCategoryPost = {
            status: false,
            title: "Bạn có chắc chắn muốn xóa?",
            popup: {
                width: "auto",
                height: "auto",
                contentTemplate: "templateDeleteCategoryPost",
                showTitle: false,
                bindingOptions: {
                    visible: "deleteCategoryPost.status"
                }
            }
        };

        //---LIST---
        //Category Posts
        $scope.gridCategoryPosts = angular.copy(DevExtremeService.DefaultGrid);
        $scope.gridCategoryPosts.bindingOptions = {
            dataSource: 'categoryPosts'
        };
        $scope.gridCategoryPosts.columns = [
            {//0
                caption: "ID",
                dataField: "Id",
                minWidth: 60
            },
            {//1
                caption: "Trạng thái",
                dataField: "Published",
                cellTemplate: "publishedCellTemplate",
                trueText: "Xuất bản",
                falseText: "Chưa xuất bản",
                minWidth: 90
            },
            {//2
                caption: "Tiêu đề",
                dataField: "Title",
                dataType: "string",
                minWidth: 150
            },
            {//3
                caption: "Alias",
                dataField: "Alias",
                dataType: "string",
                visible: false,
                minWidth: 150
            },
            {//4
                alignment: "center",
                caption: "Số bài viết",
                dataField: "PostNumber",
                cellTemplate: "postnumberCellTemplate",
                minWidth: 90
            },
            {//5
                caption: "Alias",
                dataField: "Alias",
                dataType: "string",
                visible: false
            },
            {//6
                alignment: "left",
                caption: "Ghi chú",
                dataField: "Note",
                dataType: "string",
                visible: false,
                minWidth: 100
            }
        ];
        $scope.gridCategoryPosts.export = {
            allowExportSelectedData: true,
            enabled: true,
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            fileName: "Danh sách Danh mục Bài viết",
            texts: {
                exportAll: "Xuất toàn bộ Dữ liệu",
                exportSelectedRows: "Xuất dữ liệu đang chọn",
                exportTo: "Trích xuất"
            }
        };
        $scope.gridCategoryPosts.headerFilter.visible = false;
        $scope.gridCategoryPosts.summary = {
            texts: {
                count: "{0}",
                sum: "{0}"
            },
            groupItems: [
                {
                    column: "Id",
                    summaryType: "count"
                }
            ],
            totalItems: [
                {
                    column: "Id",
                    summaryType: "count"
                }
            ]
        };
        $scope.gridCategoryPosts.remoteOperations = {
            paging: false,
            filtering: false,
            sorting: false,
            grouping: false,
            summary: false,
            groupPaging: false
        };
        $scope.gridCategoryPosts.onToolbarPreparing = function (e) {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
                //RIGHT
                {//Thêm
                    location: "before",
                    widget: "dxButton",
                    options: {
                        hint: "Thêm",
                        icon: "add",
                        type: "success",
                        onClick: function () {
                            $scope.Create();
                        }
                    }
                },
                {//Sửa
                    location: "before",
                    widget: "dxButton",
                    options: {
                        hint: "Sửa",
                        icon: "edit",
                        type: "default",
                        onClick: function () {
                            $scope.Edit();
                        }
                    }
                },
                {//Xóa
                    location: "before",
                    widget: "dxButton",
                    options: {
                        hint: "Xóa",
                        icon: "trash",
                        type: "danger",
                        onClick: function () {
                            $scope.Delete();
                        }
                    }
                }
            );
        };
        $scope.gridCategoryPosts.onRowClick = function (e) {
            var component = e.component;

            if (!component.clickCount)
                component.clickCount = 1;
            else
                component.clickCount = component.clickCount + 1;

            if (component.clickCount === 1) {
                component.lastClickTime = new Date();
                setTimeout(function () { component.lastClickTime = 0; component.clickCount = 0; }, 350);
            }
            else if (component.clickCount === 2) {
                var now = new Date();
                if (now - component.lastClickTime < 300) {
                    $scope.categoryPost = angular.copy(e.data);
                    $scope.Edit();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        };
        $scope.gridCategoryPosts.onSelectionChanged = function (e) {
            $scope.selectedCategoryPosts = angular.copy(e.selectedRowsData);
        };




        //---CONTEXTMENU---
        var itemContextMenus = angular.copy(DevExtremeService.DefaultContextMenuGrid);
        $scope.contextMenuCategoryPost = {
            dataSource: itemContextMenus,
            width: 100,
            target: '#categoryPost',
            itemTemplate: angular.copy(DevExtremeService.TemplateContextMenuGrid),
            onItemClick: function (e) {
                if (!e.itemData.items) {
                    switch (e.itemData.value) {
                        case "add":
                            $scope.Create();
                            break;
                        case "edit":
                            $scope.Edit();
                            break;
                        case "delete":
                            $scope.Delete();
                            break;
                    }
                }
            }
        };


        Init();

        //---FUNCTION---
        function Init() {
            //Get All Category
            GetCategoryPosts();
        }

        //Get All Category Post
        function GetCategoryPosts() {
            CategoryPostService.GetListViewModel('table')
                .then(function success(response) {
                    $scope.categoryPosts = angular.copy(CommonService.GenMultiLevel(response.data));
                }, function error(response) {
                    toastr.error("Không lấy được Danh sách danh mục");
                }
                );

        }

        //Create
        $scope.Create = function () {
            CategoryPostService.RedirectCreate();
        };
        //Edit
        $scope.Edit = function () {
            if ($scope.selectedCategoryPosts.length === 0) {
                toastr.error("Chọn 1 dòng để sửa");
            } else {
                $scope.categoryPost = angular.copy($scope.selectedCategoryPosts[0]);
                CategoryPostService.RedirectEdit($scope.categoryPost.Id);
            }
        };
        //Delete
        $scope.Delete = function () {
            if ($scope.selectedCategoryPosts.length === 0) {
                toastr.error("Chọn dòng để xóa");
            } else {
                $scope.deleteCategoryPost.status = true;
            }
        };
        $scope.ConfirmDelete = function () {
            //Lấy mảng id cần xóa "id1,id2,id3..."
            var arrayIds = ArrayService.GetArrayIds($scope.selectedCategoryPosts);

            //Xóa
            CategoryPostService.DeleteList(arrayIds)
                .then(function success(response) {
                    GetCategoryPosts();

                    $scope.deleteCategoryPost.status = false;
                    toastr.success("Xóa thành công");
                }, function error(response) {
                    toastr.error("Không thể xóa");
                });
        };
        $scope.CancelDelete = function () {
            $scope.deleteCategoryPost.status = false;
        };
    }

})(angular.module('backend'));
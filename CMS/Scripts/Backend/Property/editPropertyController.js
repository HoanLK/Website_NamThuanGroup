(function (app) {
    'use strict';

    app.controller('editPropertyController', editPropertyController);

    editPropertyController.$inject = ['$scope', '$http', '$window', '$timeout', '$cookies', '$routeParams', 'ArrayService', 'CommonService', 'DateTimeService', 'DevExtremeService', 'StringService', 'PropertyService', 'CityService', 'DistrictService', 'WardsService', 'StreetService', 'PropertyTypeService'];

    function editPropertyController($scope, $http, $window, $timeout, $cookies, $routeParams, ArrayService, CommonService, DateTimeService, DevExtremeService, StringService, PropertyService, CityService, DistrictService, WardsService, StreetService, PropertyTypeService) {
        //---VAR---
        //Page
        $scope.page = {};
        //Property
        $scope.properties = [];
        $scope.property = {};
        $scope.tempProperty = {};
        $scope.selectedProperties = [];
        //Property Type
        $scope.propertyTypes = [];
        $scope.propertyType = {};
        //City
        $scope.cities = [];
        //District
        $scope.districts = [];
        //Wards
        $scope.wards = [];
        //Street
        $scope.streets = [];
        //Property Type
        $scope.propertyTypes = [];
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


        //--- CONTROL ---

        //City
        $scope.controlCity = {
            displayExpr: "Name",
            valueExpr: "Id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "- Chọn -",
            showClearButton: true,
            bindingOptions: {
                items: "cities",
                value: "property.CityId",
            },
            onSelectionChanged: function (e) {
                if (e.selectedItem != null) {
                    $timeout(function () {
                        //Get Districts
                        DistrictService.GetByCityId(e.selectedItem.Id)
                            .then(function success(response) {
                                $scope.districts = angular.copy(response.data);
                            }, function error(response) {
                                toastr.error("Không lấy được danh sách Quận/Huyện");
                            });
                    }, 500);
                } else {
                    $scope.districts = [];
                }
            }
        };
        //District
        $scope.controlDistrict = {
            displayExpr: "Name",
            valueExpr: "Id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "- Chọn -",
            showClearButton: true,
            bindingOptions: {
                items: "districts",
                value: "property.DistrictId",
                readOnly: '!property.CityId',
            },
            onSelectionChanged: function (e) {
                if (e.selectedItem != null) {
                    $timeout(function () {
                        //Get Wards
                        WardsService.GetByDistrictId(e.selectedItem.Id)
                            .then(function success(response) {
                                $scope.wards = angular.copy(response.data);
                            }, function error(response) {
                                toastr.error("Không lấy được danh sách Xã/Phường");
                            });
                        //Get Streets
                        StreetService.GetByDistrictId(e.selectedItem.Id)
                            .then(function success(response) {
                                $scope.streets = angular.copy(response.data);
                            }, function error(response) {
                                toastr.error("Không lấy được danh sách Đường/Phố");
                            });
                    }, 500);
                } else {
                    $scope.wards = [];
                    $scope.streets = [];
                }
            }
        };
        //Wards
        $scope.controlWards = {
            displayExpr: "Name",
            valueExpr: "Id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "- Chọn -",
            showClearButton: true,
            bindingOptions: {
                items: "wards",
                value: "property.WardsId",
                readOnly: '!property.DistrictId',
            }
        };
        //Street
        $scope.controlStreet = {
            displayExpr: "Name",
            valueExpr: "Id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "- Chọn -",
            showClearButton: true,
            bindingOptions: {
                items: "streets",
                value: "property.StreetId",
                readOnly: '!property.DistrictId',
            }
        };
        //Property Type
        $scope.controlPropertyType = {
            displayExpr: "Title",
            valueExpr: "Id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "- Chọn -",
            showClearButton: true,
            bindingOptions: {
                items: "propertyTypes",
                value: "property.PropertyTypeId"
            }
        };

        Init();

        //---FUNCTION---
        function Init() {
            //Get Id from URL
            $scope.id = $routeParams.id;

            //Edit
            if (CommonService.CheckNull($scope.id)) {
                $scope.page.title = "Sửa Bất động sản";
                GetProperty($scope.id);
            }
            //Create
            else {
                $scope.page.title = "Thêm Bất động sản";
                SetDefaultProperty();
            }

            //Get Cities
            GetCities();
            //Get Property Types
            GetPropertyTypes();

        }

        //Set Default Property
        function SetDefaultProperty() {
            $scope.property = {
                CityId: 'HAIDUONG',
                Published: true,
                Featured: false,
                Views: 0
            };
        }

        //Get Property
        function GetProperty(id) {
            PropertyService.GetById(id)
                .then(function success(response) {
                    $scope.property = angular.copy(response.data);
                    $scope.tempProperty = angular.copy($scope.property);
                }, function error(response) {
                    toastr.error("Không tìm thấy Bài viết");
                    PropertyService.RedirectList();
                });
        }

        //Get Cities
        function GetCities() {
            CityService.Gets()
                .then(function success(response) {
                    $scope.cities = angular.copy(response.data);
                }, function error(response) {
                    toastr.error("Không lấy được Danh sách Tỉnh/Thành");
                });

        }

        //Get Property Types
        function GetPropertyTypes() {
            PropertyTypeService.Gets()
                .then(function success(response) {
                    $scope.propertyTypes = angular.copy(response.data);
                }, function error(response) {
                    toastr.error("Không lấy được Danh sách Loại bất động sản");
                });
        }

        //Save
        $scope.Save = function (request) {
            if (CheckValid()) {
                //Edit
                if (CommonService.CheckNull($scope.id)) {
                    if (CheckChangeProperty()) {
                        PropertyService.Edit($scope.property.Id, $scope.property)
                            .then(function success(response) {
                                $scope.tempProperty = angular.copy($scope.property);
                                toastr.success("Lưu thành công");

                                PropertyService.RedirectAfterEdit(request);
                            }, function error(response) {
                                toastr.error("Lưu thất bại");
                            }
                            );
                    } else {
                        PropertyService.RedirectAfterEdit(request);
                    }
                }
                //Create
                else {
                    PropertyService.Create($scope.property)
                        .then(function success(response) {
                            toastr.success("Thêm thành công");
                            PropertyService.RedirectAfterCreate(request, response.data.Id);
                        }, function error(response) {
                            toastr.error("Thêm thất bại");
                        }
                        );
                }
            }
        };

        //Cancel
        $scope.Cancel = function () {
            PropertyService.RedirectCancel();
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
                $scope.property.Alias = StringService.GenAlias($scope.property.Title);
            }
        };

        //ChooseImage
        $scope.ChooseImage = function () {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.property.Image = fileUrl;
                $scope.$apply();
            };
            finder.SelectFunction = 'ShowFileInfo';
            finder.popup();
        };

        //---VALIDATE---
        //Check null
        $scope.CheckNullTitle = function () {
            if (CommonService.CheckNull($scope.property.Title)) {
                $scope.valid.Title = true;
                return true;
            } else {
                $scope.valid.Title = false;
                return false;
            }
        };
        $scope.CheckNullAlias = function () {
            if (CommonService.CheckNull($scope.property.Alias)) {
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
        //Check Change Property
        function CheckChangeProperty() {
            return !angular.equals($scope.property, $scope.tempProperty);
        }
    }

})(angular.module('backend'));
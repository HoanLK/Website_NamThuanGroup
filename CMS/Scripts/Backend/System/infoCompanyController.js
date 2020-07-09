backend.controller("infoCompanyController", ['$scope', '$http', '$window', '$cookies', '$routeParams', 'Services', function ($scope, $http, $window, $cookies, $routeParams, Services) {
    
    //---VAR---
    //Page
    $scope.page = {
        title: "Thông tin doanh nghiệp"
    };
    //Category Post
    $scope.infoCompanys = [];
    $scope.infoCompany = {};
    var apiInfoCompany = "/API/InfoCompanyAPI";
    //Valid
    $scope.valid = {
        NameCompany: false
    };

    Init();

    //---FUNCTION---
    function Init() {
        //Get Id
        $scope.id = 1;
        
        //Edit
        if (Services.CheckNull($scope.id)) {
            GetInfoCompany($scope.id);
        }

    }

    //Get Info Company
    function GetInfoCompany(id) {
        Services.Get(apiInfoCompany + "/" + id)
            .then(function success(response) {
                $scope.infoCompany = angular.copy(response.data);
            }, function error(response) {
                toastr.error("Không tìm thấy Thông tin doanh nghiệp");
                $window.location.href = '/Admin#!';
            });
    }

    //Save
    $scope.Save = function (request) {
        if (CheckValid()) {
            //Edit
            if (Services.CheckNull($scope.id)) {
                Services.Edit(apiInfoCompany, $scope.infoCompany.Id, $scope.infoCompany)
                    .then(function success(response) {
                        toastr.success("Lưu thành công");
                        switch (request) {
                            case 'Edit':
                                Init();
                                break;
                            case 'Exit':
                                $window.location.href = '/Admin#!';
                                break;
                        }
                    }, function error(response) {
                        toastr.error("Lưu thất bại");
                    }
                    );
            }
            
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin#!';
    }

    

    //ChooseImage
    $scope.ChooseLogo = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.infoCompany.Logo = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //---VALIDATE---
    $scope.CheckNullNameCompany = function () {
        if (Services.CheckNull($scope.infoCompany.NameCompany)) {
            $scope.valid.NameCompany = true;
            return true;
        } else {
            $scope.valid.NameCompany = false;
            return false;
        }
    }
    function CheckValid() {
        var count = 0;
        angular.forEach($scope.valid, function (value, index) {
            if (!value) {
                switch (index) {
                    case 'NameCompany':
                        toastr.error("Nhập tên doanh nghiệp");
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

}]);
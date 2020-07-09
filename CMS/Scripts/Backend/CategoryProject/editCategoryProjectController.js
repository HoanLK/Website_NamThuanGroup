backend.controller("editCategoryProjectController", ['$scope', '$http', '$window', '$cookies', '$routeParams', 'Services', function ($scope, $http, $window, $cookies, $routeParams, Services) {
    
    //---VAR---
    //Page
    $scope.page = {};
    //Category Project
    $scope.categoryProjects = [];
    $scope.tempCategoryProjects = [];
    $scope.categoryProject = {
        Published: true,
        TimeCreated: new Date()
    };
    $scope.selectedCategoryProjects = [];
    var apiCategoryProject = "/API/CategoryProjectAPI";
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
        if (Services.CheckNull($scope.id)) {
            $scope.page.title = "Sửa Danh mục Dự án";
            GetCategoryProject($scope.id);
        }
        //Create
        else {
            $scope.page.title = "Thêm Danh mục Dự án";
            SetDefaultCategoryProject();
        }

        //Get All Category
        GetAllCategoryProject();
        //Get current account
        Services.GetCurrentAccount()
            .then(function (response) {
                $scope.categoryProject.UserId = response.data.Id;
            });

    }

    //Set Default Category Project
    function SetDefaultCategoryProject() {
        $scope.categoryProject = {
            Published: true,
            TimeCreated: Services.ToUTCDate(new Date())
        };
    }

    //Get Category Project
    function GetCategoryProject(id) {
        Services.Get(apiCategoryProject + "/" + id)
            .then(function success(response) {
                $scope.categoryProject = angular.copy(response.data);
            }, function error(response) {
                toastr.error("Không tìm thấy Danh mục");
                $window.location.href = '/Admin#!/category-project';
            });
    }

    //Get All Category Project
    function GetAllCategoryProject() {
        Services.Get(apiCategoryProject + "?viewmodel=true&&type=select")
            .then(function success(response) {
                $scope.categoryProjects = angular.copy(Services.GenMultiLevel(response.data));
            }, function error(response) {
                toastr.error("Không lấy được Danh sách danh mục");
            }
            );

    }

    //Save
    $scope.Save = function (request) {
        if (CheckValid()) {
            //Edit
            if (Services.CheckNull($scope.id)) {
                Services.Edit(apiCategoryProject, $scope.categoryProject.Id, $scope.categoryProject)
                    .then(function success(response) {
                        toastr.success("Lưu thành công");
                        switch (request) {
                            case 'Edit':
                                Init();
                                break;
                            case 'New':
                                $window.location.href = '/Admin#!/category-project/edit';
                                break;
                            case 'Exit':
                                $window.location.href = '/Admin#!/category-project';
                                break;
                        }
                    }, function error(response) {
                        toastr.error("Lưu thất bại");
                    }
                    );
            }
            //Create
            else {
                Services.Create(apiCategoryProject, $scope.categoryProject)
                    .then(function success(response) {
                        toastr.success("Thêm thành công");
                        switch (request) {
                            case 'Edit':
                                $window.location.href = '/Admin#!/category-project/edit/' + response.data.Id;
                                break;
                            case 'New':
                                Init();
                                break;
                            case 'Exit':
                                $window.location.href = '/Admin#!/category-project';
                                break;
                        }
                    }, function error(response) {
                        toastr.error("Thêm thất bại");
                    }
                    );
            }


            
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin#!/category-project';
    }

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
            $scope.categoryProject.Alias = Services.GenAlias($scope.categoryProject.Title);
        }
    }

    //ChooseImage
    $scope.ChooseImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.categoryProject.Image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //---VALIDATE---
    $scope.CheckNullTitle = function () {
        if (Services.CheckNull($scope.categoryProject.Title)) {
            $scope.valid.Title = true;
            return true;
        } else {
            $scope.valid.Title = false;
            return false;
        }
    }
    $scope.CheckNullAlias = function () {
        if (Services.CheckNull($scope.categoryProject.Alias)) {
            $scope.valid.Alias = true;
            return true;
        } else {
            $scope.valid.Alias = false;
            return false;
        }
    }
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

}]);
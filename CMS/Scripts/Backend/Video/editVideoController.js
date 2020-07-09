backend.controller("editVideoController", ['$scope', '$http', '$window', '$cookies', '$routeParams', '$sce', 'Services', function ($scope, $http, $window, $cookies, $routeParams, $sce, Services) {
    //---VAR---
    //Page
    $scope.page = {};
    //Video
    $scope.videos = [];
    $scope.tempVideos = [];
    $scope.video = {};
    $scope.selectedVideos = [];
    var apiVideo = "/API/VideoAPI";
    //Valid
    $scope.valid = {
        Title: false,
        Alias: false,
        VideoUrl: false
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
            $scope.page.title = "Sửa video";
            GetVideo($scope.id);
        }
        //Create
        else {
            $scope.page.title = "Thêm video";
            SetDefaultVideo();
        }

        //Get current account
        Services.GetCurrentAccount()
            .then(function (response) {
                $scope.video.UserId = response.data.Id;
            });

    }

    //Set Default Video
    function SetDefaultVideo() {
        $scope.video = {
            Published: true,
            TimeCreated: Services.ToUTCDate(new Date()),
            Views: 0
        };
    }

    //Get Category Video
    function GetVideo(id) {
        Services.Get(apiVideo + '/' + id)
            .then(function success(response) {
                $scope.video = angular.copy(response.data);
            }, function error(response) {
                toastr.error("Không tìm thấy Videp");
                $window.location.href = '/Admin#!/video';
            });
    }

    //Save
    $scope.Save = function (request) {
        if (CheckValid()) {
            //Edit
            if (Services.CheckNull($scope.id)) {
                Services.Edit(apiVideo, $scope.video.Id, $scope.video)
                    .then(function success(response) {
                        toastr.success("Lưu thành công");
                        switch (request) {
                            case 'Edit':
                                Init();
                                break;
                            case 'New':
                                $window.location.href = '/Admin#!/video/edit';
                                break;
                            case 'Exit':
                                $window.location.href = '/Admin#!/video';
                                break;
                        }
                    }, function error(response) {
                        toastr.error("Lưu thất bại");
                    }
                    );
            }
            //Create
            else {
                Services.Create(apiVideo, $scope.video)
                    .then(function success(response) {
                        toastr.success("Thêm thành công");
                        switch (request) {
                            case 'Edit':
                                $window.location.href = '/Admin#!/video/edit/' + response.data.Id;
                                break;
                            case 'New':
                                Init();
                                break;
                            case 'Exit':
                                $window.location.href = '/Admin#!/video';
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
        $window.location.href = '/Admin#!/video';
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
            $scope.video.Alias = Services.GenAlias($scope.video.Title);
        }
    }

    //ChooseImage
    $scope.ChooseImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.video.Image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //---VALIDATE---
    $scope.CheckNullTitle = function () {
        if (Services.CheckNull($scope.video.Title)) {
            $scope.valid.Title = true;
            return true;
        } else {
            $scope.valid.Title = false;
            return false;
        }
    }
    $scope.CheckNullAlias = function () {
        if (Services.CheckNull($scope.video.Alias)) {
            $scope.valid.Alias = true;
            return true;
        } else {
            $scope.valid.Alias = false;
            return false;
        }
    }
    $scope.CheckNullVideoUrl = function () {
        if (Services.CheckNull($scope.video.VideoUrl)) {
            $scope.valid.VideoUrl = true;
            return true;
        } else {
            $scope.valid.VideoUrl = false;
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
                    case 'VideoUrl':
                        toastr.error("Nhập Link video");
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
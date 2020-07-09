backend.controller("editAlbumImageController", ['$scope', '$http', '$window', '$cookies', '$routeParams', 'Services', function ($scope, $http, $window, $cookies, $routeParams, Services) {
    //---VAR---
    //Page
    $scope.page = {};
    //AlbumImage
    $scope.albumImages = [];
    $scope.tempAlbumImages = [];
    $scope.albumImage = {};
    $scope.selectedAlbumImages = [];
    var apiAlbumImage = "/API/AlbumImageAPI";
    //Image
    $scope.images = [];
    $scope.image = {};
    $scope.changeImage = false;
    apiImageAlbumImage = '/API/ItemAlbumImageAPI';
    //Valid
    $scope.valid = {
        Title: false,
        Alias: false
    };
    $scope.validImage = {
        Image: false
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

    //---POPUP---
    //Edit Image
    $scope.modifyImage = false;
    $scope.titlePopupModifyImage = "Thêm hình ảnh";
    $scope.popupModifyImage = {
        maxWidth: 600,
        height: "auto",
        contentTemplate: "templateModifyImage",
        showTitle: true,
        resizeEnabled: true,
        bindingOptions: {
            title: "titlePopupModifyImage",
            visible: "modifyImage",
        }
    };
    $scope.deleteImage = false;
    $scope.titleDeleteImage = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteImage = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteImage",
        showTitle: false,
        bindingOptions: {
            visible: "deleteImage",
        }
    };

    Init();

    //---FUNCTION---
    function Init() {
        //Get Id from URL
        $scope.id = $routeParams.id;
        $scope.changeImage = false;
        //Edit
        if (Services.CheckNull($scope.id)) {
            $scope.page.title = "Sửa Album hình ảnh";
            GetAlbumImage($scope.id);
        }
        //Create
        else {
            $scope.page.title = "Thêm Album hình ảnh";
            SetDefaultAlbumImage();
        }

        //Get current account
        Services.GetCurrentAccount()
            .then(function (response) {
                $scope.albumImage.UserId = response.data.Id;
            });

    }

    //Set Default AlbumImage
    function SetDefaultAlbumImage() {
        $scope.albumImage = {
            Published: true,
            TimeCreated: Services.ToUTCDate(new Date()),
            Views: 0
        };
        $scope.image = {};
        $scope.images = [];
    }

    //Get AlbumImage
    function GetAlbumImage(id) {
        Services.Get(apiAlbumImage + '/' + id)
            .then(function success(response) {
                $scope.albumImage = angular.copy(response.data);
                //Get Images
                Services.Get(apiImageAlbumImage + '?request=ByAlbum&&value=' + $scope.albumImage.Id)
                    .then(function success(response) {
                        $scope.images = angular.copy(response.data);
                    }, function error(response) {
                        toastr.error("Không lấy được hình ảnh");
                    });
            }, function error(response) {
                toastr.error("Không tìm thấy Album hình ảnh");
                $window.location.href = '/Admin#!/album-image';
            });
    }

    //Save
    $scope.Save = function (request) {
        if (CheckValid()) {

            //Edit
            if (Services.CheckNull($scope.id)) {
                Services.Edit(apiAlbumImage, $scope.albumImage.Id, $scope.albumImage)
                    .then(function success(response) {
                        if ($scope.changeImage == true) {
                            //Delete Old Images
                            Services.DeleteByRequest(apiImageAlbumImage, "ByAlbum", $scope.albumImage.Id)
                                .then(function success(response) {
                                    if (response.data == 1) {
                                        //Gán albumImage cho images
                                        angular.forEach($scope.images, function (value, index) {
                                            $scope.images[index].AlbumId = $scope.albumImage.Id;
                                        });
                                        //Save images
                                        Services.Create('/ItemAlbumImage/AddList', $scope.images)
                                            .then(function success(response) {
                                                toastr.success("Lưu thành công");
                                                switch (request) {
                                                    case 'Edit':
                                                        Init();
                                                        break;
                                                    case 'New':
                                                        $window.location.href = '/Admin#!/album-image/edit';
                                                        break;
                                                    case 'Exit':
                                                        $window.location.href = '/Admin#!/album-image';
                                                        break;
                                                }
                                            }, function error(response) {
                                                toastr.error("Lưu thất bại");
                                            })
                                    }
                                }, function error(response) {

                                });
                        } else {
                            toastr.success("Lưu thành công");
                            switch (request) {
                                case 'Edit':
                                    Init();
                                    break;
                                case 'New':
                                    $window.location.href = '/Admin#!/album-image/edit';
                                    break;
                                case 'Exit':
                                    $window.location.href = '/Admin#!/album-image';
                                    break;
                            }
                        }
                    }, function error(response) {
                        toastr.error("Lưu thất bại");
                    }
                    );
            }
            //Create
            else {
                //Save albumImage
                Services.Create(apiAlbumImage, $scope.albumImage)
                    .then(function success(response) {
                        $scope.albumImage = angular.copy(response.data);
                        //Gán albumImage cho images
                        angular.forEach($scope.images, function (value, index) {
                            $scope.images[index].AlbumId = $scope.albumImage.Id;
                        });
                        //Save images
                        Services.Create('/ItemAlbumImage/AddList', $scope.images)
                            .then(function success(response) {
                                toastr.success("Thêm thành công");
                                switch (request) {
                                    case 'Edit':
                                        $window.location.href = '/Admin#!/album-image/edit/' + $scope.albumImage.Id;
                                        break;
                                    case 'New':
                                        Init();
                                        break;
                                    case 'Exit':
                                        $window.location.href = '/Admin#!/album-image';
                                        break;
                                }
                            }, function error(response) {
                                toastr.error("Thêm thất bại");
                            });

                    }, function error(response) {
                        toastr.error("Thêm thất bại");
                    }
                    );
            }
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin#!/album-image';
    }


    //---IMAGES---
    //Edit Image
    $scope.AddImage = function () {
        $scope.modifyImage = true;
        $scope.image = {};
    }
    $scope.SaveImage = function () {
        if (CheckValidImage()) {
            $scope.changeImage = true;
            $scope.modifyImage = false;
            if (angular.isDefined($scope.image.index)) {
                $scope.images[$scope.image.index] = angular.copy($scope.image);
            } else {
                $scope.images.push($scope.image);
            }
            $scope.image = {};
        }
    }
    $scope.CancelSaveImage = function () {
        $scope.modifyImage = false;
        $scope.image = {};
    }
    $scope.EditImage = function (index) {
        $scope.modifyImage = true;
        $scope.image = angular.copy($scope.images[index]);
        $scope.image.index = angular.copy(index);
    }
    $scope.DeleteImage = function (index) {
        $scope.deleteImage = true;
        $scope.image = angular.copy($scope.images[index]);
        $scope.image.index = angular.copy(index);
    }
    $scope.ConfirmDeleteImage = function () {
        $scope.changeImage = true;
        $scope.deleteImage = false;
        $scope.images.splice($scope.image.index, 1);
    }
    $scope.CancelDeleteImage = function () {
        $scope.deleteImage = false;
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
            $scope.albumImage.Alias = Services.GenAlias($scope.albumImage.Title);
        }
    }

    //ChooseImage
    $scope.ChooseImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.albumImage.Image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //ChooseItemAlbumImage
    $scope.ChooseItemAlbumImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.image.Image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //---VALIDATE---
    $scope.CheckNullTitle = function () {
        if (Services.CheckNull($scope.albumImage.Title)) {
            $scope.valid.Title = true;
            return true;
        } else {
            $scope.valid.Title = false;
            return false;
        }
    }
    $scope.CheckNullAlias = function () {
        if (Services.CheckNull($scope.albumImage.Alias)) {
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
    //Validate Image
    $scope.CheckNullImage = function () {
        if (Services.CheckNull($scope.image.Image)) {
            $scope.validImage.Image = true;
            return true;
        } else {
            $scope.validImage.Image = false;
            return false;
        }
    }
    function CheckValidImage() {
        var count = 0;
        angular.forEach($scope.validImage, function (value, index) {
            if (!value) {
                switch (index) {
                    case 'Image':
                        toastr.error("Chọn hình ảnh");
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
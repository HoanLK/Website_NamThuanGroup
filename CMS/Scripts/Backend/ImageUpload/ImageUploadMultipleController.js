(function (app) {
    'use strict';

    app.controller('ImageUploadMultipleCtrl', ImageUploadMultipleCtrl);

    ImageUploadMultipleCtrl.$inject = ['$scope'];

    function ImageUploadMultipleCtrl($scope) {
        $scope.fileList = [];
        $scope.curFile;
        $scope.ImageProperty = {
            file: ''
        }
        $scope.setFile = function (element) {
            $scope.fileList = [];

            var files = element.files;
            for (var i = 0; i < files.length; i++) {
                $scope.ImageProperty.file = files[i];

                $scope.fileList.push($scope.ImageProperty);
                $scope.ImageProperty = {};
                $scope.$apply();
            }
        }
        $scope.UploadFile = function () {
            for (var i = 0; i < $scope.fileList.length; i++) {
                $scope.UploadFileIndividual($scope.fileList[i].file,
                    $scope.fileList[i].file.name,
                    $scope.fileList[i].file.type,
                    $scope.fileList[i].file.size,
                    i);
            }
        }
        $scope.UploadFileIndividual = function (fileToUpload, name, type, size, index) {
            var reqObj = new XMLHttpRequest();
            reqObj.upload.addEventListener("progress", uploadProgress, false)
            reqObj.addEventListener("load", uploadComplete, false)
            reqObj.addEventListener("error", uploadFailed, false)
            reqObj.addEventListener("abort", uploadCanceled, false)
            reqObj.open("POST", "/FileUpload/UploadFiles", true);
            reqObj.setRequestHeader("Content-Type", "multipart/form-data");
            reqObj.setRequestHeader('X-File-Name', name);
            reqObj.setRequestHeader('X-File-Type', type);
            reqObj.setRequestHeader('X-File-Size', size);
            reqObj.send(fileToUpload);
            function uploadProgress(evt) {
                if (evt.lengthComputable) {
                    var uploadProgressCount = Math.round(evt.loaded * 100 / evt.total);
                    document.getElementById('P' + index).innerHTML = uploadProgressCount;
                    if (uploadProgressCount == 100) {
                        document.getElementById('P' + index).innerHTML =
                            '<i class="fa fa-refresh fa-spin" style="color:green;"></i>';
                    }
                }
            }
            function uploadComplete(evt) {
                document.getElementById('P' + index).innerHTML = '<span style="color:Green;font-weight:bold;font-style: oblique">Saved..</span>';
                $scope.NoOfFileSaved++;
                $scope.$apply();
            }
            function uploadFailed(evt) {
                document.getElementById('P' + index).innerHTML = '<span style="color:Red;font-weight:bold;font-style: oblique">Upload Failed..</span>';
            }
            function uploadCanceled(evt) {
                document.getElementById('P' + index).innerHTML = '<span style="color:Red;font-weight:bold;font-style: oblique">Canceled..</span>';
            }
        }
    }


})(angular.module('backend'));
import templateUrl from "./create.component.html";

export default class PostCreateController {
  constructor(
    $rootScope,
    $scope,
    $http,
    $window,
    CommonService,
    PostService,
    PostCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.$http = $http;
    this.$window = $window;
    this.commonService = CommonService;
    this.postService = PostService;
    this.postCategoryService = PostCategoryService;

    this.$scope.categories = [];
    this.$scope.treeViewInstance = {};
    this.$scope.statuses = [
      {
        value: true,
        text: "Xuất bản",
      },
      {
        value: false,
        text: "Không xuất bản",
      },
    ];
    this.$scope.data = {
      Title: null,
      Alias: null,
      Description: null,
      Content: null,
      CategoryId: null,
      Published: true,
      Featured: false,
      Image: null,
      Tags: null,
    };

    // SET TITLE
    $rootScope.title = "Thêm bài viết";
    this.header = "THÊM BÀI VIẾT";
  }

  // INIT
  $onInit() {
    this.getPostCategories();
    this.initControls();
  }

  // INIT CONTROLS
  initControls() {
    this.controls = {
      tbTitle: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Title",
        },
        onFocusOut: (e) => {
          if (!this.commonService.isNullOrEmpty(this.$scope.data.Title)) {
            this.$scope.data.Alias = this.commonService.genAlias(
              this.$scope.data.Title
            );
          }
        },
      },
      tbAlias: {
        showClearButton: true,
        readOnly: true,
        bindingOptions: {
          value: "data.Alias",
        },
      },
      taDescription: {
        height: 100,
        bindingOptions: {
          value: "data.Description",
        },
      },
      ddbCategory: {
        bindingOptions: {
          dataSource: "categories",
          value: "data.CategoryId",
        },
        valueExpr: "Id",
        displayExpr: "Title",
        placeholder: "Chọn danh mục ...",
        showClearButton: true,
        onValueChanged: (e) => {
          if (!this.$scope.data.CategoryId) {
            this.$scope.treeViewInstance.unselectAll();
          } else {
            this.$scope.treeViewInstance.selectItem(
              this.$scope.data.CategoryId
            );
          }
        },
        treeView: {
          bindingOptions: {
            dataSource: "categories",
          },
          dataStructure: "plain",
          displayExpr: "Title",
          expandedExpr: "Expanded",
          expandAllEnabled: true,
          keyExpr: "Id",
          parentIdExpr: "ParentId",
          selectByClick: true,
          selectNodesRecursive: false,
          selectionMode: "single",
          showCheckBoxesMode: "normal",
          onContentReady: (e) => {
            this.$scope.treeViewInstance = e.component;

            if (!this.$scope.data.CategoryId) {
              this.$scope.treeViewInstance.unselectAll();
            } else {
              this.$scope.treeViewInstance.selectItem(
                this.$scope.data.CategoryId
              );
            }
          },
          onItemSelectionChanged: (args) => {
            this.$scope.data.CategoryId = args.component.getSelectedNodeKeys()[0];
          },
        },
      },
      slbStatus: {
        bindingOptions: {
          value: "data.Published",
          dataSource: "statuses",
        },
        displayExpr: "text",
        valueExpr: "value",
      },
      cbFeatured: {
        bindingOptions: {
          value: "data.Featured",
        },
        text: " Nổi bật",
      },
      tbImage: {
        bindingOptions: {
          value: "data.Image",
        },
        buttons: [
          {
            location: "after",
            name: "chooseImage",
            options: {
              icon: "image",
              hint: "Chọn hình ảnh",
              onClick: (e) => {
                var finder = new CKFinder();
                finder.selectActionFunction = (fileUrl) => {
                  this.$scope.data.Image = fileUrl;
                  this.$scope.$apply();
                };
                finder.SelectFunction = "ShowFileInfo";
                finder.popup();
              },
            },
          },
        ],
      },
      taNote: {
        height: 80,
        bindingOptions: {
          value: "data.Note",
        },
      },
      btnSave: {
        icon: "fa fa-save",
        text: "LƯU",
        type: "success",
        useSubmitBehavior: true,
      },
    };
    this.validators = {
      title: {
        validationRules: [
          {
            type: "required",
            message: "Nhập tiêu đề",
          },
        ],
      },
    };
  }

  // Get Categories
  getPostCategories() {
    // Get Categories
    this.postCategoryService
      .gets(["Id", "Title", "ParentId"])
      .load()
      .then(
        (res) => {
          this.$scope.categories = res.data;
          this.$scope.categories.forEach((e) => {
            e.Expanded = true;
          });
        },
        (res) => {
          toastr.error("Không lấy được danh sách Danh mục");
        }
      );
  }

  // SAVE
  onSave(e) {
    console.log(this.$scope.data);
  }
}

PostCreateController.$inject = [
  "$rootScope",
  "$scope",
  "$http",
  "$window",
  "CommonService",
  "PostService",
  "PostCategoryService",
];

export const PostCreateComponent = {
  template: templateUrl,
  controller: PostCreateController,
};

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

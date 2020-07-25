import templateUrl from "./post-edit.component.html";

export default class PostEditController {
  constructor(
    $rootScope,
    $scope,
    $stateParams,
    $timeout,
    DevextremeService,
    CommonService,
    PostService,
    PostCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.devextremeService = DevextremeService;
    this.commonService = CommonService;
    this.postService = PostService;
    this.postCategoryService = PostCategoryService;

    this.treeViewInstance = {};
    this.loadPanelInstance = {};

    this.$scope.rootValue = null;
    this.$scope.categories = [];
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

    this.$scope.id = this.$stateParams.id;
    this.$scope.data = {};

    // SET TITLE
    $rootScope.title = "Sửa bài viết";
  }

  // INIT
  $onInit() {
    this.initControls();
    this.getPost();
    this.getPostCategories();
  }

  // INIT CONTROLS
  initControls() {
    this.controls = {
      tbTitle: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Title",
        },
      },
      tbAlias: {
        showClearButton: true,
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
          rootValue: "rootValue",
          value: "data.CategoryId",
        },
        valueExpr: "Id",
        displayExpr: "Title",
        placeholder: "Chọn danh mục ...",
        showClearButton: true,
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
            this.treeViewInstance = e.component;

            if (!this.$scope.data.CategoryId) {
              this.treeViewInstance.unselectAll();
            } else {
              this.treeViewInstance.selectItem(this.$scope.data.CategoryId);
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
                this.chooseImage();
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
      // SEO
      tbSEOTitle: {
        showClearButton: true,
        bindingOptions: {
          value: "data.SEO_Title",
        },
      },
      taSEODescription: {
        height: 100,
        bindingOptions: {
          value: "data.SEO_Description",
        },
      },
      btnSave: {
        icon: "fa fa-save",
        text: "LƯU",
        type: "success",
        useSubmitBehavior: true,
      },
      btnClose: {
        icon: "fa fa-times",
        text: "ĐÓNG",
        type: "danger",
        onClick: () => {
          this.postService.redirectList();
        },
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

    this.loadPanel = angular.extend(
      angular.copy(this.devextremeService.getDefaultLoadPanel()),
      {
        message: `Đang xử lý`,
        onInitialized: (e) => {
          this.loadPanelInstance = e.component;
        },
      }
    );
  }

  // Get Post
  getPost() {
    this.$timeout(() => {
      this.loadPanelInstance.show();
    });

    this.postService.get(this.$scope.id).then(
      (res) => {
        angular.copy(res.data, this.$scope.data);

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lấy dữ liệu bài viết", "Thất bại");
        this.postService.redirectList();

        this.loadPanelInstance.hide();
      }
    );
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

  // Choose Image
  chooseImage() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.Image = fileUrl;
      this.$scope.data.SEO_Image = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }

  // Clear Image
  clearImage() {
    this.$scope.data.Image = "";
    this.$scope.data.SEO_Image = "";
  }

  // SAVE
  onSave(e) {
    this.loadPanelInstance.show();

    this.postService.edit(this.$scope.id, this.$scope.data).then(
      (res) => {
        toastr.success("Lưu bài viết", "Thành công");

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lưu bài viết", "Thất bại");

        this.loadPanelInstance.hide();
      }
    );
  }
}

PostEditController.$inject = [
  "$rootScope",
  "$scope",
  "$stateParams",
  "$timeout",
  "DevextremeService",
  "CommonService",
  "PostService",
  "PostCategoryService",
];

export const PostEditComponent = {
  template: templateUrl,
  controller: PostEditController,
};

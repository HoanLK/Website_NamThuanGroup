import templateUrl from "./post-create.component.html";

export default class PostCreateController {
  constructor(
    $rootScope,
    $scope,
    DevextremeService,
    CommonService,
    PostService,
    PostCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
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
      Note: null,
      SEO_Title: null,
      SEO_Description: null,
      SEO_Keywords: null,
      SEO_Image: null,
    };

    // SET TITLE
    $rootScope.title = "Thêm bài viết";
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
          } else {
            this.$scope.data.Alias = null;
          }

          this.$scope.data.SEO_Title = this.$scope.data.Title;
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
        onFocusOut: (e) => {
          this.$scope.data.SEO_Description = this.$scope.data.Description;
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

    this.postService.create(this.$scope.data).then(
      (res) => {
        this.postService.redirectEdit(res.data);
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

PostCreateController.$inject = [
  "$rootScope",
  "$scope",
  "DevextremeService",
  "CommonService",
  "PostService",
  "PostCategoryService",
];

export const PostCreateComponent = {
  template: templateUrl,
  controller: PostCreateController,
};

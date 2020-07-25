import templateUrl from "./post-category-create.component.html";

export default class PostCategoryCreateController {
  constructor(
    $rootScope,
    $scope,
    DevextremeService,
    CommonService,
    PostCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.postCategoryService = PostCategoryService;

    this.treeViewInstance = {};
    this.loadPanelInstance = {};

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
      ParentId: null,
      Title: null,
      Alias: null,
      Description: null,
      Content: null,
      Published: true,
      Featured: false,
      Image: null,
      ImageBanner: null,
      Tags: null,
      Note: null,
      SEO_Title: null,
      SEO_Description: null,
      SEO_Keywords: null,
      SEO_Image: null,
    };

    // SET TITLE
    $rootScope.title = "Thêm danh mục";
  }

  // INIT
  $onInit() {
    this.initControls();
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
          value: "data.ParentId",
        },
        valueExpr: "Id",
        displayExpr: "Title",
        placeholder: "Chọn danh mục cha ...",
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

            if (!this.$scope.data.ParentId) {
              this.treeViewInstance.unselectAll();
            } else {
              this.treeViewInstance.selectItem(this.$scope.data.ParentId);
            }
          },
          onItemSelectionChanged: (args) => {
            this.$scope.data.ParentId = args.component.getSelectedNodeKeys()[0];
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
      tbImageBanner: {
        bindingOptions: {
          value: "data.ImageBanner",
        },
        buttons: [
          {
            location: "after",
            name: "chooseImageBanner",
            options: {
              icon: "image",
              hint: "Chọn hình ảnh",
              onClick: (e) => {
                this.chooseImageBanner();
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
          this.postCategoryService.redirectList();
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

  // Choose Image Banner
  chooseImageBanner() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.ImageBanner = fileUrl;
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

    this.postCategoryService.create(this.$scope.data).then(
      (res) => {
        this.postCategoryService.redirectEdit(res.data);
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

PostCategoryCreateController.$inject = [
  "$rootScope",
  "$scope",
  "DevextremeService",
  "CommonService",
  "PostCategoryService",
];

export const PostCategoryCreateComponent = {
  template: templateUrl,
  controller: PostCategoryCreateController,
};

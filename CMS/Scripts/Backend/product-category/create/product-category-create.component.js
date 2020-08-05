﻿import templateUrl from "./product-category-create.component.html";

export default class ProductCategoryCreateController {
  constructor(
    $rootScope,
    $scope,
    DevextremeService,
    CommonService,
    ProductCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.productCategoryService = ProductCategoryService;

    this.loadPanelInstance = {};

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
      VN_Name: null,
      VN_Description: null,
      VN_Content: null,
      EN_Name: null,
      EN_Description: null,
      EN_Content: null,
      Published: true,
      Featured: false,
      Image: null,
      ImageBanner: null,
      Tags: null,
      SortOrder: 0,
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
  }

  // INIT CONTROLS
  initControls() {
    this.controls = {
      tbVNName: {
        showClearButton: true,
        bindingOptions: {
          value: "data.VN_Name",
        },
        onFocusOut: (e) => {
          this.$scope.data.SEO_Title = this.$scope.data.VN_Name;
        },
      },
      taVNDescription: {
        showClearButton: true,
        bindingOptions: {
          value: "data.VN_Description",
        },
        onFocusOut: (e) => {
          this.$scope.data.SEO_Description = this.$scope.data.VN_Description;
        },
      },
      tbENName: {
        showClearButton: true,
        bindingOptions: {
          value: "data.EN_Name",
        },
      },
      taENDescription: {
        showClearButton: true,
        bindingOptions: {
          value: "data.EN_Description",
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
      nbSortOrder: {
        showClearButton: true,
        bindingOptions: {
          value: "data.SortOrder",
        },
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
          this.productCategoryService.redirectList();
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
  // Clear Image Banner
  clearImageBanner() {
    this.$scope.data.ImageBanner = "";
  }

  // SAVE
  onSave(e) {
    this.loadPanelInstance.show();

    this.productCategoryService.create(this.$scope.data).then(
      (res) => {
        this.productCategoryService.redirectEdit(res.data);
        toastr.success("Lưu sản phẩm", "Thành công");

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lưu sản phẩm", "Thất bại");

        this.loadPanelInstance.hide();
      }
    );
  }
}

ProductCategoryCreateController.$inject = [
  "$rootScope",
  "$scope",
  "DevextremeService",
  "CommonService",
  "ProductCategoryService",
];

export const ProductCategoryCreateComponent = {
  template: templateUrl,
  controller: ProductCategoryCreateController,
};
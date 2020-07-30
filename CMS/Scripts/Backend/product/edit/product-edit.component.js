import templateUrl from "./product-edit.component.html";

export default class ProductEditController {
  constructor(
    $rootScope,
    $scope,
    $stateParams,
    $timeout,
    DevextremeService,
    CommonService,
    ProductService,
    ProductCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.devextremeService = DevextremeService;
    this.commonService = CommonService;
    this.productService = ProductService;
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

    this.id = this.$stateParams.id;
    this.$scope.data = {};
    // Categories
    this.$scope.categories = [];
    this.$scope.$watch(
      () => {
        return this.productCategoryService.getCategories();
      },
      (newValue, oldValue) => {
        this.$scope.categories = newValue;
      }
    );

    // SET TITLE
    $rootScope.title = "Sửa sản phẩm";
  }

  // INIT
  $onInit() {
    this.initControls();
    this.getProduct();
  }

  // INIT CONTROLS
  initControls() {
    this.controls = {
      slbCategory: {
        displayExpr: "VN_Name",
        valueExpr: "Id",
        searchEnabled: true,
        placeholder: "Chọn danh mục ...",
        showClearButton: true,
        bindingOptions: {
          dataSource: "categories",
          value: "data.CategoryId",
        },
      },
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
          this.productService.redirectList();
        },
      },
    };

    this.validators = {
      title: {
        validationRules: [
          {
            type: "required",
            message: "Nhập tên sản phẩm",
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

  // Get Product
  getProduct() {
    this.productService.get(this.id).then(
      (res) => {
        angular.copy(res.data, this.$scope.data);
      },
      (res) => {
        toastr.error("Lấy dữ liệu", "Thất bại");
      }
    );
  }

  // --- IMAGE ---
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

  // --- IMAGE BANNER ---
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

  // --- IMAGES ---
  // Add Image
  addImage() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.Images.push(fileUrl);
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Update Image
  updateImage(index) {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.Images[index] = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Remove Image
  removeImage(index) {
    this.$scope.data.Images.splice(index, 1);
    this.$scope.$apply();
  }

  // SAVE
  onSave(e) {
    this.loadPanelInstance.show();

    this.productService.edit(this.id, this.$scope.data).then(
      (res) => {
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

ProductEditController.$inject = [
  "$rootScope",
  "$scope",
  "$stateParams",
  "$timeout",
  "DevextremeService",
  "CommonService",
  "ProductService",
  "ProductCategoryService",
];

export const ProductEditComponent = {
  template: templateUrl,
  controller: ProductEditController,
};

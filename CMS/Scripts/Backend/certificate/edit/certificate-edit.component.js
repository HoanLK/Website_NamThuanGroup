import templateUrl from "./certificate-edit.component.html";

export default class CertificateEditController {
  constructor(
    $rootScope,
    $scope,
    $stateParams,
    $timeout,
    DevextremeService,
    CommonService,
    CertificateService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.devextremeService = DevextremeService;
    this.commonService = CommonService;
    this.certificateService = CertificateService;

    this.treeViewInstance = {};
    this.loadPanelInstance = {};

    this.$scope.rootValue = null;
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
    $rootScope.title = "Sửa chứng chỉ";
  }

  // INIT
  $onInit() {
    this.initControls();
    this.getCertificate();
  }

  // INIT CONTROLS
  initControls() {
    this.controls = {
      tbName: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Name",
        },
      },
      taDescription: {
        height: 100,
        bindingOptions: {
          value: "data.Description",
        },
      },
      tbLink: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Link",
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
          this.certificateService.redirectList();
        },
      },
    };

    this.validators = {
      name: {
        validationRules: [
          {
            type: "required",
            message: "Nhập tên chứng chỉ",
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

  // Get Certificate
  getCertificate() {
    this.$timeout(() => {
      this.loadPanelInstance.show();
    });

    this.certificateService.get(this.$scope.id).then(
      (res) => {
        angular.copy(res.data, this.$scope.data);

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lấy dữ liệu chứng chỉ", "Thất bại");
        this.certificateService.redirectList();

        this.loadPanelInstance.hide();
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

    this.certificateService.edit(this.$scope.id, this.$scope.data).then(
      (res) => {
        toastr.success("Lưu chứng chỉ", "Thành công");

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lưu chứng chỉ", "Thất bại");

        this.loadPanelInstance.hide();
      }
    );
  }
}

CertificateEditController.$inject = [
  "$rootScope",
  "$scope",
  "$stateParams",
  "$timeout",
  "DevextremeService",
  "CommonService",
  "CertificateService",
];

export const CertificateEditComponent = {
  template: templateUrl,
  controller: CertificateEditController,
};

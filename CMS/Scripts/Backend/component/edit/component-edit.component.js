import templateUrl from "./component-edit.component.html";

export default class ComponentEditController {
  constructor(
    $rootScope,
    $scope,
    $stateParams,
    $timeout,
    DevextremeService,
    CommonService,
    ComponentService,
    ModuleService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.devextremeService = DevextremeService;
    this.commonService = CommonService;
    this.componentService = ComponentService;
    this.moduleService = ModuleService;

    this.loadPanelInstance = {};

    this.$scope.id = this.$stateParams.id;
    this.$scope.data = {};
    // Modules
    this.$scope.modules = [];
    this.$scope.$watch(
      () => {
        return this.moduleService.getModules();
      },
      (newValue, oldValue) => {
        this.$scope.modules = newValue;
      }
    );

    // SET TITLE
    $rootScope.title = "Sửa thành phần";
  }

  // INIT
  $onInit() {
    this.initControls();
    this.getComponent();
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
      slbModule: {
        displayExpr: "Name",
        valueExpr: "Id",
        searchEnabled: true,
        placeholder: "Chọn module ...",
        showClearButton: true,
        bindingOptions: {
          dataSource: "modules",
          value: "data.ModuleId",
        },
      },
      nbSortOrder: {
        showClearButton: true,
        bindingOptions: {
          value: "data.SortOrder",
        },
      },
      cbPublished: {
        bindingOptions: {
          value: "data.Published",
        },
        text: " Xuất bản",
      },
      // VN
      tbVNMainTitle: {
        showClearButton: true,
        bindingOptions: {
          value: "data.VN_MainTitle",
        },
      },
      tbVNSubTitle: {
        showClearButton: true,
        bindingOptions: {
          value: "data.VN_SubTitle",
        },
      },
      tbVNLink: {
        showClearButton: true,
        bindingOptions: {
          value: "data.VN_Link",
        },
      },
      tbVNTextButton: {
        showClearButton: true,
        bindingOptions: {
          value: "data.VN_TextButton",
        },
      },
      // EN
      tbENMainTitle: {
        showClearButton: true,
        bindingOptions: {
          value: "data.EN_MainTitle",
        },
      },
      tbENSubTitle: {
        showClearButton: true,
        bindingOptions: {
          value: "data.EN_SubTitle",
        },
      },
      tbENLink: {
        showClearButton: true,
        bindingOptions: {
          value: "data.EN_Link",
        },
      },
      tbENTextButton: {
        showClearButton: true,
        bindingOptions: {
          value: "data.EN_TextButton",
        },
      },
      //
      cbIsSingleMedia: {
        bindingOptions: {
          value: "data.IsSingleMedia",
        },
        text: " Đơn media",
      },
      tbLinkMedia: {
        bindingOptions: {
          value: "data.LinkMedia",
        },
        buttons: [
          {
            location: "after",
            name: "chooseMedia",
            options: {
              icon: "image",
              hint: "Chọn media",
              onClick: (e) => {
                this.chooseMedia();
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
      // Media
      btnAddMedia: {
        icon: "fa fa-image",
        text: "CHỌN MEDIA",
        type: "primary",
        onClick: () => {
          this.addMedia();
        },
      },
      tbAnimateIn: {
        showClearButton: true,
        bindingOptions: {
          value: "data.AnimateIn",
        },
      },
      tbAnimateOut: {
        showClearButton: true,
        bindingOptions: {
          value: "data.AnimateOut",
        },
      },
      nbTimeout: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Timeout",
        },
      },
      tbIcon: {
        bindingOptions: {
          value: "data.Icon",
        },
        buttons: [
          {
            location: "after",
            name: "chooseIcon",
            options: {
              icon: "image",
              hint: "Chọn icon",
              onClick: (e) => {
                this.chooseIcon();
              },
            },
          },
        ],
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
          this.componentService.redirectList();
        },
      },
    };

    this.validators = {
      name: {
        validationRules: [
          {
            type: "required",
            message: "Nhập tên",
          },
        ],
      },
    };

    this.loadPanel = angular.extend(
      angular.copy(this.devextremeService.getDefaultLoadPanel()),
      {
        message: "Đang xử lý",
        onInitialized: (e) => {
          this.loadPanelInstance = e.component;
        },
      }
    );
  }

  // Get Component
  getComponent() {
    this.$timeout(() => {
      this.loadPanelInstance.show();
    });

    this.componentService.get(this.$scope.id).then(
      (res) => {
        angular.copy(res.data, this.$scope.data);

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lấy dữ liệu", "Thất bại");
        this.componentService.redirectList();

        this.loadPanelInstance.hide();
      }
    );
  }

  // --- SINGLE MEDIA ---
  // Choose Media
  chooseMedia() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.LinkMedia = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Clear Media
  clearMedia() {
    this.$scope.data.LinkMedia = "";
  }

  // --- MULTI MEDIA ---
  // Add Media
  addMedia() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.Images.push(fileUrl);
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Update Media
  updateMedia(index) {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.Images[index] = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Remove Media
  removeMedia(index) {
    this.$scope.data.Images.splice(index, 1);
    this.$scope.$apply();
  }

  // --- ICON ---
  // Choose Icon
  chooseIcon() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.Icon = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Clear Icon
  clearIcon() {
    this.$scope.data.Icon = "";
  }

  // SAVE
  onSave(e) {
    this.loadPanelInstance.show();

    this.componentService.edit(this.$scope.id, this.$scope.data).then(
      (res) => {
        toastr.success("Lưu thành phần", "Thành công");

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lưu thành phần", "Thất bại");

        this.loadPanelInstance.hide();
      }
    );
  }
}

ComponentEditController.$inject = [
  "$rootScope",
  "$scope",
  "$stateParams",
  "$timeout",
  "DevextremeService",
  "CommonService",
  "ComponentService",
  "ModuleService",
];

export const ComponentEditComponent = {
  template: templateUrl,
  controller: ComponentEditController,
};

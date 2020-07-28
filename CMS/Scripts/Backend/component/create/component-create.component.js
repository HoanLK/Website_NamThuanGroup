import templateUrl from "./component-create.component.html";

export default class ComponentCreateController {
  constructor(
    $rootScope,
    $scope,
    DevextremeService,
    CommonService,
    ComponentService,
    ModuleService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.componentService = ComponentService;
    this.moduleService = ModuleService;

    this.loadPanelInstance = {};

    this.$scope.data = {
      ModuleId: null,
      Name: null,
      VN_MainTitle: null,
      VN_SubTitle: null,
      VN_Content: null,
      VN_Link: null,
      VN_TextButton: null,
      EN_MainTitle: null,
      EN_SubTitle: null,
      EN_Content: null,
      EN_Link: null,
      EN_TextButton: null,
      IsSingleMedia: true,
      LinkMedia: null,
      AnimateIn: null,
      AnimateOut: null,
      Timeout: 0,
      Icon: null,
      Published: true,
      SortOrder: 0,
      Note: null,
      Images: [],
    };
    this.$scope.modules = [];

    // SET TITLE
    $rootScope.title = "Thêm thành phần";
  }

  // INIT
  $onInit() {
    this.initControls();
    this.getModules();
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

  // Get Modules
  getModules() {
    this.moduleService
      .gets(["Id", "Name"])
      .load()
      .then(
        (res) => {
          this.$scope.modules = res.data;
        },
        (res) => {
          toastr.error("Lấy danh sách Module", "Thất bại");
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

    this.componentService.create(this.$scope.data).then(
      (res) => {
        this.componentService.redirectEdit(res.data);
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

ComponentCreateController.$inject = [
  "$rootScope",
  "$scope",
  "DevextremeService",
  "CommonService",
  "ComponentService",
  "ModuleService",
];

export const ComponentCreateComponent = {
  template: templateUrl,
  controller: ComponentCreateController,
};

import templateUrl from "./module-create.component.html";

export default class ModuleCreateController {
  constructor(
    $rootScope,
    $scope,
    DevextremeService,
    CommonService,
    ModuleService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.moduleService = ModuleService;

    this.loadPanelInstance = {};

    this.$scope.data = {
      Name: null,
      Note: null,
      Published: true,
      SortOrder: null,
    };

    // SET TITLE
    $rootScope.title = "Thêm module";
  }

  // INIT
  $onInit() {
    this.initControls();
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
      taNote: {
        height: 80,
        bindingOptions: {
          value: "data.Note",
        },
      },
      cbPublished: {
        bindingOptions: {
          value: "data.Published",
        },
        text: " Xuất bản",
      },
      nbSortOrder: {
        showClearButton: true,
        bindingOptions: {
          value: "data.SortOrder",
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
          this.moduleService.redirectList();
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

  // SAVE
  onSave(e) {
    this.loadPanelInstance.show();

    this.moduleService.create(this.$scope.data).then(
      (res) => {
        this.moduleService.redirectEdit(res.data);
        toastr.success("Lưu module", "Thành công");

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lưu module", "Thất bại");

        this.loadPanelInstance.hide();
      }
    );
  }
}

ModuleCreateController.$inject = [
  "$rootScope",
  "$scope",
  "DevextremeService",
  "CommonService",
  "ModuleService",
];

export const ModuleCreateComponent = {
  template: templateUrl,
  controller: ModuleCreateController,
};

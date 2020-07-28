import templateUrl from "./module-edit.component.html";

export default class ModuleEditController {
  constructor(
    $rootScope,
    $scope,
    $stateParams,
    $timeout,
    DevextremeService,
    CommonService,
    ModuleService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.devextremeService = DevextremeService;
    this.commonService = CommonService;
    this.moduleService = ModuleService;

    this.loadPanelInstance = {};

    this.$scope.id = this.$stateParams.id;
    this.$scope.data = {};

    // SET TITLE
    $rootScope.title = "Sửa module";
  }

  // INIT
  $onInit() {
    this.initControls();
    this.getModule();
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

  // Get Module
  getModule() {
    this.$timeout(() => {
      this.loadPanelInstance.show();
    });

    this.moduleService.get(this.$scope.id).then(
      (res) => {
        angular.copy(res.data, this.$scope.data);

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lấy dữ liệu", "Thất bại");
        this.moduleService.redirectList();

        this.loadPanelInstance.hide();
      }
    );
  }

  // SAVE
  onSave(e) {
    this.loadPanelInstance.show();

    this.moduleService.edit(this.$scope.id, this.$scope.data).then(
      (res) => {
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

ModuleEditController.$inject = [
  "$rootScope",
  "$scope",
  "$stateParams",
  "$timeout",
  "DevextremeService",
  "CommonService",
  "ModuleService",
];

export const ModuleEditComponent = {
  template: templateUrl,
  controller: ModuleEditController,
};

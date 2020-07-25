import templateUrl from "./component-create.component.html";

export default class ComponentCreateController {
  constructor(
    $rootScope,
    $scope,
    DevextremeService,
    CommonService,
    ComponentService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.componentService = ComponentService;

    this.loadPanelInstance = {};

    this.$scope.data = {
      Name: null,
      SubTitle: null,
      Content: null,
      Button_Link: null,
      Button_Text: null,
      IsSingleMedia: true,
      LinkMedia: null,
      Note: null,
      Links: [],
    };

    // SET TITLE
    $rootScope.title = "Thêm thành phần";
  }

  // INIT
  $onInit() {
    this.initControls();
  }

  // INIT CONTROLS
  initControls() {
    this.controls = {
      // VN
      tbVNName: {
        showClearButton: true,
        bindingOptions: {
          value: "data.VN_Name",
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
      tbENName: {
        showClearButton: true,
        bindingOptions: {
          value: "data.EN_Name",
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
      btnAddMedia: {
        icon: "fa fa-image",
        text: "CHỌN MEDIA",
        type: "primary",
        onClick: () => {
          this.addMedia();
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
      this.$scope.data.Links.push(fileUrl);
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Update Media
  updateMedia(index) {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.Links[index] = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Remove Media
  removeMedia(index) {
    this.$scope.data.Links.splice(index, 1);
    this.$scope.$apply();
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
];

export const ComponentCreateComponent = {
  template: templateUrl,
  controller: ComponentCreateController,
};

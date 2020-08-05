import templateUrl from "./info.component.html";

export default class InfoController {
  constructor(
    $rootScope,
    $scope,
    $timeout,
    DevextremeService,
    CommonService,
    InfoService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.$timeout = $timeout;
    this.devextremeService = DevextremeService;
    this.commonService = CommonService;
    this.infoService = InfoService;

    this.loadPanelInstance = {};

    this.$scope.id = 1;
    this.$scope.data = {};

    // SET TITLE
    $rootScope.title = "Thông tin Website";
  }

  // INIT
  $onInit() {
    this.initControls();
    this.getInfo();
  }

  // INIT CONTROLS
  initControls() {
    this.controls = {
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
      tbName: {
        showClearButton: true,
        maxLength: 60,
        bindingOptions: {
          value: "data.SiteName",
        },
      },
      tbLogo: {
        bindingOptions: {
          value: "data.Logo",
        },
        buttons: [
          {
            location: "after",
            name: "chooseLogo",
            options: {
              icon: "image",
              hint: "Chọn logo",
              onClick: (e) => {
                this.chooseLogo();
              },
            },
          },
        ],
      },
      tbLogoWhite: {
        bindingOptions: {
          value: "data.LogoWhite",
        },
        buttons: [
          {
            location: "after",
            name: "chooseLogoWhite",
            options: {
              icon: "image",
              hint: "Chọn logo trắng",
              onClick: (e) => {
                this.chooseLogoWhite();
              },
            },
          },
        ],
      },
      tbFavicon: {
        bindingOptions: {
          value: "data.Favicon",
        },
        buttons: [
          {
            location: "after",
            name: "chooseFavicon",
            options: {
              icon: "image",
              hint: "Chọn Favicon",
              onClick: (e) => {
                this.chooseFavicon();
              },
            },
          },
        ],
      },
      tbAppleIcon: {
        bindingOptions: {
          value: "data.AppleIcon",
        },
        buttons: [
          {
            location: "after",
            name: "chooseAppleIcon",
            options: {
              icon: "image",
              hint: "Chọn AppleIcon",
              onClick: (e) => {
                this.chooseAppleIcon();
              },
            },
          },
        ],
      },
      tbKeywords: {
        showClearButton: true,
        maxLength: 160,
        bindingOptions: {
          value: "data.Keywords",
        },
      },
      taDescription: {
        height: 100,
        maxLength: 160,
        bindingOptions: {
          value: "data.Description",
        },
      },
      tbAuthor: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Author",
        },
      },
      tbDesigner: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Designer",
        },
      },
      tbCopyright: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Copyright",
        },
      },
      tbReplyTo: {
        showClearButton: true,
        bindingOptions: {
          value: "data.ReplyTo",
        },
      },
      tbOwner: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Owner",
        },
      },
      tbURL: {
        showClearButton: true,
        bindingOptions: {
          value: "data.URL",
        },
      },
      // Company
      tbCompanyName: {
        showClearButton: true,
        bindingOptions: {
          value: "data.CompanyName",
        },
      },
      taAddress: {
        height: 60,
        bindingOptions: {
          value: "data.Address",
        },
      },
      tbPhoneNumber: {
        showClearButton: true,
        bindingOptions: {
          value: "data.PhoneNumber",
        },
      },
      tbHotline: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Hotline",
        },
      },
      tbFax: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Fax",
        },
      },
      tbEmail: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Email",
        },
      },
      tbMST: {
        showClearButton: true,
        bindingOptions: {
          value: "data.MST",
        },
      },
      tbLinkFacebook: {
        showClearButton: true,
        bindingOptions: {
          value: "data.LinkFacebook",
        },
      },
      tbIdFacebook: {
        showClearButton: true,
        bindingOptions: {
          value: "data.IdFacebook",
        },
      },
      tbLinkYoutube: {
        showClearButton: true,
        bindingOptions: {
          value: "data.LinkYoutube",
        },
      },
      tbIdYoutube: {
        showClearButton: true,
        bindingOptions: {
          value: "data.IdYoutube",
        },
      },
      tbLinkTwitter: {
        showClearButton: true,
        bindingOptions: {
          value: "data.LinkTwitter",
        },
      },
      tbIdTwitter: {
        showClearButton: true,
        bindingOptions: {
          value: "data.IdTwitter",
        },
      },
      tbLinkInstagram: {
        showClearButton: true,
        bindingOptions: {
          value: "data.LinkInstagram",
        },
      },
      tbIdInstagram: {
        showClearButton: true,
        bindingOptions: {
          value: "data.IdInstagram",
        },
      },
      tbLinkPinterest: {
        showClearButton: true,
        bindingOptions: {
          value: "data.LinkPinterest",
        },
      },
      tbIdPinterest: {
        showClearButton: true,
        bindingOptions: {
          value: "data.IdPinterest",
        },
      },
      taEmbedGoogleMap: {
        height: 60,
        bindingOptions: {
          value: "data.EmbedGoogleMap",
        },
      },
      tbLatitude: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Latitude",
        },
      },
      tbLongitude: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Longitude",
        },
      },
      tbStreetAddress: {
        showClearButton: true,
        bindingOptions: {
          value: "data.StreetAddress",
        },
      },
      tbLocality: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Locality",
        },
      },
      tbRegion: {
        showClearButton: true,
        bindingOptions: {
          value: "data.Region",
        },
      },
      tbCountryName: {
        showClearButton: true,
        bindingOptions: {
          value: "data.CountryName",
        },
      },
      tbPostalCode: {
        showClearButton: true,
        bindingOptions: {
          value: "data.PostalCode",
        },
      },
      tbGoogleSiteVerification: {
        showClearButton: true,
        bindingOptions: {
          value: "data.GoogleSiteVerification",
        },
      },
      btnSave: {
        icon: "fa fa-save",
        text: "LƯU",
        type: "success",
        useSubmitBehavior: true,
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

  // Get Info
  getInfo() {
    this.$timeout(() => {
      this.loadPanelInstance.show();
    });

    this.infoService.get(this.$scope.id).then(
      (res) => {
        angular.copy(res.data, this.$scope.data);

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lấy thông tin website", "Thất bại");
        this.infoService.redirectList();

        this.loadPanelInstance.hide();
      }
    );
  }

  // --- IMAGE ---
  // Choose
  chooseImage() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.Image = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Clear
  clearImage() {
    this.$scope.data.Image = "";
  }

  // --- LOGO ---
  // Choose
  chooseLogo() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.Logo = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Clear
  clearLogo() {
    this.$scope.data.Logo = "";
  }

  // --- LOGO WHITE ---
  // Choose
  chooseLogoWhite() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.LogoWhite = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Clear
  clearLogoWhite() {
    this.$scope.data.LogoWhite = "";
  }

  // --- FAVICON ---
  // Choose
  chooseFavicon() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.Favicon = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Clear
  clearFavicon() {
    this.$scope.data.Favicon = "";
  }

  // --- APPLE ICON ---
  // Choose
  chooseAppleIcon() {
    var finder = new CKFinder();
    finder.selectActionFunction = (fileUrl) => {
      this.$scope.data.AppleIcon = fileUrl;
      this.$scope.$apply();
    };
    finder.SelectFunction = "ShowFileInfo";
    finder.popup();
  }
  // Clear
  clearAppleIcon() {
    this.$scope.data.AppleIcon = "";
  }

  // SAVE
  onSave(e) {
    this.loadPanelInstance.show();

    this.infoService.edit(this.$scope.id, this.$scope.data).then(
      (res) => {
        toastr.success("Lưu thông tin Website", "Thành công");

        this.loadPanelInstance.hide();
      },
      (res) => {
        toastr.error("Lưu thông tin Website", "Thất bại");

        this.loadPanelInstance.hide();
      }
    );
  }
}

InfoController.$inject = [
  "$rootScope",
  "$scope",
  "$timeout",
  "DevextremeService",
  "CommonService",
  "InfoService",
];

export const InfoComponent = {
  template: templateUrl,
  controller: InfoController,
};

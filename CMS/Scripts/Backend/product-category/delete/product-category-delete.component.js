﻿import templateUrl from "./product-category-delete.component.html";

export default class ProductCategoryDeleteController {
  constructor($timeout, DevextremeService, ProductCategoryService) {
    "ngInject";
    this.$timeout = $timeout;
    this.devExtremeService = DevextremeService;
    this.productCategoryService = ProductCategoryService;
    // Variable
    this.instance = {
      loadPanel: {},
      popup: {},
      // Control
      btnYes: {},
    };
  }

  $onChanges(e) {
    // Show popup
    if (e.visible && this.visible === true) {
      this.$timeout(() => {
        this.instance.popup.show();
      });
    }
  }

  $onInit() {
    // Load Panel
    this.loadPanel = angular.extend(
      angular.copy(this.devExtremeService.getDefaultLoadPanel()),
      {
        message: "Đang thực hiện",
        onInitialized: (e) => {
          this.instance.loadPanel = e.component;
        },
      }
    );

    // Popup
    this.popup = angular.extend(
      angular.copy(this.devExtremeService.getDefaultPopup()),
      {
        contentTemplate: "deleteTemplate",
        onInitialized: (e) => {
          this.instance.popup = e.component;
        },
        onShown: (e) => {
          this.instance.btnYes.focus();
        },
        onHidden: (e) => {
          this.onClose();
        },
      }
    );

    // Controls
    this.controls = {
      // Button
      btnYes: {
        text: "Có",
        icon: "floppy",
        type: "success",
        width: "100px",
        onInitialized: (e) => {
          this.instance.btnYes = e.component;
        },
        onClick: (e) => {
          if (!angular.isUndefined(this.id)) {
            // Update Panel
            this.instance.loadPanel.show();

            this.productCategoryService.delete(this.id).then(
              (res) => {
                // Refresh Grid
                this.onDeleted();

                // Update Status
                this.instance.popup.hide();
                this.instance.loadPanel.hide();

                // Message
                toastr.success("Xóa thành công");
              },
              (res) => {
                this.onClose();

                // Message
                toastr.error("Xóa thất bại");

                this.instance.loadPanel.hide();
              }
            );
          } else {
            // Message
            toastr.error(`Vui lòng chọn sản phẩm cần xóa`);

            // Update Status
            this.instance.popup.hide();
            this.instance.loadPanel.hide();
          }
        },
      },
      btnNo: {
        text: "Không",
        icon: "clear",
        type: "danger",
        width: "100px",
        onClick: (e) => {
          // Update Status
          this.instance.popup.hide();
        },
      },
    };
  }
}

ProductCategoryDeleteController.$inject = [
  "$timeout",
  "DevextremeService",
  "ProductCategoryService",
];

export const ProductCategoryDeleteComponent = {
  template: templateUrl,
  controller: ProductCategoryDeleteController,
  bindings: {
    visible: "<",
    id: "<",
    onDeleted: "&",
    onClose: "&",
  },
};

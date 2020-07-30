import templateUrl from "./product.component.html";

export default class ProductController {
  constructor($rootScope) {
    // SET TITLE
    $rootScope.title = "Sản phẩm";
  }
}

ProductController.$inject = ["$rootScope"];

export const ProductComponent = {
  template: templateUrl,
  controller: ProductController,
};

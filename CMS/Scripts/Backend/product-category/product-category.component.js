import templateUrl from "./product-category.component.html";

export default class ProductCategoryController {
  constructor($rootScope) {
    // SET TITLE
    $rootScope.title = "Danh mục Sản phẩm";
  }
}

ProductCategoryController.$inject = ["$rootScope"];

export const ProductCategoryComponent = {
  template: templateUrl,
  controller: ProductCategoryController,
};

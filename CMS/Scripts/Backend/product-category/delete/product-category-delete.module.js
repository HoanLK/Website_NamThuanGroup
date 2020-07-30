import { ProductCategoryDeleteComponent } from "./product-category-delete.component";

export const ProductCategoryDeleteModule = angular
  .module("product-category.delete", [])
  .component("productCategoryDelete", ProductCategoryDeleteComponent).name;

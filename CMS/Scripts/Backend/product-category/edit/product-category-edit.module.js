import { ProductCategoryEditComponent } from "./product-category-edit.component";

export const ProductCategoryEditModule = angular
  .module("product-category.edit", [])
  .component("productCategoryEdit", ProductCategoryEditComponent).name;

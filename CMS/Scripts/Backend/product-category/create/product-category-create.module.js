import { ProductCategoryCreateComponent } from "./product-category-create.component";

export const ProductCategoryCreateModule = angular
  .module("product-category.create", [])
  .component("productCategoryCreate", ProductCategoryCreateComponent).name;

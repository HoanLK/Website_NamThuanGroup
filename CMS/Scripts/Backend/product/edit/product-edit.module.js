import { ProductEditComponent } from "./product-edit.component";

export const ProductEditModule = angular
  .module("product.edit", [])
  .component("productEdit", ProductEditComponent).name;

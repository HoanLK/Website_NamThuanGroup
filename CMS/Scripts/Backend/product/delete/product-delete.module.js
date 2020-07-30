import { ProductDeleteComponent } from "./product-delete.component";

export const ProductDeleteModule = angular
  .module("product.delete", [])
  .component("productDelete", ProductDeleteComponent).name;

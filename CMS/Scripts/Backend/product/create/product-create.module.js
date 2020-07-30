import { ProductCreateComponent } from "./product-create.component";

export const ProductCreateModule = angular
  .module("product.create", [])
  .component("productCreate", ProductCreateComponent).name;

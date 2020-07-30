import { ProductDatagridComponent } from "./product-datagrid.component";

export const ProductDatagridModule = angular
  .module("product.datagrid", [])
  .component("productDatagrid", ProductDatagridComponent).name;

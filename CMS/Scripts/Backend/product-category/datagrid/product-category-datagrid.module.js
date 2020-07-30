import { ProductCategoryDatagridComponent } from "./product-category-datagrid.component";

export const ProductCategoryDatagridModule = angular
  .module("product-category.datagrid", [])
  .component("productCategoryDatagrid", ProductCategoryDatagridComponent).name;

import { ProductCategoryDatagridModule } from "./datagrid/product-category-datagrid.module";
import { ProductCategoryCreateModule } from "./create/product-category-create.module";
import { ProductCategoryEditModule } from "./edit/product-category-edit.module";
import { ProductCategoryDeleteModule } from "./delete/product-category-delete.module";

import { ProductCategoryComponent } from "./product-category.component";

import ProductCategoryService from "./product-category.service";

export const ProductCategoryModule = angular
  .module("product-category", [
    ProductCategoryDatagridModule,
    ProductCategoryCreateModule,
    ProductCategoryEditModule,
    ProductCategoryDeleteModule,
  ])
  .component("productCategory", ProductCategoryComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
      .state("product-category", {
        url: "/product-category",
        component: "productCategory",
      })
      .state("product-category-create", {
        url: "/product-category/create",
        component: "productCategoryCreate",
        module: ProductCategoryCreateModule,
      })
      .state("product-category-edit", {
        url: "/product-category/edit/:id",
        component: "productCategoryEdit",
        module: ProductCategoryEditModule,
      });
    $urlRouterProvider.otherwise("/");
  })
  .service("ProductCategoryService", ProductCategoryService).name;

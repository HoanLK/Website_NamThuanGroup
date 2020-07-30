import { ProductDatagridModule } from "./datagrid/product-datagrid.module";
import { ProductCreateModule } from "./create/product-create.module";
import { ProductEditModule } from "./edit/product-edit.module";
import { ProductDeleteModule } from "./delete/product-delete.module";

import { ProductComponent } from "./product.component";

import ProductService from "./product.service";

export const ProductModule = angular
  .module("product", [
    ProductDatagridModule,
    ProductCreateModule,
    ProductEditModule,
    ProductDeleteModule,
  ])
  .component("product", ProductComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
      .state("product", {
        url: "/product",
        component: "product",
      })
      .state("product-create", {
        url: "/product/create",
        component: "productCreate",
        module: ProductCreateModule,
      })
      .state("product-edit", {
        url: "/product/edit/:id",
        component: "productEdit",
        module: ProductEditModule,
      });
    $urlRouterProvider.otherwise("/");
  })
  .service("ProductService", ProductService).name;

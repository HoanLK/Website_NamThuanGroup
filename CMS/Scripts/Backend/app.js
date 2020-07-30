import angular from "angular";
import uiRouter from "angular-ui-router";
import ngCookies from "angular-cookies";
import ngSanitize from "angular-sanitize";

import "devextreme/dist/js/dx.all";
import config from "./config";

import DevextremeService from "./services/devextreme.service";
import CommonService from "./services/common.service";

import { PostModule } from "./post/post.module";
import { PostCategoryModule } from "./post-category/post-category.module";
import { ComponentModule } from "./component/component.module";
import { ModuleModule } from "./module/module.module";
import { ProductCategoryModule } from "./product-category/product-category.module";
import { ProductModule } from "./product/product.module";

DevExpress.localization.locale("vi");

export const App = angular
  .module("app", [
    "dx",
    "ng.ckeditor",
    uiRouter,
    ngCookies,
    ngSanitize,
    PostModule,
    PostCategoryModule,
    ComponentModule,
    ModuleModule,
    ProductCategoryModule,
    ProductModule,
  ])
  .service("CommonService", CommonService)
  .service("DevextremeService", DevextremeService)
  .config(config).name;

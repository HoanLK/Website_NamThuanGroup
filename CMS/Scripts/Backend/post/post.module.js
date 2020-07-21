import PostService from "./post.service";

import { PostDatagridModule } from "./datagrid/datagrid.module";

import { PostComponent } from "./post.component";
import { PostCreateComponent } from "./create/create.component";
import PostCategoryService from "../post-category/post-category.service";

export const PostModule = angular
  .module("post", [PostDatagridModule])
  .component("post", PostComponent)
  .component("create", PostCreateComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
      .state("post", {
        url: "/post",
        component: "post",
      })
      .state("post-create", {
        url: "/post/create",
        component: "create",
      });
    $urlRouterProvider.otherwise("/");
  })
  .service("PostService", PostService)
  .service("PostCategoryService", PostCategoryService).name;

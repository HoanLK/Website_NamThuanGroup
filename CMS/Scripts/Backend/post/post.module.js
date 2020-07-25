import { PostDatagridModule } from "./datagrid/post-datagrid.module";
import { PostCreateModule } from "./create/post-create.module";
import { PostEditModule } from "./edit/post-edit.module";
import { PostDeleteModule } from "./delete/post-delete.module";

import { PostComponent } from "./post.component";

import PostService from "./post.service";
import PostCategoryService from "../post-category/post-category.service";

export const PostModule = angular
  .module("post", [
    PostDatagridModule,
    PostCreateModule,
    PostEditModule,
    PostDeleteModule,
  ])
  .component("post", PostComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
      .state("post", {
        url: "/post",
        component: "post",
      })
      .state("post-create", {
        url: "/post/create",
        component: "postCreate",
        module: PostCreateModule,
      })
      .state("post-edit", {
        url: "/post/edit/:id",
        component: "postEdit",
        module: PostEditModule,
      });
    $urlRouterProvider.otherwise("/");
  })
  .service("PostService", PostService)
  .service("PostCategoryService", PostCategoryService).name;

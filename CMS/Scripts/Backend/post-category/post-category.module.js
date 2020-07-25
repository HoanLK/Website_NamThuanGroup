import { PostCategoryTreelistModule } from "./treelist/post-category-treelist.module";
import { PostCategoryCreateModule } from "./create/post-category-create.module";
import { PostCategoryEditModule } from "./edit/post-category-edit.module";
import { PostCategoryDeleteModule } from "./delete/post-category-delete.module";

import { PostCategoryComponent } from "./post-category.component";

import PostCategoryService from "./post-category.service";

export const PostCategoryModule = angular
  .module("postCategory", [
    PostCategoryTreelistModule,
    PostCategoryCreateModule,
    PostCategoryEditModule,
    PostCategoryDeleteModule,
  ])
  .component("postCategory", PostCategoryComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
      .state("post-category", {
        url: "/post-category",
        component: "postCategory",
      })
      .state("post-category-create", {
        url: "/post-category/create",
        component: "postCategoryCreate",
        module: PostCategoryCreateModule,
      })
      .state("post-category-edit", {
        url: "/post-category/edit/:id",
        component: "postCategoryEdit",
        module: PostCategoryEditModule,
      });
    $urlRouterProvider.otherwise("/");
  })
  .service("PostCategoryService", PostCategoryService).name;

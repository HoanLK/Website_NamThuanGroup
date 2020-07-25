import { PostCategoryDeleteComponent } from "./post-category-delete.component";

export const PostCategoryDeleteModule = angular
  .module("postCategory.delete", [])
  .component("postCategoryDelete", PostCategoryDeleteComponent).name;

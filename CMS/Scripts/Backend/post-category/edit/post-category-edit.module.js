import { PostCategoryEditComponent } from "./post-category-edit.component";

export const PostCategoryEditModule = angular
  .module("postCategory.edit", [])
  .component("postCategoryEdit", PostCategoryEditComponent).name;

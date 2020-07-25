import { PostCategoryCreateComponent } from "./post-category-create.component";

export const PostCategoryCreateModule = angular
  .module("postCategory.create", [])
  .component("postCategoryCreate", PostCategoryCreateComponent).name;

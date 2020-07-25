import { PostCategoryTreelistComponent } from "./post-category-treelist.component";

export const PostCategoryTreelistModule = angular
  .module("postCategory.treelist", [])
  .component("postCategoryTreelist", PostCategoryTreelistComponent).name;

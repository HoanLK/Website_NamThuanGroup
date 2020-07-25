import { PostEditComponent } from "./post-edit.component";

export const PostEditModule = angular
  .module("post.edit", [])
  .component("postEdit", PostEditComponent).name;

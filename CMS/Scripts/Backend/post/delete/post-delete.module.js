import { PostDeleteComponent } from "./post-delete.component";

export const PostDeleteModule = angular
  .module("post.delete", [])
  .component("postDelete", PostDeleteComponent).name;

import { PostCreateComponent } from "./post-create.component";

export const PostCreateModule = angular
  .module("post.create", [])
  .component("postCreate", PostCreateComponent).name;

import { PostDatagridComponent } from "./post-datagrid.component";

export const PostDatagridModule = angular
  .module("post.datagrid", [])
  .component("postDatagrid", PostDatagridComponent).name;

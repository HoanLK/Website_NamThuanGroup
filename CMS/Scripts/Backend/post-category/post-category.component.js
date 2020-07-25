import templateUrl from "./post-category.component.html";

export default class PostCategoryController {
  constructor($rootScope) {
    // SET TITLE
    $rootScope.title = "Danh mục Bài viết";
  }
}

PostCategoryController.$inject = ["$rootScope"];

export const PostCategoryComponent = {
  template: templateUrl,
  controller: PostCategoryController,
};

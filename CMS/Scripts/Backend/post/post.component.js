import templateUrl from "./post.component.html";

export default class PostController {
  constructor($rootScope) {
    // SET TITLE
    $rootScope.title = "Bài viết";
  }
}

PostController.$inject = ["$rootScope"];

export const PostComponent = {
  template: templateUrl,
  controller: PostController,
};

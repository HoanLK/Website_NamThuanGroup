import templateUrl from "./component.component.html";

export default class ComponentController {
  constructor($rootScope) {
    // SET TITLE
    $rootScope.title = "Thành phần";
  }
}

ComponentController.$inject = ["$rootScope"];

export const ComponentComponent = {
  template: templateUrl,
  controller: ComponentController,
};

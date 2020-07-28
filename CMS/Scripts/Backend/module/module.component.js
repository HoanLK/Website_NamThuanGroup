import templateUrl from "./module.component.html";

export default class ModuleController {
  constructor($rootScope) {
    // SET TITLE
    $rootScope.title = "Module";
  }
}

ModuleController.$inject = ["$rootScope"];

export const ModuleComponent = {
  template: templateUrl,
  controller: ModuleController,
};

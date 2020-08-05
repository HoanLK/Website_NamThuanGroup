import { InfoComponent } from "./info.component";

import InfoService from "./info.service";

export const InfoModule = angular
  .module("info", [])
  .component("info", InfoComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider.state("info", {
      url: "/info",
      component: "info",
    });
    $urlRouterProvider.otherwise("/");
  })
  .service("InfoService", InfoService).name;

import { ModuleDatagridModule } from "./datagrid/module-datagrid.module";
import { ModuleCreateModule } from "./create/module-create.module";
import { ModuleEditModule } from "./edit/module-edit.module";
import { ModuleDeleteModule } from "./delete/module-delete.module";

import { ModuleComponent } from "./module.component";

import ModuleService from "./module.service";

export const ModuleModule = angular
  .module("module", [
    ModuleDatagridModule,
    ModuleCreateModule,
    ModuleEditModule,
    ModuleDeleteModule,
  ])
  .component("module", ModuleComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
      .state("module", {
        url: "/module",
        component: "module",
      })
      .state("module-create", {
        url: "/module/create",
        component: "moduleCreate",
        module: ModuleCreateModule,
      })
      .state("module-edit", {
        url: "/module/edit/:id",
        component: "moduleEdit",
        module: ModuleEditModule,
      });
    $urlRouterProvider.otherwise("/");
  })
  .service("ModuleService", ModuleService).name;

import { ComponentDatagridModule } from "./datagrid/component-datagrid.module";
import { ComponentCreateModule } from "./create/component-create.module";
import { ComponentEditModule } from "./edit/component-edit.module";
import { ComponentDeleteModule } from "./delete/component-delete.module";

import { ComponentComponent } from "./component.component";

import ComponentService from "./component.service";

export const ComponentModule = angular
  .module("component", [
    ComponentDatagridModule,
    ComponentCreateModule,
    ComponentEditModule,
    ComponentDeleteModule,
  ])
  .component("component", ComponentComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
      .state("component", {
        url: "/component",
        component: "component",
      })
      .state("component-create", {
        url: "/component/create",
        component: "componentCreate",
        module: ComponentCreateModule,
      })
      .state("component-edit", {
        url: "/component/edit/:id",
        component: "componentEdit",
        module: ComponentEditModule,
      });
    $urlRouterProvider.otherwise("/");
  })
  .service("ComponentService", ComponentService).name;

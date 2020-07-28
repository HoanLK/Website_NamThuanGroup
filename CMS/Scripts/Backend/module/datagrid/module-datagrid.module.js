import { ModuleDatagridComponent } from "./module-datagrid.component";

export const ModuleDatagridModule = angular
  .module("module.datagrid", [])
  .component("moduleDatagrid", ModuleDatagridComponent).name;

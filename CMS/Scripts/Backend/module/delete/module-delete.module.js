import { ModuleDeleteComponent } from "./module-delete.component";

export const ModuleDeleteModule = angular
  .module("module.delete", [])
  .component("moduleDelete", ModuleDeleteComponent).name;

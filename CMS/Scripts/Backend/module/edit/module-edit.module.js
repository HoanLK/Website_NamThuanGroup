import { ModuleEditComponent } from "./module-edit.component";

export const ModuleEditModule = angular
  .module("module.edit", [])
  .component("moduleEdit", ModuleEditComponent).name;

import { ModuleCreateComponent } from "./module-create.component";

export const ModuleCreateModule = angular
  .module("module.create", [])
  .component("moduleCreate", ModuleCreateComponent).name;

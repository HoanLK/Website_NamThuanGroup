import { ComponentEditComponent } from "./component-edit.component";

export const ComponentEditModule = angular
  .module("component.edit", [])
  .component("componentEdit", ComponentEditComponent).name;

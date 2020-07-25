import { ComponentDeleteComponent } from "./component-delete.component";

export const ComponentDeleteModule = angular
  .module("component.delete", [])
  .component("componentDelete", ComponentDeleteComponent).name;

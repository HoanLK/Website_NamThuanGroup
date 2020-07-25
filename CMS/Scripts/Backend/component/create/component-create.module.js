import { ComponentCreateComponent } from "./component-create.component";

export const ComponentCreateModule = angular
  .module("component.create", [])
  .component("componentCreate", ComponentCreateComponent).name;

import { ComponentDatagridComponent } from "./component-datagrid.component";

export const ComponentDatagridModule = angular
  .module("component.datagrid", [])
  .component("componentDatagrid", ComponentDatagridComponent).name;

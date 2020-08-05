import { CertificateDatagridComponent } from "./certificate-datagrid.component";

export const CertificateDatagridModule = angular
  .module("certificate.datagrid", [])
  .component("certificateDatagrid", CertificateDatagridComponent).name;

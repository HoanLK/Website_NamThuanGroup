import { CertificateDeleteComponent } from "./certificate-delete.component";

export const CertificateDeleteModule = angular
  .module("certificate.delete", [])
  .component("certificateDelete", CertificateDeleteComponent).name;

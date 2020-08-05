import { CertificateCreateComponent } from "./certificate-create.component";

export const CertificateCreateModule = angular
  .module("certificate.create", [])
  .component("certificateCreate", CertificateCreateComponent).name;

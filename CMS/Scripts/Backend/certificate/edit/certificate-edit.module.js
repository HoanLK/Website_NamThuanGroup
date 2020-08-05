import { CertificateEditComponent } from "./certificate-edit.component";

export const CertificateEditModule = angular
  .module("certificate.edit", [])
  .component("certificateEdit", CertificateEditComponent).name;

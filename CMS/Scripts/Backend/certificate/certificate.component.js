import templateUrl from "./certificate.component.html";

export default class CertificateController {
  constructor($rootScope) {
    // SET TITLE
    $rootScope.title = "Chứng chỉ";
  }
}

CertificateController.$inject = ["$rootScope"];

export const CertificateComponent = {
  template: templateUrl,
  controller: CertificateController,
};

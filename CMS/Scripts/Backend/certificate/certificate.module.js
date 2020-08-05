import { CertificateDatagridModule } from "./datagrid/certificate-datagrid.module";
import { CertificateCreateModule } from "./create/certificate-create.module";
import { CertificateEditModule } from "./edit/certificate-edit.module";
import { CertificateDeleteModule } from "./delete/certificate-delete.module";

import { CertificateComponent } from "./certificate.component";

import CertificateService from "./certificate.service";

export const CertificateModule = angular
    .module("certificate", [
        CertificateDatagridModule,
        CertificateCreateModule,
        CertificateEditModule,
        CertificateDeleteModule,
    ])
    .component("certificate", CertificateComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";
        $stateProvider
            .state("certificate", {
                url: "/certificate",
                component: "certificate",
            })
            .state("certificate-create", {
                url: "/certificate/create",
                component: "certificateCreate",
                module: CertificateCreateModule,
            })
            .state("certificate-edit", {
                url: "/certificate/edit/:id",
                component: "certificateEdit",
                module: CertificateEditModule,
            });
        $urlRouterProvider.otherwise("/");
    })
    .service("CertificateService", CertificateService).name;

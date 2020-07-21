import angular from "angular";
import uiRouter from "angular-ui-router";
import ngCookies from "angular-cookies";
import ngSanitize from "angular-sanitize";

import "devextreme/dist/js/dx.all";
import config from "./config";

//import ngCkEditor from "ng-ckeditor";
import DevextremeService from "./services/devextreme.service";
import CommonService from "./services/common.service";

import { PostModule } from "./post/post.module";

DevExpress.localization.locale("vi");

export const App = angular
    .module('app', [
        'dx',
        'ng.ckeditor',
        uiRouter,
        ngCookies,
        ngSanitize,
        PostModule
    ])
    .service('CommonService', CommonService)
    .service('DevextremeService', DevextremeService)
    .config(config)
    .name;
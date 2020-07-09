import PostService from "./post.service";

import { PostDatagridModule } from "./datagrid/datagrid.module";

import { PostComponent } from "./post.component";

export const PostModule = angular
    .module('post', [PostDatagridModule])
    .component('post', PostComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('post', {
                url: '/post',
                component: 'post'
            });
        $urlRouterProvider.otherwise('/');
    })
    .service("PostService", PostService)
    .name;


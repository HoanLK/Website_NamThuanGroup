(function (app) {
    'use strict';

    app.directive('ckEditor', function () {
        return {
            require: 'ngModel',
            priority: 10,
            link: function (scope, elm, attr, ngModel) {
                var ck = CKEDITOR.replace(elm[0]);

                if (!ngModel) return;

                ck.on('instanceReady', function () {
                    ck.setData(ngModel.$viewValue);
                });

                function updateModel() {
                    scope.$apply(function () {
                        if (ck.getData().length) {
                            ngModel.$setViewValue(ck.getData());
                        }
                    });
                }

                ck.on('change', updateModel);
                ck.on('key', updateModel);
                ck.on('dataReady', updateModel);
                ck.on('pasteState', updateModel);

                ngModel.$render = function (value) {
                    ck.setData(ngModel.$viewValue || '');
                };
            }
        };
    });

})(angular.module('backend'));

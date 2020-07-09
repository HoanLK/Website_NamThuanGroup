import templateUrl from "./datagrid.component.html";

export default class PostDatagridController {
    constructor($scope, $http, $window, CommonService, DevextremeService, PostService) {
        'ngInject';

        this.$scope = $scope;
        this.$http = $http;
        this.$window = $window;
        this.commonService = CommonService;
        this.devextremeService = DevextremeService;
        this.postService = PostService;

        // VAR
        this.datagrid = {};
        let gridInstance = {};
        $scope.showFilter = false;

        // Init Datagrid
        this.datagrid = angular.extend(this.devextremeService.getDefaultGrid(), {
            onInitialized: (e) => {
                this.gridInstance = e.component;
            },
            bindingOptions: {
                "rowFilter.visible": "showFilter"
            },
            dataSource: this.postService.gets(),
            columns: [
                {//0
                    caption: "ID",
                    dataField: "Id",
                    dataType: "number",
                    sortOrder: "desc",
                    width: 60
                },
                {//1
                    caption: "Trạng thái",
                    dataField: "Published",
                    dataType: "boolean",
                    cellTemplate: "publishedCellTemplate",
                    trueText: "Xuất bản",
                    falseText: "Chưa xuất bản",
                    width: 100
                },
                {//2
                    caption: "Tiêu đề",
                    dataField: "Title",
                    dataType: "string",
                    minWidth: 150
                },
                {//3
                    caption: "Danh mục",
                    dataField: "CategoryId",
                    dataType: "number",
                    lookup: {
                        displayExpr: 'Title',
                        valueExpr: 'Id'
                    },
                    width: 150
                },
                {//4
                    alignment: "left",
                    caption: "Ngày tạo",
                    dataField: "TimeCreated",
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    customizeText: function (cellInfo) {
                        return cellInfo.valueText;
                    },
                    width: 100
                },
                {//5
                    alignment: "center",
                    caption: "Lượt xem",
                    dataField: "Views",
                    dataType: "number",
                    cellTemplate: "viewsCellTemplate",
                    width: 90
                },
            ],
            summary: {
                texts: {
                    count: "{0}"
                },
                totalItems: [{
                    column: "Id",
                    summaryType: "count"
                }]
            },
            rowFilter: {
                visible: this.showFilter
            },
            onToolbarPreparing: (e) => {
                e.toolbarOptions.items.unshift(
                    // RIGHT
                    {// CREATE
                        location: "before",
                        widget: "dxButton",
                        options: {
                            hint: "Thêm",
                            icon: "add",
                            text: "Thêm mới",
                            type: "success",
                            onClick: () => {
                                this.onCreate();
                            }
                        },
                        locateInMenu: 'auto'
                    },
                    {// DELETE
                        location: "before",
                        widget: "dxButton",
                        options: {
                            hint: "Xóa",
                            icon: "trash",
                            text: "Xóa",
                            type: "danger",
                            onClick: () => {
                                this.onDelete();
                            }
                        },
                        locateInMenu: 'auto'
                    },
                    {
                        // FILTER
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            hint: 'Lọc dữ liệu',
                            icon: 'filter',
                            type: this.showFilter ? 'success' : 'normal',
                            onClick: () => {
                                setTimeout(() => {
                                    $scope.showFilter = !$scope.showFilter;
                                    this.gridInstance.repaint();
                                }, 0);
                            }
                        },
                        locateInMenu: 'auto'
                    },
                    {
                        // REFRESH
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            hint: 'Refresh',
                            icon: 'refresh',
                            onClick: () => {
                                this.gridInstance.getDataSource().reload();
                            }
                        },
                        locateInMenu: 'auto'
                    }
                );
            },
            onRowDblClick: (e) => {
                this.onEdit(e.data.Id);
            },
        });
    }

    // INIT
    $onInit() { }

    // CREATE
    onCreate() {
        this.$scope.showFilter = !this.$scope.showFilter;
        console.log("Create", this.$scope.showFilter);
    }

    // EDIT
    onEdit(id) {
        console.log("Edit", id);
    }

    // DELETE
    onDelete() {
        console.log("Delete", this.gridInstance.getSelectedRowKeys());
    }
}

PostDatagridController.$inject = ['$scope', '$http', '$window', 'CommonService', 'DevextremeService', 'PostService'];

export const PostDatagridComponent = {
    template: templateUrl,
    controller: PostDatagridController
} 

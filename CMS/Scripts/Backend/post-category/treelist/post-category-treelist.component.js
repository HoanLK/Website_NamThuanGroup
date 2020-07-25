import templateUrl from "./post-category-treelist.component.html";

export default class PostCategoryTreelistController {
  constructor(
    $scope,
    $timeout,
    CommonService,
    DevextremeService,
    PostCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.$timeout = $timeout;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.postCategoryService = PostCategoryService;

    // VAR
    this.treelist = {};
    this.treelistInstance = {};
    this.delete = {
      id: null,
      visible: false,
    };

    this.$scope.rootValue = null;
    this.$scope.showFilter = true;
    this.$scope.categories = [];

    // Init Datagrid
    this.treelist = angular.extend(
      this.devextremeService.getDefaultTreeList(),
      {
        onInitialized: (e) => {
          this.treelistInstance = e.component;

          this.$timeout(() => {
            this.treelistInstance.refresh();
          }, 500);
        },
        bindingOptions: {
          "filterRow.visible": "showFilter",
          rootValue: "rootValue",
        },
        dataSource: this.postCategoryService.gets([
          "Id",
          "ParentId",
          "Published",
          "Featured",
          "CreateTime",
          "Title",
          "Views",
        ]),
        autoExpandAll: true,
        parentIdExpr: "ParentId",
        columns: [
          {
            //0
            caption: "ID",
            dataField: "Id",
            dataType: "number",
            visible: false,
            width: 60,
          },
          {
            //1
            cssClass: "font-weight-bold",
            caption: "TIÊU ĐỀ",
            dataField: "Title",
            dataType: "string",
            width: 550,
          },
          {
            //2
            caption: "XUẤT BẢN",
            dataField: "Published",
            dataType: "boolean",
            cellTemplate: "publishedCellTemplate",
            trueText: "Xuất bản",
            falseText: "Chưa xuất bản",
            width: 100,
          },
          {
            //3
            caption: "NỔI BẬT",
            dataField: "Featured",
            dataType: "boolean",
            cellTemplate: "featuredCellTemplate",
            trueText: "Có",
            falseText: "Không",
            width: 100,
          },
          {
            //4
            alignment: "left",
            caption: "THỜI GIAN",
            dataField: "CreateTime",
            dataType: "date",
            format: "dd/MM/yyyy",
            customizeText: function (cellInfo) {
              return cellInfo.valueText;
            },
            width: 100,
          },
          {
            //5
            alignment: "center",
            caption: "VIEWS",
            dataField: "Views",
            dataType: "number",
            cellTemplate: "viewsCellTemplate",
            width: 90,
          },
          {
            //6
            dataType: "string",
            cellTemplate: "functionBtnTemplate",
            showInColumnChooser: false,
            caption: "",
            allowEditing: false,
            allowExporting: false,
            allowFiltering: false,
            allowGrouping: false,
            allowHeaderFiltering: false,
            allowHiding: false,
            allowReordering: false,
            allowResizing: false,
            allowSearch: false,
            allowSorting: false,
            width: 80,
          },
        ],
        selection: {
          mode: "single",
          recursive: false,
          allowSelectAll: false,
        },
        summary: {
          texts: {
            count: "{0}",
          },
          totalItems: [
            {
              column: "Title",
              summaryType: "count",
            },
          ],
        },
        rowFilter: {
          visible: this.showFilter,
        },
        onToolbarPreparing: (e) => {
          e.toolbarOptions.items.unshift(
            // RIGHT
            {
              // CREATE
              location: "before",
              widget: "dxButton",
              options: {
                hint: "Thêm danh mục",
                icon: "add",
                text: "Thêm danh mục",
                type: "success",
                onClick: () => {
                  this.onCreate();
                },
              },
              locateInMenu: "auto",
            },
            {
              // FILTER
              location: "after",
              widget: "dxButton",
              options: {
                hint: "Lọc dữ liệu",
                icon: "filter",
                type: this.$scope.showFilter ? "success" : "normal",
                onClick: () => {
                  setTimeout(() => {
                    this.$scope.showFilter = !this.$scope.showFilter;
                    this.treelistInstance.repaint();
                  }, 0);
                },
              },
              locateInMenu: "auto",
            },
            {
              // REFRESH
              location: "after",
              widget: "dxButton",
              options: {
                hint: "Refresh",
                icon: "refresh",
                onClick: () => {
                  this.treelistInstance.getDataSource().reload();
                },
              },
              locateInMenu: "auto",
            }
          );
        },
        onRowDblClick: (e) => {
          this.onEdit(e.data.Id);
        },
      }
    );
  }

  // INIT
  $onInit() {}

  // CREATE
  onCreate() {
    this.postCategoryService.redirectCreate();
  }

  // EDIT
  onEdit(id) {
    this.postCategoryService.redirectEdit(id);
  }

  // DELETE
  onDelete(id) {
    this.delete.id = id;
    this.delete.visible = true;
  }
  onDeleted() {
    this.delete = {
      id: null,
      visible: false,
    };
    this.treelistInstance.getDataSource().reload();
  }
  onClosedDelete() {
    this.delete = {
      id: null,
      visible: false,
    };
  }
}

PostCategoryTreelistController.$inject = [
  "$scope",
  "$timeout",
  "CommonService",
  "DevextremeService",
  "PostCategoryService",
];

export const PostCategoryTreelistComponent = {
  template: templateUrl,
  controller: PostCategoryTreelistController,
};

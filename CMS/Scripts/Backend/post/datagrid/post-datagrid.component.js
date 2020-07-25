import templateUrl from "./post-datagrid.component.html";

export default class PostDatagridController {
  constructor(
    $scope,
    CommonService,
    DevextremeService,
    PostService,
    PostCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.postService = PostService;
    this.postCategoryService = PostCategoryService;

    // VAR
    this.datagrid = {};
    this.gridInstance = {};
    this.delete = {
      id: null,
      visible: false,
    };

    this.$scope.showFilter = true;
    this.$scope.categories = [];

    // Init Datagrid
    this.datagrid = angular.extend(this.devextremeService.getDefaultGrid(), {
      onInitialized: (e) => {
        this.gridInstance = e.component;
      },
      bindingOptions: {
        "filterRow.visible": "showFilter",
        "columns[3].lookup.dataSource": "categories",
      },
      dataSource: this.postService.gets([
        "Id",
        "CategoryId",
        "Published",
        "Featured",
        "CreateTime",
        "Title",
        "Views",
      ]),
      columns: [
        {
          // 0
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
        {
          //1
          caption: "ID",
          dataField: "Id",
          dataType: "number",
          sortOrder: "desc",
          visible: false,
          width: 60,
        },
        {
          //2
          cssClass: "font-weight-bold",
          caption: "TIÊU ĐỀ",
          dataField: "Title",
          dataType: "string",
          minWidth: 150,
        },
        {
          //3
          caption: "DANH MỤC",
          dataField: "CategoryId",
          dataType: "number",
          lookup: {
            displayExpr: "Title",
            valueExpr: "Id",
          },
          width: 150,
        },
        {
          //4
          caption: "XUẤT BẢN",
          dataField: "Published",
          dataType: "boolean",
          cellTemplate: "publishedCellTemplate",
          trueText: "Xuất bản",
          falseText: "Chưa xuất bản",
          width: 100,
        },
        {
          //5
          caption: "NỔI BẬT",
          dataField: "Featured",
          dataType: "boolean",
          cellTemplate: "featuredCellTemplate",
          trueText: "Có",
          falseText: "Không",
          width: 100,
        },
        {
          //6
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
          //7
          alignment: "center",
          caption: "VIEWS",
          dataField: "Views",
          dataType: "number",
          cellTemplate: "viewsCellTemplate",
          width: 90,
        },
      ],
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
              hint: "Thêm bài viết",
              icon: "add",
              text: "Thêm bài viết",
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
                  this.gridInstance.repaint();
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
                this.gridInstance.getDataSource().reload();
              },
            },
            locateInMenu: "auto",
          }
        );
      },
      onRowDblClick: (e) => {
        this.onEdit(e.data.Id);
      },
    });
  }

  // INIT
  $onInit() {
    // Get Categories
    this.postCategoryService
      .gets(["Id", "Title"])
      .load()
      .then(
        (res) => {
          this.$scope.categories = res.data;
        },
        (res) => {
          toastr.error("Lấy danh sách Danh mục", "Thất bại");
        }
      );
  }

  // CREATE
  onCreate() {
    this.postService.redirectCreate();
  }

  // EDIT
  onEdit(id) {
    this.postService.redirectEdit(id);
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
    this.gridInstance.getDataSource().reload();
  }
  onClosedDelete() {
    this.delete = {
      id: null,
      visible: false,
    };
  }
}

PostDatagridController.$inject = [
  "$scope",
  "CommonService",
  "DevextremeService",
  "PostService",
  "PostCategoryService",
];

export const PostDatagridComponent = {
  template: templateUrl,
  controller: PostDatagridController,
};

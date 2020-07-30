import templateUrl from "./product-category-datagrid.component.html";

export default class ProductCategoryDatagridController {
  constructor(
    $scope,
    CommonService,
    DevextremeService,
    ProductCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.productCategoryService = ProductCategoryService;

    // VAR
    this.datagrid = {};
    this.gridInstance = {};
    this.delete = {
      id: null,
      visible: false,
    };

    this.$scope.showFilter = true;

    // Init Datagrid
    this.datagrid = angular.extend(this.devextremeService.getDefaultGrid(), {
      onInitialized: (e) => {
        this.gridInstance = e.component;
      },
      bindingOptions: {
        "filterRow.visible": "showFilter",
      },
      dataSource: this.productCategoryService.gets([
        "Id",
        "VN_Name",
        "Published",
        "Featured",
        "SortOrder",
        "Note",
        "CreateTime",
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
          allowEditing: false,
          caption: "ID",
          dataField: "Id",
          dataType: "number",
          visible: false,
          width: 60,
        },
        {
          //2
          cssClass: "font-weight-bold",
          caption: "TÊN",
          dataField: "VN_Name",
          dataType: "string",
          minWidth: 150,
        },
        {
          //3
          caption: "XUẤT BẢN",
          dataField: "Published",
          dataType: "boolean",
          cellTemplate: "publishedCellTemplate",
          trueText: "Xuất bản",
          falseText: "Chưa xuất bản",
          width: 120,
        },
        {
          //4
          caption: "NỔI BẬT",
          dataField: "Featured",
          dataType: "boolean",
          cellTemplate: "featuredCellTemplate",
          trueText: "Có",
          falseText: "Không",
          width: 100,
        },
        {
          //5
          caption: "THỨ TỰ",
          dataField: "SortOrder",
          dataType: "number",
          sortOrder: "asc",
          width: 100,
        },
        {
          //6
          caption: "GHI CHÚ",
          dataField: "Note",
          dataType: "string",
          width: 150,
        },
        {
          //7
          allowEditing: false,
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
          //8
          alignment: "center",
          caption: "VIEWS",
          dataField: "Views",
          dataType: "number",
          cellTemplate: "viewsCellTemplate",
          width: 90,
        },
      ],
      // editing: {
      //   mode: "cell",
      //   allowAdding: false,
      //   allowDeleting: false,
      //   allowUpdating: true,
      // },
      summary: {
        texts: {
          count: "{0}",
        },
        totalItems: [
          {
            column: "Name",
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
  $onInit() {}

  // CREATE
  onCreate() {
    this.productCategoryService.redirectCreate();
  }

  // EDIT
  onEdit(id) {
    this.productCategoryService.redirectEdit(id);
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

ProductCategoryDatagridController.$inject = [
  "$scope",
  "CommonService",
  "DevextremeService",
  "ProductCategoryService",
];

export const ProductCategoryDatagridComponent = {
  template: templateUrl,
  controller: ProductCategoryDatagridController,
};

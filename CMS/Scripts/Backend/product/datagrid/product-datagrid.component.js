import templateUrl from "./product-datagrid.component.html";

export default class ProductDatagridController {
  constructor(
    $scope,
    CommonService,
    DevextremeService,
    ProductService,
    ProductCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.productService = ProductService;
    this.productCategoryService = ProductCategoryService;

    // VAR
    this.datagrid = {};
    this.gridInstance = {};
    this.delete = {
      id: null,
      visible: false,
    };

    this.$scope.showFilter = true;

    // Categories
    this.$scope.categories = [];
    this.$scope.$watch(
      () => {
        return this.productCategoryService.getCategories();
      },
      (newValue, oldValue) => {
        this.$scope.categories = newValue;
      }
    );

    // Init Datagrid
    this.datagrid = angular.extend(this.devextremeService.getDefaultGrid(), {
      onInitialized: (e) => {
        this.gridInstance = e.component;
      },
      bindingOptions: {
        "filterRow.visible": "showFilter",
        "columns[3].lookup.dataSource": "categories",
      },
      dataSource: this.productService.gets([
        "Id",
        "CategoryId",
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
          allowEditing: false,
          caption: "DANH MỤC",
          dataField: "CategoryId",
          dataType: "number",
          lookup: {
            displayExpr: "VN_Name",
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
          width: 120,
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
          caption: "THỨ TỰ",
          dataField: "SortOrder",
          dataType: "number",
          sortOrder: "asc",
          width: 100,
        },
        {
          //7
          caption: "GHI CHÚ",
          dataField: "Note",
          dataType: "string",
          width: 150,
        },
        {
          //8
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
          //9
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
              hint: "Thêm sản phẩm",
              icon: "add",
              text: "Thêm sản phẩm",
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
    this.productService.redirectCreate();
  }

  // EDIT
  onEdit(id) {
    this.productService.redirectEdit(id);
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

ProductDatagridController.$inject = [
  "$scope",
  "CommonService",
  "DevextremeService",
  "ProductService",
  "ProductCategoryService",
];

export const ProductDatagridComponent = {
  template: templateUrl,
  controller: ProductDatagridController,
};

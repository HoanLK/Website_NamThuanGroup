import templateUrl from "./component-datagrid.component.html";

export default class ComponentDatagridController {
  constructor(
    $scope,
    CommonService,
    DevextremeService,
    ComponentService,
    ModuleService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.componentService = ComponentService;
    this.moduleService = ModuleService;

    // VAR
    this.datagrid = {};
    this.gridInstance = {};
    this.delete = {
      id: null,
      visible: false,
    };

    this.$scope.showFilter = true;
    // Modules
    this.$scope.modules = [];
    this.$scope.$watch(
      () => {
        return this.moduleService.getModules();
      },
      (newValue, oldValue) => {
        this.$scope.modules = newValue;
      }
    );

    // Init Datagrid
    this.datagrid = angular.extend(this.devextremeService.getDefaultGrid(), {
      onInitialized: (e) => {
        this.gridInstance = e.component;
      },
      bindingOptions: {
        "filterRow.visible": "showFilter",
        "columns[4].lookup.dataSource": "modules",
      },
      dataSource: this.componentService.gets([
        "Id",
        "ModuleId",
        "Name",
        "VN_MainTitle",
        "IsSingleMedia",
        "SortOrder",
        "Published",
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
          caption: "TÊN THÀNH PHẦN",
          dataField: "Name",
          dataType: "string",
          minWidth: 150,
        },
        {
          //3
          caption: "TIÊU ĐỀ",
          dataField: "VN_MainTitle",
          dataType: "string",
          minWidth: 150,
        },
        {
          //4
          allowEditing: false,
          caption: "MODULE",
          dataField: "ModuleId",
          dataType: "number",
          groupIndex: 0,
          lookup: {
            displayExpr: "Name",
            valueExpr: "Id",
          },
          width: 150,
        },
        {
          //5
          allowEditing: false,
          caption: "LOẠI MEDIA",
          dataField: "IsSingleMedia",
          dataType: "boolean",
          cellTemplate: "singleMediaCellTemplate",
          trueText: "Đơn media",
          falseText: "Đa media",
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
          caption: "XUẤT BẢN",
          dataField: "Published",
          dataType: "boolean",
          cellTemplate: "publishedCellTemplate",
          trueText: "Xuất bản",
          falseText: "Chưa xuất bản",
          width: 100,
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
      ],
      editing: {
        mode: "cell",
        allowAdding: false,
        allowDeleting: false,
        allowUpdating: true,
      },
      summary: {
        texts: {
          count: "{0}",
        },
        totalItems: [
          {
            column: "VN_Name",
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
              hint: "Thêm thành phần",
              icon: "add",
              text: "Thêm thành phần",
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
        // this.onEdit(e.data.Id);
      },
    });
  }

  // INIT
  $onInit() {}

  // CREATE
  onCreate() {
    this.componentService.redirectCreate();
  }

  // EDIT
  onEdit(id) {
    this.componentService.redirectEdit(id);
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

ComponentDatagridController.$inject = [
  "$scope",
  "CommonService",
  "DevextremeService",
  "ComponentService",
  "ModuleService",
];

export const ComponentDatagridComponent = {
  template: templateUrl,
  controller: ComponentDatagridController,
};

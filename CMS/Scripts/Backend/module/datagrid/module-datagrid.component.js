import templateUrl from "./module-datagrid.component.html";

export default class ModuleDatagridController {
  constructor($scope, CommonService, DevextremeService, ModuleService) {
    "ngInject";

    this.$scope = $scope;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.moduleService = ModuleService;

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
      dataSource: this.moduleService.gets([
        "Id",
        "Name",
        "SortOrder",
        "Published",
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
          caption: "TÊN MODULE",
          dataField: "Name",
          dataType: "string",
          minWidth: 150,
        },
        {
          //3
          caption: "THỨ TỰ",
          dataField: "SortOrder",
          dataType: "number",
          sortOrder: "asc",
          width: 100,
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
          caption: "GHI CHÚ",
          dataField: "Note",
          dataType: "string",
          width: 150,
        },
        {
          //6
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
              hint: "Thêm module",
              icon: "add",
              text: "Thêm module",
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
    this.moduleService.redirectCreate();
  }

  // EDIT
  onEdit(id) {
    this.moduleService.redirectEdit(id);
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

ModuleDatagridController.$inject = [
  "$scope",
  "CommonService",
  "DevextremeService",
  "ModuleService",
];

export const ModuleDatagridComponent = {
  template: templateUrl,
  controller: ModuleDatagridController,
};

import templateUrl from "./datagrid.component.html";

export default class PostDatagridController {
  constructor(
    $scope,
    $http,
    $window,
    CommonService,
    DevextremeService,
    PostService,
    PostCategoryService
  ) {
    "ngInject";

    this.$scope = $scope;
    this.$window = $window;
    this.commonService = CommonService;
    this.devextremeService = DevextremeService;
    this.postService = PostService;
    this.postCategoryService = PostCategoryService;

    // VAR
    this.datagrid = {};
    this.$scope.gridInstance = {};
    this.$scope.showFilter = false;
    this.$scope.categories = [];

    // Init Datagrid
    this.datagrid = angular.extend(this.devextremeService.getDefaultGrid(), {
      onInitialized: (e) => {
        this.$scope.gridInstance = e.component;
      },
      bindingOptions: {
        "filterRow.visible": "showFilter",
        "columns[3].lookup.dataSource": "categories",
      },
      dataSource: this.postService.gets([
        "Id",
        "CategoryId",
        "Published",
        "CreateTime",
        "Title",
        "Views",
      ]),
      columns: [
        {
          //0
          caption: "ID",
          dataField: "Id",
          dataType: "number",
          sortOrder: "desc",
          width: 60,
        },
        {
          //1
          caption: "Trạng thái",
          dataField: "Published",
          dataType: "boolean",
          cellTemplate: "publishedCellTemplate",
          trueText: "Xuất bản",
          falseText: "Chưa xuất bản",
          width: 100,
        },
        {
          //2
          caption: "Tiêu đề",
          dataField: "Title",
          dataType: "string",
          minWidth: 150,
        },
        {
          //3
          caption: "Danh mục",
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
          alignment: "left",
          caption: "Ngày tạo",
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
          caption: "Lượt xem",
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
            column: "Id",
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
              hint: "Thêm",
              icon: "add",
              text: "Thêm mới",
              type: "success",
              onClick: () => {
                this.onCreate();
              },
            },
            locateInMenu: "auto",
          },
          {
            // DELETE
            location: "before",
            widget: "dxButton",
            options: {
              hint: "Xóa",
              icon: "trash",
              text: "Xóa",
              type: "danger",
              onClick: () => {
                this.onDelete();
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
                  this.$scope.gridInstance.repaint();
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
                this.$scope.gridInstance.getDataSource().reload();
              },
            },
            locateInMenu: "auto",
          }
        );
      },
      onRowDblClick: (e) => {
        this.onEdit(e.data.Id);
        this.postService.get(e.data.Id).then(
          (res) => {
            console.log(res);
          },
          (res) => {
            toastr.error("Lấy thông tin bài viết", "Thất bại");
          }
        );
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
          toastr.error("Không lấy được danh sách Danh mục");
        }
      );
  }

  // CREATE
  onCreate() {
    this.$window.location.href = "/admin#!/post/create";
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

PostDatagridController.$inject = [
  "$scope",
  "$http",
  "$window",
  "CommonService",
  "DevextremeService",
  "PostService",
  "PostCategoryService",
];

export const PostDatagridComponent = {
  template: templateUrl,
  controller: PostDatagridController,
};

backend.controller("listProjectController", ['$scope', '$http', '$window', '$cookies', 'Services', function ($scope, $http, $window, $cookies, Services) {

    //---VAR---
    //Page
    $scope.page = {
        title: "Danh sách Dự án"
    };
    $scope.filter = false;
    //Project
    $scope.projects = [];
    $scope.tempProjects = [];
    $scope.project = {};
    $scope.selectedProjects = [];
    var apiProject = "/API/ProjectAPI";
    //CategoryProject
    $scope.categoryProjects = [];
    var apiCategoryProject = "/API/CategoryProjectAPI";

    //---POPUP---
    //Delete
    $scope.deleteProject = false;
    $scope.titleDeleteProject = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteProject = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteProject",
        showTitle: false,
        bindingOptions: {
            visible: "deleteProject",
        }
    };

    //---LIST---
    //Projects
    $scope.gridProjects = {
        bindingOptions: {
            dataSource: 'projects',
            'columns[6].lookup.dataSource': 'categoryProjects',
            'filterRow.visible': 'filter'
        },
        allowColumnResizing: true,
        columnAutoWidth: true,
        columnChooser: {
            emptyPanelText: "Kéo và thả cột muốn ẩn vào đây",
            enabled: true,
            mode: "select",
            title: "Lựa chọn cột"
        },
        columnFixing: {
            enabled: true,
            texts: {
                fix: "Cố định cột",
                leftPosition: "Bên trái",
                rightPosition: "Bên phải",
                unfix: "Hủy cố định"
            }
        },
        columnResizingMode: "widget",
        columns: [
            {//0
                caption: "ID",
                dataField: "Id",
                visible: false,
                width: 90
            },
            {//1
                caption: "Trạng thái",
                dataField: "Published",
                cellTemplate: "publishedCellTemplate",
                width: 90
            },
            {//2
                caption: "Nổi bật",
                dataField: "Featured",
                cellTemplate: "featuredCellTemplate",
                width: 90
            },
            {//3
                caption: "Tiêu đề",
                dataField: "Title",
                dataType: "string",
            },
            {//4
                caption: "Alias",
                dataField: "Alias",
                dataType: "string",
                visible: false
            },
            {//5
                caption: "Mức giá",
                dataField: "MucGia",
                dataType: "string",
            },
            {//6
                caption: "Danh mục",
                dataField: "CategoryId",
                lookup: {
                    displayExpr: 'Title',
                    valueExpr: 'Id'
                },
            },
            {//7
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
            {//8
                alignment: "center",
                caption: "Lượt xem",
                dataField: "Views",
                cellTemplate: "viewsCellTemplate",
                width: 90
            },
            {//9
                alignment: "left",
                caption: "Ghi chú",
                dataField: "Note",
                dataType: "string",
                visible: false
            },
        ],
        editing: {
            mode: "cell",
            allowAdding: false,
            allowDeleting: false,
            allowUpdating: false,
            texts: {
                addRow: "Thêm",
                cancelAllChanges: "Không thay đổi",
                cancelRowChanges: "Hủy",
                confirmDeleteMessage: "Bạn có chắc chắn muốn xóa?",
                deleteRow: "Xóa",
                editRow: "Sửa",
                saveAllChanges: "Lưu thay đổi",
                saveRowChanges: "Lưu",
                undeleteRow: "Không xóa",
                validationCancelChanges: "Hủy thay đổi"
            }
        },
        export: {
            allowExportSelectedData: true,
            enabled: true,
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            fileName: "Danh sách Danh mục Dự án",
            texts: {
                exportAll: "Xuất toàn bộ Dữ liệu",
                exportSelectedRows: "Xuất dữ liệu đang chọn",
                exportTo: "Trích xuất"
            }
        },
        filterRow: {
            applyFilterText: "Áp dụng bộ lọc",
            betweenEndText: "Kết thúc",
            betweenStartText: "Bắt đầu",
            resetOperationText: "Thiết lập lại",
            showAllText: "(Tất cả)",
        },
        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick",
            texts: {
                groupByThisColumn: "Nhóm theo Cột này",
                groupContinuedMessage: "Tiếp tục từ trang trước",
                groupContinuesMessage: "Tiếp tục trên các trang tiếp theo",
                ungroup: "Bỏ nhóm",
                ungroupAll: "Bỏ tất cả nhóm"
            }
        },
        groupPanel: {
            emptyPanelText: "Kéo một cột vào đây để nhóm theo cột đó",
            visible: false
        },
        headerFilter: {
            texts: {
                cancel: "Hủy",
                emptyValue: "(Trống)",
                ok: "Đồng ý"
            },
            visible: false
        },
        height: "100%",
        hoverStateEnabled: true,
        loadPanel: {
            enabled: true,
            text: "Đang tải ..."
        },
        noDataText: "Không có dữ liệu",
        pager: {
            infoText: "Trang {0} của {1}",
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            enabled: true,
            pageIndex: 0,
            pageSize: 50
        },
        remoteOperations: {
            grouping: false,
            summary: false
        },
        rowAlternationEnabled: false,
        scrolling: {
            preloadEnabled: true
        },
        searchPanel: {
            placeholder: "Tìm kiếm ..."
        },
        selection: {
            mode: "multiple",
            showCheckBoxesMode: "onClick"
        },
        showBorders: true,
        showRowLines: true,
        sorting: {
            ascendingText: "Sắp xếp Tăng dần",
            clearText: "Xóa Sắp xếp",
            descendingText: "Sắp xếp Giảm dần"
        },
        summary: {
            texts: {
                count: "{0}",
                sum: "{0}"
            },
            groupItems: [
                {
                    column: "id",
                    summaryType: "count"
                }
            ],
            totalItems: [
                {
                    column: "id",
                    summaryType: "count"
                }
            ]
        },
        wordWrapEnabled: false,
        //METHOD
        //Toolbar
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
                {//Thêm
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Thêm",
                        icon: "add",
                        type: "success",
                        onClick: function () {
                            $scope.Create();
                        }
                    }
                },
                {//Sửa
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Sửa",
                        icon: "edit",
                        type: "default",
                        onClick: function () {
                            $scope.Edit();
                        }
                    }
                },
                {//Xóa
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Xóa",
                        icon: "trash",
                        type: "danger",
                        onClick: function () {
                            $scope.Delete();
                        }
                    }
                },
                {//Load lại
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Load lại Dữ liệu",
                        icon: "refresh",
                        onClick: function () {
                            GetAllProject();
                        }
                    }
                },
                {//Lọc
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Lọc dữ liệu",
                        icon: "filter",
                        onClick: function () {
                            ToggleFilter();
                        }
                    }
                }
            )
        },
        //DoubleClick Row
        onRowClick: function (e) {
            var component = e.component;

            if (!component.clickCount)
                component.clickCount = 1;
            else
                component.clickCount = component.clickCount + 1;

            if (component.clickCount == 1) {
                component.lastClickTime = new Date();
                setTimeout(function () { component.lastClickTime = 0; component.clickCount = 0; }, 350);
            }
            else if (component.clickCount == 2) {
                if (((new Date()) - component.lastClickTime) < 300) {
                    $scope.project = angular.copy(e.data);
                    $scope.Edit();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedProjects = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    $scope.contextMenuProject = {
        dataSource: itemContextMenus,
        width: 100,
        target: '#project',
        itemTemplate: function (itemData, itemIndex, itemElement) {
            var template = $('<div></div>');
            if (itemData.icon) {
                template.append('<span class="' + itemData.icon + '"><span>');
            }
            template.append(itemData.text);
            return template;
        },
        onItemClick: function (e) {
            if (!e.itemData.items) {
                switch (e.itemData.value) {
                    case "add":
                        $scope.Create();
                        break;
                    case "edit":
                        $scope.Edit();
                        break;
                    case "delete":
                        $scope.Delete();
                        break;
                }

            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        //Get All Category
        GetAllCategoryProject();
        //Get All Project
        GetAllProject()
    }

    //Get All Category Project
    function GetAllCategoryProject() {
        Services.Get(apiCategoryProject + "?viewmodel=true&&type=select")
            .then(function success(response) {
                $scope.categoryProjects = angular.copy(Services.GenMultiLevel(response.data));
            }, function error(response) {
                toastr.error("Không lấy được Danh sách danh mục");
            }
            );

    }

    //Get All Project
    function GetAllProject() {
        Services.Get(apiProject + '?viewmodel=true&&type=table')
            .then(function success(response) {
                $scope.projects = angular.copy(response.data);
            }, function error(response) {
                toastr.error("Không lấy được Danh sách Dự án");
            });
    }

    //Toggle Filter
    function ToggleFilter() {
        $scope.filter = !$scope.filter;
    }

    //Create
    $scope.Create = function () {
        $window.location.href = '/Admin#!/project/edit';
    }
    //Edit
    $scope.Edit = function () {
        if ($scope.selectedProjects.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            $scope.project = angular.copy($scope.selectedProjects[0]);
            $window.location.href = '/Admin#!/project/edit/' + $scope.project.Id;
        }
    }
    //Delete
    $scope.Delete = function () {
        if ($scope.selectedProjects.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.deleteProject = true;
        }
    }
    $scope.ConfirmDelete = function () {
        //Lấy mảng id cần xóa "id1,id2,id3..."
        var arrayIds = "";
        angular.forEach($scope.selectedProjects, function (value, index) {
            if (index != $scope.selectedProjects.length - 1) {
                arrayIds += value.Id + ",";
            } else {
                arrayIds += value.Id;
            }
        });

        //Xóa
        Services.DeleteList(apiProject, arrayIds)
            .then(function success(response) {
                if (response.data == 1) {

                    GetAllProject();

                    $scope.deleteProject = false;
                    toastr.success("Xóa thành công");
                } else {
                    toastr.error("Không thể xóa");
                }
            }, function error(response) {
                toastr.error("Không thể xóa");
            })
    };
    $scope.CancelDelete = function () {
        $scope.deleteProject = false;
    };


}]);
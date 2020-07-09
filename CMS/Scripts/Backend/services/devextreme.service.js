export default class DevextremeService {
    // Default Grid
    getDefaultGrid() {
        return {
            allowColumnReordering: false,
            allowColumnResizing: true,
            columnChooser: {
                enabled: true,
                mode: "select",
            },
            columnFixing: {
                enabled: false
            },
            columnResizingMode: "widget",
            dateSerializationFormat: "MM/dd/yyyy",
            editing: {
                mode: "cell",
                allowAdding: false,
                allowDeleting: false,
                allowUpdating: false,
            },
            export: {
                enabled: true
            },
            filterRow: {
                showOperationChooser: true,
                visible: true
            },
            grouping: {
                contextMenuEnabled: true,
                expandMode: "rowClick"
            },
            groupPanel: {
                visible: false
            },
            headerFilter: {
                visible: false
            },
            height: "100%",
            hoverStateEnabled: true,
            loadPanel: {
                enabled: true,
                indicatorSrc: '/Content/Backend/Templates/ajax-loader.gif',
                text: "Đang tải ..."
            },
            paging: {
                enabled: true,
                pageIndex: 0,
                pageSize: 30
            },
            repaintChangesOnly: true,
            remoteOperations: {
                paging: true,
                filtering: true,
                sorting: true,
                grouping: true,
                summary: true,
                groupPaging: true
            },
            rowAlternationEnabled: false,
            scrolling: {
                columnRenderingMode: 'standard',
                mode: "virtual",
                preloadEnabled: true,
                rowRenderingMode: 'virtual',
                scrollByContent: false,
                scrollByThumb: false,
                showScrollbar: 'always',
                useNative: "true"
            },
            selection: {
                allowSelectAll: true,
                deferred: false,
                mode: "multiple",
                selectAllMode: "allPages",
                showCheckBoxesMode: "onClick"
            },
            showBorders: true,
            showRowLines: true,
            stateStoring: {
                enabled: false,
                type: "localStorage",
                storageKey: "storage"
            },
            sorting: {
                mode: "multiple"
            },
            twoWayBindingEnabled: false,
            wordWrapEnabled: false,
            width: "100%"
        }
    };

    //Default ContextMenu Grid
    getDefaultContextMenuGrid() {
        return [
            {
                value: 'add',
                text: ' Thêm',
                icon: 'fa fa-plus'
            },
            {
                value: 'edit',
                text: ' Sửa',
                icon: 'fa fa-pencil'
            },
            {
                value: 'delete',
                text: ' Xóa',
                icon: 'fa fa-times'
            }
        ];
    };

    //Template ContextMenu Grid
    getTemplateContextMenuGrid(itemData, itemIndex, itemElement) {

        var template = $('<div></div>');
        if (itemData.icon) {
            template.append('<span class="' + itemData.icon + '"><span>');
        }
        template.append(itemData.text);

        return template;
    };
}

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
        enabled: false,
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
        enabled: true,
      },
      filterRow: {
        showOperationChooser: true,
        visible: true,
      },
      grouping: {
        contextMenuEnabled: true,
        expandMode: "rowClick",
      },
      groupPanel: {
        visible: false,
      },
      headerFilter: {
        visible: false,
      },
      height: "100%",
      hoverStateEnabled: true,
      loadPanel: {
        enabled: true,
        indicatorSrc: "/Content/Backend/Templates/ajax-loader.gif",
        text: "Đang tải ...",
      },
      paging: {
        enabled: true,
        pageIndex: 0,
        pageSize: 30,
      },
      repaintChangesOnly: true,
      remoteOperations: {
        paging: true,
        filtering: true,
        sorting: true,
        grouping: true,
        summary: true,
        groupPaging: true,
      },
      rowAlternationEnabled: false,
      scrolling: {
        columnRenderingMode: "standard",
        mode: "virtual",
        preloadEnabled: true,
        rowRenderingMode: "virtual",
        scrollByContent: false,
        scrollByThumb: false,
        showScrollbar: "always",
        useNative: "true",
      },
      selection: {
        mode: "none",
        selectAllMode: "allPages",
        showCheckBoxesMode: "onClick",
      },
      showBorders: true,
      showRowLines: true,
      stateStoring: {
        enabled: false,
        type: "localStorage",
        storageKey: "storage",
      },
      sorting: {
        mode: "multiple",
      },
      twoWayBindingEnabled: false,
      wordWrapEnabled: false,
      width: "100%",
    };
  }

  // Default TreeList
  getDefaultTreeList() {
    return {
      cacheEnabled: true,
      columnChooser: {
        allowSearch: false,
        enabled: true,
        height: 260,
        mode: "select",
        searchTimeout: 500,
        width: 250,
      },
      columnFixing: {
        enabled: true,
      },
      columnResizingMode: "widget",
      dataStructure: "plain",
      dateSerializationFormat: "MM/dd/yyyy",
      elementAttr: {},
      filterRow: {
        showOperationChooser: true,
        visible: true,
      },
      filterSyncEnabled: true,
      headerFilter: {
        visible: false,
      },
      height: "100%",
      hoverStateEnabled: true,
      itemsExpr: "items",
      loadPanel: {
        enabled: true,
        indicatorSrc: "/Content/Backend/Templates/ajax-loader.gif",
        text: "Đang tải ...",
      },
      paging: {
        enabled: true,
        pageIndex: 0,
        pageSize: 30,
      },
      remoteOperations: {
        filtering: true,
        grouping: true,
        groupPaging: true,
        paging: true,
        sorting: true,
        summary: true,
      },
      renderAsync: true,
      repaintChangesOnly: true,
      scrolling: {
        columnRenderingMode: "standard",
        mode: "virtual",
        preloadEnabled: false,
        rowRenderingMode: "standard",
        scrollByContent: true,
        scrollByThumb: false,
        showScrollbar: "always",
        useNative: true,
        // mode: 'infinite'
      },
      showBorders: true,
      showColumnHeaders: true,
      showColumnLines: true,
      showRowLines: true,
      twoWayBindingEnabled: false,
      width: "100%",
    };
  }

  // Default LoadPanel
  getDefaultLoadPanel() {
    return {
      indicatorSrc: "/Content/Backend/Templates/ajax-loader.gif",
      message: "Đang xử lý ...",
      showIndicator: true,
      showPane: false,
      shading: true,
      closeOnOutsideClick: false,
    };
  }

  // Default Popup
  getDefaultPopup() {
    return {
      width: "300px",
      height: "100px",
      showTitle: false,
      resizeEnabled: false,
      maxWidth: "100%",
    };
  }

  //Default ContextMenu Grid
  getDefaultContextMenuGrid() {
    return [
      {
        value: "add",
        text: " Thêm",
        icon: "fa fa-plus",
      },
      {
        value: "edit",
        text: " Sửa",
        icon: "fa fa-pencil",
      },
      {
        value: "delete",
        text: " Xóa",
        icon: "fa fa-times",
      },
    ];
  }

  //Template ContextMenu Grid
  getTemplateContextMenuGrid(itemData, itemIndex, itemElement) {
    var template = $("<div></div>");
    if (itemData.icon) {
      template.append('<span class="' + itemData.icon + '"><span>');
    }
    template.append(itemData.text);

    return template;
  }
}

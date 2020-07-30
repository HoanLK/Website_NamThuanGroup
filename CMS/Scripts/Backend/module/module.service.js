const API_URL = "/api/ModuleAPI";
const ODATA_URL = "/odata/ModuleOData";
const LIST_FUNCTION = [
  "skip",
  "take",
  "requireTotalCount",
  "requireGroupCount",
  "sort",
  "filter",
  "totalSummary",
  "group",
  "groupSummary",
];

export default class ModuleService {
  constructor($q, $window, $http, CommonService) {
    "ngInject";
    this.$q = $q;
    this.$window = $window;
    this.$http = $http;
    this.commonService = CommonService;

    // Modules
    this.modules = [];
    this.gets(["Id", "Name"])
      .load()
      .then(
        (res) => {
          this.modules = res.data;
        },
        (res) => {
          toastr.error("Lấy danh sách danh mục", "Thất bại");
        }
      );
  }

  // GET MODULES
  getModules() {
    return this.modules;
  }

  // GETS
  gets(selects = []) {
    return new DevExpress.data.CustomStore({
      key: "Id",
      load: (loadOptions) => {
        let defer = this.$q.defer();
        let params = {};
        LIST_FUNCTION.forEach((i) => {
          if (i in loadOptions && !this.commonService.isNullOrEmpty(i))
            params[i] = JSON.stringify(loadOptions[i]);
        });
        params.select = JSON.stringify(selects);

        this.$http({
          method: "GET",
          url: API_URL,
          params: params,
        }).then(
          (res) => {
            defer.resolve(res.data);
          },
          (res) => {
            defer.reject(res);
            toastr.error("Không lấy được dữ liệu");
          }
        );

        return defer.promise;
      },

      update: (key, values) => {
        return this.$http.patch(`${ODATA_URL}('${key}')`, values).then(
          (res) => {
            toastr.success("Lưu thành công");
          },
          (res) => {
            toastr.error("Lưu thất bại");
          }
        );
      },
    });
  }

  // GET
  get(id) {
    return this.$http.get(`${API_URL}/${id}`);
  }

  // CREAT
  create(data) {
    return this.$http.post(API_URL, data);
  }

  // EDIT
  edit(id, data) {
    return this.$http.put(`${API_URL}/${id}`, data);
  }

  // EDIT
  delete(id) {
    return this.$http.delete(`${API_URL}/${id}`);
  }

  //--- REDIRECT ---

  // REDIRECT LIST
  redirectList() {
    this.$window.location.href = "/admin#!/module";
  }

  // REDIRECT EDIT
  redirectEdit(id) {
    this.$window.location.href = `/admin#!/module/edit/${id}`;
  }

  // REDIRECT CREATE
  redirectCreate() {
    this.$window.location.href = "/admin#!/module/create";
  }
}

ModuleService.$inject = ["$q", "$window", "$http", "CommonService"];

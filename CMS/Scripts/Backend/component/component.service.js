const API_URL = "/api/ComponentAPI";
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

export default class ComponentService {
  constructor($q, $window, $http, CommonService) {
    "ngInject";
    this.$q = $q;
    this.$window = $window;
    this.$http = $http;
    this.commonService = CommonService;
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
    this.$window.location.href = "/admin#!/component";
  }

  // REDIRECT EDIT
  redirectEdit(id) {
    this.$window.location.href = `/admin#!/component/edit/${id}`;
  }

  // REDIRECT CREATE
  redirectCreate() {
    this.$window.location.href = "/admin#!/component/create";
  }
}

ComponentService.$inject = ["$q", "$window", "$http", "CommonService"];

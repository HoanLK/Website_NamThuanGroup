const API_URL = "/api/InfoAPI";

export default class InfoService {
    constructor($q, $window, $http, CommonService) {
        "ngInject";
        this.$q = $q;
        this.$window = $window;
        this.$http = $http;
        this.commonService = CommonService;
    }

    // GET
    get(id) {
        return this.$http.get(`${API_URL}/${id}`);
    }

    // EDIT
    edit(id, data) {
        return this.$http.put(`${API_URL}/${id}`, data);
    }
}

InfoService.$inject = ["$q", "$window", "$http", "CommonService"];

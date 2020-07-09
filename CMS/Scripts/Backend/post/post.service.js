const API_URL = "/api/PostAPI";
const LIST_FUNCTION = [
    "skip",
    "take",
    "requireTotalCount",
    "requireGroupCount",
    "sort",
    "filter",
    "totalSummary",
    "group",
    "groupSummary"
];

export default class PostService {

    constructor($q, $window, $http, CommonService) {
        'ngInject';
        this.$q = $q;
        this.$window = $window;
        this.$http = $http;
        this.commonService = CommonService;
    }

    // GET DATASOURCE DATAGRID
    gets() {
        return new DevExpress.data.CustomStore({
            key: "Id",
            load: (loadOptions) => {
                let defer = this.$q.defer();
                let params = {};
                LIST_FUNCTION.forEach((i) => {
                    if (i in loadOptions && !this.commonService.isNullOrEmpty(i))
                        params[i] = JSON.stringify(loadOptions[i]);
                });

                this.$http({
                    method: 'GET',
                    url: API_URL,
                    params: params
                })
                    .then(
                        (res) => {
                            defer.resolve(res.data);
                        },
                        (res) => {
                            defer.reject(res);
                            toastr.error("Không lấy được dữ liệu");
                        }
                    );

                return defer.promise;
            }
        })
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

    //--- REDIRECT ---

    // REDIRECT LIST
    redirectList() {
        this.$window.location.href = '/Admin#!/Post';
    };

    // REDIRECT EDIT
    redirectEdit(id) {
        this.$window.location.href = `/Admin#!/post/edit/${id}`;
    };

    // REDIRECT AFTER EDIT
    redirectAfterEdit(request) {
        switch (request) {
            case 'Edit':
                Init();
                break;
            case 'New':
                this.$window.location.href = '/Admin#!/post/edit';
                break;
            case 'Exit':
                this.$window.location.href = '/Admin#!/post';
                break;
        }
    };

    // REDIRECT CREATE
    redirectCreate() {
        this.$window.location.href = '/Admin#!/post/edit';
    };

    // REDIRECT AFTER CREATE
    redirectAfterCreate(request, id) {
        switch (request) {
            case 'Edit':
                $window.location.href = `/Admin#!/post/edit/${id}`;
                break;
            case 'New':
                Init();
                break;
            case 'Exit':
                $window.location.href = '/Admin#!/post';
                break;
        }
    };
    // REDIRECT CANCEL
    redirectCancel() {
        this.$window.location.href = '/Admin#!/post';
    };
}

PostService.$inject = ['$q', '$window', '$http', 'CommonService'];
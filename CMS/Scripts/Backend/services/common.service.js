export default class CommonService {

    //Check Null && Undefinend
    isNullOrEmpty(input) {
        if (input === null || input === '' || input === undefined)
            return true;
        else
            return false;
    };

    //Generate Multi Level
    genMultiLevel(input) {
        var temp = angular.copy(input);
        var output = [];

        angular.forEach(temp, function (value, index) {
            MultiLevel(value, 0);
        });

        function MultiLevel(category, count) {
            if (output.indexOf(category) === -1) {
                for (var i = 1; i <= count; i++) {
                    category.Title = "– " + category.Title;
                }
                count++;
                output.push(category);
                angular.forEach(temp, function (value, index) {
                    if (value.ParentId === category.Id) {
                        MultiLevel(value, count);
                    }
                });
            }
        }

        return output;
    };

    //Generate Alias
    genAlias(input) {
        //Đổi chữ hoa thành chữ thường
        var slug = input.toLowerCase();

        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');

        return slug;
    };

    // Standard Date
    standardDate(input) {
        if (!this.isNullOrEmpty(input)) {
          const temp = new Date(input);
          return DateTime.utc(
            temp.getFullYear(),
            temp.getMonth() + 1,
            temp.getDate(),
            temp.getHours(),
            temp.getMinutes(),
            temp.getSeconds()
          ).toJSDate();
        } else {
          return input;
        }
      }
}
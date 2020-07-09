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

    //Generate Varchar
    genVarchar(input) {
        //Đổi chữ thành chữ hoa
        let output = input.toUpperCase();

        //Đổi ký tự có dấu thành không dấu
        output = output.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        output = output.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        output = output.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        output = output.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        output = output.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        output = output.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        output = output.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        output = output.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        output = output.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành ký tự trắng
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        output = output.replace(/\-\-\-\-\-/gi, '');
        output = output.replace(/\-\-\-\-/gi, '');
        output = output.replace(/\-\-\-/gi, '');
        output = output.replace(/\-\-/gi, '');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        output = '@' + output + '@';
        output = output.replace(/\@\-|\-\@|\@/gi, '');

        output = output.replace(/[&\/\\#,+()$~%.'":*?\-_<>{}]/g, '');
        output = output.toLowerCase();

        return output;
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
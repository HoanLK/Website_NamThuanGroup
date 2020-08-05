$(document).ready(function () {
    $("#EmailNotifyformId").submit(function (event) {
        $("#sendBtn").css("display", "none");
        $("#sendingBtn").css("display", "block");

        var dataString;
        event.preventDefault();
        event.stopImmediatePropagation();
        var action = $("#EmailNotifyformId").attr("action");

        // Setting.
        dataString = new FormData($("#EmailNotifyformId").get(0));
        contentType = false;
        processData = false;

        $.ajax({
            type: "POST",
            url: action,
            data: dataString,
            dataType: "json",
            contentType: contentType,
            processData: processData,
            success: function (result) {
                // Result.
                onEmailNotifySuccess(result.result);

                $("#sendBtn").css("display", "block");
                $("#sendingBtn").css("display", "none");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //do your own thing
                alert("Gửi email thất bại");

                $("#sendBtn").css("display", "block");
                $("#sendingBtn").css("display", "none");
            }
        });

    }); //end .submit()
});

var onEmailNotifySuccess = function (result) {
    if (result == "1") {
        // Setting.
        alert("Gửi email thành công");

        // Resetting form.
        $('#EmailNotifyformId').get(0).reset();
    }
    else {
        // Setting.
        alert("Gửi email thất bại");
    }
}
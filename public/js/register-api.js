$(".form-register").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
        url: apiRoutes.register,
        data: JSON.stringify(formAsJson(e)),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Accept","application/json");
        },
        success: (response) => {
            loadTemplate(templateRoutes.login);
        },
        error: (response) => {
            console.log(response);
            const responseBody = response.responseJSON;
            if (responseBody.error && responseBody.error.errorInfo) {
                const errorMessagesArray = responseBody.error.errorInfo;
                if (errorMessagesArray.length == 3) {
                    const directMessage = errorMessagesArray[2];
                    console.log("directMessage", directMessage);
                    if (directMessage.toLowerCase().indexOf("duplicate") > -1) {
                        $(".alert").css("display", "block");
                    }
                }
            }
        }
    });
});
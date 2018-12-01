$(".form-register").on("submit", (e) => {
    e.preventDefault();
    console.log("")
    $.ajax({
        url: apiRoutes.register,
        data: formAsJson(e),
        type: 'POST',
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Accept","application/json");
        },
        success: (response) => {
            console.log("register success");
        },
        error: (response) => {
            console.log("register error", response);
            const parsedError = JSON.parse(response);
            if (parsedError.error && parsedError.error.errorInfo) {
                const errorMessagesArray = parsedError.error.errorInfo;
                if (errorMessagesArray.length == 3) {
                    const directMessage = errorMessagesArray[2];
                    if (directMessage.indexOf("") > -1) {

                    }
                }
            }
        }
    });
});
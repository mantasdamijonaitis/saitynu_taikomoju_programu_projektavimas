$(".registerButton").on('click', () => {
    loadTemplate(templateRoutes.register);
});

$(".form-signin").on('submit', (e) => {
    e.preventDefault();
    console.log(apiRoutes);
    $.ajax({
        url: apiRoutes.login,
        data: formAsJson(e),
        type: 'POST',
        success: (response) => {
            console.log("success");
        },
        error: (response) => {
            $(".alert").css("display", "block");
        }
    });
});
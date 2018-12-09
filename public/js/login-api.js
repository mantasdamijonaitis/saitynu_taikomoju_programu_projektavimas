$(".registerButton").on('click', () => {
    loadTemplate(templateRoutes.register);
});

$(".form-signin").on('submit', (e) => {
    e.preventDefault();
    $.ajax({
        url: apiRoutes.login,
        data: formAsJson(e),
        type: 'POST',
        success: (response) => {
            console.log("success", response);
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('email', $("#inputEmail").val());
            loadTemplate(templateRoutes.home);
        },
        error: (response) => {
            $(".alert").css("display", "block");
        }
    });
});
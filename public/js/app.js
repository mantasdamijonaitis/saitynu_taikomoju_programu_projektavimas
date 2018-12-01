const apiRoutes = {
    register: '/api/register',
    login: '/api/login'
};

const templateRoutes = {
    register: 'register-api',
    login: 'login-api'
};

const container = $(".content");

const loadTemplate = (path) => {
    container.load(path);
};

const formAsJson = (selector) => {
    let object = {};
    new FormData($(selector.target)[0]).forEach(function(value, key){
        object[key] = value;
    });
    return JSON.stringify(object);
};

loadTemplate(templateRoutes.register);
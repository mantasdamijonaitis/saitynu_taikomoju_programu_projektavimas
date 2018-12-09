const apiRoutes = {
    register: '/api/register',
    login: '/api/login',
    books: '/api/books',
};

const templateRoutes = {
    register: 'register-api',
    login: 'login-api',
    home: 'home-api',
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
    console.log("object", object);
    return object;
};

const getToken = () => {
    return localStorage.getItem('token');
};

const getAuthenticationToken = () => {
    return "Bearer "  + getToken();
};

const isTokenSet = () => {
    return getToken();
};

if (isTokenSet()) {
    loadTemplate(templateRoutes.home);
} else {
    loadTemplate(templateRoutes.login);
}
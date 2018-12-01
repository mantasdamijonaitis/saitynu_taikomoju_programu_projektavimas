<link href="{{ asset('css/login-api.css') }}" rel="stylesheet">
<div class="text-center">
    <form class="form-credentials form-register">
        <div class="alert alert-danger">
            <strong>Error!</strong> <label class="error_text"></label>
        </div>
        <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" name="email">
        <label for="name" class="sr-only">Name</label>
        <input type="name" id="name" class="form-control" placeholder="Name" required="" autofocus="" name="name">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" name="password">
        <button class="btn btn-lg btn-default btn-block registerButton">Register</button>
        <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
    </form>
</div>

<script src="{{ asset('js/register-api.js') }}"></script>

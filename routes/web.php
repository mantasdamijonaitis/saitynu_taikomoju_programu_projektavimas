<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login-api', function() {
    return view('login-api');
});

Route::get('/register-api', function() {
    return view('register-api');
});

Route::get('/home-api', function() {
    return view('home-api');
});

Route::get('/books', function() {
    return view('books');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

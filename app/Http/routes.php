<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/{slug?}', function () {
    return view('welcome');
});

// Routes for clients...
Route::post('auth/register', 'Auth\AuthController@postRegister');

// Routes for admin...
Route::post('admin/register', 'Auth\AuthController@postRegisterAdmin');

// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

Route::get('/role/index', 'RoleController@role');

Route::post('/question/create', 'QuestionController@data');
Route::get('/question/index','QuestionController@questions');
Route::get('/question/answers','QuestionController@answers');

Route::delete('/question/delete/{id}', 'QuestionController@destroy');
Route::post('/result', 'QuestionController@store');
Route::get('/result/index', 'QuestionController@result');
Route::get('user/index', 'UserController@users');

Route::get('result/data/{id}', 'ResultController@data');
Route::get('result/data/minor/{id}', 'ResultController@minor');
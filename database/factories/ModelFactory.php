<?php
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/
$factory->define(App\User::class, function ($faker) {   
    $avatar = 'default.jpg';
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => bcrypt(123456),
        'telephone' => $faker->tollFreePhoneNumber,
        'sex' => $faker->randomElement($array = array ('male', 'female')),
        'date_of_birth' => $faker->dateTimeThisCentury->format('Y-m-d'),
        'avatar' => $avatar,
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Question::class, function ($faker) {        
    return [ 
        'question' => $faker->sentence,        
    ];
 });

$factory->define(App\Answer::class, function ($faker) {
    return [               
        'answer' => $faker->word,   
    ];
 });

$factory->define(App\Result::class, function () {
    return [
    ];
 });
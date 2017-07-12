<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';

    protected $fillable = ['question'];  

    public function answers()
    {
        return $this->hasMany('App\Answer');
    }

    public function results()
    {
        return $this->hasMany('App\Result');
    }
}
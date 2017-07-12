<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $table = 'results';
    protected $fillable = ['user_id', 'question_id','answer_id'];

    public function question()
    {
        return $this->belongsTo('App\Question');
    }
    
    public function answer()
    {
        return $this->belongsTo('App\Answer');
    }
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
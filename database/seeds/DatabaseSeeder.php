<?php
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Question;
use App\Answer;
use App\Result;
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    { 
        $answers = 0;
        $question = factory(App\Question::class, 10)->create()->each(
            function($question) use (&$answers) {
                $answers = factory(App\Answer::class,rand(1,7))->create(['question_id' => $question->id]);                                                           
            }
        );
        
        factory(App\User::class, 10)->create()->each(
            function($user) use ($question, $answers) {               
                $user->roles()->attach(rand(1,2));
                foreach($question as $key => $value) {                    
                factory(App\Result::class)->create([
                    'user_id' => $user->id,
                    'question_id' => $question[$key]['id'],
                    'answer_id' => $question[$key]->answers[rand(0,count($question[$key]->answers)-1)]['id'],
                ]);
             }
            }
        ); 
       }
}
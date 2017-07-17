<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Question;
use App\Answer;
use App\User;
use App\Result;
use App\Http\Middleware;
use Illuminate\Support\Facades\Auth;
use Response;

class QuestionController extends Controller
{
    public function data(Request $request)
    {        
        $question = new Question;        
        $question->question = $request->question;

        $result = $request->all('answer'); 

        $question->save();              
        
        $maxkey = max(array_keys($result['answer']));
            for ($x = 0; $x <= $maxkey; $x++) {
                $answers = new Answer;
                $answers->question()->associate($question);
                $answers->answer = $result['answer'][$x]['answers'];
                $answers->save();
            }
    }

   public function questions()
   {             
       $questions = Question::all();      
       return Response::json($questions);
   }

   public function answers()
   {             
       $answers = Answer::all();            
       return Response::json($answers);
   }

    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete(); 
    }

    public function store(Request $request)
    { 
       
       $data = $request->all('result');
       $question = $data['result']['question_id'];
       $answer = $data['result']['answer_id'];        
       $result = new Result;

       $result->answer_id = $answer;
       $result->question_id =  $question;                   
       $result->user_id = Auth::user()->id;
       $result->save();  

       // if (Result::where('question_id', '=', $question)
       //      ->where('user_id', '=', $result->user_id)
       //      ->exists()) {}
       // else {
                      
       //}            
    }

   public function result()
   {             
       $result = Result::all();            
       return Response::json($result);
   }
}
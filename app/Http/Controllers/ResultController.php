<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use App\Question;
use App\User;
use App\Answer;
use App\Result;
use Response;

class ResultController extends Controller
{

    public function data(Request $request)
    { 
        $id = $request->id;

        $data =  Result::leftJoin('users', function($join) use($id) {
                        $join
                            ->on('users.id', '=', 'results.user_id')
                           ;
                        })
            
                        ->leftJoin('answers', function($join) use($id) {
                        $join
                            ->on('results.answer_id', '=', 'answers.id');
                        })
                        ->selectRaw('results.question_id as question_id, results.answer_id as answer_id,  users.id as user_id, 
                            answers.answer, users.sex, count(users.sex) as count_sex, count(users.date_of_birth) as count_bd')
                        ->groupBy(['answers.answer', 'users.sex'])
                         ->where('users.date_of_birth', '<=',  '1999-01-01')
                        ->get()
                        ->toArray();        


        return Response::json($data);
    } 


        // $data = Result::leftJoin('users', function($join) use($id) {
        //     $join
        //         ->on('users.id', '=', 'results.user_id')
        //        ;
        //     })

        //     ->leftJoin('answers', function($join) use($id) {
        //     $join
        //         ->on('results.answer_id', '=', 'answers.id');
        //     })
        //     ->selectRaw('users.id, answers.answer, users.sex, count(*) as male')
        //     ->groupBy('users.sex')
        //     ->where('users.sex', 'female')
        //     ->get()
        //     ->toArray();


        // $answer = User::leftJoin('results', function($join) use($id) {
        //     $join
        //         ->on('results.user_id', '=', 'users.id')
        //         ->where('results.question_id', '=', $id);
        //     })

        //     ->leftJoin('answers', function($join) use($id) {
        //     $join
        //         ->on('results.answer_id', '=', 'answers.id');
        //     })
        //     // ->selectRaw('users.id, users.sex, count(*) as male')
        //     // ->groupBy('users.sex')
        //     // ->where('users.sex', 'female')
        //     ->get()
        //     ->toArray();



        // $male = User::with([
        //     'results' => function($q) use($id) {
        //         $q
        //             ->where('question_id', $id);                    
                    
        //     }])
        //     ->selectRaw('id, sex, count(*) as male')
        //     ->groupBy('sex')
        //     ->where('sex', 'male')
        //     ->get()
        //     ->toArray();

        // $minor = User::with([
        //     'results' => function($q) use($id) {
        //         $q
        //             ->where('question_id', $id);                    
                    
        //     }])
        //     ->selectRaw('date_of_birth, count(*) as minor')
        //     ->groupBy('date_of_birth')
        //     ->where('date_of_birth', '<=',  '1999-01-01')
        //     ->get()
        //     ->toArray();

        // $array = array_merge($answers, $female);

       // return Response::json($array);

         
}
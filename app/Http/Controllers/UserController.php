<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use Image;
use App\User;
use Response;

class UserController extends Controller
{    
    public function users()  {
        $users = User::all();
        return Response::json($users);        
    }

}
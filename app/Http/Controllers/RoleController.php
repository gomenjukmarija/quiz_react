<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\Role;
use Illuminate\Support\Facades\Auth;
use Response;
use DB;

class RoleController extends Controller
{
   public function role()
   {
       $role = Role::all();
       return Response::json($role);
   }
}
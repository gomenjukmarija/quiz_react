<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Role extends Model
{
	protected $table = 'role_user';
	protected $fillable = ['name', 'display_name', 'description'];	
}
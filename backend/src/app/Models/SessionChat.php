<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionChat extends Model
{
    protected $fillable = ['session_id', 'user_id'];
}

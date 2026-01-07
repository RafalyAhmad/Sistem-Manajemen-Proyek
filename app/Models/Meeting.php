<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    protected $primaryKey = 'meeting_id';

    protected $fillable = [
        'user_id',
        'project_id',
        'title',
        'description',
        'notulensi',
        'meeting_time',
        'email_to',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'project_id');
    }
}

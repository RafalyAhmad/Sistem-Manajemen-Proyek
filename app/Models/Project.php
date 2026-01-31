<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $primaryKey = 'project_id';

    protected $fillable = [
        'project_name',
        'initial_project_fee',
        'final_project_fee',
        'initial_project_time',
        'final_project_time',
        'description',
        'status',
        'total_cfp',
        'total_rcaf',
        'total_feature_fee',
        'total_feature_time',
        'working_hour_per_day',
        'development_cost_per_day',
        'line_of_code_per_day',

    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'project_user', 'project_id', 'user_id');
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class, 'feature_project', 'project_id', 'feature_id')
            ->withpivot('status', 'added_type', 'fp_adjustment');
    }

    public function meetings()
    {
        return $this->hasMany(Meeting::class, 'project_id', 'project_id');
    }

    public function contracts()
    {
        return $this->hasMany(Contract::class, 'project_id', 'project_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'project_id', 'project_id');
    }
}

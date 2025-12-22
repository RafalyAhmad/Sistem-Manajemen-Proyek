<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;

    protected $primaryKey = 'feature_id';

    protected $fillable = [
        'project_id',
        'feature_name',
        'description',
        'status',
        'external_input',
        'external_output',
        'logical_internal_file',
        'external_interface_file',
        'external_inquiry',
        'feature_cfp',
        'initial_feature_fee',
        'final_feature_fee',
        'initial_feature_time',
        'final_feature_time',
        'change_feature_fee',
        'change_feature_time',
        'updated at',
        'total_change_feature_fee',
        'total_change_feature_time',
    ];

    // Hubungan ke User (Foreign Key user_id)
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'feature_project', 'feature_id', 'project_id') -> withpivot('status');
    }
}

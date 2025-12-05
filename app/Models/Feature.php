<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;

    protected $primaryKey = 'feature_id'; // Set PK sesuai dengan yang Anda definisikan

    protected $fillable = [
        'project_id',
        'description',
        'status',
        'initial_feature_fee',
        'final_feature_fee',
        'initial_feature_time',
        'final_feature_time',
        'change_feature_fee',
        'change_feature_time',
        'total_cfp',
        'updated at',
        'total_change_feature_fee',
        'total_change_feature_time',
        'external_input',
        'external_output',
        'logical_internal_file',
        'external_interface_file',
        'external_inquiry',
    ];

    // Hubungan ke User (Foreign Key user_id)
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}

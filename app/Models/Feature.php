<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;

    protected $primaryKey = 'feature_id';

    protected $fillable = [
        'feature_name',
        'description',
        'external_input',
        'external_output',
        'logical_internal_file',
        'external_interface_file',
        'external_inquiry',
        'feature_cfp',
        'updated_at',
    ];

    // Hubungan ke User (Foreign Key user_id)
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'feature_project', 'feature_id', 'project_id')
            ->withpivot('status', 'added_type', 'fp_adjustment');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature_Project extends Model
{
    use HasFactory;

    protected $table = 'feature_project';

    protected $primaryKey = 'id';

    protected $fillable = [
        'project_id',
        'feature_id',
        'status',
    ];
}

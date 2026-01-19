<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature_Project extends Model
{
    use HasFactory;

    protected $table = 'feature_project';

    protected $primaryKey = 'feature_project_id';

    protected $fillable = [
        'project_id',
        'feature_id',
        'status',
        'added_type',
        'fp_adjustment',
    ];

    public function fpAdjustments()
    {
        return $this->hasMany(FpAdjustment::class, 'feature_project_id', 'feature_project_id');
    }
}

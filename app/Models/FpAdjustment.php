<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FpAdjustment extends Model
{
    protected $table = 'fpadjustment';
    protected $primaryKey = 'fp_adjustment_id';

    protected $fillable = [
        'feature_project_id',
        'fp_delta',
        'description',
        'created_at',
    ];

    public function featureProject()
    {
        return $this->belongsTo(
            FeatureProject::class,
            'feature_project_id',
            'feature_project_id'
        );
    }
}

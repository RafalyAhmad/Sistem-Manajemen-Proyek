<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contract extends Model
{
    //
    use HasFactory;
    protected $primaryKey = 'contract_id'; 
    
    protected $fillable = [
        'project_id', 
        'user_id',
        'contract_number',
        'contract_date',
        'timestamps',
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




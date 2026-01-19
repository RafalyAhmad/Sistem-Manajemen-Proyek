<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'notification_id';

    protected $fillable = [
        'user_id',
        'message',
        'status',
        'created_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

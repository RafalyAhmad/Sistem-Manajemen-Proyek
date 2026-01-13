<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;

    protected $primaryKey = 'notification_id';

    protected $fillable = [
        'user_id',
        'message',
        'sent_at',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

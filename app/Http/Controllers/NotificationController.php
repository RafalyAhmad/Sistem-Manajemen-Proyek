<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class NotificationController extends Controller
{

    public function index()
    {
        $notifications = Notification::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Notifications', [
            'notifications' => $notifications
        ]);
        dd($notifications);
    }

    public function markAsRead($id)
    {
        $notification = Notification::where('notification_id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $notification->update([
            'status' => 'read'
        ]);

        return redirect()->back();
    }

    public static function notifyNewTicket($userId, $ticketTitle, $ticketDescription)
    {
        Notification::create([
            'user_id'    => $userId,
            'message'    => 'Ticket baru : ' . $ticketTitle . ' - ' . $ticketDescription,
            'status'     => 'unread',
            'created_at' => Carbon::now()
        ]);
    }

    public static function notifyNewMeeting($userId, $meetingDate)
    {
        Notification::create([
            'user_id'    => $userId,
            'message'    => 'Meeting baru dijadwalkan pada ' . $meetingDate,
            'status'     => 'unread',
            'created_at' => Carbon::now()
        ]);
    }
}

<?php

namespace App\Mail;

use App\Models\Meeting;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MeetingInvitationMail extends Mailable
{
    use SerializesModels;

    public $meeting;

    public function __construct(Meeting $meeting)
    {
        $this->meeting = $meeting;
    }

    public function build()
    {
        return $this->subject('Undangan Meeting')
                    ->view('emails.meeting');
    }
}

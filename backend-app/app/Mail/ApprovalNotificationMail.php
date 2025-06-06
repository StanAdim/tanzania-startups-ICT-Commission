<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ApprovalNotificationMail extends Mailable
{
    use Queueable, SerializesModels;
    public User $user;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user)
    {
        //
        $this->user = $user;
    }
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Approval Notification Mail',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.approval_mail',
            with: ['user' => $this->user],
        );
    }
//    Attachments
    public function attachments(): array
    {
        return [];
    }
}

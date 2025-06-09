@extends('layouts.mail_default')
@section('content')
        <p>Dear {{ $user->first_name }},</p>
        <p>We are pleased to inform you that a recent approval process related to your account has been successfully completed.</p>
        <p>This milestone marks a key step in your journey within our Ecosystem, and we are excited to have you on board. Your participation contributes to the growth and innovation we aim to foster within the ICT community.</p>
        <p>If you have any questions or need assistance, our support team is always here to help.</p>
        <p>Once again, welcome, and thank you for being part of this vibrant community.</p>
        <p>Best regards,</p>
        <p>The ICT Commission Team</p>
@endsection

@extends('layouts.mail_default')

@section('content')
        <p>Dear {{ $user->first_name }},</p>
        <p>We would like to inform you that there has been a recent approval process on your account.</p>
        <p>We are glad you are part of the Ecosystem.</p>
        <p>Best regards,</p>
        <p>The ICT Commission Team</p>
@endsection

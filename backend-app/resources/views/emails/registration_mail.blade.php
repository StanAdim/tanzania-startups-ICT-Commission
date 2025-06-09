@extends('layouts.mail_default')
@section('content')
    <p>Hello {{ $user->first_name }},</p>
    <p>Congratulations! You have successfully created an account in <strong>Tanzania Startups Ecosystem</strong>.</p>
    <p>We are excited to have you on board. As a member of our growing startup community, you now have access to a wide range of tools and opportunities to showcase and grow your business.</p>
    <p>To get started, please make sure to:</p>
    <ul>
        <li>Complete your profile information.</li>
        <li>Register your products or services to make them visible to potential opportunity and investors.</li>
        <li>Explore funding opportunities and partnerships.</li>
        <li>Stay updated with startup-related news, events, and training sessions.</li>
    </ul>
    <p>Don't miss out! The more complete your profile is, the better your chances of gaining visibility and support within the community.</p>
    <p>If you need any assistance, feel free to contact our support team at <a href="mailto:support@ictc.go.tz">support@ictc.go.tz</a>.</p>
    <p>Thanks,<br>
        {{ config('app.name') }}</p>
@endsection


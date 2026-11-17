from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode


def send_password_reset_email(user):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    reset_url = (
        f"{settings.FRONTEND_URL.rstrip('/')}/reset-password"
        f"?uid={uid}&token={token}"
    )

    subject = "Reset your Handmade Workshop password"
    message = (
        f"Hi {user.first_name or user.email},\n\n"
        "We received a request to reset your password.\n"
        "Click the link below to choose a new password. "
        "This link expires in 24 hours.\n\n"
        f"{reset_url}\n\n"
        "If you did not request this, you can ignore this email.\n\n"
        "— Handmade Workshop"
    )

    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )
    return reset_url

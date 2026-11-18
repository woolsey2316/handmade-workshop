from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMultiAlternatives
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode


def build_password_reset_url(user):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    return (
        f"{settings.FRONTEND_URL.rstrip('/')}/reset-password"
        f"?uid={uid}&token={token}"
    )


def send_password_reset_email(user):
    reset_url = build_password_reset_url(user)
    subject = "Reset your Handmade Workshop password"
    name = user.first_name or user.email

    # Keep the URL on its own short line so quoted-printable soft wraps
    # do not insert "=3D" / line breaks into uid or token.
    text_message = (
        f"Hi {name},\n\n"
        "We received a request to reset your password.\n"
        "Open the link below to choose a new password. "
        "This link expires in 24 hours.\n\n"
        f"{reset_url}\n\n"
        "If you did not request this, you can ignore this email.\n\n"
        "- Handmade Workshop\n"
    )
    html_message = (
        f"<p>Hi {name},</p>"
        "<p>We received a request to reset your password. "
        "This link expires in 24 hours.</p>"
        f'<p><a href="{reset_url}">Reset your password</a></p>'
        f"<p>Or paste this URL into your browser:<br>"
        f'<a href="{reset_url}">{reset_url}</a></p>'
        "<p>If you did not request this, you can ignore this email.</p>"
        "<p>- Handmade Workshop</p>"
    )

    email = EmailMultiAlternatives(
        subject=subject,
        body=text_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[user.email],
    )
    email.attach_alternative(html_message, "text/html")
    email.send(fail_silently=False)

    if settings.DEBUG:
        # Always print a clean clickable URL in the server log during development.
        print(f"[password-reset] {user.email} -> {reset_url}")

    return reset_url

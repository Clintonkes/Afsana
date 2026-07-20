import logging
from datetime import datetime

import resend

from app.config import settings

logger = logging.getLogger(__name__)

CONTACT_EMAIL = "afsanaconsult@proton.me"
CONTACT_PHONE = "+1 (734) 664-2211"
CONTACT_ADDRESS = "1622 Orchard Dr, Canton, MI 48188-1547"

STATUS_LABELS = {
    "pending": "Pending Review",
    "approved": "Approved",
    "declined": "Declined",
    "completed": "Completed",
}

STATUS_COLORS = {
    "pending": "#F59E0B",
    "approved": "#22C55E",
    "declined": "#EF4444",
    "completed": "#3B82F6",
}


def _base_template(title: str, body_content: str) -> str:
    return f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="color:#F5A623;font-size:20px;letter-spacing:4px;margin:0;">AFSANA CONSULT</h1>
        </div>
        <div style="background-color:#1a1a1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:32px;">
          <h2 style="color:#e8e0d4;font-size:22px;margin:0 0 24px 0;">{title}</h2>
          {body_content}
        </div>
        <div style="text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05);">
          <p style="color:rgba(232,224,212,0.3);font-size:12px;margin:0 0 8px 0;">Afsana Consult LLC</p>
          <p style="color:rgba(232,224,212,0.3);font-size:12px;margin:0 0 4px 0;">{CONTACT_ADDRESS}</p>
          <p style="color:rgba(232,224,212,0.3);font-size:12px;margin:0 0 4px 0;">{CONTACT_PHONE} &middot; {CONTACT_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
    """


def _booking_details_html(booking) -> str:
    challenges_html = ""
    if booking.challenges:
        items = "".join(
            f'<span style="display:inline-block;background:rgba(245,166,35,0.1);color:#F5A623;padding:4px 10px;border-radius:20px;font-size:12px;margin:2px 4px 2px 0;">{c}</span>'
            for c in booking.challenges
        )
        challenges_html = f"""
        <tr>
          <td style="color:rgba(232,224,212,0.4);font-size:13px;padding:8px 0;vertical-align:top;">Challenges</td>
          <td style="padding:8px 0;">{items}</td>
        </tr>
        """

    time_row = ""
    if booking.preferred_time:
        time_row = f"""
        <tr>
          <td style="color:rgba(232,224,212,0.4);font-size:13px;padding:8px 0;">Preferred Time</td>
          <td style="color:#e8e0d4;font-size:13px;padding:8px 0;">{booking.preferred_time}</td>
        </tr>
        """

    phone_row = ""
    if booking.phone:
        phone_row = f"""
        <tr>
          <td style="color:rgba(232,224,212,0.4);font-size:13px;padding:8px 0;">Phone</td>
          <td style="color:#e8e0d4;font-size:13px;padding:8px 0;">{booking.phone}</td>
        </tr>
        """

    message_row = ""
    if booking.message:
        message_row = f"""
        <tr>
          <td style="color:rgba(232,224,212,0.4);font-size:13px;padding:8px 0;vertical-align:top;">Message</td>
          <td style="color:#e8e0d4;font-size:13px;padding:8px 0;">{booking.message}</td>
        </tr>
        """

    return f"""
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="color:rgba(232,224,212,0.4);font-size:13px;padding:8px 0;">Name</td>
        <td style="color:#e8e0d4;font-size:13px;padding:8px 0;">{booking.name}</td>
      </tr>
      <tr>
        <td style="color:rgba(232,224,212,0.4);font-size:13px;padding:8px 0;">Email</td>
        <td style="color:#e8e0d4;font-size:13px;padding:8px 0;">{booking.email}</td>
      </tr>
      {phone_row}
      <tr>
        <td style="color:rgba(232,224,212,0.4);font-size:13px;padding:8px 0;">Preferred Date</td>
        <td style="color:#e8e0d4;font-size:13px;padding:8px 0;">{booking.preferred_date}</td>
      </tr>
      {time_row}
      {challenges_html}
      {message_row}
    </table>
    """


def send_booking_confirmation(booking) -> None:
    if not settings.resend_api_key:
        logger.warning("RESEND_API_KEY not set — skipping booking confirmation email")
        return

    resend.api_key = settings.resend_api_key

    status_label = STATUS_LABELS.get(str(booking.status), str(booking.status).title())
    status_color = STATUS_COLORS.get(str(booking.status), "#F59E0B")

    body = f"""
    <p style="color:rgba(232,224,212,0.7);font-size:14px;line-height:1.7;margin:0 0 20px 0;">
      Dear {booking.name},
    </p>
    <p style="color:rgba(232,224,212,0.7);font-size:14px;line-height:1.7;margin:0 0 24px 0;">
      Thank you for reaching out to Afsana Consult. We have received your consultation request and our team will review it shortly.
    </p>
    <div style="background:rgba(245,166,35,0.08);border:1px solid rgba(245,166,35,0.2);border-radius:8px;padding:16px;margin-bottom:24px;">
      <p style="color:rgba(232,224,212,0.5);font-size:12px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px;">Current Status</p>
      <p style="color:{status_color};font-size:18px;font-weight:bold;margin:0;">{status_label}</p>
    </div>
    <p style="color:rgba(232,224,212,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px 0;">Request Details</p>
    {_booking_details_html(booking)}
    <p style="color:rgba(232,224,212,0.7);font-size:14px;line-height:1.7;margin:24px 0 0 0;">
      We will get back to you within 24 hours with next steps. If you have any questions, feel free to contact us at {CONTACT_EMAIL}.
    </p>
    """

    html = _base_template("Consultation Request Received", body)

    try:
        resend.Emails.send({
            "from": settings.email_from,
            "to": booking.email,
            "subject": "Your Consultation Request — Afsana Consult",
            "html": html,
        })
        logger.info(f"Booking confirmation email sent to {booking.email}")
    except Exception as e:
        logger.error(f"Failed to send booking confirmation email to {booking.email}: {e}")


def send_booking_status_update(booking, old_status: str) -> None:
    if not settings.resend_api_key:
        logger.warning("RESEND_API_KEY not set — skipping status update email")
        return

    resend.api_key = settings.resend_api_key

    new_status = str(booking.status)
    status_label = STATUS_LABELS.get(new_status, new_status.title())
    status_color = STATUS_COLORS.get(new_status, "#F59E0B")

    status_messages = {
        "approved": "Great news! Your consultation request has been <strong>approved</strong>. Our team will reach out to confirm the scheduling details.",
        "declined": "We regret to inform you that your consultation request has been <strong>declined</strong> at this time. Please feel free to submit a new request in the future.",
        "completed": "Your consultation has been marked as <strong>completed</strong>. We hope the session was valuable. Feel free to reach out for any follow-up.",
        "pending": "Your consultation request status has been updated back to <strong>pending review</strong>.",
    }

    status_message = status_messages.get(new_status, f"Your consultation status has been updated to <strong>{status_label}</strong>.")

    body = f"""
    <p style="color:rgba(232,224,212,0.7);font-size:14px;line-height:1.7;margin:0 0 20px 0;">
      Dear {booking.name},
    </p>
    <p style="color:rgba(232,224,212,0.7);font-size:14px;line-height:1.7;margin:0 0 24px 0;">
      {status_message}
    </p>
    <div style="background:rgba(245,166,35,0.08);border:1px solid rgba(245,166,35,0.2);border-radius:8px;padding:16px;margin-bottom:24px;">
      <p style="color:rgba(232,224,212,0.5);font-size:12px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px;">Updated Status</p>
      <p style="color:{status_color};font-size:18px;font-weight:bold;margin:0;">{status_label}</p>
    </div>
    <p style="color:rgba(232,224,212,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px 0;">Request Details</p>
    {_booking_details_html(booking)}
    <p style="color:rgba(232,224,212,0.7);font-size:14px;line-height:1.7;margin:24px 0 0 0;">
      If you have any questions, please don't hesitate to contact us at {CONTACT_EMAIL} or call {CONTACT_PHONE}.
    </p>
    """

    html = _base_template("Consultation Status Update", body)

    try:
        resend.Emails.send({
            "from": settings.email_from,
            "to": booking.email,
            "subject": f"Consultation Update — {status_label} — Afsana Consult",
            "html": html,
        })
        logger.info(f"Booking status update email sent to {booking.email} ({old_status} → {new_status})")
    except Exception as e:
        logger.error(f"Failed to send status update email to {booking.email}: {e}")


def send_contact_notification(contact_message) -> None:
    if not settings.resend_api_key:
        logger.warning("RESEND_API_KEY not set — skipping contact notification email")
        return

    resend.api_key = settings.resend_api_key

    body = f"""
    <p style="color:rgba(232,224,212,0.7);font-size:14px;line-height:1.7;margin:0 0 20px 0;">
      A new message has been submitted through the contact form on your website.
    </p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr>
        <td style="color:rgba(232,224,212,0.4);font-size:13px;padding:8px 0;">From</td>
        <td style="color:#e8e0d4;font-size:13px;padding:8px 0;">{contact_message.name} &lt;{contact_message.email}&gt;</td>
      </tr>
      <tr>
        <td style="color:rgba(232,224,212,0.4);font-size:13px;padding:8px 0;vertical-align:top;">Message</td>
        <td style="color:#e8e0d4;font-size:13px;padding:8px 0;">{contact_message.message}</td>
      </tr>
    </table>
    <p style="color:rgba(232,224,212,0.5);font-size:13px;margin:0;">
      Log in to the admin dashboard to view and respond.
    </p>
    """

    html = _base_template("New Contact Message", body)

    try:
        resend.Emails.send({
            "from": settings.email_from,
            "to": CONTACT_EMAIL,
            "subject": f"New Message from {contact_message.name} — Afsana Consult",
            "html": html,
        })
        logger.info(f"Contact notification email sent for message from {contact_message.email}")
    except Exception as e:
        logger.error(f"Failed to send contact notification email: {e}")

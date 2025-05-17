import os
import logging
from mailersend import emails
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize MailerSend client
mailer = emails.NewEmail(os.getenv('MAILERSEND_API_KEY'))

async def send_booking_email(event):
    mail_body = {}

    # Customize sender (must match a verified sender domain in MailerSend)
    mail_from = {
        "name": "Test Notification",
        "email": "MS_ne90Ia@test-65qngkddwojlwr12.mlsender.net",  # Replace with your verified sender address
    }

    # Set recipient using event data
    recipients = [
        {
            "name": event.get("name", "Customer"),
            "email": event["email"],
        }
    ]

    # Reply-to address
    reply_to = {
        "name": "Support",
        "email": "reply@yourdomain.com",  # Use a real reply-to if desired
    }

    # Email content
    subject = "Booking Confirmation"
    html_content = f"""
        <h2>Hello {event.get('name', 'Customer')},</h2>
        <p>Your booking is confirmed for <strong>{event.get('booking_date')}</strong>.</p>
        <p>Thank you for using our service!</p>
    """
    plaintext_content = f"Hello {event.get('name')}, your booking is confirmed for {event.get('booking_date')}."

    # Populate mailer fields
    mailer.set_mail_from(mail_from, mail_body)
    mailer.set_mail_to(recipients, mail_body)
    mailer.set_subject(subject, mail_body)
    mailer.set_html_content(html_content, mail_body)
    mailer.set_plaintext_content(plaintext_content, mail_body)
    mailer.set_reply_to(reply_to, mail_body)

    try:
        response = mailer.send(mail_body)
        print("📨 Email send status:", response)
        print("✅ EMAIL sent successfully.")
    except Exception as e:
        logger.error(f"❌ Failed to send email: {e}")


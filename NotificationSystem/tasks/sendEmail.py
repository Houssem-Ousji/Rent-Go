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

async def send_email(event):
    eventType = event.get("type")
    mail_body = {}

    # Customize sender (must match a verified sender domain in MailerSend)
    mail_from = {
        "name": "Test Notification",
        "email": os.getenv('MAILERSEND_DOMAIN'),  # Replace with your verified sender address
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
    if(eventType == "booking_confirmation"):
        subject = "Booking Confirmation"
        html_content = f"""
        <h2>Hello {event.get('name', 'Customer')},</h2>
        <p>Your booking is confirmed for <strong>{event.get('booking_date')}</strong>.</p>
        <p>Thank you for using our service!</p>
    """
        plaintext_content = f"Hello {event.get('name')}, your booking is confirmed for {event.get('booking_date')}."
    elif(eventType == "pickup_reminder"):
        subject = "Pick Up Reminder"
        html_content = f"""
        <h2>Hello {event.get('name', 'Customer')},</h2>
        <p>This is a reminder for your upcoming pickup on <strong>{event.get('pickup_date')}</strong>.</p>
        <p>Thank you for using our service!</p>
    """
        plaintext_content = f"Hello {event.get('name')}, this is a reminder for your upcoming pickup on {event.get('pickup_date')}."
    else:
        logger.error(f"❌ Unsupported event type: {eventType}")
        return
    # Populate mailer fields
    mailer.set_mail_from(mail_from, mail_body)
    mailer.set_mail_to(recipients, mail_body)
    mailer.set_subject(subject, mail_body)
    mailer.set_html_content(html_content, mail_body)
    mailer.set_plaintext_content(plaintext_content, mail_body)
    mailer.set_reply_to(reply_to, mail_body)

    try:
        response = mailer.send(mail_body)
        status_code = int(response.split()[0])
        if 200 <= int(status_code) < 300:
            print("📨 Email send status:", response)
            print("✅ EMAIL sent successfully.")
        else:
            logger.error(f"❌ Failed to send email. Response: {response}")
    except Exception as e:
        logger.error(f"❌ Failed to send email: {e}")


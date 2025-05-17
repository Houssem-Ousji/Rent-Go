from datetime import datetime
from .sendEmail import send_booking_email
from .sendSms import send_sms
from utils.db import connectToDatabse

async def handle_notification(event: dict):
    notif_type = event.get("type")
    
    if notif_type == "booking_confirmation":
        # Run both in parallel
        await send_booking_email(event)
        await send_sms(event)
        await log_notification(event)

    elif notif_type == "pickup_reminder":
        # Implement similarly
        pass

async def log_notification(event: dict):
    db = await connectToDatabse()
    try:
        event["sentAt"] = datetime.utcnow()
        result = await db["history"].insert_one(event)
        print(f"✅ Notification saved with ID: {result.inserted_id}")
    except Exception as e:
        print("❌ Failed to log notification:", e)

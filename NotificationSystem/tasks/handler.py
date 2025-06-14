from datetime import datetime
from .sendEmail import send_email
from .sendSms import send_sms
from utils.db import connectToDatabse

async def handle_notification(event: dict):
    notif_type = event.get("type")
    
    if notif_type != "":
        # Run both in parallel
        await send_email(event)
        await send_sms(event)
        await log_notification(event)

async def log_notification(event: dict):
    db = await connectToDatabse()
    try:
        event["sentAt"] = datetime.utcnow()
        result = await db["history"].insert_one(event)
        print(f"✅ Notification saved with ID: {result.inserted_id}")
    except Exception as e:
        print("❌ Failed to log notification:", e)

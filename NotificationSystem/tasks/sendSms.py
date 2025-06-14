import http.client
import logging
import json
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

async def send_sms(event):
    try:
        print(f"📨 Sending SMS to: {event['userPhone']} for booking ID: {event['bookingId']}")
        eventType = event.get("type")
        conn = http.client.HTTPSConnection(os.getenv('INFOBIP_BASE_URL'))
        if(eventType == "booking_confirmation"):
            
            payload = json.dumps({
            "messages": [
                {
                    "destinations": [{"to": event["userPhone"]}],
                    "from": "447491163443",  # Your approved sender ID from Infobip
                    "text": f"Hello, your booking {event['bookingId']} is confirmed."
                }
            ]
        })
        elif(eventType == "pickup_reminder"):
            payload = json.dumps({
            "messages": [
                {
                    "destinations": [{"to": event["userPhone"]}],
                    "from": "447491163443",  # Your approved sender ID from Infobip
                    "text": f"Hello, this is a reminder for your pickup on {event['pickup_date']}."
                }
            ]
        })
        else:
            logger.error(f"❌ Unsupported event type: {eventType}")
            return

        headers = {
            'Authorization': os.getenv('INFOBIP_API_KEY'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        conn.request("POST", "/sms/2/text/advanced", payload, headers)
        res = conn.getresponse()
        data = res.read()

        print(f"✅ Response status: {res.status}")
        print(f"✅ Response data: {data.decode('utf-8')}")
        print("✅ SMS sent successfully.")

    except Exception as e:
        print(f"❌ Failed to send SMS: {str(e)}")
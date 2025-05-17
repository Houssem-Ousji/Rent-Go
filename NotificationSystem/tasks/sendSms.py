import http.client
import json
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

async def send_sms(event):
    try:
        print(f"📨 Sending SMS to: {event['userPhone']} for booking ID: {event['bookingId']}")

        conn = http.client.HTTPSConnection(os.getenv('INFOBIP_BASE_URL'))

        payload = json.dumps({
            "messages": [
                {
                    "destinations": [{"to": event["userPhone"]}],
                    "from": "447491163443",  # Your approved sender ID from Infobip
                    "text": f"Hello, your booking {event['bookingId']} is confirmed."
                }
            ]
        })

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
from fastapi import FastAPI
from pydantic import BaseModel
from utils.db import connectToDatabse
from tasks.handler import handle_notification
        

app = FastAPI()

class NotificationEvent(BaseModel):
    type: str
    email: str
    booking_date: str
    userPhone: str
    name: str
    bookingId: str

@app.post("/notify")
async def notify(event: NotificationEvent):
    await handle_notification(event.model_dump())
    return {"message": "Notification Sent"}

@app.get("/history")
async def get_history():
    db = await connectToDatabse()
    history = await db["history"].find().to_list(length=100)

    # Serialize the result
    def serialize(document):
        document["_id"] = str(document["_id"])
        if "created_at" in document:
            document["created_at"] = document["created_at"].isoformat()
        return document

    serialized_history = [serialize(doc) for doc in history]
    return {"history": serialized_history}

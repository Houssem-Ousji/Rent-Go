from fastapi import FastAPI
from pydantic import BaseModel
from utils.db import connectToDatabse
from tasks.handler import handle_notification
from py_eureka_client import eureka_client as eureka_client
from contextlib import asynccontextmanager   
@asynccontextmanager
async def lifespan(app: FastAPI):
    await eureka_client.init_async(
        eureka_server="http://eureka:8761/eureka",
        app_name="notification",
        instance_port=8000
    )
    yield
app = FastAPI(lifespan=lifespan)

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

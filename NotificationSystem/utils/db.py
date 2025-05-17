# utils/db.py
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def connectToDatabse():
    """Connect to MongoDB using AsyncIOMotorClient."""
    client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
    db = client["notificationHistory"]
    return db

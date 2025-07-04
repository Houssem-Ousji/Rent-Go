from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://branch_mongo:27017"
DB_NAME = "location_service"

client = None
db = None

async def connect_to_mongo():
    global client, db
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    print("Connected to MongoDB")
    print(f"Database: {DB_NAME}")

def get_db():
    if db is None:
        raise Exception("DB not initialized")
    return db

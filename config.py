from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = "mongodb://localhost:27017"  #Mongo Db Url
client = AsyncIOMotorClient(MONGO_DETAILS)

#DB Connection
database = client["micro"]

payments_collection = database["payments"]
deposits_collection = database["deposits"]
refunds_collection = database["refunds"]
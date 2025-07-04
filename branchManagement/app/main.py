from fastapi import FastAPI
from app.database.connection import connect_to_mongo
from app.api import branches, availability
from app.api import cars

app = FastAPI()

@app.on_event("startup")
async def startup():
    await connect_to_mongo()

app.include_router(branches.router, prefix="/branches", tags=["Branches"])
app.include_router(availability.router, prefix="/availability", tags=["Availability"])
app.include_router(cars.router, prefix="/cars", tags=["Cars"])

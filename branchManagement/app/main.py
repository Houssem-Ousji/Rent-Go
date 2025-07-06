from fastapi import FastAPI
from app.database.connection import connect_to_mongo
from app.api import branches, availability
from app.api import cars
from py_eureka_client import eureka_client as eureka_client
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    await eureka_client.init_async(
        eureka_server="http://eureka:8761/eureka",
        app_name="branch",
        instance_port=8000
    )
    yield
    
app = FastAPI(lifespan=lifespan)    
@app.on_event("startup")
async def startup():
    await connect_to_mongo()

app.include_router(branches.router, prefix="/branches", tags=["Branches"])
app.include_router(availability.router, prefix="/availability", tags=["Availability"])
app.include_router(cars.router, prefix="/cars", tags=["Cars"])

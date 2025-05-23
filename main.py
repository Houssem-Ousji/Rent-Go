from fastapi import FastAPI, HTTPException
from pydantic import BaseModel,Field
from typing import List,Optional
from config import payments_collection,deposits_collection,refunds_collection
from bson import ObjectId
from datetime import datetime
app = FastAPI()

#Payment Model
class Payment(BaseModel):
    userId: str
    productId: str
    amount: float
    paymentType: str
    paymentDate: Optional[datetime] = Field(default_factory=datetime.utcnow)

class Deposit(BaseModel):
    userId: str
    amount: float
    method: str
    date: Optional[datetime] = Field(default_factory=datetime.utcnow)

class Refund(BaseModel):
    userId: str
    amount: float
    reason: str
    date: Optional[datetime] = Field(default_factory=datetime.utcnow)


@app.get("/")
async def read_root():
    return {"message": "Hello"}

@app.get("/mongo-status")
async def check_mongo():
    try:
        server_info = await payments_collection.database.command("ping")
        return {"mongo": "connected", "info": server_info}
    except Exception as e:
        return {"mongo": "error", "detail": str(e)}

@app.post("/payments")
async def create_payment(payment: Payment):
    new_payment = payment.dict()
    result = await payments_collection.insert_one(new_payment)
    return {"id": str(result.inserted_id)}

@app.delete("/payments/{payment_id}")
async def delete_payment(payment_id: str):
    result = await payments_collection.delete_one({"_id": ObjectId(payment_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"deleted": True}

@app.get("/payments/user/{user_id}", response_model=List[Payment])
async def get_payments_by_user(user_id: str):
    payments_cursor = payments_collection.find({"userId": user_id})
    payments = []
    async for payment in payments_cursor:
        payment.pop("_id", None)
        payments.append(Payment(**payment))
    return payments

#Deposits
@app.post("/deposits")
async def create_deposit(deposit: Deposit):
    data = deposit.dict()
    result = await deposits_collection.insert_one(data)
    return {"id": str(result.inserted_id)}

@app.get("/deposits/user/{user_id}")
async def get_user_deposits(user_id: str):
    deposits = []
    async for d in deposits_collection.find({"userId": user_id}):
        d["_id"] = str(d["_id"])
        deposits.append(d)
    return deposits
#Refunds

@app.post("/refunds")
async def create_refund(refund: Refund):
    data = refund.dict()
    result = await refunds_collection.insert_one(data)
    return {"id": str(result.inserted_id)}

@app.get("/refunds/user/{user_id}")
async def get_user_refunds(user_id: str):
    refunds = []
    async for r in refunds_collection.find({"userId": user_id}):
        r["_id"] = str(r["_id"])
        refunds.append(r)
    return refunds

#uvicorn main:app --reload

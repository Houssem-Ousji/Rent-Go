from app.database.connection import db

async def get_car_availability(branch_id: str):
    return await db.car_inventory.find({"branch_id": branch_id}).to_list(100)

from pydantic import BaseModel

class InventoryModel(BaseModel):
    branch_id: str
    car_type: str
    car_id : str
    available_cars: int

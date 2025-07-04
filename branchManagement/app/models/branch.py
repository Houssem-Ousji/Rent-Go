from pydantic import BaseModel
from typing import Optional

class BranchModel(BaseModel):
    branch_id: str
    name: str
    address: str
    city: str
    lat: float
    lon: float
    opening_hours: Optional[str]
    active: bool = True

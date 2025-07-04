from pydantic import BaseModel, Field
from typing import Optional

class BranchCreate(BaseModel):
    branch_id: str
    name: str
    address: str
    city: str
    lat: float
    lon: float
    opening_hours: Optional[str] = None
    active: bool = True

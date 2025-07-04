from pydantic import BaseModel
from typing import Optional
from app.schemas.branch_schema import BranchCreate  # Assuming you put BranchModel in schemas

class CarLocationResponse(BaseModel):
    status: str  # e.g. "available", "rented", "maintenance"
    branch: Optional[BranchCreate] = None

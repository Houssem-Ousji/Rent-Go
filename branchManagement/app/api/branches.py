from fastapi import APIRouter, Depends
from app.database.connection import get_db
from app.schemas.branch_schema import BranchCreate
from bson import ObjectId

router = APIRouter()

@router.get("/")
async def get_all_branches(db=Depends(get_db)):
    branches_cursor = await db.branches.find().to_list(length=100)
    branches = []

    for branch in branches_cursor:
        branch["_id"] = str(branch["_id"])  # Convert ObjectId to string
        branches.append(branch)

    return branches


@router.post("/")
async def create_branch(branch: BranchCreate,db=Depends(get_db)):
    result = await db.branches.insert_one(branch.dict())
    return {"_id": str(result.inserted_id), **branch.dict()}

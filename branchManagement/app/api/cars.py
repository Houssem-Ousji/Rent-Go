from fastapi import APIRouter, Depends, HTTPException
from app.database.connection import get_db
from app.schemas.car_schema import CarLocationResponse
from bson import ObjectId

router = APIRouter()

@router.get("/car-location/{car_id}", response_model=CarLocationResponse)
async def get_car_location_by_id(car_id: str, db=Depends(get_db)):
    # Try to find car in inventory (available cars by car_id)
    car_inventory = await db.car_inventory.find_one({"car_id": car_id})
    print(f"Searching for car_id: {car_id} in inventory")
    print(f"Found car_inventory: {car_inventory}")

    if car_inventory:
        if car_inventory.get("available_cars", 0) > 0:
            # Fetch branch info
            branch_doc = await db.branches.find_one({"branch_id": car_inventory["branch_id"]})
            if not branch_doc:
                raise HTTPException(status_code=404, detail="Branch not found")

            # Convert branch_doc to BranchModel (remove _id)
            branch_doc["active"] = branch_doc.get("active", True)
            branch_doc.pop("_id", None)

            return CarLocationResponse(
                status="available",
                branch=branch_doc
            )
        else:
            # Car exists but none available
            return CarLocationResponse(
                status="rented or under maintenance",
                branch=None
            )

    # If car not found in inventory, check status collection (optional)
    status_doc = await db.cars_status.find_one({"car_id": car_id})
    if status_doc:
        return CarLocationResponse(
            status=status_doc.get("status", "unknown"),
            branch=None
        )

    # Car not found anywhere
    raise HTTPException(status_code=404, detail="Car not found")

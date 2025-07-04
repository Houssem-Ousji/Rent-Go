from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from typing import List

from app.database.connection import get_db
from app.models.inventory import InventoryModel  # Ton modèle Pydantic

router = APIRouter()

# Ajouter ou mettre à jour l’inventaire
@router.post("/", response_model=dict)
async def upsert_inventory(item: InventoryModel, db=Depends(get_db)):
    result = await db.car_inventory.update_one(
        {"branch_id": item.branch_id, "car_type": item.car_type},
        {"$set": item.dict()},
        upsert=True
    )
    return {"message": "Inventory updated or inserted"}

# Récupérer l’inventaire d'une agence
@router.get("/{branch_id}", response_model=List[dict])
async def get_inventory(branch_id: str, db=Depends(get_db)):
    docs = await db.car_inventory.find({"branch_id": branch_id}).to_list(length=100)
    for d in docs:
        d["_id"] = str(d["_id"])  # éviter l’erreur ObjectId
    return docs

# Supprimer un type de voiture d'une agence
@router.delete("/{branch_id}/{car_type}")
async def delete_inventory(branch_id: str, car_type: str, db=Depends(get_db)):
    result = await db.car_inventory.delete_one({"branch_id": branch_id, "car_type": car_type})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return {"message": "Inventory deleted"}

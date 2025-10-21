from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.database import get_db
from app.schemas.schemas import ProductCreate, ProductUpdate, ProductResponse
from app.routes.auth import get_current_user
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/", response_model=List[ProductResponse])
async def get_products(
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    db = Depends(get_db)
):
    """Get all products with optional filtering"""
    query = {}
    if category:
        query["category"] = category
    
    cursor = db.products.find(query).skip(skip).limit(limit)
    products = await cursor.to_list(length=limit)
    
    for product in products:
        product["_id"] = str(product["_id"])
    
    return products


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str, db = Depends(get_db)):
    """Get a single product by ID"""
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    product = await db.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product["_id"] = str(product["_id"])
    return product


@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product: ProductCreate,
    db = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Create a new product (admin only)"""
    product_dict = product.dict()
    product_dict["created_at"] = datetime.utcnow()
    
    result = await db.products.insert_one(product_dict)
    product_dict["_id"] = str(result.inserted_id)
    
    return product_dict


@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: str,
    product: ProductUpdate,
    db = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Update a product (admin only)"""
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    update_data = {k: v for k, v in product.dict().items() if v is not None}
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    
    result = await db.products.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_product = await db.products.find_one({"_id": ObjectId(product_id)})
    updated_product["_id"] = str(updated_product["_id"])
    
    return updated_product


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: str,
    db = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Delete a product (admin only)"""
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    result = await db.products.delete_one({"_id": ObjectId(product_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return None


@router.get("/search/{query}")
async def search_products(query: str, db = Depends(get_db)):
    """Search products by name or description"""
    cursor = db.products.find({
        "$or": [
            {"name": {"$regex": query, "$options": "i"}},
            {"description": {"$regex": query, "$options": "i"}},
            {"category": {"$regex": query, "$options": "i"}}
        ]
    })
    
    products = await cursor.to_list(length=100)
    
    for product in products:
        product["_id"] = str(product["_id"])
    
    return products

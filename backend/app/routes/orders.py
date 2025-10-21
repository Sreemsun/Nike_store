from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.database import get_db
from app.schemas.schemas import OrderCreate, OrderResponse
from app.routes.auth import get_current_user
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.get("/", response_model=List[OrderResponse])
async def get_orders(current_user = Depends(get_current_user), db = Depends(get_db)):
    """Get all orders for current user"""
    user_id = str(current_user["_id"])
    cursor = db.orders.find({"user_id": user_id}).sort("created_at", -1)
    orders = await cursor.to_list(length=100)
    
    for order in orders:
        order["_id"] = str(order["_id"])
    
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: str,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """Get specific order"""
    if not ObjectId.is_valid(order_id):
        raise HTTPException(status_code=400, detail="Invalid order ID")
    
    user_id = str(current_user["_id"])
    order = await db.orders.find_one({
        "_id": ObjectId(order_id),
        "user_id": user_id
    })
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order["_id"] = str(order["_id"])
    return order


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    order_data: OrderCreate,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """Create a new order"""
    user_id = str(current_user["_id"])
    
    # Calculate total
    total = sum(item.price * item.quantity for item in order_data.items)
    
    # Create order
    order = {
        "user_id": user_id,
        "items": [item.dict() for item in order_data.items],
        "total": total,
        "status": "pending",
        "shipping_address": order_data.shipping_address,
        "created_at": datetime.utcnow()
    }
    
    result = await db.orders.insert_one(order)
    order["_id"] = str(result.inserted_id)
    
    # Clear cart after order
    await db.carts.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "items": [],
                "total": 0.0,
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    return order


@router.patch("/{order_id}/status")
async def update_order_status(
    order_id: str,
    status: str,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """Update order status"""
    if not ObjectId.is_valid(order_id):
        raise HTTPException(status_code=400, detail="Invalid order ID")
    
    valid_statuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    result = await db.orders.update_one(
        {"_id": ObjectId(order_id)},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return {"message": "Order status updated", "status": status}

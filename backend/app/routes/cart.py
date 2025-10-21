from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_db
from app.schemas.schemas import CartResponse, CartItem
from app.routes.auth import get_current_user
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/cart", tags=["Cart"])


@router.get("/", response_model=CartResponse)
async def get_cart(current_user = Depends(get_current_user), db = Depends(get_db)):
    """Get user's cart"""
    user_id = str(current_user["_id"])
    cart = await db.carts.find_one({"user_id": user_id})
    
    if not cart:
        # Create empty cart if doesn't exist
        cart = {
            "user_id": user_id,
            "items": [],
            "total": 0.0,
            "updated_at": datetime.utcnow()
        }
        result = await db.carts.insert_one(cart)
        cart["_id"] = str(result.inserted_id)
    else:
        cart["_id"] = str(cart["_id"])
    
    return cart


@router.post("/add")
async def add_to_cart(
    item: CartItem,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """Add item to cart"""
    user_id = str(current_user["_id"])
    
    # Verify product exists
    if not ObjectId.is_valid(item.product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    product = await db.products.find_one({"_id": ObjectId(item.product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Get or create cart
    cart = await db.carts.find_one({"user_id": user_id})
    
    if not cart:
        cart = {
            "user_id": user_id,
            "items": [],
            "total": 0.0,
            "updated_at": datetime.utcnow()
        }
        await db.carts.insert_one(cart)
    
    # Check if item already in cart
    item_exists = False
    for cart_item in cart.get("items", []):
        if cart_item["product_id"] == item.product_id:
            cart_item["quantity"] += item.quantity
            item_exists = True
            break
    
    if not item_exists:
        cart.setdefault("items", []).append(item.dict())
    
    # Calculate new total
    total = sum(item["price"] * item["quantity"] for item in cart["items"])
    
    # Update cart
    await db.carts.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "items": cart["items"],
                "total": total,
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    return {"message": "Item added to cart", "total": total}


@router.delete("/remove/{product_id}")
async def remove_from_cart(
    product_id: str,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """Remove item from cart"""
    user_id = str(current_user["_id"])
    
    cart = await db.carts.find_one({"user_id": user_id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    # Remove item
    cart["items"] = [item for item in cart["items"] if item["product_id"] != product_id]
    
    # Calculate new total
    total = sum(item["price"] * item["quantity"] for item in cart["items"])
    
    # Update cart
    await db.carts.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "items": cart["items"],
                "total": total,
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    return {"message": "Item removed from cart", "total": total}


@router.delete("/clear")
async def clear_cart(current_user = Depends(get_current_user), db = Depends(get_db)):
    """Clear entire cart"""
    user_id = str(current_user["_id"])
    
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
    
    return {"message": "Cart cleared"}

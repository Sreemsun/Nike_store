"""
Script to view MongoDB database contents
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import json

async def view_database():
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.nike_store
    
    print("=" * 80)
    print("NIKE STORE DATABASE")
    print("=" * 80)
    
    # View Users Collection
    print("\n📧 USERS COLLECTION:")
    print("-" * 80)
    users = await db.users.find().to_list(length=None)
    if users:
        for i, user in enumerate(users, 1):
            print(f"\nUser {i}:")
            print(f"  ID: {user.get('_id')}")
            print(f"  Email: {user.get('email')}")
            print(f"  First Name: {user.get('first_name')}")
            print(f"  Last Name: {user.get('last_name')}")
            print(f"  Country: {user.get('country')}")
            print(f"  Created: {user.get('created_at')}")
            print(f"  Password Hash: {user.get('hashed_password')[:50]}...")
    else:
        print("  No users found")
    
    # View Products Collection
    print("\n\n👟 PRODUCTS COLLECTION:")
    print("-" * 80)
    products = await db.products.find().to_list(length=None)
    if products:
        for i, product in enumerate(products, 1):
            print(f"\nProduct {i}:")
            print(f"  ID: {product.get('_id')}")
            print(f"  Name: {product.get('name')}")
            print(f"  Price: ${product.get('price')}")
            print(f"  Category: {product.get('category')}")
            print(f"  Stock: {product.get('stock')}")
    else:
        print("  No products found")
    
    # View Carts Collection
    print("\n\n🛒 CARTS COLLECTION:")
    print("-" * 80)
    carts = await db.carts.find().to_list(length=None)
    if carts:
        for i, cart in enumerate(carts, 1):
            print(f"\nCart {i}:")
            print(f"  User ID: {cart.get('user_id')}")
            print(f"  Items: {len(cart.get('items', []))}")
    else:
        print("  No carts found")
    
    # View Orders Collection
    print("\n\n📦 ORDERS COLLECTION:")
    print("-" * 80)
    orders = await db.orders.find().to_list(length=None)
    if orders:
        for i, order in enumerate(orders, 1):
            print(f"\nOrder {i}:")
            print(f"  ID: {order.get('_id')}")
            print(f"  User ID: {order.get('user_id')}")
            print(f"  Total: ${order.get('total_amount')}")
            print(f"  Status: {order.get('status')}")
    else:
        print("  No orders found")
    
    print("\n" + "=" * 80)
    print(f"Total Users: {len(users)}")
    print(f"Total Products: {len(products)}")
    print(f"Total Carts: {len(carts)}")
    print(f"Total Orders: {len(orders)}")
    print("=" * 80)
    
    # Close connection
    client.close()

if __name__ == "__main__":
    asyncio.run(view_database())

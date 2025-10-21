# Seed initial product data
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

# Sample products
PRODUCTS = [
    {
        "name": "Nike Air Max Pulse",
        "description": "Experience the evolution of comfort with the Nike Air Max Pulse. Premium cushioning meets sleek design.",
        "price": 13995.00,
        "category": "Running",
        "image_url": "/assets/airmaxpulse.jpg",
        "stock": 50,
        "created_at": datetime.utcnow()
    },
    {
        "name": "Nike Air Max 270",
        "description": "Step into comfort with the Nike Air Max 270. Featuring our tallest Air unit yet for all-day comfort.",
        "price": 12795.00,
        "category": "Running",
        "image_url": "/assets/airmax270.jpg",
        "stock": 45,
        "created_at": datetime.utcnow()
    },
    {
        "name": "Nike React Infinity",
        "description": "Keep running with the Nike React Infinity. Designed to help reduce injury with soft, responsive cushioning.",
        "price": 14995.00,
        "category": "Running",
        "image_url": "/assets/nike-infinity.jpg",
        "stock": 40,
        "created_at": datetime.utcnow()
    },
    {
        "name": "Nike ZoomX Vaporfly",
        "description": "Go the distance with the Nike ZoomX Vaporfly. Built for speed with responsive foam and carbon fiber plate.",
        "price": 18995.00,
        "category": "Running",
        "image_url": "/assets/vaporfly.jpg",
        "stock": 30,
        "created_at": datetime.utcnow()
    },
    {
        "name": "Nike Basketball Pro",
        "description": "Dominate the court with Nike Basketball Pro. Superior grip and responsive cushioning for peak performance.",
        "price": 11995.00,
        "category": "Basketball",
        "image_url": "/assets/basketball.jpg",
        "stock": 35,
        "created_at": datetime.utcnow()
    },
    {
        "name": "Nike Football Elite",
        "description": "Own the field with Nike Football Elite. Precision-engineered studs and lightweight design for ultimate control.",
        "price": 10995.00,
        "category": "Football",
        "image_url": "/assets/nike-football.jpg",
        "stock": 40,
        "created_at": datetime.utcnow()
    }
]


async def seed_database():
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.nike_store
    
    # Clear existing products
    await db.products.delete_many({})
    print("✅ Cleared existing products")
    
    # Insert sample products
    result = await db.products.insert_many(PRODUCTS)
    print(f"✅ Inserted {len(result.inserted_ids)} products")
    
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.products.create_index("category")
    await db.products.create_index("name")
    await db.carts.create_index("user_id", unique=True)
    await db.orders.create_index("user_id")
    print("✅ Created database indexes")
    
    client.close()
    print("✅ Database seeded successfully!")


if __name__ == "__main__":
    asyncio.run(seed_database())

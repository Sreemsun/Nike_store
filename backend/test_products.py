import asyncio
from pymongo import MongoClient

async def main():
    # Connect to MongoDB
    client = MongoClient("mongodb://localhost:27017/")
    db = client["nike_store"]
    
    # Get all products
    products = list(db.products.find())
    
    print(f"\nTotal products: {len(products)}\n")
    
    for i, product in enumerate(products, 1):
        print(f"Product {i}:")
        print(f"  _id: {product.get('_id')}")
        print(f"  name: {product.get('name')}")
        print(f"  price: {product.get('price')} (type: {type(product.get('price'))})")
        print(f"  category: {product.get('category')}")
        print(f"  image_url: {product.get('image_url', 'N/A')[:50]}...")
        print()
    
    client.close()

if __name__ == "__main__":
    asyncio.run(main())

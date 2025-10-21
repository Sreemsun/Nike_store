"""
MongoDB Database Viewer - Table Format
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from tabulate import tabulate
from datetime import datetime

async def view_database_tables():
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.nike_store
    
    print("\n" + "="*100)
    print(" "*35 + "NIKE STORE DATABASE")
    print("="*100 + "\n")
    
    # View Users Collection
    print("📧 USERS TABLE:")
    print("-"*100)
    users = await db.users.find().to_list(length=None)
    if users:
        user_data = []
        for user in users:
            user_data.append([
                str(user.get('_id'))[:24],
                user.get('email'),
                user.get('first_name'),
                user.get('last_name'),
                user.get('country'),
                user.get('created_at').strftime('%Y-%m-%d %H:%M') if user.get('created_at') else 'N/A'
            ])
        print(tabulate(user_data, 
                      headers=['ID', 'Email', 'First Name', 'Last Name', 'Country', 'Created At'],
                      tablefmt='grid'))
    else:
        print("No users found")
    
    # View Products Collection
    print("\n\n👟 PRODUCTS TABLE:")
    print("-"*100)
    products = await db.products.find().to_list(length=None)
    if products:
        product_data = []
        for product in products:
            product_data.append([
                str(product.get('_id'))[:24],
                product.get('name'),
                f"${product.get('price', 0):.2f}",
                product.get('category'),
                product.get('stock'),
                product.get('description', '')[:40] + '...' if len(product.get('description', '')) > 40 else product.get('description', '')
            ])
        print(tabulate(product_data,
                      headers=['ID', 'Product Name', 'Price', 'Category', 'Stock', 'Description'],
                      tablefmt='grid'))
    else:
        print("No products found")
    
    # View Carts Collection
    print("\n\n🛒 CARTS TABLE:")
    print("-"*100)
    carts = await db.carts.find().to_list(length=None)
    if carts:
        cart_data = []
        for cart in carts:
            cart_data.append([
                str(cart.get('_id'))[:24],
                str(cart.get('user_id'))[:24],
                len(cart.get('items', [])),
                cart.get('updated_at', 'N/A')
            ])
        print(tabulate(cart_data,
                      headers=['Cart ID', 'User ID', 'Items Count', 'Updated At'],
                      tablefmt='grid'))
    else:
        print("No carts found")
    
    # View Orders Collection
    print("\n\n📦 ORDERS TABLE:")
    print("-"*100)
    orders = await db.orders.find().to_list(length=None)
    if orders:
        order_data = []
        for order in orders:
            order_data.append([
                str(order.get('_id'))[:24],
                str(order.get('user_id'))[:24],
                f"${order.get('total_amount', 0):.2f}",
                order.get('status'),
                len(order.get('items', [])),
                order.get('created_at', 'N/A')
            ])
        print(tabulate(order_data,
                      headers=['Order ID', 'User ID', 'Total Amount', 'Status', 'Items', 'Created At'],
                      tablefmt='grid'))
    else:
        print("No orders found")
    
    # Summary
    print("\n" + "="*100)
    print(f"📊 SUMMARY: {len(users)} Users | {len(products)} Products | {len(carts)} Carts | {len(orders)} Orders")
    print("="*100 + "\n")
    
    # Close connection
    client.close()

if __name__ == "__main__":
    try:
        asyncio.run(view_database_tables())
    except ImportError:
        print("\n⚠️  The 'tabulate' package is not installed.")
        print("Installing it now...\n")
        import subprocess
        subprocess.run(["pip", "install", "tabulate"], check=True)
        print("\n✅ Installation complete! Running again...\n")
        asyncio.run(view_database_tables())

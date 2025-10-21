"""
Test script to verify backend setup is correct
Run this after MongoDB is installed and backend is started
"""
import asyncio
import sys

print("🔍 Testing Nike Store Backend Setup...\n")

# Test 1: Check imports
print("[1/5] Testing imports...")
try:
    from app.config import settings
    from app.database import connect_to_mongo, close_mongo_connection, get_database
    from app.auth import get_password_hash, verify_password
    print("✅ All imports successful")
except ImportError as e:
    print(f"❌ Import error: {e}")
    sys.exit(1)

# Test 2: Check configuration
print("\n[2/5] Testing configuration...")
try:
    print(f"  - Database: {settings.DATABASE_NAME}")
    print(f"  - MongoDB URL: {settings.MONGODB_URL}")
    print(f"  - Port: {settings.PORT}")
    print("✅ Configuration loaded")
except Exception as e:
    print(f"❌ Configuration error: {e}")
    sys.exit(1)

# Test 3: Test password hashing
print("\n[3/5] Testing password hashing...")
try:
    test_password = "testpassword123"
    hashed = get_password_hash(test_password)
    is_valid = verify_password(test_password, hashed)
    if is_valid:
        print("✅ Password hashing works")
    else:
        print("❌ Password verification failed")
        sys.exit(1)
except Exception as e:
    print(f"❌ Password hashing error: {e}")
    sys.exit(1)

# Test 4: Test MongoDB connection
print("\n[4/5] Testing MongoDB connection...")
async def test_mongo():
    try:
        await connect_to_mongo()
        db = await get_database()
        # Try to get collections
        collections = await db.list_collection_names()
        print(f"  - Connected to database: {settings.DATABASE_NAME}")
        print(f"  - Collections: {collections if collections else 'None (empty database)'}")
        await close_mongo_connection()
        print("✅ MongoDB connection successful")
        return True
    except Exception as e:
        print(f"❌ MongoDB connection error: {e}")
        print("\n⚠️  Make sure MongoDB is running:")
        print("    net start MongoDB")
        return False

# Run async test
try:
    result = asyncio.run(test_mongo())
    if not result:
        sys.exit(1)
except Exception as e:
    print(f"❌ Test error: {e}")
    sys.exit(1)

# Test 5: Check if seed data exists
print("\n[5/5] Checking seed data...")
async def check_seed():
    try:
        await connect_to_mongo()
        db = await get_database()
        product_count = await db.products.count_documents({})
        if product_count > 0:
            print(f"✅ Found {product_count} products in database")
        else:
            print("⚠️  No products found. Run: python seed_db.py")
        await close_mongo_connection()
    except Exception as e:
        print(f"⚠️  Could not check products: {e}")

try:
    asyncio.run(check_seed())
except:
    pass

print("\n" + "="*50)
print("🎉 Setup verification complete!")
print("="*50)
print("\nNext steps:")
print("1. If products are missing, run: python seed_db.py")
print("2. Start the server: python -m app.main")
print("3. Visit: http://localhost:8000/docs")
print("\nHappy coding! 🚀")

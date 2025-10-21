from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    

class UserCreate(UserBase):
    password: str
    date_of_birth: Optional[str] = None
    country: str = "India"
    gender: Optional[str] = None
    newsletter_subscription: bool = False


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    

class UserResponse(UserBase):
    id: str = Field(alias="_id")
    created_at: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# Product Schemas
class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str] = None
    stock: int = 0
    

class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None


class ProductResponse(ProductBase):
    id: str = Field(alias="_id")
    created_at: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


# Cart Schemas
class CartItem(BaseModel):
    product_id: str
    quantity: int = 1
    price: float


class CartBase(BaseModel):
    user_id: str
    items: List[CartItem] = []
    total: float = 0.0


class CartResponse(CartBase):
    id: str = Field(alias="_id")
    updated_at: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


# Order Schemas
class OrderItem(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    price: float


class OrderBase(BaseModel):
    user_id: str
    items: List[OrderItem]
    total: float
    status: str = "pending"  # pending, processing, shipped, delivered, cancelled
    shipping_address: Optional[str] = None


class OrderCreate(BaseModel):
    items: List[OrderItem]
    shipping_address: str


class OrderResponse(OrderBase):
    id: str = Field(alias="_id")
    created_at: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


# Favorites Schema
class FavoritesBase(BaseModel):
    user_id: str
    product_ids: List[str] = []


class FavoritesResponse(FavoritesBase):
    id: str = Field(alias="_id")
    updated_at: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

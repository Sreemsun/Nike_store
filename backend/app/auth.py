from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import hashlib
import secrets
from app.config import settings


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash"""
    # Split the stored hash to get salt and hash
    try:
        salt, stored_hash = hashed_password.split(':')
        # Hash the plain password with the same salt
        password_hash = hashlib.pbkdf2_hmac('sha256', plain_password.encode('utf-8'), 
                                            bytes.fromhex(salt), 100000)
        return password_hash.hex() == stored_hash
    except:
        return False


def get_password_hash(password: str) -> str:
    """Hash a password using PBKDF2"""
    # Generate a random salt
    salt = secrets.token_bytes(32)
    # Hash the password
    password_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    # Return salt:hash format
    return f"{salt.hex()}:{password_hash.hex()}"


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    """Verify JWT token"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            return None
        return email
    except JWTError:
        return None

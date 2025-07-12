from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
import enum

class UserTier(enum.Enum):
    BRONZE = "bronze"
    SILVER = "silver"
    GOLD = "gold"

class ItemCategory(enum.Enum):
    TOPS = "tops"
    BOTTOMS = "bottoms"
    DRESSES = "dresses"
    OUTERWEAR = "outerwear"
    SHOES = "shoes"
    ACCESSORIES = "accessories"

class SwapStatus(enum.Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    COMPLETED = "completed"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    tier = Column(Enum(UserTier), default=UserTier.BRONZE)
    eco_points = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)

    # Relationships
    items = relationship("Item", back_populates="owner")
    swaps_requested = relationship("Swap", foreign_keys="Swap.requester_id", back_populates="requester")
    swaps_received = relationship("Swap", foreign_keys="Swap.item_owner_id", back_populates="item_owner")

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    category = Column(Enum(ItemCategory), nullable=False)
    size = Column(String)
    condition = Column(String)  # new, like-new, good, fair
    brand = Column(String)
    image_url = Column(String)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Foreign Keys
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Relationships
    owner = relationship("User", back_populates="items")
    swaps = relationship("Swap", back_populates="item")

class Swap(Base):
    __tablename__ = "swaps"

    id = Column(Integer, primary_key=True, index=True)
    requester_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    item_id = Column(Integer, ForeignKey("items.id"), nullable=False)
    item_owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(Enum(SwapStatus), default=SwapStatus.PENDING)
    message = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    requester = relationship("User", foreign_keys=[requester_id], back_populates="swaps_requested")
    item_owner = relationship("User", foreign_keys=[item_owner_id], back_populates="swaps_received")
    item = relationship("Item", back_populates="swaps")

class EcoPoints(Base):
    __tablename__ = "eco_points"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    points = Column(Integer, nullable=False)
    action = Column(String, nullable=False)  # swap_completed, item_listed, etc.
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

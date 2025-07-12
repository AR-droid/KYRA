from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import User, Item
from schemas import ItemCreate, ItemResponse
from auth import get_current_active_user
import json

router = APIRouter(prefix="/items", tags=["items"])

@router.get("/")
def get_items(
    skip: int = 0, 
    limit: int = 100, 
    category: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Item).filter(Item.is_available == True)
    
    if category:
        query = query.filter(Item.category == category)
    
    items = query.offset(skip).limit(limit).all()
    return [ItemResponse(item).to_dict() for item in items]

@router.get("/my-items")
def get_my_items(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    items = db.query(Item).filter(Item.owner_id == current_user.id).all()
    return [ItemResponse(item).to_dict() for item in items]

@router.post("/")
def create_item(
    request: Request,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    try:
        body = request.json()
        title = body.get("title", "")
        description = body.get("description", "")
        category = body.get("category", "")
        size = body.get("size", "")
        condition = body.get("condition", "")
        brand = body.get("brand", "")
        image_url = body.get("image_url", "")
        
        # Basic validation
        if not title or not category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Title and category are required"
            )
        
        db_item = Item(
            title=title,
            description=description,
            category=category,
            size=size,
            condition=condition,
            brand=brand,
            image_url=image_url,
            owner_id=current_user.id
        )
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return ItemResponse(db_item).to_dict()
        
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid JSON"
        )

@router.get("/{item_id}")
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    return ItemResponse(item).to_dict()

@router.put("/{item_id}")
def update_item(
    item_id: int,
    request: Request,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    try:
        body = request.json()
        
        db_item = db.query(Item).filter(Item.id == item_id).first()
        if not db_item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Item not found"
            )
        
        if db_item.owner_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this item"
            )
        
        # Update fields if provided
        if "title" in body:
            db_item.title = body["title"]
        if "description" in body:
            db_item.description = body["description"]
        if "category" in body:
            db_item.category = body["category"]
        if "size" in body:
            db_item.size = body["size"]
        if "condition" in body:
            db_item.condition = body["condition"]
        if "brand" in body:
            db_item.brand = body["brand"]
        if "image_url" in body:
            db_item.image_url = body["image_url"]
        
        db.commit()
        db.refresh(db_item)
        return ItemResponse(db_item).to_dict()
        
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid JSON"
        )

@router.delete("/{item_id}")
def delete_item(
    item_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if not db_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    
    if db_item.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this item"
        )
    
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted successfully"}

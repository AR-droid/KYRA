from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import User, Item, Swap, SwapStatus
from schemas import SwapCreate, SwapResponse
from auth import get_current_active_user
import json

router = APIRouter(prefix="/swaps", tags=["swaps"])

@router.get("/")
def get_swaps(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Get swaps where user is either requester or item owner
    swaps = db.query(Swap).filter(
        (Swap.requester_id == current_user.id) | 
        (Swap.item_owner_id == current_user.id)
    ).all()
    return [SwapResponse(swap).to_dict() for swap in swaps]

@router.get("/received")
def get_received_swaps(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    swaps = db.query(Swap).filter(Swap.item_owner_id == current_user.id).all()
    return [SwapResponse(swap).to_dict() for swap in swaps]

@router.get("/sent")
def get_sent_swaps(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    swaps = db.query(Swap).filter(Swap.requester_id == current_user.id).all()
    return [SwapResponse(swap).to_dict() for swap in swaps]

@router.post("/")
def create_swap(
    request: Request,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    try:
        body = request.json()
        item_id = body.get("item_id")
        message = body.get("message", "")
        
        if not item_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Item ID is required"
            )
        
        # Check if item exists and is available
        item = db.query(Item).filter(Item.id == item_id).first()
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Item not found"
            )
        
        if not item.is_available:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Item is not available for swapping"
            )
        
        if item.owner_id == current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot request swap for your own item"
            )
        
        # Check if swap already exists
        existing_swap = db.query(Swap).filter(
            Swap.requester_id == current_user.id,
            Swap.item_id == item_id,
            Swap.status == SwapStatus.PENDING
        ).first()
        
        if existing_swap:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Swap request already exists for this item"
            )
        
        db_swap = Swap(
            requester_id=current_user.id,
            item_id=item_id,
            item_owner_id=item.owner_id,
            message=message
        )
        db.add(db_swap)
        db.commit()
        db.refresh(db_swap)
        return SwapResponse(db_swap).to_dict()
        
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid JSON"
        )

@router.put("/{swap_id}/accept")
def accept_swap(
    swap_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    swap = db.query(Swap).filter(Swap.id == swap_id).first()
    if not swap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Swap not found"
        )
    
    if swap.item_owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to accept this swap"
        )
    
    if swap.status != SwapStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Swap is not in pending status"
        )
    
    swap.status = SwapStatus.ACCEPTED
    db.commit()
    db.refresh(swap)
    return SwapResponse(swap).to_dict()

@router.put("/{swap_id}/reject")
def reject_swap(
    swap_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    swap = db.query(Swap).filter(Swap.id == swap_id).first()
    if not swap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Swap not found"
        )
    
    if swap.item_owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to reject this swap"
        )
    
    if swap.status != SwapStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Swap is not in pending status"
        )
    
    swap.status = SwapStatus.REJECTED
    db.commit()
    db.refresh(swap)
    return SwapResponse(swap).to_dict()

@router.put("/{swap_id}/complete")
def complete_swap(
    swap_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    swap = db.query(Swap).filter(Swap.id == swap_id).first()
    if not swap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Swap not found"
        )
    
    if swap.requester_id != current_user.id and swap.item_owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to complete this swap"
        )
    
    if swap.status != SwapStatus.ACCEPTED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Swap must be accepted before completion"
        )
    
    swap.status = SwapStatus.COMPLETED
    
    # Award eco points to both users
    requester = db.query(User).filter(User.id == swap.requester_id).first()
    item_owner = db.query(User).filter(User.id == swap.item_owner_id).first()
    
    requester.eco_points += 50
    item_owner.eco_points += 50
    
    # Mark item as unavailable
    item = db.query(Item).filter(Item.id == swap.item_id).first()
    if item:
        item.is_available = False
    
    db.commit()
    db.refresh(swap)
    return SwapResponse(swap).to_dict()

@router.get("/{swap_id}")
def get_swap(
    swap_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    swap = db.query(Swap).filter(Swap.id == swap_id).first()
    if not swap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Swap not found"
        )
    
    if swap.requester_id != current_user.id and swap.item_owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this swap"
        )
    
    return SwapResponse(swap).to_dict()

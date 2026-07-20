from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.deps import get_current_admin, get_db
from app.email import send_booking_confirmation, send_booking_status_update
from app.models import AdminUser, Booking
from app.schemas import BookingCreate, BookingResponse, BookingUpdate

router = APIRouter(tags=["bookings"])


@router.post("/api/bookings", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(payload: BookingCreate, db: Session = Depends(get_db)):
    booking = Booking(**payload.model_dump())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    send_booking_confirmation(booking)
    return booking


@router.get("/api/admin/bookings", response_model=list[BookingResponse])
def list_bookings(
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    return db.query(Booking).order_by(Booking.created_at.desc()).all()


@router.patch("/api/admin/bookings/{booking_id}", response_model=BookingResponse)
def update_booking(
    booking_id: int,
    payload: BookingUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    booking = db.get(Booking, booking_id)
    if booking is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    old_status = str(booking.status)
    booking.status = payload.status
    db.commit()
    db.refresh(booking)

    if old_status != str(booking.status):
        send_booking_status_update(booking, old_status)

    return booking

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.deps import get_current_admin, get_db
from app.models import AdminUser, ContactMessage
from app.schemas import ContactCreate, ContactResponse, ContactUpdate

router = APIRouter(tags=["contact"])


@router.post("/api/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact_message(payload: ContactCreate, db: Session = Depends(get_db)):
    message = ContactMessage(**payload.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("/api/admin/contacts", response_model=list[ContactResponse])
def list_contact_messages(
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()


@router.patch("/api/admin/contacts/{message_id}", response_model=ContactResponse)
def update_contact_message(
    message_id: int,
    payload: ContactUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    message = db.get(ContactMessage, message_id)
    if message is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")

    message.is_read = payload.is_read
    db.commit()
    db.refresh(message)
    return message

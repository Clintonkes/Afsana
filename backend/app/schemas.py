from datetime import date, datetime, time

from pydantic import BaseModel, ConfigDict, EmailStr

from app.models import BookingStatus


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AdminMeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str


class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    company: str | None = None
    preferred_date: date
    preferred_time: time | None = None
    challenges: list[str] = []
    message: str | None = None


class BookingUpdate(BaseModel):
    status: BookingStatus


class BookingResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    phone: str | None
    company: str | None
    preferred_date: date
    preferred_time: time | None
    challenges: list[str]
    message: str | None
    status: BookingStatus
    created_at: datetime


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactUpdate(BaseModel):
    is_read: bool


class ContactResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    message: str
    is_read: bool
    created_at: datetime

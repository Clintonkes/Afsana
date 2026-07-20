from datetime import date, datetime, time

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator

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
    preferred_time: time
    challenges: list[str] = []
    message: str

    @field_validator("preferred_date")
    @classmethod
    def preferred_date_not_in_past(cls, value: date) -> date:
        if value < date.today():
            raise ValueError("preferred_date cannot be in the past")
        return value

    @field_validator("message")
    @classmethod
    def message_not_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("message cannot be blank")
        return value


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
    updated_at: datetime | None = None


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

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, SessionLocal, engine
from app.models import AdminUser
from app.routers import auth, bookings, contact
from app.security import hash_password

app = FastAPI(title="Afsana Consult API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(bookings.router)
app.include_router(contact.router)


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    _seed_admin()


def _seed_admin() -> None:
    if not settings.admin_email or not settings.admin_password:
        return

    db = SessionLocal()
    try:
        if db.query(AdminUser).count() > 0:
            return
        admin = AdminUser(
            email=settings.admin_email,
            hashed_password=hash_password(settings.admin_password),
        )
        db.add(admin)
        db.commit()
    finally:
        db.close()


@app.get("/api/health")
def health_check():
    return {"status": "ok"}

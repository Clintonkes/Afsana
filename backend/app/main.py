from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.config import REPO_ROOT, settings
from app.database import Base, SessionLocal, engine, with_db_retry
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


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


FRONTEND_DIST = REPO_ROOT / "dist"

if FRONTEND_DIST.is_dir():
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIST / "assets"), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="Not found")
        candidate = FRONTEND_DIST / full_path
        if full_path and candidate.is_file():
            return FileResponse(candidate)
        return FileResponse(FRONTEND_DIST / "index.html")


@app.on_event("startup")
def on_startup() -> None:
    with_db_retry(lambda: Base.metadata.create_all(bind=engine))
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

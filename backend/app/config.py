from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent
REPO_ROOT = BACKEND_DIR.parent


class Settings(BaseSettings):
    database_url: str = "sqlite:///./dev.db"
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    jwt_expires_minutes: int = 60 * 24

    admin_email: str | None = None
    admin_password: str | None = None

    cors_origins: str = "http://localhost:5173"

    resend_api_key: str = ""
    email_from: str = "Afsana Consult <onboarding@resend.dev>"

    # Checked in order; later files override earlier ones. The project's .env
    # lives at the repo root, but backend/.env is also honored if present.
    model_config = SettingsConfigDict(
        env_file=(REPO_ROOT / ".env", BACKEND_DIR / ".env"),
        extra="ignore",
    )

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()

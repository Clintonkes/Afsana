import time

from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import settings

connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}
engine = create_engine(settings.database_url, connect_args=connect_args, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def with_db_retry(func, attempts: int = 5, base_delay: float = 2.0):
    """Retry a DB call with backoff.

    Neon (and similar serverless Postgres) suspends its compute after a
    period of inactivity; the connection that wakes it back up can get
    dropped mid-handshake while it boots. This only matters for the first
    connection after idle, so it's used around startup/CLI calls rather
    than per-request.
    """
    last_error: OperationalError | None = None
    for attempt in range(1, attempts + 1):
        try:
            return func()
        except OperationalError as exc:
            last_error = exc
            if attempt == attempts:
                break
            time.sleep(base_delay * attempt)
    raise last_error

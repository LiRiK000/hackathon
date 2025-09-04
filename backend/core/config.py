from config.encryption import EncryptionConfig
from config.database import DatabaseConfig
from config.fastapi import FastAPIConfig
from config.redis import RedisConfig
from config.minio import MinIOConfig

from dotenv import load_dotenv
from datetime import timedelta
from datetime import timezone
from pathlib import Path
from os import getenv

import logging


load_dotenv(override=True)

# Logging config
LOG_FILE_PATH = Path("backend.log")
LOG_LEVEL = logging.INFO
FMT = "░ %(levelname)-8s ░ %(asctime)s ░ %(name)s ░ %(message)s"
DATEFMT = "%Y-%m-%d %H:%M:%S"
logging.basicConfig(
    level=LOG_LEVEL,
    format=FMT,
    datefmt=DATEFMT,
    encoding="UTF‑8",
    handlers=[
        logging.FileHandler(LOG_FILE_PATH, encoding="UTF‑8"),
        logging.StreamHandler(),
    ],
)

# Time config
TZ = timezone(timedelta(hours=3))  # UTC+3 Moscow


# Database config
def get_bool(env_var: str):
    return env_var in ["True", "true", "1", "yes", "y"]


def get_db_args(use_pg: bool):
    if use_pg:
        return None
    else:
        return {"check_same_thread": False}


DATABASE_CONFIG = DatabaseConfig(
    DB_URL=f"postgresql+asyncpg://{getenv('DB_USER')}:{getenv('DB_PASSWORD')}@{getenv('DB_HOST')}:{getenv('DB_PORT')}/{getenv('DB_NAME')}",
    DB_USE_PG=get_bool(getenv("DB_USE_PG")),
    DB_ARGS=get_db_args(get_bool(getenv("DB_USE_PG"))),
    DB_EXPIRE_ON_COMMIT=False,
)


# Конфигурация FastAPI
FASTAPI_CONFIG = FastAPIConfig(
    ALLOW_ORIGINS=[
        f"{getenv('FRONTEND_PUBLIC_ENDPOINT')}:4000",
        f"{getenv('MINIO_PUBLIC_ENDPOINT')}:9000",
    ],
    ALLOW_CREDENTIALS=True,
    ALLOW_METHODS=["*"],
    ALLOW_HEADERS=["*"],
)


# Конфигурация Redis
REDIS_CONFIG = RedisConfig(
    REDIS_HOST=getenv("REDIS_HOST"),
    REDIS_PORT=6379,
    REDIS_DB=0,
    REDIS_PASSWORD=getenv("REDIS_PASSWORD"),
    REDIS_SOCKET_TIMEOUT=3,
    REDIS_SSL=False,
    REDIS_SOCKET_CONNECT_TIMEOUT=3,
    REDIS_SOCKET_KEEPALIVE=True,
    REDIS_DECODE_RESPONSE=True,
    REDIS_RETRY_ON_TIMEOUT=True,
    REDIS_MAX_CONNECTIONS=100,
    REDIS_HEALTH_CHECK_INTERVAL=30,
)


# Конфигурация MinIO (Объектное хранилище)
MINIO_PUBLIC_ENDPOINT = getenv("MINIO_PUBLIC_ENDPOINT")
MAX_FILE_SIZE = 50 * 1024 * 1024  # МБ
MINIO_CONFIG = MinIOConfig(
    MINIO_HOST=getenv("MINIO_HOST"),
    MINIO_PORT=getenv("MINIO_PORT"),
    MINIO_ACCESS_KEY=getenv("MINIO_ACCESS_KEY"),
    MINIO_SECRET_KEY=getenv("MINIO_SECRET_KEY"),
    MINIO_BUCKET="gradebook",
    MINIO_REGION=getenv("MINIO_REGION"),
    MINIO_SECURE=False,
    MINIO_EXPIRES=timedelta(minutes=15),
)


# Конфигурация uvicorn
SERVER_PORT = int(getenv("SERVER_PORT") or 8001)


# Конфигурация криптографии
ENCRYPTION_CONFIG = EncryptionConfig(
    SECRET_KEY=getenv("SECRET_KEY"),
    ALGORITHM="HS256",
    SALT_BYTES=16,
    ACCESS_TOKEN_EXPIRE=timedelta(minutes=5),
    REFRESH_TOKEN_EXPIRE=timedelta(days=7),
)


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

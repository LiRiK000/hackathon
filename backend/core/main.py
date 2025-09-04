import logging


logger = logging.getLogger("backend.core.main")


# Инициализация Базы Данных
def init_database():
    from .config import DATABASE_CONFIG
    from .database import DatabaseHelper

    return DatabaseHelper(config=DATABASE_CONFIG)


database = init_database()
new_session = database.new_session


# Инициализация приложения
def init_app():
    from .config import FASTAPI_CONFIG
    from .fastapi import FastAPIHelper

    return FastAPIHelper(FASTAPI_CONFIG).app


app = init_app()


# Инициализация ограничителя запросов
def init_limiter():
    from slowapi.util import get_remote_address
    from slowapi import Limiter

    return Limiter(key_func=get_remote_address)


limiter = init_limiter()


# Инициализация клиента Redis
def init_redis():
    from .config import REDIS_CONFIG
    from .redis import RedisHelper

    try:
        return RedisHelper(REDIS_CONFIG).redis_client
    except Exception as e:
        logger.error(f"Ошибка Redis: {e}")


redis_client = init_redis()


# Инициализация клиента MinIO
def init_minio():
    from .config import MINIO_CONFIG
    from .minio import MinIOHelper

    try:
        return MinIOHelper(MINIO_CONFIG)
    except Exception as e:
        logger.error(f"Ошибка MinIO: {e}")


minio_client = init_minio()


# Инициализация модуля криптографии
def init_encryption():
    from .config import ENCRYPTION_CONFIG
    from .encryption import EncryptionHelper

    return EncryptionHelper(ENCRYPTION_CONFIG)


encryption = init_encryption()


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

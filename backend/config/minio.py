from dataclasses import dataclass
from datetime import timedelta


@dataclass
class MinIOConfig:
    MINIO_HOST: str
    MINIO_PORT: int
    MINIO_ACCESS_KEY: str
    MINIO_SECRET_KEY: str
    MINIO_BUCKET: str
    MINIO_REGION: str = ""
    MINIO_SECURE: bool = True
    MINIO_EXPIRES: timedelta = timedelta(minutes=15)


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

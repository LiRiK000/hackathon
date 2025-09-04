from dataclasses import dataclass
from datetime import timedelta


@dataclass
class EncryptionConfig:
    SECRET_KEY: str
    ALGORITHM: str
    SALT_BYTES: int
    ACCESS_TOKEN_EXPIRE: timedelta
    REFRESH_TOKEN_EXPIRE: timedelta


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

from fastapi import HTTPException, status
from passlib.context import CryptContext
from datetime import datetime, timezone
from typing import TYPE_CHECKING
from secrets import token_hex
from jose import jwt


if TYPE_CHECKING:
    from config.encryption import EncryptionConfig


class EncryptionHelper:
    def __init__(self, config: "EncryptionConfig"):
        self.__SECRET_KEY = config.SECRET_KEY
        self.__ALGORITHM = config.ALGORITHM
        self.__SALT_BYTES = config.SALT_BYTES
        self.ACCESS_TOKEN_EXPIRE = config.ACCESS_TOKEN_EXPIRE
        self.REFRESH_TOKEN_EXPIRE = config.REFRESH_TOKEN_EXPIRE
        self.__crypt_context = CryptContext(schemes=["bcrypt"])

    async def create_access_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + self.ACCESS_TOKEN_EXPIRE
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode, self.__SECRET_KEY, algorithm=self.__ALGORITHM
        )
        return encoded_jwt

    async def create_refresh_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + self.REFRESH_TOKEN_EXPIRE
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode, self.__SECRET_KEY, algorithm=self.__ALGORITHM
        )
        return encoded_jwt

    async def decode_token(self, token: str):
        if not token:
            return None
        token = token.split(" ")[-1]
        try:
            return jwt.decode(token, self.__SECRET_KEY, algorithms=[self.__ALGORITHM])
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )

    async def generate_salt(self):
        return token_hex(self.__SALT_BYTES)

    async def verify_password(self, plain_password, hashed_password):
        return self.__crypt_context.verify(plain_password, hashed_password)

    async def hash_password(self, password):
        return self.__crypt_context.hash(password)


if __name__ == "__main__":
    raise RuntimeError("Модуль не предназначен для запуска.")

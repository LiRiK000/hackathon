from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from typing import TYPE_CHECKING


if TYPE_CHECKING:
    from config.database import DatabaseConfig


Base = declarative_base()


class DatabaseHelper:
    def __init__(self, config: "DatabaseConfig"):
        self.__config = config

        if not self.__config.DB_USE_PG:
            self.__config.DB_URL = "sqlite+aiosqlite:///../db.sqlite3"

        if self.__config.DB_ARGS:
            self.engine = create_async_engine(
                self.__config.DB_URL, connect_args=self.__config.DB_ARGS
            )
        else:
            self.engine = create_async_engine(self.__config.DB_URL)

        if self.__config.DB_EXPIRE_ON_COMMIT:
            self.new_session = async_sessionmaker(
                bind=self.engine,
                expire_on_commit=self.__config.DB_EXPIRE_ON_COMMIT,
            )
        else:
            self.new_session = async_sessionmaker(bind=self.engine)

    async def create_tables(self):
        # from models.model import Model  # noqa: F401

        async with self.engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

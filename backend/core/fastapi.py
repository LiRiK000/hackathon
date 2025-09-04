from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from fastapi import FastAPI
from typing import TYPE_CHECKING


if TYPE_CHECKING:
    from config.fast_api import FastAPIConfig


class FastAPIHelper:
    def __init__(self, config: "FastAPIConfig"):
        self.config = config
        self.app = FastAPI(lifespan=self.lifespan)
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=config.ALLOW_ORIGINS,
            allow_credentials=config.ALLOW_CREDENTIALS,
            allow_methods=config.ALLOW_METHODS,
            allow_headers=config.ALLOW_HEADERS,
        )

    @asynccontextmanager
    async def lifespan(self, app: FastAPI):
        yield


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

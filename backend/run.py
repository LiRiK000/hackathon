from core.config import SERVER_PORT

from views.temp import get_temp  # noqa: F401

import uvicorn  # type: ignore


if __name__ == "__main__":
    uvicorn.run("core.main:app", host="0.0.0.0", port=SERVER_PORT)

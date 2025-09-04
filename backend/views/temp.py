from fastapi import Request
from core.main import app


@app.get("/")
async def get_temp(request: Request):
    return {"status": "ok"}


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

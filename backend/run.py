from core.config import ADMIN_SERVER_PORT
from core.sqladmin import setup_admin
from core.main import database
from core.main import auth
from core.main import app

from starlette.middleware.sessions import SessionMiddleware  # type: ignore
import uvicorn  # type: ignore


app.add_middleware(
    SessionMiddleware, secret_key=auth.SECRET_KEY, max_age=auth.TOKEN_EXPIRE
)
admin = setup_admin(app, auth, database.engine)


if __name__ == "__main__":
    uvicorn.run("core.main:app", host="0.0.0.0", port=ADMIN_SERVER_PORT)

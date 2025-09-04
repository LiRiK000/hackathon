# Инициализация Базы Данных
def init_database():
    from .config import DATABASE_CONFIG
    from .database import DatabaseHelper

    return DatabaseHelper(config=DATABASE_CONFIG)


database = init_database()
new_session = database.new_session


# Инициализация приложения
def create_app():
    from .config import FASTAPI_CONFIG
    from .fastapi import FastAPIHelper

    return FastAPIHelper(FASTAPI_CONFIG).app


app = create_app()


# Инициализация модуля авторизации
def create_auth():
    from .config import ADMIN_AUTH_CONFIG
    from .admin_auth import AdminAuthHelper

    return AdminAuthHelper(ADMIN_AUTH_CONFIG)


auth = create_auth()


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

from dataclasses import dataclass


@dataclass
class DatabaseConfig:
    DB_URL: str
    DB_USE_PG: bool = True
    DB_ARGS: dict | None = None
    DB_EXPIRE_ON_COMMIT: bool = None


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

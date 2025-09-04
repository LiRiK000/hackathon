from dataclasses import dataclass


@dataclass
class FastAPIConfig:
    ALLOW_ORIGINS: list[str]
    ALLOW_CREDENTIALS: bool
    ALLOW_METHODS: list[str]
    ALLOW_HEADERS: list[str]


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

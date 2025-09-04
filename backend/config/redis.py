from dataclasses import dataclass


@dataclass
class RedisConfig:
    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_DB: int
    REDIS_PASSWORD: str
    REDIS_SOCKET_TIMEOUT: float | None
    REDIS_SSL: bool
    REDIS_SOCKET_CONNECT_TIMEOUT: float | None
    REDIS_SOCKET_KEEPALIVE: bool
    REDIS_DECODE_RESPONSE: bool
    REDIS_RETRY_ON_TIMEOUT: bool
    REDIS_MAX_CONNECTIONS: int
    REDIS_HEALTH_CHECK_INTERVAL: int


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

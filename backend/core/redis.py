from typing import TYPE_CHECKING
from redis.asyncio import Redis


if TYPE_CHECKING:
    from config.redis import RedisConfig


class RedisHelper:
    def __init__(self, config: "RedisConfig"):
        self.config = config
        self.redis_client = Redis(
            host=config.REDIS_HOST,
            port=config.REDIS_PORT,
            db=config.REDIS_DB,
            password=config.REDIS_PASSWORD,
            socket_timeout=config.REDIS_SOCKET_TIMEOUT,
            ssl=config.REDIS_SSL,
            socket_connect_timeout=config.REDIS_SOCKET_CONNECT_TIMEOUT,
            socket_keepalive=config.REDIS_SOCKET_KEEPALIVE,
            decode_responses=config.REDIS_DECODE_RESPONSE,
            retry_on_timeout=config.REDIS_RETRY_ON_TIMEOUT,
            max_connections=config.REDIS_MAX_CONNECTIONS,
            health_check_interval=config.REDIS_HEALTH_CHECK_INTERVAL,
        )


if __name__ == "__main__":
    raise RuntimeError("The module is not intended to be run.")

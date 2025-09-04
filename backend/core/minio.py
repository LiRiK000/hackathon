from minio.datatypes import Object
from minio import Minio

from urllib.parse import quote
from datetime import timedelta
from functools import partial

from typing import TYPE_CHECKING
from typing import BinaryIO
from typing import Iterable

import asyncio


if TYPE_CHECKING:
    from config.minio import MinIOConfig


class MinIOHelper:
    def __init__(self, config: "MinIOConfig"):
        self.config = config
        self.minio_client = Minio(
            endpoint=f"{config.MINIO_HOST}:{config.MINIO_PORT}",
            access_key=config.MINIO_ACCESS_KEY,
            secret_key=config.MINIO_SECRET_KEY,
            region=config.MINIO_REGION,
            secure=config.MINIO_SECURE,
        )
        found = self.minio_client.bucket_exists(self.config.MINIO_BUCKET)
        if not found:
            self.minio_client.make_bucket(self.config.MINIO_BUCKET)

    async def presigned_get_object(
        self,
        object_name: str,
        file_name: str | None,
        bucket_name: str | None = None,
        expires: timedelta = timedelta(minutes=15),
    ) -> str:
        """
        Генерирует временную ссылку для скачивания объекта из бакета.

        :param bucket_name: Название бакета (По умолчанию используется значение из конфига).
        :param object_name: Ключ (имя) объекта в бакете.
        :param file_name: Имя файла, которое будет отображаться при скачивании. Если не указано — используется object_name.
        :param expires: Время действия ссылки (по умолчанию 15 минут).
        :return: URL-ссылка для скачивания объекта.
        """
        if not bucket_name:
            bucket_name = self.config.MINIO_BUCKET
        loop = asyncio.get_running_loop()
        response_headers = None
        if file_name:
            response_headers = {
                "response-content-disposition": f'attachment; filename="{quote(file_name)}"'
            }
        func = partial(
            self.minio_client.presigned_get_object,
            bucket_name=bucket_name,
            object_name=object_name,
            expires=expires,
            response_headers=response_headers,
        )
        return await loop.run_in_executor(None, func)

    async def put_object(
        self,
        object_name: str,
        data: BinaryIO,
        bucket_name: str | None = None,
        length: int = -1,
        part_size: int = 10 * 1024 * 1024,
        content_type: str = "application/octet-stream",
    ) -> dict:
        """
        Загружает объект в указанный бакет.

        :param bucket_name: Название бакета (По умолчанию используется значение из конфига).
        :param object_name: Имя (ключ) для сохраняемого объекта.
        :param data: Поток данных (файл, BytesIO и т.д.).
        :param length: Длина данных в байтах. -1 — если неизвестна (будет рассчитываться автоматически).
        :param part_size: Размер одной части при многокомпонентной загрузке (по умолчанию 10 МБ).
        :param content_type: MIME-тип содержимого (по умолчанию "application/octet-stream").
        :return: Информация об объекте (как возвращает MinIO).
        """
        if not bucket_name:
            bucket_name = self.config.MINIO_BUCKET
        loop = asyncio.get_running_loop()
        func = partial(
            self.minio_client.put_object,
            bucket_name=bucket_name,
            object_name=object_name,
            data=data,
            length=length,
            part_size=part_size,
            content_type=content_type,
        )
        return await loop.run_in_executor(None, func)

    async def remove_objects(
        self, object_name: str | list[str], bucket_name: str | None = None
    ) -> None | Iterable[object]:
        """
        Удаляет один или несколько объектов из указанного бакета.

        :param bucket_name: Название бакета (По умолчанию используется значение из конфига).
        :param object_name: Строка (один объект) или список строк (несколько объектов).
        :return: None или итератор ошибок (если используется remove_objects).
        """
        if not bucket_name:
            bucket_name = self.config.MINIO_BUCKET
        loop = asyncio.get_running_loop()
        if type(object_name) == str:
            minio_func = self.minio_client.remove_object
        elif type(object_name) == list:
            minio_func = self.minio_client.remove_objects
        func = partial(minio_func, bucket_name=bucket_name, object_name=object_name)
        return await loop.run_in_executor(None, func)

    async def list_objects(
        self, bucket_name: str | None = None, prefix: str = None
    ) -> Iterable[Object]:
        """
        Получает список объектов в указанном бакете (опционально — с указанным префиксом).

        :param bucket_name: Название бакета (По умолчанию используется значение из конфига).
        :param prefix: Префикс ключей (например, 'images/') для фильтрации.
        :return: Итератор объектов (MinIO Object).
        """
        if not bucket_name:
            bucket_name = self.config.MINIO_BUCKET
        loop = asyncio.get_running_loop()
        func = partial(
            self.minio_client.list_objects, bucket_name=bucket_name, prefix=prefix
        )
        return await loop.run_in_executor(None, func)


if __name__ == "__main__":
    raise RuntimeError("Модуль не предназначен для запуска.")

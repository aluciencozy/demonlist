import boto3
from botocore.exceptions import NoCredentialsError
from fastapi import UploadFile

from app.core.config import settings


AWS_ACCESS_KEY = settings.AWS_ACCESS_KEY_ID
AWS_SECRET_KEY = settings.AWS_SECRET_ACCESS_KEY
AWS_BUCKET_NAME = settings.AWS_BUCKET_NAME
AWS_REGION = settings.AWS_REGION


class S3Service:
    def __init__(self):
        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=AWS_REGION,
        )

    def upload_file(self, file: UploadFile, folder: str = "avatars") -> str | None:
        try:
            file_path = f"{folder}/{file.filename}"

            self.s3_client.upload_fileobj(
                file.file,
                AWS_BUCKET_NAME,
                file_path,
                ExtraArgs={
                    "ContentType": file.content_type
                },
            )

            url = f"https://{AWS_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{file_path}"
            return url

        except NoCredentialsError:
            print("Credentials not available")
            return None
        
        except Exception as e:
            print(f"Something went wrong: {e}")
            return None

import { getMinioClient } from "@/minio/utils";
import * as path from "path";

const { minio, bucket } = getMinioClient();
const filePath = path.resolve(__dirname, "../db/database.db");
const objectName = "database.db";

minio
  .fPutObject(bucket, objectName, filePath)
  .then(() => {
    console.log(`File ${objectName} uploaded successfully to bucket ${bucket}`);
  })
  .catch((error) => {
    console.error(
      `Error uploading file ${objectName} to bucket ${bucket}:`,
      error
    );
  });

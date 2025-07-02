import { getMinioClient } from "@/minio/utils";
import * as path from "path";

const { minio, bucket } = getMinioClient();
const filePath = path.resolve(__dirname, "../db/database.db");
const objectName = "database.db";

// @ts-expect-error Errorclear in type definitions, but works fine
minio.fPutObject(bucket, objectName, filePath, (err) => {
  if (err) {
    console.error("Error uploading file:", err);
  } else {
    console.log(`File uploaded successfully to ${bucket}/${objectName}`);
  }
});

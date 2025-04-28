import * as Minio from "minio";
import "dotenv/config";

export const getMinioClient = () => {
  const { ENDPOINT, ACCESS_KEY, SECRET_KEY } = process.env;
  const bucket = "mmk2";
  const minio = new Minio.Client({
    endPoint: ENDPOINT || "undefined",
    useSSL: true,
    accessKey: ACCESS_KEY || "undefined",
    secretKey: SECRET_KEY || "undefined",
  });
  return { minio, bucket };
};

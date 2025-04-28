import * as fs from "fs";
import * as path from "path";
import * as unzipper from "unzipper";
import { getMinioClient } from "@/minio/utils";

const { minio, bucket } = getMinioClient();

const importMigrations = async () => {
  const outputDir = path.resolve(__dirname, "../migrations");
  const zipFileName = "migrations.zip";
  const zipFilePath = path.join(outputDir, zipFileName);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    await minio.fGetObject(bucket, zipFileName, zipFilePath);
    console.log("success");
  } catch (err) {
    console.log(err);
  }

  console.log(`Downloaded ${zipFileName} to ${zipFilePath}`);

  // Extract the zip file
  await fs
    .createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: outputDir }))
    .promise();

  console.log(`Extracted ${zipFileName} to ${outputDir}`);
};

const exec = async () => {
  try {
    await importMigrations();
  } catch (error) {
    console.error("Error importing migrations:", error);
  }
};

exec();

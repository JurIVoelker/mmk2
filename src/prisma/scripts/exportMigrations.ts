import * as fs from "fs";
import * as path from "path";
import archiver from "archiver";
import { getMinioClient } from "@/minio/utils";

const { minio, bucket } = getMinioClient();

const archive = async () => {
  const sourceDir = path.resolve(__dirname, "../migrations");
  const outputDir = path.resolve(__dirname, "../migrations");
  const zipFileName = "migrations.zip";
  const zipFilePath = path.join(outputDir, zipFileName);

  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory does not exist: ${sourceDir}`);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const archive = archiver("zip", { zlib: { level: 9 } });
  const output = fs.createWriteStream(zipFilePath);

  output.on("close", () => {
    console.log(
      `Compressed ${archive.pointer()} total bytes to ${zipFilePath}`
    );
  });

  archive.on("error", (err) => {
    throw err;
  });

  archive.pipe(output);

  // Exclude .zip files when archiving
  archive.glob("**/*", {
    cwd: sourceDir,
    ignore: ["*.zip"],
  });

  await archive.finalize();
  return outputDir + "/" + zipFileName;
};

const exec = async () => {
  const zip = await archive();
  const metaData = {
    "Content-Type": "application/zip",
    "Content-Disposition": `attachment; filename=${path.basename(zip)}`,
  };
  await minio.fPutObject(bucket, "migrations.zip", zip, metaData);
};

exec();

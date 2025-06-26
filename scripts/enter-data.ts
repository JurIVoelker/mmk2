import { getMinioClient } from "@/minio/utils";
import "dotenv/config";
import { readFileSync, writeFileSync } from "fs";
import { v6 as uuid } from "uuid";

const { minio, bucket } = getMinioClient();

(async () => {
  const results = readFileSync("scripts/results-1.json", "utf-8");
  const parsedResults = JSON.parse(results);
  const processedResults = [];
  for (const result of parsedResults) {
    try {
      const response = await fetch(result.image);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();

      const fileExtension = result.image.split(".").pop();
      const imageName = `${uuid()}.${fileExtension}`;
      await minio.putObject(
        bucket,
        "textNews/" + imageName,
        Buffer.from(arrayBuffer)
      );
      processedResults.push({
        ...result,
        image: "https://s3.voelkerlabs.de/mmk2/textNews/" + imageName,
      });
    } catch (error) {
      console.error(`Error processing image ${result.irmage}:`, error);
      continue;
    }
  }

  writeFileSync(
    "scripts/processed-results.json",
    JSON.stringify(processedResults, null, 2)
  );
})();

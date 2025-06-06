import { getMinioClient } from "@/minio/utils";
import { prisma } from "@/prisma/prisma";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { v6 } from "uuid";

const { minio, bucket } = getMinioClient();

const getData = async () => {
  const inputDir = "./src/scripts/data-folder";
  const files = (await readdir(path.resolve(inputDir))).filter((file) =>
    file.endsWith(".json")
  );

  const data = [];

  for (const file of files) {
    try {
      const parsedJSON = JSON.parse(
        await readFile(path.join(inputDir, file), "utf-8")
      );
      if (Array.isArray(parsedJSON)) {
        data.push(...parsedJSON);
      } else {
        data.push(parsedJSON);
      }
    } catch {
      console.error(`Error parsing JSON from file: ${file}`);
    }
  }
  return data;
};

type Data = {
  id: string;
  link: string;
  image: string;
  title: string;
  category: string;
  description: string;
  date: string;
  assertion: string;
  rating: string;
  explanation: string;
}[];

const insertAndUpload = async (data: Data) => {
  const providers = await prisma.newsProvider.findMany();
  for (const item of data) {
    console.log(item.image);
    try {
      const response = await fetch(item.image);
      if (!response.ok) {
        console.error(`Failed to download image: ${item.image}`);
        continue;
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      const fileName =
        "textNews/" + v6() + "." + path.basename(item.image).split(".")[1];
      await minio.putObject(bucket, fileName, buffer);
      await prisma.textNews.create({
        data: {
          image: "https://s3.voelkerlabs.de/mmk2/" + fileName,
          isFake: item.rating === "Falsch" ? true : false,
          explaination: item.explanation,
          content: item.assertion,
          date: (() => {
            const [day, month, year] = item.date.split(".");
            const fullYear =
              parseInt(year, 10) < 70 ? "20" + year : "19" + year;
            return new Date(`${fullYear}-${month}-${day}`);
          })(),
          title: item.title,
          category: item.category,
          source: item.link,
          providerId:
            providers[Math.floor(Math.random() * providers.length)].id,
        },
      });
    } catch (error) {
      console.error(error);
      continue;
    }
  }
};

const addProviders = async () => {
  await prisma.newsProvider.createMany({
    data: [
      {
        name: "Test",
        image: "test.de",
      },
      {
        name: "Test2",
        image: "test2.de",
      },
      {
        name: "Test3",
        image: "test3.de",
      },
    ],
  });
};

const exec = async () => {
  await prisma.textNews.deleteMany();
  const data = await getData();
  await addProviders();
  await insertAndUpload(data);
};

exec();

// await minio.fPutObject(
//   "mmk2",
//   "/imageNews/trump.webp",
//   path.resolve("./src/scripts/trump.webp")
// );
// await prisma.imageNews.create({
//   data: {
//     image: "https://s3.voelkerlabs.de/mmk2/imageNews/trump.webp",
//     isFake: true,
//     explaination: "test",
//     source: "https://www.bbc.com/news/articles/cdrg8zkz8d0o",
//   },
// });

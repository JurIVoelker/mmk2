import { prisma } from "../prisma";

const exec = async () => {
  console.log("Deleting all data from the database...");
  await prisma.ranking.deleteMany({});

  console.log("Adding test data to the database...");
  await prisma.ranking.createMany({
    data: Array(100)
      .fill(0)
      .map((_, i) => ({
        score: Math.floor(Math.random() * 1000),
        name: `Player ${i + 1}`,
      })),
  });
  console.log("Added 100 random players to the database.");
};

exec();

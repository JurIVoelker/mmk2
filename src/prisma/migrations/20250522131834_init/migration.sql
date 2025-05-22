-- CreateTable
CREATE TABLE "NewsProvider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TextNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Anderes',
    "explaination" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "isFake" BOOLEAN NOT NULL,
    "providerId" TEXT NOT NULL,
    CONSTRAINT "TextNews_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "NewsProvider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImageNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "explaination" TEXT NOT NULL,
    "isFake" BOOLEAN NOT NULL,
    "source" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VideoNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "video" TEXT NOT NULL,
    "explaination" TEXT NOT NULL,
    "isFake" BOOLEAN NOT NULL,
    "source" TEXT NOT NULL
);

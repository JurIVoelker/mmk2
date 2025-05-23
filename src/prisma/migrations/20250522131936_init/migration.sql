-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImageNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "explaination" TEXT,
    "isFake" BOOLEAN NOT NULL,
    "source" TEXT
);
INSERT INTO "new_ImageNews" ("createdAt", "explaination", "id", "image", "isFake", "source") SELECT "createdAt", "explaination", "id", "image", "isFake", "source" FROM "ImageNews";
DROP TABLE "ImageNews";
ALTER TABLE "new_ImageNews" RENAME TO "ImageNews";
CREATE TABLE "new_TextNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Anderes',
    "explaination" TEXT,
    "image" TEXT NOT NULL,
    "source" TEXT,
    "isFake" BOOLEAN NOT NULL,
    "providerId" TEXT NOT NULL,
    CONSTRAINT "TextNews_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "NewsProvider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TextNews" ("Date", "category", "content", "createdAt", "explaination", "id", "image", "isFake", "providerId", "source", "title") SELECT "Date", "category", "content", "createdAt", "explaination", "id", "image", "isFake", "providerId", "source", "title" FROM "TextNews";
DROP TABLE "TextNews";
ALTER TABLE "new_TextNews" RENAME TO "TextNews";
CREATE TABLE "new_VideoNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "video" TEXT NOT NULL,
    "explaination" TEXT,
    "isFake" BOOLEAN NOT NULL,
    "source" TEXT
);
INSERT INTO "new_VideoNews" ("createdAt", "explaination", "id", "isFake", "source", "video") SELECT "createdAt", "explaination", "id", "isFake", "source", "video" FROM "VideoNews";
DROP TABLE "VideoNews";
ALTER TABLE "new_VideoNews" RENAME TO "VideoNews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

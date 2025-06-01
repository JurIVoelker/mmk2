-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImageNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "explaination" TEXT,
    "isFake" BOOLEAN NOT NULL,
    "source" TEXT,
    "providerId" TEXT,
    CONSTRAINT "ImageNews_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "NewsProvider" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ImageNews" ("createdAt", "explaination", "id", "image", "isFake", "source") SELECT "createdAt", "explaination", "id", "image", "isFake", "source" FROM "ImageNews";
DROP TABLE "ImageNews";
ALTER TABLE "new_ImageNews" RENAME TO "ImageNews";
CREATE TABLE "new_VideoNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "video" TEXT NOT NULL,
    "explaination" TEXT,
    "isFake" BOOLEAN NOT NULL,
    "source" TEXT,
    "providerId" TEXT,
    CONSTRAINT "VideoNews_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "NewsProvider" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_VideoNews" ("createdAt", "explaination", "id", "isFake", "source", "video") SELECT "createdAt", "explaination", "id", "isFake", "source", "video" FROM "VideoNews";
DROP TABLE "VideoNews";
ALTER TABLE "new_VideoNews" RENAME TO "VideoNews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

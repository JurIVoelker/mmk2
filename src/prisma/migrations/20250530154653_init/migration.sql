-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TextNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Anderes',
    "explaination" TEXT,
    "image" TEXT NOT NULL,
    "source" TEXT,
    "isFake" BOOLEAN NOT NULL,
    "providerId" TEXT,
    CONSTRAINT "TextNews_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "NewsProvider" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TextNews" ("category", "content", "createdAt", "date", "explaination", "id", "image", "isFake", "providerId", "source", "title") SELECT "category", "content", "createdAt", "date", "explaination", "id", "image", "isFake", "providerId", "source", "title" FROM "TextNews";
DROP TABLE "TextNews";
ALTER TABLE "new_TextNews" RENAME TO "TextNews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

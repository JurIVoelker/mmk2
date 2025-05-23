/*
  Warnings:

  - You are about to drop the column `Date` on the `TextNews` table. All the data in the column will be lost.
  - Added the required column `date` to the `TextNews` table without a default value. This is not possible if the table is not empty.

*/
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
    "providerId" TEXT NOT NULL,
    CONSTRAINT "TextNews_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "NewsProvider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TextNews" ("category", "content", "createdAt", "explaination", "id", "image", "isFake", "providerId", "source", "title") SELECT "category", "content", "createdAt", "explaination", "id", "image", "isFake", "providerId", "source", "title" FROM "TextNews";
DROP TABLE "TextNews";
ALTER TABLE "new_TextNews" RENAME TO "TextNews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

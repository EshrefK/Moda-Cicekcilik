/*
  Warnings:

  - You are about to drop the column `description` on the `CategoryGroup` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_CategoryGroup" ("createdAt", "id", "name", "slug", "updatedAt") SELECT "createdAt", "id", "name", "slug", "updatedAt" FROM "CategoryGroup";
DROP TABLE "CategoryGroup";
ALTER TABLE "new_CategoryGroup" RENAME TO "CategoryGroup";
CREATE UNIQUE INDEX "CategoryGroup_slug_key" ON "CategoryGroup"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

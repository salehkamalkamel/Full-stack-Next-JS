-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_system_requirements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "graphics" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "notes" TEXT,
    "productId" TEXT NOT NULL,
    CONSTRAINT "system_requirements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_system_requirements" ("graphics", "id", "memory", "notes", "os", "processor", "productId", "storage", "type") SELECT "graphics", "id", "memory", "notes", "os", "processor", "productId", "storage", "type" FROM "system_requirements";
DROP TABLE "system_requirements";
ALTER TABLE "new_system_requirements" RENAME TO "system_requirements";
CREATE INDEX "system_requirements_productId_idx" ON "system_requirements"("productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

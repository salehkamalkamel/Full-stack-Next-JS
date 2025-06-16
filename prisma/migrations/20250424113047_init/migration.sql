-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "role" TEXT NOT NULL DEFAULT 'USER',
    "banned" BOOLEAN,
    "banReason" TEXT,
    "banExpires" DATETIME,
    "defaultShippingAddressId" TEXT,
    "defaultBillingAddressId" TEXT
);
INSERT INTO "new_user" ("banExpires", "banReason", "banned", "createdAt", "defaultBillingAddressId", "defaultShippingAddressId", "email", "emailVerified", "id", "image", "name", "role", "status", "updatedAt") SELECT "banExpires", "banReason", "banned", "createdAt", "defaultBillingAddressId", "defaultShippingAddressId", "email", "emailVerified", "id", "image", "name", "role", "status", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_defaultShippingAddressId_key" ON "user"("defaultShippingAddressId");
CREATE UNIQUE INDEX "user_defaultBillingAddressId_key" ON "user"("defaultBillingAddressId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

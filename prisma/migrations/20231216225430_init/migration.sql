-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gymPlanId" INTEGER NOT NULL,
    CONSTRAINT "Feature_gymPlanId_fkey" FOREIGN KEY ("gymPlanId") REFERENCES "GymPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Feature" ("gymPlanId", "id", "name") SELECT "gymPlanId", "id", "name" FROM "Feature";
DROP TABLE "Feature";
ALTER TABLE "new_Feature" RENAME TO "Feature";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - Added the required column `service_id` to the `votes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_votes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT,
    "username" TEXT NOT NULL,
    "ip_address" TEXT,
    "service_id" TEXT NOT NULL,
    "service_name" TEXT NOT NULL,
    "voted_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "reward_claimed" BOOLEAN NOT NULL DEFAULT false,
    "reward_coins" INTEGER NOT NULL DEFAULT 100,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_votes" ("created_at", "id", "ip_address", "reward_claimed", "reward_coins", "service_name", "user_id", "username", "voted_at") SELECT "created_at", "id", "ip_address", "reward_claimed", "reward_coins", "service_name", "user_id", "username", "voted_at" FROM "votes";
DROP TABLE "votes";
ALTER TABLE "new_votes" RENAME TO "votes";
CREATE INDEX "idx_votes_user_id" ON "votes"("user_id");
CREATE INDEX "idx_votes_service_id" ON "votes"("service_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

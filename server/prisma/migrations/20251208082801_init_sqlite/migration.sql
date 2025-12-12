-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT,
    "minecraft_uuid" TEXT,
    "rank" TEXT DEFAULT 'Player',
    "coins" INTEGER NOT NULL DEFAULT 0,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "first_login_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "is_online" BOOLEAN NOT NULL DEFAULT false,
    "is_banned" BOOLEAN NOT NULL DEFAULT false,
    "ban_reason" TEXT,
    "ban_expires_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "item_type" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_price" DECIMAL NOT NULL,
    "payment_method" TEXT DEFAULT 'stripe',
    "payment_id" TEXT,
    "status" TEXT DEFAULT 'pending',
    "purchased_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "expires_at" DATETIME,
    CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT,
    "username" TEXT NOT NULL,
    "ip_address" TEXT,
    "service_name" TEXT NOT NULL,
    "voted_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "reward_claimed" BOOLEAN NOT NULL DEFAULT false,
    "reward_coins" INTEGER NOT NULL DEFAULT 100,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "server_stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stat_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_players" INTEGER NOT NULL DEFAULT 0,
    "unique_players" INTEGER NOT NULL DEFAULT 0,
    "new_players" INTEGER NOT NULL DEFAULT 0,
    "peak_players" INTEGER NOT NULL DEFAULT 0,
    "total_votes" INTEGER NOT NULL DEFAULT 0,
    "total_purchases" DECIMAL NOT NULL DEFAULT 0.0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "player_stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "kills" INTEGER NOT NULL DEFAULT 0,
    "deaths" INTEGER NOT NULL DEFAULT 0,
    "blocks_placed" INTEGER NOT NULL DEFAULT 0,
    "blocks_broken" INTEGER NOT NULL DEFAULT 0,
    "playtime_minutes" INTEGER NOT NULL DEFAULT 0,
    "last_seen" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "player_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "staff_applications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "position_applied" TEXT NOT NULL,
    "application_text" TEXT NOT NULL,
    "discord_username" TEXT,
    "age" INTEGER,
    "timezone" TEXT,
    "experience" TEXT,
    "status" TEXT DEFAULT 'pending',
    "reviewed_by" TEXT,
    "reviewed_at" DATETIME,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "staff_applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contact_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT DEFAULT 'unread',
    "replied_at" DATETIME,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contact_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "gamemodes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "color" TEXT,
    "hero_image" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "gamemode_features" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gamemode_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    CONSTRAINT "gamemode_features_gamemode_id_fkey" FOREIGN KEY ("gamemode_id") REFERENCES "gamemodes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "gamemode_rewards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gamemode_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "rarity" TEXT,
    CONSTRAINT "gamemode_rewards_gamemode_id_fkey" FOREIGN KEY ("gamemode_id") REFERENCES "gamemodes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "store_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "store_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL NOT NULL,
    "perks" TEXT,
    "image_url" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "store_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "store_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_minecraft_uuid_key" ON "profiles"("minecraft_uuid");

-- CreateIndex
CREATE INDEX "idx_purchases_user_id" ON "purchases"("user_id");

-- CreateIndex
CREATE INDEX "idx_votes_user_id" ON "votes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "player_stats_user_id_key" ON "player_stats"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "gamemodes_slug_key" ON "gamemodes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "store_categories_slug_key" ON "store_categories"("slug");

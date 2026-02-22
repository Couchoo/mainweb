-- Phase 1: Create critical_movies table for unfixable movies
CREATE TABLE IF NOT EXISTS `critical_movies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movieId` INT NOT NULL,
  `imdbId` VARCHAR(20) NOT NULL,
  `title` VARCHAR(500),
  `reason` TEXT,
  `previousServers` TEXT COMMENT 'JSON array of previous broken servers',
  `archivedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `resolvedAt` DATETIME NULL,
  `resolvedBy` INT NULL COMMENT 'Admin user ID who resolved',
  `notes` TEXT NULL COMMENT 'Admin notes',
  PRIMARY KEY (`id`),
  INDEX `idx_movieId` (`movieId`),
  INDEX `idx_imdbId` (`imdbId`),
  INDEX `idx_resolved` (`resolvedAt`),
  INDEX `idx_archivedAt` (`archivedAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Phase 2: Update broken_servers table with recheck fields
-- ✅ SKIP: All columns (recheckAt, recheckCount, status) already exist!
-- ✅ SKIP: All indexes already exist!

-- Phase 3: Add healthStatus CRITICAL to movie table (if not exists)
-- This is handled by raw SQL updates, no schema change needed

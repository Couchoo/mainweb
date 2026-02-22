-- Create broken_servers table to track failed server checks
CREATE TABLE IF NOT EXISTS `broken_servers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movieId` INT NOT NULL,
  `serverId` INT NOT NULL,
  `serverName` VARCHAR(255) NOT NULL,
  `url` VARCHAR(1000) NOT NULL,
  `statusCode` INT NULL,
  `error` TEXT NULL,
  `checkedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fixed` BOOLEAN NOT NULL DEFAULT 0,
  `fixedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_movieId` (`movieId`),
  INDEX `idx_serverId` (`serverId`),
  INDEX `idx_fixed` (`fixed`),
  INDEX `idx_checkedAt` (`checkedAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cinema_library` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movieId` INT NOT NULL,
  `videoPath` VARCHAR(1000) NOT NULL,
  `fileSize` BIGINT NULL,
  `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cinema_library_movieId_key` (`movieId`),
  INDEX `CinemaLibrary_movieId_idx` (`movieId`),
  CONSTRAINT `CinemaLibrary_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

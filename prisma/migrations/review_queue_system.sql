-- Review Queue System Migration
-- Creates table for tracking fixed movies that need moderator review

-- Create fixed_movies_review table
CREATE TABLE IF NOT EXISTS fixed_movies_review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movieId INT NOT NULL,
    movieTitle VARCHAR(255) NOT NULL,
    movieSlug VARCHAR(255) NOT NULL,
    fixType ENUM('partial', 'backup_added', 'manual') NOT NULL,
    serversRemoved INT DEFAULT 0,
    serversAdded INT DEFAULT 0,
    fixedAt DATETIME NOT NULL,
    reviewStatus ENUM('pending', 'approved', 'rejected', 'fixed') DEFAULT 'pending',
    reviewedBy INT NULL,
    reviewedAt DATETIME NULL,
    notes TEXT NULL,
    INDEX idx_movie (movieId),
    INDEX idx_status (reviewStatus),
    INDEX idx_fixed_at (fixedAt DESC),
    FOREIGN KEY (movieId) REFERENCES movie(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add index for faster pending queries
CREATE INDEX IF NOT EXISTS idx_pending_review ON fixed_movies_review(reviewStatus, fixedAt DESC);

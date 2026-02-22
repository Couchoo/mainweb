-- Add 'fixed' status to reviewStatus ENUM
ALTER TABLE fixed_movies_review 
MODIFY COLUMN reviewStatus ENUM('pending', 'approved', 'rejected', 'fixed') DEFAULT 'pending';

-- Change reviewedBy from INT to VARCHAR to store 'admin' string
ALTER TABLE fixed_movies_review 
MODIFY COLUMN reviewedBy VARCHAR(100) DEFAULT NULL;

-- Update existing records
UPDATE fixed_movies_review 
SET reviewedBy = 'admin' 
WHERE reviewedBy IS NULL AND reviewStatus IN ('approved', 'rejected', 'fixed');

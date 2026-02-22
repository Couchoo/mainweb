-- Fix invalid datetime values in movie table
-- Run this in MySQL Workbench or phpMyAdmin

-- Fix updatedAt column
UPDATE movie 
SET updatedAt = COALESCE(NULLIF(updatedAt, '0000-00-00 00:00:00'), NOW()) 
WHERE updatedAt = '0000-00-00 00:00:00' 
   OR YEAR(updatedAt) = 0 
   OR MONTH(updatedAt) = 0 
   OR DAY(updatedAt) = 0;

-- Fix createdAt column
UPDATE movie 
SET createdAt = COALESCE(NULLIF(createdAt, '0000-00-00 00:00:00'), NOW()) 
WHERE createdAt = '0000-00-00 00:00:00' 
   OR YEAR(createdAt) = 0 
   OR MONTH(createdAt) = 0 
   OR DAY(createdAt) = 0;

-- Fix lastChecked column (if exists)
UPDATE movie 
SET lastChecked = NULL
WHERE lastChecked = '0000-00-00 00:00:00' 
   OR YEAR(lastChecked) = 0 
   OR MONTH(lastChecked) = 0 
   OR DAY(lastChecked) = 0;

SELECT 'Fixed invalid datetime values!' as status;

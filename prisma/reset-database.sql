-- Reset entire database (DELETE ALL DATA)
-- Run this with: npx prisma db execute --file prisma/reset-database.sql --schema prisma/schema.prisma

-- Delete all data in correct order (respecting foreign keys)
DELETE FROM "VideoServer";
DELETE FROM "Movie";
DELETE FROM "User";

-- Reset auto-increment sequences (optional)
-- ALTER SEQUENCE "Movie_id_seq" RESTART WITH 1;
-- ALTER SEQUENCE "VideoServer_id_seq" RESTART WITH 1;
-- ALTER SEQUENCE "User_id_seq" RESTART WITH 1;

-- Verify deletion
SELECT 'Movies deleted: ' || COUNT(*) FROM "Movie";
SELECT 'VideoServers deleted: ' || COUNT(*) FROM "VideoServer";
SELECT 'Users deleted: ' || COUNT(*) FROM "User";

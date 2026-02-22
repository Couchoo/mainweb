-- CreateTable
CREATE TABLE \collection\ (
    \id\ INTEGER NOT NULL AUTO_INCREMENT,
    \
ame\ VARCHAR(255) NOT NULL,
    \slug\ VARCHAR(255) NOT NULL,
    \createdAt\ DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \updatedAt\ DATETIME(3) NOT NULL,

    UNIQUE INDEX \Collection_name_key\(\
ame\),
    UNIQUE INDEX \Collection_slug_key\(\slug\),
    PRIMARY KEY (\id\)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable
ALTER TABLE \movie\ ADD COLUMN \collectionId\ INTEGER NULL;

-- AddForeignKey
ALTER TABLE \movie\ ADD CONSTRAINT \Movie_collectionId_fkey\ FOREIGN KEY (\collectionId\) REFERENCES \collection\(\id\) ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX \Movie_collectionId_idx\ ON \movie\(\collectionId\);

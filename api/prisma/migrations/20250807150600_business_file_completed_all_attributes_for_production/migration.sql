/*
  Warnings:

  - You are about to drop the column `fileType` on the `business_file` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `business_file` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `business_file` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hash]` on the table `business_file` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mimeType` to the `business_file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeBytes` to the `business_file` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "business_file_url_key";

-- AlterTable
ALTER TABLE "business_file" DROP COLUMN "fileType",
DROP COLUMN "url",
ADD COLUMN     "hash" TEXT,
ADD COLUMN     "mimeType" "FileType" NOT NULL,
ADD COLUMN     "path" TEXT,
ADD COLUMN     "sizeBytes" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "business_file_path_key" ON "business_file"("path");

-- CreateIndex
CREATE UNIQUE INDEX "business_file_hash_key" ON "business_file"("hash");

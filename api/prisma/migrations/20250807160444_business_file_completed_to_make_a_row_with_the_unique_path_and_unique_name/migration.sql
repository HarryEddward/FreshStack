/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `business_file` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `business_file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business_file" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "business_file_name_key" ON "business_file"("name");

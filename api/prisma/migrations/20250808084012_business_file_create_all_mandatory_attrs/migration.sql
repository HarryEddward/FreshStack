/*
  Warnings:

  - Made the column `hash` on table `business_file` required. This step will fail if there are existing NULL values in that column.
  - Made the column `path` on table `business_file` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "business_file" ALTER COLUMN "hash" SET NOT NULL,
ALTER COLUMN "path" SET NOT NULL;

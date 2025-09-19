/*
  Warnings:

  - You are about to drop the column `unityAmount` on the `business_products` table. All the data in the column will be lost.
  - You are about to drop the column `batchNumber` on the `business_products_stock_batches` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `business_products_stock_batches` table. All the data in the column will be lost.
  - You are about to drop the column `totalCost` on the `business_products_stock_batches` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,batchName]` on the table `business_products_stock_batches` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `business_products` table without a default value. This is not possible if the table is not empty.
  - Made the column `nameLastModificationEmployee` on table `business_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `preparationDuration` on table `business_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minimumStockAlert` on table `business_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `supplierId` on table `business_products_stock_batches` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "BusinessProductType" AS ENUM ('INTERNAL', 'INDIRECT', 'DIRECT');

-- DropForeignKey
ALTER TABLE "business_products_stock_batches" DROP CONSTRAINT "business_products_stock_batches_supplierId_fkey";

-- DropIndex
DROP INDEX "business_products_stock_batches_productId_batchNumber_key";

-- AlterTable
ALTER TABLE "business_products" DROP COLUMN "unityAmount",
ADD COLUMN     "type" "BusinessProductType" NOT NULL,
ALTER COLUMN "nameLastModificationEmployee" SET NOT NULL,
ALTER COLUMN "preparationDuration" SET NOT NULL,
ALTER COLUMN "minimumStockAlert" SET NOT NULL,
ALTER COLUMN "minimumStockAlert" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "business_products_stock_batches" DROP COLUMN "batchNumber",
DROP COLUMN "count",
DROP COLUMN "totalCost",
ADD COLUMN     "batchName" TEXT,
ALTER COLUMN "supplierId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "business_products_stock_batches_productId_batchName_key" ON "business_products_stock_batches"("productId", "batchName");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_phone_key" ON "businesses"("phone");

-- AddForeignKey
ALTER TABLE "business_products_stock_batches" ADD CONSTRAINT "business_products_stock_batches_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "business_suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

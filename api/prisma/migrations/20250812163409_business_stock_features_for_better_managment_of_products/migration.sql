/*
  Warnings:

  - You are about to drop the column `expirationDates` on the `business_products` table. All the data in the column will be lost.
  - You are about to drop the column `stockBatches` on the `business_products` table. All the data in the column will be lost.
  - You are about to drop the column `unityConsumePrice` on the `business_products` table. All the data in the column will be lost.
  - You are about to drop the column `unityConsumeStock` on the `business_products` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'EXPIRED', 'CONSUMED', 'DAMAGED');

-- CreateEnum
CREATE TYPE "StockMovementType" AS ENUM ('PURCHASE', 'SALE', 'ADJUSTMENT', 'EXPIRED', 'DAMAGED', 'RESERVED', 'UNRESERVED', 'TRANSFER');

-- AlterTable
ALTER TABLE "business_products" DROP COLUMN "expirationDates",
DROP COLUMN "stockBatches",
DROP COLUMN "unityConsumePrice",
DROP COLUMN "unityConsumeStock",
ADD COLUMN     "minimumStockAlert" INTEGER;

-- CreateTable
CREATE TABLE "business_products_stock_batches" (
    "id" TEXT NOT NULL,
    "batchNumber" TEXT,
    "count" DECIMAL(10,2) NOT NULL,
    "originalCount" DECIMAL(10,2) NOT NULL,
    "reservedCount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "costPerUnit" DECIMAL(10,4),
    "totalCost" DECIMAL(10,2),
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationDate" TIMESTAMP(3),
    "supplierId" TEXT,
    "status" "BatchStatus" NOT NULL DEFAULT 'AVAILABLE',
    "businessId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_products_stock_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_products_stock_movements" (
    "id" TEXT NOT NULL,
    "type" "StockMovementType" NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "reason" TEXT,
    "batchId" TEXT,
    "productId" TEXT NOT NULL,
    "userId" TEXT,
    "employeeName" TEXT,
    "orderId" TEXT,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_products_stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_suppliers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "business_products_stock_batches_businessId_idx" ON "business_products_stock_batches"("businessId");

-- CreateIndex
CREATE INDEX "business_products_stock_batches_productId_idx" ON "business_products_stock_batches"("productId");

-- CreateIndex
CREATE INDEX "business_products_stock_batches_status_idx" ON "business_products_stock_batches"("status");

-- CreateIndex
CREATE INDEX "business_products_stock_batches_expirationDate_idx" ON "business_products_stock_batches"("expirationDate");

-- CreateIndex
CREATE INDEX "business_products_stock_batches_supplierId_idx" ON "business_products_stock_batches"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "business_products_stock_batches_productId_batchNumber_key" ON "business_products_stock_batches"("productId", "batchNumber");

-- CreateIndex
CREATE INDEX "business_products_stock_movements_businessId_idx" ON "business_products_stock_movements"("businessId");

-- CreateIndex
CREATE INDEX "business_products_stock_movements_productId_idx" ON "business_products_stock_movements"("productId");

-- CreateIndex
CREATE INDEX "business_products_stock_movements_batchId_idx" ON "business_products_stock_movements"("batchId");

-- CreateIndex
CREATE INDEX "business_products_stock_movements_type_idx" ON "business_products_stock_movements"("type");

-- CreateIndex
CREATE INDEX "business_products_stock_movements_createdAt_idx" ON "business_products_stock_movements"("createdAt");

-- CreateIndex
CREATE INDEX "business_suppliers_businessId_idx" ON "business_suppliers"("businessId");

-- AddForeignKey
ALTER TABLE "business_products_stock_batches" ADD CONSTRAINT "business_products_stock_batches_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "business_suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products_stock_batches" ADD CONSTRAINT "business_products_stock_batches_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products_stock_batches" ADD CONSTRAINT "business_products_stock_batches_productId_fkey" FOREIGN KEY ("productId") REFERENCES "business_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products_stock_movements" ADD CONSTRAINT "business_products_stock_movements_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "business_products_stock_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products_stock_movements" ADD CONSTRAINT "business_products_stock_movements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "business_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products_stock_movements" ADD CONSTRAINT "business_products_stock_movements_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_suppliers" ADD CONSTRAINT "business_suppliers_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

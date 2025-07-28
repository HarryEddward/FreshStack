/*
  Warnings:

  - A unique constraint covering the columns `[clientTempOrderId]` on the table `business_phone_ids` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "business_phone_ids" ADD COLUMN     "clientTempOrderId" TEXT;

-- CreateTable
CREATE TABLE "ClientTempOrderLine" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceAtTimeOfOrder" DOUBLE PRECISION NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ClientTempOrderLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_temp_orders" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "phoneId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_temp_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClientTempOrderLine_orderId_idx" ON "ClientTempOrderLine"("orderId");

-- CreateIndex
CREATE INDEX "ClientTempOrderLine_productId_idx" ON "ClientTempOrderLine"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "client_temp_orders_phoneId_key" ON "client_temp_orders"("phoneId");

-- CreateIndex
CREATE INDEX "client_temp_orders_businessId_idx" ON "client_temp_orders"("businessId");

-- CreateIndex
CREATE INDEX "client_temp_orders_createdAt_idx" ON "client_temp_orders"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "business_phone_ids_clientTempOrderId_key" ON "business_phone_ids"("clientTempOrderId");

-- AddForeignKey
ALTER TABLE "ClientTempOrderLine" ADD CONSTRAINT "ClientTempOrderLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "client_temp_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientTempOrderLine" ADD CONSTRAINT "ClientTempOrderLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "business_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_temp_orders" ADD CONSTRAINT "client_temp_orders_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_phone_ids" ADD CONSTRAINT "business_phone_ids_clientTempOrderId_fkey" FOREIGN KEY ("clientTempOrderId") REFERENCES "client_temp_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

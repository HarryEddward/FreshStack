/*
  Warnings:

  - You are about to drop the `ClientTempOrderLine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BusinessProductToClientTempOrderLine` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[businessPhoneId]` on the table `client_temp_orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ClientTempOrderLine" DROP CONSTRAINT "ClientTempOrderLine_orderId_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessProductToClientTempOrderLine" DROP CONSTRAINT "_BusinessProductToClientTempOrderLine_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessProductToClientTempOrderLine" DROP CONSTRAINT "_BusinessProductToClientTempOrderLine_B_fkey";

-- DropForeignKey
ALTER TABLE "business_phones" DROP CONSTRAINT "business_phones_clientTempOrderId_fkey";

-- DropForeignKey
ALTER TABLE "client_temp_orders" DROP CONSTRAINT "client_temp_orders_businessId_fkey";

-- AlterTable
ALTER TABLE "client_temp_orders" ADD COLUMN     "businessPhoneId" TEXT,
ADD COLUMN     "email" TEXT;

-- DropTable
DROP TABLE "ClientTempOrderLine";

-- DropTable
DROP TABLE "_BusinessProductToClientTempOrderLine";

-- CreateTable
CREATE TABLE "client_temp_order_lines" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceAtTimeOfOrder" DOUBLE PRECISION NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "client_temp_order_lines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "client_temp_order_lines_orderId_idx" ON "client_temp_order_lines"("orderId");

-- CreateIndex
CREATE INDEX "client_temp_order_lines_productId_idx" ON "client_temp_order_lines"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "client_temp_orders_businessPhoneId_key" ON "client_temp_orders"("businessPhoneId");

-- AddForeignKey
ALTER TABLE "client_temp_order_lines" ADD CONSTRAINT "client_temp_order_lines_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "client_temp_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_temp_order_lines" ADD CONSTRAINT "client_temp_order_lines_productId_fkey" FOREIGN KEY ("productId") REFERENCES "business_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_temp_orders" ADD CONSTRAINT "client_temp_orders_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_temp_orders" ADD CONSTRAINT "client_temp_orders_businessPhoneId_fkey" FOREIGN KEY ("businessPhoneId") REFERENCES "business_phones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

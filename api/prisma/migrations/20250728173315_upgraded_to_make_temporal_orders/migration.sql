/*
  Warnings:

  - You are about to drop the column `productId` on the `ClientTempOrderLine` table. All the data in the column will be lost.
  - You are about to drop the `business_phone_ids` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `business_supplier_pictures` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `business_products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `business_supplier_information` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ClientTempOrderLine" DROP CONSTRAINT "ClientTempOrderLine_productId_fkey";

-- DropForeignKey
ALTER TABLE "business_phone_ids" DROP CONSTRAINT "business_phone_ids_businessId_fkey";

-- DropForeignKey
ALTER TABLE "business_phone_ids" DROP CONSTRAINT "business_phone_ids_clientTempOrderId_fkey";

-- DropForeignKey
ALTER TABLE "business_supplier_pictures" DROP CONSTRAINT "business_supplier_pictures_businessId_fkey";

-- DropForeignKey
ALTER TABLE "business_supplier_pictures" DROP CONSTRAINT "business_supplier_pictures_supplierId_fkey";

-- DropIndex
DROP INDEX "ClientTempOrderLine_productId_idx";

-- AlterTable
ALTER TABLE "ClientTempOrderLine" DROP COLUMN "productId",
ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "business_products" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "business_supplier_information" ADD COLUMN     "imageId" TEXT;

-- DropTable
DROP TABLE "business_phone_ids";

-- DropTable
DROP TABLE "business_supplier_pictures";

-- CreateTable
CREATE TABLE "business_phones" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coordinate_x" DECIMAL(65,30) NOT NULL,
    "coordinate_y" DECIMAL(65,30) NOT NULL,
    "isCalling" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "businessId" TEXT NOT NULL,
    "clientTempOrderId" TEXT,

    CONSTRAINT "business_phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_image" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BusinessProductToClientTempOrderLine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BusinessProductToClientTempOrderLine_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_phones_clientTempOrderId_key" ON "business_phones"("clientTempOrderId");

-- CreateIndex
CREATE INDEX "business_phones_businessId_idx" ON "business_phones"("businessId");

-- CreateIndex
CREATE INDEX "business_phones_isCalling_idx" ON "business_phones"("isCalling");

-- CreateIndex
CREATE UNIQUE INDEX "business_image_url_key" ON "business_image"("url");

-- CreateIndex
CREATE INDEX "business_image_businessId_idx" ON "business_image"("businessId");

-- CreateIndex
CREATE INDEX "_BusinessProductToClientTempOrderLine_B_index" ON "_BusinessProductToClientTempOrderLine"("B");

-- CreateIndex
CREATE UNIQUE INDEX "business_products_imageId_key" ON "business_products"("imageId");

-- CreateIndex
CREATE INDEX "business_products_imageId_idx" ON "business_products"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "business_supplier_information_imageId_key" ON "business_supplier_information"("imageId");

-- CreateIndex
CREATE INDEX "business_supplier_information_imageId_idx" ON "business_supplier_information"("imageId");

-- AddForeignKey
ALTER TABLE "business_phones" ADD CONSTRAINT "business_phones_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_phones" ADD CONSTRAINT "business_phones_clientTempOrderId_fkey" FOREIGN KEY ("clientTempOrderId") REFERENCES "client_temp_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_supplier_information" ADD CONSTRAINT "business_supplier_information_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "business_image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products" ADD CONSTRAINT "business_products_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "business_image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_image" ADD CONSTRAINT "business_image_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessProductToClientTempOrderLine" ADD CONSTRAINT "_BusinessProductToClientTempOrderLine_A_fkey" FOREIGN KEY ("A") REFERENCES "business_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessProductToClientTempOrderLine" ADD CONSTRAINT "_BusinessProductToClientTempOrderLine_B_fkey" FOREIGN KEY ("B") REFERENCES "ClientTempOrderLine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

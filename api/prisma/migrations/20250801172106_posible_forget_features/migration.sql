/*
  Warnings:

  - You are about to drop the column `businessPhoneId` on the `client_temp_orders` table. All the data in the column will be lost.
  - You are about to drop the `business_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `business_phones` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[businessOrderUbicationId]` on the table `client_temp_orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TypeBusinessOrderUbication" AS ENUM ('PHONE', 'STATIC');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('WEBP', 'PDF');

-- DropForeignKey
ALTER TABLE "business_image" DROP CONSTRAINT "business_image_businessId_fkey";

-- DropForeignKey
ALTER TABLE "business_phones" DROP CONSTRAINT "business_phones_businessId_fkey";

-- DropForeignKey
ALTER TABLE "business_products" DROP CONSTRAINT "business_products_imageId_fkey";

-- DropForeignKey
ALTER TABLE "business_supplier_information" DROP CONSTRAINT "business_supplier_information_imageId_fkey";

-- DropForeignKey
ALTER TABLE "client_temp_orders" DROP CONSTRAINT "client_temp_orders_businessPhoneId_fkey";

-- DropIndex
DROP INDEX "client_temp_orders_businessPhoneId_key";

-- AlterTable
ALTER TABLE "business_configurations" ALTER COLUMN "timeZone" SET DEFAULT 'EUROPE_MADRID';

-- AlterTable
ALTER TABLE "client_temp_orders" DROP COLUMN "businessPhoneId",
ADD COLUMN     "businessOrderUbicationId" TEXT;

-- DropTable
DROP TABLE "business_image";

-- DropTable
DROP TABLE "business_phones";

-- CreateTable
CREATE TABLE "business_order_ubications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position_x" DECIMAL(65,30) NOT NULL,
    "position_y" DECIMAL(65,30) NOT NULL,
    "isCalling" BOOLEAN NOT NULL DEFAULT false,
    "type" "TypeBusinessOrderUbication" NOT NULL DEFAULT 'PHONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "businessId" TEXT NOT NULL,
    "clientTempOrderId" TEXT,

    CONSTRAINT "business_order_ubications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_file" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "fileType" "FileType" NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_file_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_order_ubications_clientTempOrderId_key" ON "business_order_ubications"("clientTempOrderId");

-- CreateIndex
CREATE INDEX "business_order_ubications_businessId_idx" ON "business_order_ubications"("businessId");

-- CreateIndex
CREATE INDEX "business_order_ubications_isCalling_idx" ON "business_order_ubications"("isCalling");

-- CreateIndex
CREATE UNIQUE INDEX "business_file_url_key" ON "business_file"("url");

-- CreateIndex
CREATE INDEX "business_file_businessId_idx" ON "business_file"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "client_temp_orders_businessOrderUbicationId_key" ON "client_temp_orders"("businessOrderUbicationId");

-- AddForeignKey
ALTER TABLE "client_temp_orders" ADD CONSTRAINT "client_temp_orders_businessOrderUbicationId_fkey" FOREIGN KEY ("businessOrderUbicationId") REFERENCES "business_order_ubications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_order_ubications" ADD CONSTRAINT "business_order_ubications_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_supplier_information" ADD CONSTRAINT "business_supplier_information_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "business_file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products" ADD CONSTRAINT "business_products_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "business_file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_file" ADD CONSTRAINT "business_file_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

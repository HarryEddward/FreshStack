-- CreateEnum
CREATE TYPE "ProviderPaymentGateway" AS ENUM ('STRIPE', 'SUMUP');

-- CreateTable
CREATE TABLE "business_client_payment" (
    "id" TEXT NOT NULL,
    "provider" "ProviderPaymentGateway" NOT NULL,
    "public_key" TEXT NOT NULL,
    "secret_key" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "business_client_payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "business_client_payment_businessId_idx" ON "business_client_payment"("businessId");

-- AddForeignKey
ALTER TABLE "business_client_payment" ADD CONSTRAINT "business_client_payment_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

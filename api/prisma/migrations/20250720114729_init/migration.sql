-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('MONTHLY', 'LIFETIME');

-- CreateEnum
CREATE TYPE "LicensePlan" AS ENUM ('STANDARD', 'PREMIUM', 'ENTERPRISE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "LicenseStatus" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('SUCCESSFUL', 'FAILED', 'PENDING');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('DEBIT_CARD', 'CREDIT_CARD', 'CASH', 'OTHER');

-- CreateEnum
CREATE TYPE "PriceAdjustmentType" AS ENUM ('INCREASE', 'DECREASE');

-- CreateEnum
CREATE TYPE "EmployeeType" AS ENUM ('ALL', 'WAITER', 'CHEF');

-- CreateEnum
CREATE TYPE "CESTTimeZone" AS ENUM ('EUROPE_AMSTERDAM', 'EUROPE_ANDORRA', 'EUROPE_BELGRADE', 'EUROPE_BERLIN', 'EUROPE_BRATISLAVA', 'EUROPE_BRUSSELS', 'EUROPE_BUDAPEST', 'EUROPE_COPENHAGEN', 'EUROPE_GIBRALTAR', 'EUROPE_LISBON', 'EUROPE_LJUBLJANA', 'EUROPE_LUXEMBOURG', 'EUROPE_MADRID', 'EUROPE_MALTA', 'EUROPE_MONACO', 'EUROPE_OSLO', 'EUROPE_PARIS', 'EUROPE_PODGORICA', 'EUROPE_PRAGUE', 'EUROPE_ROME', 'EUROPE_SAN_MARINO', 'EUROPE_SARAJEVO', 'EUROPE_SKOPJE', 'EUROPE_STOCKHOLM', 'EUROPE_TIRANE', 'EUROPE_VADUZ', 'EUROPE_VIENNA', 'EUROPE_WARSAW', 'EUROPE_ZAGREB', 'EUROPE_ZURICH', 'AFRICA_CEUTA', 'AFRICA_TUNIS', 'ARCTIC_LONGYEARBYEN');

-- CreateTable
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "registeredAddress" TEXT NOT NULL,
    "countryOfIncorporation" TEXT NOT NULL,
    "legalForm" TEXT NOT NULL,
    "legalRepresentative" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_daily_cash_balances" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "balanceDate" DATE NOT NULL,
    "expectedCashAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expectedCardAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expectedOtherAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalExpectedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "countedCashAmount" DOUBLE PRECISION NOT NULL,
    "countedCardAmount" DOUBLE PRECISION NOT NULL,
    "countedOtherAmount" DOUBLE PRECISION NOT NULL,
    "totalCountedAmount" DOUBLE PRECISION NOT NULL,
    "varianceCash" DOUBLE PRECISION NOT NULL,
    "varianceCard" DOUBLE PRECISION NOT NULL,
    "varianceOther" DOUBLE PRECISION NOT NULL,
    "totalVariance" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "isBalanced" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_daily_cash_balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_supporting_documents" (
    "id" TEXT NOT NULL,
    "serviceContract" BOOLEAN,
    "issuedInvoice" BOOLEAN,
    "thirdPartyPaymentAgreement" BOOLEAN,
    "ultimateBeneficialOwnerCertificate" BOOLEAN,
    "businessLicense" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_supporting_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_supporting_documents_attached" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_supporting_documents_attached_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_commercial_relationships" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "signedContract" BOOLEAN,
    "thirdPartyPaymentPermission" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_commercial_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_commercial_relationship_documents_attached" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "commercialRelationshipId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_commercial_relationship_documents_attached_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_compliance" (
    "id" TEXT NOT NULL,
    "kycVerified" BOOLEAN,
    "amlApproved" BOOLEAN,
    "taxWithholdingApplicable" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_compliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_configurations" (
    "id" TEXT NOT NULL,
    "wifi" JSONB,
    "schedule" JSONB,
    "timeZone" "CESTTimeZone" NOT NULL,
    "functionsActivated" JSONB,
    "apiKey" JSONB,
    "affiliate" BOOLEAN DEFAULT false,
    "maxPhonesDevices" INTEGER DEFAULT 30,
    "displayUsername" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_bank_information" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "ibanOrAccountNumber" TEXT NOT NULL,
    "swiftBic" TEXT,
    "accountHolderName" TEXT NOT NULL,
    "bankAddress" TEXT,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_bank_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_payment_history_details" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "taxesIncluded" BOOLEAN,
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_payment_history_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_payment_history" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "paymentDetailId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "stripeInvoiceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_payment_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_licenses" (
    "id" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "licenseType" "LicenseType" NOT NULL,
    "plan" "LicensePlan" NOT NULL,
    "status" "LicenseStatus" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "lockinMonths" INTEGER,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_paying_companies" (
    "id" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_paying_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_phone_ids" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coordinate_x" DECIMAL(65,30) NOT NULL,
    "coordinate_y" DECIMAL(65,30) NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_phone_ids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_orders" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "informationNotes" TEXT,
    "tableServed" TEXT,
    "employeeServed" TEXT,
    "refund" BOOLEAN NOT NULL DEFAULT false,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_order_product_lines" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productSnapshot" JSONB NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_order_product_lines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_order_thermal_printers" (
    "orderId" TEXT NOT NULL,
    "printers" TEXT[],
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_order_thermal_printers_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "client_order_tickets" (
    "orderId" TEXT NOT NULL,
    "tickets" JSONB NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_order_tickets_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "client_order_transactions" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "externalTransactionId" TEXT NOT NULL,
    "transactionAmount" DOUBLE PRECISION NOT NULL,
    "transactionCurrencyIso" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "paymentMethod" "PaymentMethod",
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_order_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_supplier_information" (
    "id" TEXT NOT NULL,
    "inUse" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "schedule" JSONB,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_supplier_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_supplier_pictures" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_supplier_pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_menus" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tags" TEXT,
    "nameLastModificationEmployee" TEXT,
    "vip" BOOLEAN NOT NULL DEFAULT false,
    "haveSchedule" BOOLEAN NOT NULL DEFAULT false,
    "schedule" JSONB,
    "businessId" TEXT NOT NULL,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_menu_price_adjustments" (
    "id" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "adjustmentType" "PriceAdjustmentType" NOT NULL,
    "percentageValue" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "appliedAt" TIMESTAMP(3),
    "appliedByEmployeeName" TEXT,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_menu_price_adjustments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_menu_categories" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_menu_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_menu_category_price_adjustments" (
    "id" TEXT NOT NULL,
    "menuCategoryId" TEXT NOT NULL,
    "adjustmentType" "PriceAdjustmentType" NOT NULL,
    "percentageValue" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "appliedAt" TIMESTAMP(3),
    "appliedByEmployeeName" TEXT,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_menu_category_price_adjustments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_product_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_product_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_product_group_price_adjustments" (
    "id" TEXT NOT NULL,
    "productGroupId" TEXT NOT NULL,
    "adjustmentType" "PriceAdjustmentType" NOT NULL,
    "percentageValue" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "appliedAt" TIMESTAMP(3),
    "appliedByEmployeeName" TEXT,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_product_group_price_adjustments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_products" (
    "id" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unityAmount" DOUBLE PRECISION NOT NULL,
    "stockBatches" INTEGER[],
    "expirationDates" TIMESTAMP(3)[],
    "unityConsumeStock" INTEGER NOT NULL,
    "unityConsumePrice" DECIMAL(10,2),
    "typeUnitConsumeMeasurement" TEXT NOT NULL,
    "tags" TEXT,
    "nameLastModificationEmployee" TEXT,
    "preparationDuration" INTEGER,
    "urlImage" TEXT,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productGroupId" TEXT,
    "parentId" TEXT,

    CONSTRAINT "business_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "job" "EmployeeType" NOT NULL,
    "activated" BOOLEAN NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_employees_clock_records" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "recordTime" TIMESTAMP(3) NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_employees_clock_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_general_sales_reports_ai" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_general_sales_reports_ai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_general_warehouse_reports_ai" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_general_warehouse_reports_ai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_warehouse_replenishment_reports_ai" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_warehouse_replenishment_reports_ai_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "businesses_taxId_key" ON "businesses"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_email_key" ON "businesses"("email");

-- CreateIndex
CREATE INDEX "User_businessId_idx" ON "User"("businessId");

-- CreateIndex
CREATE INDEX "business_daily_cash_balances_businessId_idx" ON "business_daily_cash_balances"("businessId");

-- CreateIndex
CREATE INDEX "business_daily_cash_balances_employeeId_idx" ON "business_daily_cash_balances"("employeeId");

-- CreateIndex
CREATE INDEX "business_daily_cash_balances_balanceDate_idx" ON "business_daily_cash_balances"("balanceDate");

-- CreateIndex
CREATE UNIQUE INDEX "business_daily_cash_balances_businessId_balanceDate_key" ON "business_daily_cash_balances"("businessId", "balanceDate");

-- CreateIndex
CREATE INDEX "business_supporting_documents_attached_businessId_idx" ON "business_supporting_documents_attached"("businessId");

-- CreateIndex
CREATE INDEX "business_commercial_relationship_documents_attached_commerc_idx" ON "business_commercial_relationship_documents_attached"("commercialRelationshipId");

-- CreateIndex
CREATE INDEX "business_payment_history_details_businessId_idx" ON "business_payment_history_details"("businessId");

-- CreateIndex
CREATE INDEX "business_payment_history_businessId_idx" ON "business_payment_history"("businessId");

-- CreateIndex
CREATE INDEX "business_payment_history_paymentDetailId_idx" ON "business_payment_history"("paymentDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "business_payment_history_unique_idx" ON "business_payment_history"("businessId", "paymentDetailId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "business_licenses_stripeSubscriptionId_key" ON "business_licenses"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "business_licenses_stripePaymentIntentId_key" ON "business_licenses"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "business_licenses_businessId_idx" ON "business_licenses"("businessId");

-- CreateIndex
CREATE INDEX "business_licenses_stripeSubscriptionId_idx" ON "business_licenses"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "business_licenses_stripePaymentIntentId_idx" ON "business_licenses"("stripePaymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "business_paying_companies_taxId_key" ON "business_paying_companies"("taxId");

-- CreateIndex
CREATE INDEX "business_phone_ids_businessId_idx" ON "business_phone_ids"("businessId");

-- CreateIndex
CREATE INDEX "client_orders_businessId_idx" ON "client_orders"("businessId");

-- CreateIndex
CREATE INDEX "client_orders_status_idx" ON "client_orders"("status");

-- CreateIndex
CREATE INDEX "client_order_product_lines_orderId_idx" ON "client_order_product_lines"("orderId");

-- CreateIndex
CREATE INDEX "client_order_product_lines_businessId_idx" ON "client_order_product_lines"("businessId");

-- CreateIndex
CREATE INDEX "client_order_thermal_printers_businessId_idx" ON "client_order_thermal_printers"("businessId");

-- CreateIndex
CREATE INDEX "client_order_tickets_businessId_idx" ON "client_order_tickets"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "client_order_transactions_externalTransactionId_key" ON "client_order_transactions"("externalTransactionId");

-- CreateIndex
CREATE INDEX "client_order_transactions_orderId_idx" ON "client_order_transactions"("orderId");

-- CreateIndex
CREATE INDEX "client_order_transactions_businessId_idx" ON "client_order_transactions"("businessId");

-- CreateIndex
CREATE INDEX "client_order_transactions_status_idx" ON "client_order_transactions"("status");

-- CreateIndex
CREATE INDEX "business_supplier_information_businessId_idx" ON "business_supplier_information"("businessId");

-- CreateIndex
CREATE INDEX "business_supplier_pictures_supplierId_idx" ON "business_supplier_pictures"("supplierId");

-- CreateIndex
CREATE INDEX "business_supplier_pictures_businessId_idx" ON "business_supplier_pictures"("businessId");

-- CreateIndex
CREATE INDEX "business_menus_businessId_idx" ON "business_menus"("businessId");

-- CreateIndex
CREATE INDEX "business_menus_categoryId_idx" ON "business_menus"("categoryId");

-- CreateIndex
CREATE INDEX "business_menu_price_adjustments_menuId_idx" ON "business_menu_price_adjustments"("menuId");

-- CreateIndex
CREATE INDEX "business_menu_price_adjustments_businessId_idx" ON "business_menu_price_adjustments"("businessId");

-- CreateIndex
CREATE INDEX "business_menu_categories_businessId_idx" ON "business_menu_categories"("businessId");

-- CreateIndex
CREATE INDEX "business_menu_category_price_adjustments_menuCategoryId_idx" ON "business_menu_category_price_adjustments"("menuCategoryId");

-- CreateIndex
CREATE INDEX "business_menu_category_price_adjustments_businessId_idx" ON "business_menu_category_price_adjustments"("businessId");

-- CreateIndex
CREATE INDEX "business_product_groups_businessId_idx" ON "business_product_groups"("businessId");

-- CreateIndex
CREATE INDEX "business_product_group_price_adjustments_productGroupId_idx" ON "business_product_group_price_adjustments"("productGroupId");

-- CreateIndex
CREATE INDEX "business_product_group_price_adjustments_businessId_idx" ON "business_product_group_price_adjustments"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "business_products_urlImage_key" ON "business_products"("urlImage");

-- CreateIndex
CREATE INDEX "business_products_menuId_idx" ON "business_products"("menuId");

-- CreateIndex
CREATE INDEX "business_products_businessId_idx" ON "business_products"("businessId");

-- CreateIndex
CREATE INDEX "business_products_name_idx" ON "business_products"("name");

-- CreateIndex
CREATE INDEX "business_products_productGroupId_idx" ON "business_products"("productGroupId");

-- CreateIndex
CREATE INDEX "business_employees_businessId_idx" ON "business_employees"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "business_employees_businessId_name_key" ON "business_employees"("businessId", "name");

-- CreateIndex
CREATE INDEX "business_employees_clock_records_employeeId_idx" ON "business_employees_clock_records"("employeeId");

-- CreateIndex
CREATE INDEX "business_employees_clock_records_businessId_idx" ON "business_employees_clock_records"("businessId");

-- CreateIndex
CREATE INDEX "business_employees_clock_records_recordTime_idx" ON "business_employees_clock_records"("recordTime");

-- CreateIndex
CREATE UNIQUE INDEX "business_general_sales_reports_ai_url_key" ON "business_general_sales_reports_ai"("url");

-- CreateIndex
CREATE INDEX "business_general_sales_reports_ai_businessId_idx" ON "business_general_sales_reports_ai"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "business_general_warehouse_reports_ai_url_key" ON "business_general_warehouse_reports_ai"("url");

-- CreateIndex
CREATE INDEX "business_general_warehouse_reports_ai_businessId_idx" ON "business_general_warehouse_reports_ai"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "business_warehouse_replenishment_reports_ai_url_key" ON "business_warehouse_replenishment_reports_ai"("url");

-- CreateIndex
CREATE INDEX "business_warehouse_replenishment_reports_ai_businessId_idx" ON "business_warehouse_replenishment_reports_ai"("businessId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_daily_cash_balances" ADD CONSTRAINT "business_daily_cash_balances_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_daily_cash_balances" ADD CONSTRAINT "business_daily_cash_balances_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "business_employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_supporting_documents" ADD CONSTRAINT "business_supporting_documents_id_fkey" FOREIGN KEY ("id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_supporting_documents_attached" ADD CONSTRAINT "business_supporting_documents_attached_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_commercial_relationships" ADD CONSTRAINT "business_commercial_relationships_id_fkey" FOREIGN KEY ("id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_commercial_relationship_documents_attached" ADD CONSTRAINT "business_commercial_relationship_documents_attached_commer_fkey" FOREIGN KEY ("commercialRelationshipId") REFERENCES "business_commercial_relationships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_compliance" ADD CONSTRAINT "business_compliance_id_fkey" FOREIGN KEY ("id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_configurations" ADD CONSTRAINT "business_configurations_id_fkey" FOREIGN KEY ("id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_bank_information" ADD CONSTRAINT "business_bank_information_id_fkey" FOREIGN KEY ("id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_payment_history_details" ADD CONSTRAINT "business_payment_history_details_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_payment_history" ADD CONSTRAINT "business_payment_history_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_payment_history" ADD CONSTRAINT "business_payment_history_paymentDetailId_fkey" FOREIGN KEY ("paymentDetailId") REFERENCES "business_payment_history_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_licenses" ADD CONSTRAINT "business_licenses_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_paying_companies" ADD CONSTRAINT "business_paying_companies_id_fkey" FOREIGN KEY ("id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_phone_ids" ADD CONSTRAINT "business_phone_ids_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_orders" ADD CONSTRAINT "client_orders_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_order_product_lines" ADD CONSTRAINT "client_order_product_lines_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "client_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_order_product_lines" ADD CONSTRAINT "client_order_product_lines_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_order_thermal_printers" ADD CONSTRAINT "client_order_thermal_printers_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "client_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_order_thermal_printers" ADD CONSTRAINT "client_order_thermal_printers_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_order_tickets" ADD CONSTRAINT "client_order_tickets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "client_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_order_tickets" ADD CONSTRAINT "client_order_tickets_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_order_transactions" ADD CONSTRAINT "client_order_transactions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "client_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_order_transactions" ADD CONSTRAINT "client_order_transactions_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_supplier_information" ADD CONSTRAINT "business_supplier_information_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_supplier_pictures" ADD CONSTRAINT "business_supplier_pictures_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "business_supplier_information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_supplier_pictures" ADD CONSTRAINT "business_supplier_pictures_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_menus" ADD CONSTRAINT "business_menus_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_menus" ADD CONSTRAINT "business_menus_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "business_menu_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_menu_price_adjustments" ADD CONSTRAINT "business_menu_price_adjustments_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "business_menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_menu_price_adjustments" ADD CONSTRAINT "business_menu_price_adjustments_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_menu_categories" ADD CONSTRAINT "business_menu_categories_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_menu_category_price_adjustments" ADD CONSTRAINT "business_menu_category_price_adjustments_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "business_menu_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_menu_category_price_adjustments" ADD CONSTRAINT "business_menu_category_price_adjustments_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_product_groups" ADD CONSTRAINT "business_product_groups_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_product_group_price_adjustments" ADD CONSTRAINT "business_product_group_price_adjustments_productGroupId_fkey" FOREIGN KEY ("productGroupId") REFERENCES "business_product_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_product_group_price_adjustments" ADD CONSTRAINT "business_product_group_price_adjustments_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products" ADD CONSTRAINT "business_products_productGroupId_fkey" FOREIGN KEY ("productGroupId") REFERENCES "business_product_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products" ADD CONSTRAINT "business_products_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "business_menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products" ADD CONSTRAINT "business_products_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_products" ADD CONSTRAINT "business_products_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "business_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_employees" ADD CONSTRAINT "business_employees_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_employees_clock_records" ADD CONSTRAINT "business_employees_clock_records_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "business_employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_employees_clock_records" ADD CONSTRAINT "business_employees_clock_records_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_general_sales_reports_ai" ADD CONSTRAINT "business_general_sales_reports_ai_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_general_warehouse_reports_ai" ADD CONSTRAINT "business_general_warehouse_reports_ai_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_warehouse_replenishment_reports_ai" ADD CONSTRAINT "business_warehouse_replenishment_reports_ai_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

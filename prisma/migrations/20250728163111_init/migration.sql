-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('CTA', 'AEROTHERME', 'THERMOSTAT', 'POMPE', 'VENTILATEUR', 'ECHANGEUR', 'FILTRE', 'RESEAU_AERAULIQUE', 'RESEAU_HYDRAULIQUE', 'AUTRE');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'VALIDATED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'PASSED', 'FAILED', 'REQUIRES_ATTENTION');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'PLANNED', 'ON_HOLD', 'ARCHIVED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "address" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'ACTIVE',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "reportNumber" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weatherConditions" TEXT,
    "ambientTemp" DOUBLE PRECISION,
    "notes" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EquipmentType" NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "serialNumber" TEXT,
    "location" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment_tests" (
    "id" TEXT NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "testType" TEXT NOT NULL,
    "results" JSONB NOT NULL,
    "comments" TEXT,
    "status" "TestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "equipment_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "template" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technical_references" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "technical_references_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reports_reportNumber_key" ON "reports"("reportNumber");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_tests" ADD CONSTRAINT "equipment_tests_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_tests" ADD CONSTRAINT "equipment_tests_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

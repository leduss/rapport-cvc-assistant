/*
  Warnings:

  - Added the required column `priority` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "priority" "ProjectPriority" NOT NULL;

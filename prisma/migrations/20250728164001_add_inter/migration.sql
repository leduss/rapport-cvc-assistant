/*
  Warnings:

  - Added the required column `nextIntervention` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportsCount` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "nextIntervention" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reportsCount" INTEGER NOT NULL;

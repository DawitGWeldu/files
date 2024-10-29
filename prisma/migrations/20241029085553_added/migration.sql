/*
  Warnings:

  - You are about to drop the column `idImage` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `idNumber` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `idType` on the `Worker` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Worker_idNumber_key";

-- DropIndex
DROP INDEX "Worker_idType_key";

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "idImage",
DROP COLUMN "idNumber",
DROP COLUMN "idType",
ADD COLUMN     "departureStatus" BOOLEAN NOT NULL DEFAULT false;

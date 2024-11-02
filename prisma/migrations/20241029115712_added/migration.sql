/*
  Warnings:

  - You are about to drop the `Countries` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "arabId" TEXT;

-- DropTable
DROP TABLE "Countries";

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arab" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Arab_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_arabId_fkey" FOREIGN KEY ("arabId") REFERENCES "Arab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

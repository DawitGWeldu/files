-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "country" TEXT;

-- CreateTable
CREATE TABLE "Countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

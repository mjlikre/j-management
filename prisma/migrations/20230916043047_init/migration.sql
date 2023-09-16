/*
  Warnings:

  - Added the required column `debtAmount` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `debtPaymentAmount` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "debtAmount" INTEGER NOT NULL,
ADD COLUMN     "debtPaymentAmount" INTEGER NOT NULL;

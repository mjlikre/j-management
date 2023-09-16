/*
  Warnings:

  - Made the column `workerId` on table `DebtPayment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workerId` on table `Salary` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DebtPayment" DROP CONSTRAINT "DebtPayment_workerId_fkey";

-- DropForeignKey
ALTER TABLE "Salary" DROP CONSTRAINT "Salary_workerId_fkey";

-- AlterTable
ALTER TABLE "DebtPayment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "workerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Salary" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "workerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebtPayment" ADD CONSTRAINT "DebtPayment_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

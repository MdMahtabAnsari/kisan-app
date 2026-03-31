/*
  Warnings:

  - You are about to drop the column `txnId` on the `Recharge` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Recharge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Recharge` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Recharge_txnId_key";

-- AlterTable
ALTER TABLE "Recharge" DROP COLUMN "txnId",
ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recharge_orderId_key" ON "Recharge"("orderId");

/*
  Warnings:

  - You are about to drop the column `subscription_status` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "subscription_status",
ADD COLUMN     "subscriptionStatus" TEXT;

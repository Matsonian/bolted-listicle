/*
  Warnings:

  - You are about to drop the column `stripe_customer_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "stripe_customer_id",
ADD COLUMN     "stripeCustomerId" TEXT;

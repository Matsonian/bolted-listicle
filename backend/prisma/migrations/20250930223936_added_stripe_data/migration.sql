/*
  Warnings:

  - The `tier` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."Tier" AS ENUM ('FREE', 'PAID');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "stripe_customer_id" TEXT,
ADD COLUMN     "subscription_status" TEXT,
DROP COLUMN "tier",
ADD COLUMN     "tier" "public"."Tier" NOT NULL DEFAULT 'FREE';

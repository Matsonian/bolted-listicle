-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "businessDescription" TEXT,
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "dailySearchesUsed" INTEGER,
ADD COLUMN     "tier" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "yearOfFounding" INTEGER;

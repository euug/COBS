/*
  Warnings:

  - The primary key for the `Program` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `programType` on the `Program` table. All the data in the column will be lost.
  - You are about to alter the column `minAge` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `maxAge` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `glCode` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `session` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - Added the required column `programTypeId` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" DROP CONSTRAINT "Program_pkey",
DROP COLUMN "programType",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "programTypeId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(2047),
ALTER COLUMN "minAge" SET DATA TYPE SMALLINT,
ALTER COLUMN "maxAge" SET DATA TYPE SMALLINT,
ALTER COLUMN "glCode" SET DATA TYPE SMALLINT,
ALTER COLUMN "session" SET DATA TYPE SMALLINT[],
ADD CONSTRAINT "Program_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Program_id_seq";

-- CreateTable
CREATE TABLE "ProgramType" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) DEFAULT 'program_type.jpg',
    "description" VARCHAR(2047),
    "ageRange" VARCHAR(31) NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "publicAllowed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "gender" VARCHAR(15) NOT NULL DEFAULT 'other',
    "phonePrimary" VARCHAR(15) NOT NULL,
    "phoneOther" VARCHAR(15) NOT NULL,
    "emergencyName" VARCHAR(255) NOT NULL,
    "emergencyPhone" VARCHAR(15) NOT NULL,
    "pictureUse" BOOLEAN NOT NULL,
    "legalAgreement" VARCHAR(255) NOT NULL,
    "isLeague" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "clubCredit" DOUBLE PRECISION NOT NULL,
    "primaryUserId" TEXT,
    "allergiesMedications" TEXT,
    "conditionsDisabilities" TEXT,
    "clubUserTypeId" TEXT NOT NULL,
    "favouritedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubUserType" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(63) NOT NULL,
    "subtype" VARCHAR(63) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubUserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "preAddr" VARCHAR(255) NOT NULL,
    "streetAddr" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "province" VARCHAR(255) NOT NULL,
    "postalCode" VARCHAR(15) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Court" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "isIndoor" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Court_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingType" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(63) NOT NULL,
    "subtype" VARCHAR(63) NOT NULL,
    "color" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "duration" SMALLINT NOT NULL,
    "checkRules" BOOLEAN NOT NULL,
    "bookingTypeId" TEXT NOT NULL,
    "courtId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(64) NOT NULL,
    "isPst" BOOLEAN NOT NULL,
    "isGst" BOOLEAN NOT NULL,
    "gstAmount" DOUBLE PRECISION NOT NULL,
    "pstAmount" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "dueDatetime" TIMESTAMP(3) NOT NULL,
    "serviceDatetime" TIMESTAMP(3) NOT NULL,
    "clubUserId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "feeTypeId" TEXT NOT NULL,
    "glCodeId" TEXT NOT NULL,
    "paidDatetime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeeType" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "subtype" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlCode" (
    "id" TEXT NOT NULL,
    "number" SMALLINT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookingToClubUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ClubUser_username_key" ON "ClubUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ClubUser_email_key" ON "ClubUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingType_type_subtype_key" ON "BookingType"("type", "subtype");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_name_key" ON "PaymentMethod"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FeeType_type_subtype_key" ON "FeeType"("type", "subtype");

-- CreateIndex
CREATE UNIQUE INDEX "GlCode_number_key" ON "GlCode"("number");

-- CreateIndex
CREATE UNIQUE INDEX "_BookingToClubUser_AB_unique" ON "_BookingToClubUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingToClubUser_B_index" ON "_BookingToClubUser"("B");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_programTypeId_fkey" FOREIGN KEY ("programTypeId") REFERENCES "ProgramType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubUser" ADD CONSTRAINT "ClubUser_primaryUserId_fkey" FOREIGN KEY ("primaryUserId") REFERENCES "ClubUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubUser" ADD CONSTRAINT "ClubUser_clubUserTypeId_fkey" FOREIGN KEY ("clubUserTypeId") REFERENCES "ClubUserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubUser" ADD CONSTRAINT "ClubUser_favouritedById_fkey" FOREIGN KEY ("favouritedById") REFERENCES "ClubUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ClubUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookingTypeId_fkey" FOREIGN KEY ("bookingTypeId") REFERENCES "BookingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_clubUserId_fkey" FOREIGN KEY ("clubUserId") REFERENCES "ClubUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_feeTypeId_fkey" FOREIGN KEY ("feeTypeId") REFERENCES "FeeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_glCodeId_fkey" FOREIGN KEY ("glCodeId") REFERENCES "GlCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToClubUser" ADD CONSTRAINT "_BookingToClubUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToClubUser" ADD CONSTRAINT "_BookingToClubUser_B_fkey" FOREIGN KEY ("B") REFERENCES "ClubUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

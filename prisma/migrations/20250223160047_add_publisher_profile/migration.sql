-- CreateTable
CREATE TABLE "publisher_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "workPhone" TEXT NOT NULL,
    "cellPhone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "stateProvince" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "socialMediaUrl" TEXT,
    "pressReleaseFrequency" TEXT,
    "productsOfInterest" TEXT[],
    "bestTimeToReach" TEXT,
    "additionalInfo" TEXT,
    "paymentType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publisher_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "publisher_profiles_userId_key" ON "publisher_profiles"("userId");

-- AddForeignKey
ALTER TABLE "publisher_profiles" ADD CONSTRAINT "publisher_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

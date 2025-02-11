-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "publisherRequestId" TEXT;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "role" "Role";

-- AlterTable
ALTER TABLE "publisher_requests" ADD COLUMN     "message" TEXT;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_publisherRequestId_fkey" FOREIGN KEY ("publisherRequestId") REFERENCES "publisher_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

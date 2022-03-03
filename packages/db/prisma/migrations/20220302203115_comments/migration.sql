-- DropForeignKey
ALTER TABLE "pm_doc_snapshot" DROP CONSTRAINT "pm_doc_snapshot_doc_id_fkey";

-- AlterTable
ALTER TABLE "pm_doc_snapshot" ADD COLUMN     "name" VARCHAR(500) NOT NULL DEFAULT E'';

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "change_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "doc_id" TEXT NOT NULL,
    "snapshot_id" TEXT,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pm_doc_snapshot" ADD CONSTRAINT "pm_doc_snapshot_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "pm_doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "quarterback_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "pm_doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_snapshot_id_fkey" FOREIGN KEY ("snapshot_id") REFERENCES "pm_doc_snapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

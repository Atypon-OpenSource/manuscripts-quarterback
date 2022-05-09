-- CreateEnum
CREATE TYPE "DocStatus" AS ENUM ('EDITABLE', 'WAITING_REVIEW', 'IN_REVIEW', 'READ_ONLY');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "pm_doc" ADD COLUMN     "status" "DocStatus" NOT NULL DEFAULT E'EDITABLE';

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(500) NOT NULL DEFAULT E'',
    "status" "ReviewStatus" NOT NULL DEFAULT E'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "changes" TEXT[],
    "doc_id" TEXT NOT NULL,
    "before_snapshot_id" TEXT NOT NULL,
    "after_snapshot_id" TEXT,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "review_before_snapshot_id_unique" ON "review"("before_snapshot_id");

-- CreateIndex
CREATE UNIQUE INDEX "review_after_snapshot_id_unique" ON "review"("after_snapshot_id");

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "quarterback_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "pm_doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_before_snapshot_id_fkey" FOREIGN KEY ("before_snapshot_id") REFERENCES "pm_doc_snapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_after_snapshot_id_fkey" FOREIGN KEY ("after_snapshot_id") REFERENCES "pm_doc_snapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

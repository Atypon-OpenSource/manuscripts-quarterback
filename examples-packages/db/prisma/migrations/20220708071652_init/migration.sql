-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "DocStatus" AS ENUM ('EDITABLE', 'WAITING_REVIEW', 'IN_REVIEW', 'READ_ONLY');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "quarterback_user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "quarterback_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pm_doc" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(500) NOT NULL,
    "doc" JSONB NOT NULL,
    "status" "DocStatus" NOT NULL DEFAULT 'EDITABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "pm_doc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pm_doc_snapshot" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(500) NOT NULL DEFAULT '',
    "snapshot" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doc_id" TEXT NOT NULL,

    CONSTRAINT "pm_doc_snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "target_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "doc_id" TEXT NOT NULL,
    "snapshot_id" TEXT,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(500) NOT NULL DEFAULT '',
    "status" "ReviewStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "changes" TEXT[],
    "doc_id" TEXT NOT NULL,
    "before_snapshot_id" TEXT NOT NULL,
    "after_snapshot_id" TEXT,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quarterback_user_email_key" ON "quarterback_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "review_before_snapshot_id_key" ON "review"("before_snapshot_id");

-- CreateIndex
CREATE UNIQUE INDEX "review_after_snapshot_id_key" ON "review"("after_snapshot_id");

-- AddForeignKey
ALTER TABLE "pm_doc" ADD CONSTRAINT "pm_doc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "quarterback_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pm_doc_snapshot" ADD CONSTRAINT "pm_doc_snapshot_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "pm_doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "quarterback_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "pm_doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_snapshot_id_fkey" FOREIGN KEY ("snapshot_id") REFERENCES "pm_doc_snapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "quarterback_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "pm_doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_before_snapshot_id_fkey" FOREIGN KEY ("before_snapshot_id") REFERENCES "pm_doc_snapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_after_snapshot_id_fkey" FOREIGN KEY ("after_snapshot_id") REFERENCES "pm_doc_snapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

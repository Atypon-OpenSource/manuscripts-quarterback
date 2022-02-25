-- CreateTable
CREATE TABLE "pm_doc_snapshot" (
    "id" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doc_id" TEXT NOT NULL,

    CONSTRAINT "pm_doc_snapshot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pm_doc_snapshot" ADD CONSTRAINT "pm_doc_snapshot_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "pm_doc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

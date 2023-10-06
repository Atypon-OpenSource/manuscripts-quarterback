-- AlterTable
ALTER TABLE "manuscript_doc" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "manuscript_doc_history" (
    "doc_id" TEXT NOT NULL,
    "client_ids" BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    "steps" JSONB[] DEFAULT ARRAY[]::JSONB[]
);

-- CreateIndex
CREATE UNIQUE INDEX "manuscript_doc_history_doc_id_key" ON "manuscript_doc_history"("doc_id");

-- AddForeignKey
ALTER TABLE "manuscript_doc_history" ADD CONSTRAINT "manuscript_doc_history_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "manuscript_doc"("manuscript_model_id") ON DELETE CASCADE ON UPDATE CASCADE;

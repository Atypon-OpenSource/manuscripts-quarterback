-- CreateTable
CREATE TABLE "manuscript_doc_history" (
    "doc_id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "client_id" TEXT,
    "steps" JSONB[],

    CONSTRAINT "manuscript_doc_history_pkey" PRIMARY KEY ("doc_id","version")
);

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "quarterback_user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'USER',

    CONSTRAINT "quarterback_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pm_doc" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(500) NOT NULL,
    "doc" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "pm_doc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quarterback_user_email_key" ON "quarterback_user"("email");

-- AddForeignKey
ALTER TABLE "pm_doc" ADD CONSTRAINT "pm_doc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "quarterback_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

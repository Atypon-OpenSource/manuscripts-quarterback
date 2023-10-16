/*
  Warnings:

  - Added the required column `version` to the `manuscript_doc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "manuscript_doc" ADD COLUMN     "version" INTEGER NOT NULL;

/*
  Warnings:

  - Added the required column `title` to the `avaliacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "avaliacoes" ADD COLUMN     "title" TEXT NOT NULL;

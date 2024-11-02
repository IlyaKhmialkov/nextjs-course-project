/*
  Warnings:

  - Added the required column `description` to the `ExersiseMachine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExersiseMachine" ADD COLUMN     "description" TEXT NOT NULL;

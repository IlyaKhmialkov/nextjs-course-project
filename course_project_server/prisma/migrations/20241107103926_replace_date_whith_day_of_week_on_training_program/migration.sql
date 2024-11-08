/*
  Warnings:

  - You are about to drop the column `date` on the `TrainingProgram` table. All the data in the column will be lost.
  - Added the required column `dayOfWeek` to the `TrainingProgram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainingProgram" DROP COLUMN "date",
ADD COLUMN     "dayOfWeek" INTEGER NOT NULL;

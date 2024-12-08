/*
  Warnings:

  - You are about to drop the column `pictureLink` on the `ExerciseMachine` table. All the data in the column will be lost.
  - Added the required column `picture` to the `ExerciseMachine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseMachine" DROP COLUMN "pictureLink",
ADD COLUMN     "picture" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trainer" ADD COLUMN     "picture" TEXT NOT NULL;

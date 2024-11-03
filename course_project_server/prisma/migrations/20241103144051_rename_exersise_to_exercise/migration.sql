/*
  Warnings:

  - The primary key for the `MachineMuscle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exersiseMachineId` on the `MachineMuscle` table. All the data in the column will be lost.
  - The primary key for the `ProgramMachine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exersiseMachineId` on the `ProgramMachine` table. All the data in the column will be lost.
  - You are about to drop the `ExersiseMachine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `exerciseMachineId` to the `MachineMuscle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseMachineId` to the `ProgramMachine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MachineMuscle" DROP CONSTRAINT "MachineMuscle_exersiseMachineId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramMachine" DROP CONSTRAINT "ProgramMachine_exersiseMachineId_fkey";

-- AlterTable
ALTER TABLE "MachineMuscle" DROP CONSTRAINT "MachineMuscle_pkey",
DROP COLUMN "exersiseMachineId",
ADD COLUMN     "exerciseMachineId" INTEGER NOT NULL,
ADD CONSTRAINT "MachineMuscle_pkey" PRIMARY KEY ("muscleGroupId", "exerciseMachineId");

-- AlterTable
ALTER TABLE "ProgramMachine" DROP CONSTRAINT "ProgramMachine_pkey",
DROP COLUMN "exersiseMachineId",
ADD COLUMN     "exerciseMachineId" INTEGER NOT NULL,
ADD CONSTRAINT "ProgramMachine_pkey" PRIMARY KEY ("trainingProgramId", "exerciseMachineId");

-- DropTable
DROP TABLE "ExersiseMachine";

-- CreateTable
CREATE TABLE "ExerciseMachine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "pictureLink" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ExerciseMachine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseMachine_name_key" ON "ExerciseMachine"("name");

-- AddForeignKey
ALTER TABLE "ProgramMachine" ADD CONSTRAINT "ProgramMachine_exerciseMachineId_fkey" FOREIGN KEY ("exerciseMachineId") REFERENCES "ExerciseMachine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineMuscle" ADD CONSTRAINT "MachineMuscle_exerciseMachineId_fkey" FOREIGN KEY ("exerciseMachineId") REFERENCES "ExerciseMachine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

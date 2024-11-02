/*
  Warnings:

  - You are about to drop the `MachineMuscule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MusculeGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgramMuscule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MachineMuscule" DROP CONSTRAINT "MachineMuscule_exersiseMachineId_fkey";

-- DropForeignKey
ALTER TABLE "MachineMuscule" DROP CONSTRAINT "MachineMuscule_musculeGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramMuscule" DROP CONSTRAINT "ProgramMuscule_musculeGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramMuscule" DROP CONSTRAINT "ProgramMuscule_trainingProgramId_fkey";

-- DropTable
DROP TABLE "MachineMuscule";

-- DropTable
DROP TABLE "MusculeGroup";

-- DropTable
DROP TABLE "ProgramMuscule";

-- CreateTable
CREATE TABLE "MachineMuscle" (
    "muscleGroupId" INTEGER NOT NULL,
    "exersiseMachineId" INTEGER NOT NULL,

    CONSTRAINT "MachineMuscle_pkey" PRIMARY KEY ("muscleGroupId","exersiseMachineId")
);

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramMuscle" (
    "trainingProgramId" INTEGER NOT NULL,
    "muscleGroupId" INTEGER NOT NULL,

    CONSTRAINT "ProgramMuscle_pkey" PRIMARY KEY ("trainingProgramId","muscleGroupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "MuscleGroup_name_key" ON "MuscleGroup"("name");

-- AddForeignKey
ALTER TABLE "MachineMuscle" ADD CONSTRAINT "MachineMuscle_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineMuscle" ADD CONSTRAINT "MachineMuscle_exersiseMachineId_fkey" FOREIGN KEY ("exersiseMachineId") REFERENCES "ExersiseMachine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramMuscle" ADD CONSTRAINT "ProgramMuscle_trainingProgramId_fkey" FOREIGN KEY ("trainingProgramId") REFERENCES "TrainingProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramMuscle" ADD CONSTRAINT "ProgramMuscle_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

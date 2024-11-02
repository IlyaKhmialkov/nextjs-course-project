-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionClient" (
    "clientId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "daysLeft" INTEGER NOT NULL,

    CONSTRAINT "SubscriptionClient_pkey" PRIMARY KEY ("subscriptionId","clientId")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "trainerId" INTEGER,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "spentTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingProgram" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "TrainingProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramMachine" (
    "trainingProgramId" INTEGER NOT NULL,
    "exersiseMachineId" INTEGER NOT NULL,

    CONSTRAINT "ProgramMachine_pkey" PRIMARY KEY ("trainingProgramId","exersiseMachineId")
);

-- CreateTable
CREATE TABLE "ExersiseMachine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "pictureLink" TEXT NOT NULL,

    CONSTRAINT "ExersiseMachine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineMuscule" (
    "musculeGroupId" INTEGER NOT NULL,
    "exersiseMachineId" INTEGER NOT NULL,

    CONSTRAINT "MachineMuscule_pkey" PRIMARY KEY ("musculeGroupId","exersiseMachineId")
);

-- CreateTable
CREATE TABLE "MusculeGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MusculeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramMuscule" (
    "trainingProgramId" INTEGER NOT NULL,
    "musculeGroupId" INTEGER NOT NULL,

    CONSTRAINT "ProgramMuscule_pkey" PRIMARY KEY ("trainingProgramId","musculeGroupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_name_key" ON "Subscription"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_email_key" ON "Trainer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ExersiseMachine_name_key" ON "ExersiseMachine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MusculeGroup_name_key" ON "MusculeGroup"("name");

-- AddForeignKey
ALTER TABLE "SubscriptionClient" ADD CONSTRAINT "SubscriptionClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionClient" ADD CONSTRAINT "SubscriptionClient_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingProgram" ADD CONSTRAINT "TrainingProgram_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramMachine" ADD CONSTRAINT "ProgramMachine_trainingProgramId_fkey" FOREIGN KEY ("trainingProgramId") REFERENCES "TrainingProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramMachine" ADD CONSTRAINT "ProgramMachine_exersiseMachineId_fkey" FOREIGN KEY ("exersiseMachineId") REFERENCES "ExersiseMachine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineMuscule" ADD CONSTRAINT "MachineMuscule_musculeGroupId_fkey" FOREIGN KEY ("musculeGroupId") REFERENCES "MusculeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineMuscule" ADD CONSTRAINT "MachineMuscule_exersiseMachineId_fkey" FOREIGN KEY ("exersiseMachineId") REFERENCES "ExersiseMachine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramMuscule" ADD CONSTRAINT "ProgramMuscule_trainingProgramId_fkey" FOREIGN KEY ("trainingProgramId") REFERENCES "TrainingProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramMuscule" ADD CONSTRAINT "ProgramMuscule_musculeGroupId_fkey" FOREIGN KEY ("musculeGroupId") REFERENCES "MusculeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

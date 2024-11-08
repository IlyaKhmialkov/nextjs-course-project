// use: npx ts-node prisma/db-reset.ts

const tableNames = [
	'ProgramMuscle',
	'MuscleGroup',
	'MachineMuscle',
	'ExerciseMachine',
	'ProgramMachine',
	'TrainingProgram',
	'Trainer',
	'Attendance',
	'Client',
	'SubscriptionClient',
	'Subscription',
]

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
	for (const tableName of tableNames) await prisma.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`)
}

main().finally(async () => {
	await prisma.$disconnect()
	console.log('database successfully reseted')
})

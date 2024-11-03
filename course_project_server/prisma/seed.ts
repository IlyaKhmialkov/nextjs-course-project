import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function exerciseMachines() {
	const bench = await prisma.exerciseMachine.upsert({
		where: { name: 'Treadmill' },
		update: {},
		create: { name: 'Treadmill', amount: 2, pictureLink: 'no', description: 'The treadmill is the cardio equipment' },
	})
	const dumbbell = await prisma.exerciseMachine.upsert({
		where: { name: 'dumbbell' },
		update: {},
		create: { name: 'dumbbell', amount: 5, pictureLink: 'no', description: 'The dumbbell is not the cardio equipment' },
	})
	const bike = await prisma.exerciseMachine.upsert({
		where: { name: 'bike' },
		update: {},
		create: { name: 'bike', amount: 1, pictureLink: 'no', description: 'The bike is the cardio equipment' },
	})
	const LegPress = await prisma.exerciseMachine.upsert({
		where: { name: 'Leg press' },
		update: {},
		create: { name: 'Leg press', amount: 1, pictureLink: 'no', description: 'The Leg press is gg' },
	})
}
async function machineMuscles() {
	const record1 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exerciseMachineId: { muscleGroupId: 1, exerciseMachineId: 1 } },
		update: {},
		create: { muscleGroupId: 1, exerciseMachineId: 1 },
	})
	const record2 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exerciseMachineId: { muscleGroupId: 1, exerciseMachineId: 2 } },
		update: {},
		create: { muscleGroupId: 1, exerciseMachineId: 2 },
	})
	const record3 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exerciseMachineId: { muscleGroupId: 1, exerciseMachineId: 3 } },
		update: {},
		create: { muscleGroupId: 1, exerciseMachineId: 3 },
	})
	const record4 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exerciseMachineId: { muscleGroupId: 1, exerciseMachineId: 4 } },
		update: {},
		create: { muscleGroupId: 1, exerciseMachineId: 4 },
	})
	const record5 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exerciseMachineId: { muscleGroupId: 2, exerciseMachineId: 1 } },
		update: {},
		create: { muscleGroupId: 2, exerciseMachineId: 1 },
	})
	const record6 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exerciseMachineId: { muscleGroupId: 3, exerciseMachineId: 2 } },
		update: {},
		create: { muscleGroupId: 3, exerciseMachineId: 2 },
	})
	const record7 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exerciseMachineId: { muscleGroupId: 4, exerciseMachineId: 3 } },
		update: {},
		create: { muscleGroupId: 4, exerciseMachineId: 3 },
	})
	const record8 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exerciseMachineId: { muscleGroupId: 4, exerciseMachineId: 4 } },
		update: {},
		create: { muscleGroupId: 4, exerciseMachineId: 4 },
	})
}
async function muscleGroups() {
	const biceps = await prisma.muscleGroup.upsert({
		where: { name: 'biceps' },
		update: {},
		create: { name: 'biceps' },
	})
	const triceps = await prisma.muscleGroup.upsert({
		where: { name: 'triceps' },
		update: {},
		create: { name: 'triceps' },
	})
	const abdominal = await prisma.muscleGroup.upsert({
		where: { name: 'abdominal' },
		update: {},
		create: { name: 'abdominal' },
	})
	const pectoral = await prisma.muscleGroup.upsert({
		where: { name: 'pectoral' },
		update: {},
		create: { name: 'pectoral' },
	})
}

async function main() {
	await exerciseMachines()
	await muscleGroups()

	await machineMuscles()
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})

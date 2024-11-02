import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function exersiseMachines() {
	const bench = await prisma.exersiseMachine.upsert({
		where: { name: 'Treadmill' },
		update: {},
		create: { name: 'Treadmill', amount: 2, pictureLink: 'no', description: 'The treadmill is the cardio equipment' },
	})
	const dumbbell = await prisma.exersiseMachine.upsert({
		where: { name: 'dumbbell' },
		update: {},
		create: { name: 'dumbbell', amount: 5, pictureLink: 'no', description: 'The dumbbell is not the cardio equipment' },
	})
	const bike = await prisma.exersiseMachine.upsert({
		where: { name: 'bike' },
		update: {},
		create: { name: 'bike', amount: 1, pictureLink: 'no', description: 'The bike is the cardio equipment' },
	})
	const LegPress = await prisma.exersiseMachine.upsert({
		where: { name: 'Leg press' },
		update: {},
		create: { name: 'Leg press', amount: 1, pictureLink: 'no', description: 'The Leg press is gg' },
	})
}
async function machineMuscles() {
	const record1 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exersiseMachineId: { muscleGroupId: 1, exersiseMachineId: 1 } },
		update: {},
		create: { muscleGroupId: 1, exersiseMachineId: 1 },
	})
	const record2 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exersiseMachineId: { muscleGroupId: 1, exersiseMachineId: 2 } },
		update: {},
		create: { muscleGroupId: 1, exersiseMachineId: 2 },
	})
	const record3 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exersiseMachineId: { muscleGroupId: 1, exersiseMachineId: 3 } },
		update: {},
		create: { muscleGroupId: 1, exersiseMachineId: 3 },
	})
	const record4 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exersiseMachineId: { muscleGroupId: 1, exersiseMachineId: 4 } },
		update: {},
		create: { muscleGroupId: 1, exersiseMachineId: 4 },
	})
	const record5 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exersiseMachineId: { muscleGroupId: 2, exersiseMachineId: 1 } },
		update: {},
		create: { muscleGroupId: 2, exersiseMachineId: 1 },
	})
	const record6 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exersiseMachineId: { muscleGroupId: 3, exersiseMachineId: 2 } },
		update: {},
		create: { muscleGroupId: 3, exersiseMachineId: 2 },
	})
	const record7 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exersiseMachineId: { muscleGroupId: 4, exersiseMachineId: 3 } },
		update: {},
		create: { muscleGroupId: 4, exersiseMachineId: 3 },
	})
	const record8 = await prisma.machineMuscle.upsert({
		where: { muscleGroupId_exersiseMachineId: { muscleGroupId: 4, exersiseMachineId: 4 } },
		update: {},
		create: { muscleGroupId: 4, exersiseMachineId: 4 },
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
	exersiseMachines()
	muscleGroups()
	machineMuscles()
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

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const exerciseMachinesData = [
	{
		name: 'Treadmill',
		amount: 2,
		picture: 'machines/1.png',
		description: 'A machine that can be used for walking, jogging, running, or sprinting.',
	},
	{
		name: 'Dumbbells',
		amount: 20,
		picture: 'machines/2.jpg',
		description: 'Dumbbells provide a comprehensive workout targeting multiple muscle groups.',
	},
	{
		name: 'Stationary bike',
		amount: 1,
		picture: 'machines/3.jpg',
		description: 'A stationary bike is an exercise machine that simulates the physical exertions of riding a bicycle.',
	},
	{
		name: 'Leg press',
		amount: 1,
		picture: 'machines/4.jpg',
		description:
			'A gym machine that allows the user to train the lower body. Also you can easily die on this exercise machine',
	},
	{
		name: 'Bench press',
		amount: 10,
		picture: 'machines/5.jpg',
		description: 'Bench Press is used to perform a bench press.',
	},
	{
		name: 'Leg extension',
		amount: 1,
		picture: 'machines/6.png',
		description: 'A leg extension machine is a popular piece of gym equipment for isolated quadriceps training.',
	},
	{
		name: 'Lat pulldown',
		amount: 2,
		picture: 'machines/7.png',
		description: 'The lat pulldown is an upper-body exercise that focuses on the muscles of your back.',
	},
	{
		name: 'Smith machine',
		amount: 1,
		picture: 'machines/8.png',
		description: 'The Smith Machine is a rack where the rod movement is strictly vertical since it is fixed.',
	},
	{
		name: 'Cable Machine',
		amount: 2,
		picture: 'machines/9.jpg',
		description: 'This is a machine that allows you to do compound exercises.',
	},
	{
		name: 'Pullup bar',
		amount: 2,
		picture: 'machines/10.jpg',
		description: 'A bar that can be mounted to a wall or doorway to perform pull-ups.',
	},
	{
		name: 'Kettlebells',
		amount: 10,
		picture: 'machines/11.jpg',
		description:
			'These are round weights with a handle on top. They can be used for various exercises, such as swings, snatches, cleans, and Turkish get-ups.',
	},
	{
		name: 'Squat rack',
		amount: 1,
		picture: 'machines/12.png',
		description:
			'Squat Rack makes training with a rod more convenient and safe. This is especially true for squats with more weight.',
	},
	{
		name: 'Barbells',
		amount: 2,
		picture: 'machines/13.jpg',
		description: 'Barbells are versatile equipment with which you can perform a workout for the whole body.',
	},
	{
		name: 'Battle ropes',
		amount: 1,
		picture: 'machines/14.jpg',
		description:
			'Battle ropes are a versatile and effective tool for enhancing cardiovascular fitness and muscle endurance.',
	},
	{
		name: 'Hammer strength',
		amount: 1,
		picture: 'machines/15.png',
		description:
			'The Hammer Strength Machine uses free weight and levers to create resistance. For many athletes, this equipment is ideal for deep study of the chest muscles.',
	},
]
async function exerciseMachines() {
	for (let i = 0; i < exerciseMachinesData.length; i++) {
		const data = exerciseMachinesData[i]
		await prisma.exerciseMachine.upsert({
			where: { id: i + 1, name: data.name },
			update: {},
			create: { name: data.name, amount: data.amount, picture: data.picture, description: data.description },
		})
	}
}
const machineMusclesData = [
	{ muscleGroupId: 4, exerciseMachineId: 1 },
	{ muscleGroupId: 3, exerciseMachineId: 1 },
	{ muscleGroupId: 1, exerciseMachineId: 2 },
	{ muscleGroupId: 5, exerciseMachineId: 2 },
	{ muscleGroupId: 3, exerciseMachineId: 2 },
	{ muscleGroupId: 3, exerciseMachineId: 3 },
	{ muscleGroupId: 4, exerciseMachineId: 3 },
	{ muscleGroupId: 3, exerciseMachineId: 4 },
	{ muscleGroupId: 1, exerciseMachineId: 5 },
	{ muscleGroupId: 5, exerciseMachineId: 5 },
	{ muscleGroupId: 3, exerciseMachineId: 6 },
	{ muscleGroupId: 2, exerciseMachineId: 7 },
	{ muscleGroupId: 5, exerciseMachineId: 7 },
	{ muscleGroupId: 1, exerciseMachineId: 8 },
	{ muscleGroupId: 3, exerciseMachineId: 8 },
	{ muscleGroupId: 5, exerciseMachineId: 9 },
	{ muscleGroupId: 2, exerciseMachineId: 9 },
	{ muscleGroupId: 1, exerciseMachineId: 9 },
	{ muscleGroupId: 3, exerciseMachineId: 9 },
	{ muscleGroupId: 2, exerciseMachineId: 10 },
	{ muscleGroupId: 5, exerciseMachineId: 10 },
	{ muscleGroupId: 5, exerciseMachineId: 11 },
	{ muscleGroupId: 3, exerciseMachineId: 12 },
	{ muscleGroupId: 1, exerciseMachineId: 13 },
	{ muscleGroupId: 5, exerciseMachineId: 13 },
	{ muscleGroupId: 4, exerciseMachineId: 14 },
	{ muscleGroupId: 1, exerciseMachineId: 15 },
]

async function machineMuscles() {
	for (let i = 0; i < machineMusclesData.length; i++) {
		const data = machineMusclesData[i]
		await prisma.machineMuscle.upsert({
			where: {
				muscleGroupId_exerciseMachineId: {
					muscleGroupId: data.muscleGroupId,
					exerciseMachineId: data.exerciseMachineId,
				},
			},
			update: {},
			create: { muscleGroupId: data.muscleGroupId, exerciseMachineId: data.exerciseMachineId },
		})
	}
}
const muscleGroupData = [
	{ name: 'pectoral muscles' },
	{ name: 'back muscles' },
	{ name: 'leg muscles' },
	{ name: 'cardio' },
	{ name: 'arm muscles' },
]
async function muscleGroups() {
	for (let i = 0; i < muscleGroupData.length; i++) {
		const data = muscleGroupData[i]
		await prisma.muscleGroup.upsert({
			where: { id: i + 1, name: data.name },
			update: {},
			create: { name: data.name },
		})
	}
}
const SubscriptionData = [
	{ name: 'basic 7 days', duration: 7, price: 30 },
	{ name: 'basic 30 days', duration: 30, price: 100 },
	{ name: 'basic 90 days', duration: 90, price: 250 },
	{ name: 'basic 360 days', duration: 360, price: 800 },
	{ name: 'student 90 days', duration: 90, price: 180 },
	{ name: 'student 360 days', duration: 360, price: 620 },
]
async function Subscription() {
	for (let i = 0; i < SubscriptionData.length; i++) {
		const data = SubscriptionData[i]
		await prisma.subscription.upsert({
			where: { id: i + 1, name: data.name },
			update: {},
			create: { name: data.name, duration: data.duration, price: data.price },
		})
	}
}
const SubscriptionClientData = [
	{ clientId: 1, subscriptionId: 1, daysLeft: 5 },
	{ clientId: 2, subscriptionId: 6, daysLeft: 300 },
	{ clientId: 3, subscriptionId: 4, daysLeft: 210 },
	{ clientId: 4, subscriptionId: 2, daysLeft: 4 },
	{ clientId: 5, subscriptionId: 1, daysLeft: 2 },
]

async function SubscriptionClient() {
	for (let i = 0; i < SubscriptionClientData.length; i++) {
		const data = SubscriptionClientData[i]
		await prisma.subscriptionClient.upsert({
			where: {
				subscriptionId_clientId: { clientId: data.clientId, subscriptionId: data.subscriptionId },
			},
			update: {},
			create: { clientId: data.clientId, subscriptionId: data.subscriptionId, daysLeft: data.daysLeft },
		})
	}
}
const ClientData = [
	{
		email: 'john.doe@example.com',
		passwordHash: '$2b$10$WU1EklgKJWOzm3iCU90FRelll3sqxnn6rUsiPObNbU90mXKaJSWce',
		name: 'John Doe',
		age: 30,
		gender: 'Male',
		trainerId: 1,
	},
	{
		email: 'jane.smith@example.com',
		passwordHash: '$2b$10$WU1EklgKJWOzm3iCU90FRelll3sqxnn6rUsiPObNbU90mXKaJSWce',
		name: 'Jane Smith',
		age: 25,
		gender: 'Female',
		trainerId: 2,
	},

	{
		email: 'alex.brown@example.com',
		passwordHash: '$2b$10$WU1EklgKJWOzm3iCU90FRelll3sqxnn6rUsiPObNbU90mXKaJSWce',
		name: 'Alex Brown',
		age: 35,
		gender: 'Male',
	},

	{
		email: 'sara.johnson@example.com',
		passwordHash: '$2b$10$WU1EklgKJWOzm3iCU90FRelll3sqxnn6rUsiPObNbU90mXKaJSWce',
		name: 'Sara Johnson',
		age: 28,
		gender: 'Female',
		trainerId: 3,
	},

	{
		email: 'mike.wilson@example.com',
		passwordHash: '$2b$10$WU1EklgKJWOzm3iCU90FRelll3sqxnn6rUsiPObNbU90mXKaJSWce',
		name: 'Mike Wilson',
		age: 32,
		gender: 'Male',
	},
]
async function Client() {
	for (let i = 0; i < ClientData.length; i++) {
		const data = ClientData[i]
		await prisma.client.upsert({
			where: { id: i + 1, email: data.email },
			update: {},
			create: {
				email: data.email,
				passwordHash: data.passwordHash,
				name: data.name,
				age: data.age,
				gender: data.gender,
				trainerId: data.trainerId,
			},
		})
	}
}
const AttendanceData = [
	{ clientId: 1, date: new Date('2024-11-6'), spentTime: new Date(1970, 0, 1, 2, 12, 0, 0) },
	{ clientId: 1, date: new Date('2024-11-7'), spentTime: new Date(1970, 0, 1, 1, 12, 0, 0) },
	{ clientId: 2, date: new Date('2024-10-7'), spentTime: new Date(1970, 0, 1, 3, 12, 0, 0) },
	{ clientId: 2, date: new Date('2023-11-7'), spentTime: new Date(1970, 0, 1, 2, 50, 0, 0) },
	{ clientId: 3, date: new Date('2024-11-1'), spentTime: new Date(1970, 0, 1, 2, 20, 0, 0) },
	{ clientId: 4, date: new Date('2024-01-7'), spentTime: new Date(1970, 0, 1, 2, 0, 0, 0) },
	{ clientId: 5, date: new Date('2024-01-9'), spentTime: new Date(1970, 0, 1, 3, 0, 0, 0) },
]

async function Attendance() {
	for (let i = 0; i < AttendanceData.length; i++) {
		const data = AttendanceData[i]
		await prisma.attendance.upsert({
			where: { id: i + 1 },
			update: {},
			create: { clientId: data.clientId, date: data.date, spentTime: data.spentTime },
		})
	}
}
const TrainerData = [
	{
		email: 'ilya@gmail.com',
		passwordHash: '$2b$10$WU1EklgKJWOzm3iCU90FRelll3sqxnn6rUsiPObNbU90mXKaJSWce',
		name: 'Ilya Kh',
		age: 19,
		gender: 'Male',
		experience: 2,
		price: 64,
		isAdmin: true,
		picture: 'trainers/mypfp.jpg',
	},
	{
		email: 'david.green@example.com',
		passwordHash: '$2b$10$WU1EklgKJWOzm3iCU90FRelll3sqxnn6rUsiPObNbU90mXKaJSWce',
		name: 'David Green',
		age: 29,
		gender: 'Male',
		experience: 5,
		price: 14.5,
		picture: 'trainers/1.webp',
	},
	{
		email: 'lisa.anderson@example.com',
		passwordHash: '$2b$10$WU1EklgKJWOzm3iCU90FRelll3sqxnn6rUsiPObNbU90mXKaJSWce',
		name: 'Lisa Anderson',
		age: 31,
		gender: 'Female',
		experience: 11,
		price: 16,
		picture: 'trainers/2.png',
	},
	{
		email: 'kevin.jones@example.com',
		passwordHash: '$2b$10$WU1EklgKJWOzm3iCU90FRelll3sqxnn6rUsiPObNbU90mXKaJSWce',
		name: 'Kevin Jones',
		age: 33,
		gender: 'Male',
		experience: 7,
		price: 18,
		picture: 'trainers/3.webp',
	},
	{
		email: 'emily.baker@example.com',
		passwordHash: '$2b$10$WU1EklgKJWOzm3iCU90FRelll3sqxnn6rUsiPObNbU90mXKaJSWce',
		name: 'Emily Baker',
		age: 26,
		gender: 'Female',
		experience: 2,
		price: 10,
		picture: 'trainers/4.webp',
	},
]
async function Trainer() {
	for (let i = 0; i < TrainerData.length; i++) {
		const data = TrainerData[i]
		await prisma.trainer.upsert({
			where: { id: i + 1, email: data.email },
			update: {},
			create: {
				email: data.email,
				passwordHash: data.passwordHash,
				name: data.name,
				age: data.age,
				gender: data.gender,
				experience: data.experience,
				price: data.price,
				isAdmin: data.isAdmin,
				picture: data.picture,
			},
		})
	}
}
const TrainingProgramData = [
	{
		name: 'leg day',
		dayOfWeek: 1,
		time: new Date(1970, 0, 1, 3, 0, 0, 0),
		clientId: 1,
	},
	{
		name: 'chest day',
		dayOfWeek: 1,
		time: new Date(1970, 0, 1, 2, 0, 0, 0),
		clientId: 2,
	},
	{
		name: 'back day',
		dayOfWeek: 3,
		time: new Date(1970, 0, 1, 2, 30, 0, 0),
		clientId: 3,
	},
	{
		name: 'leg day',
		dayOfWeek: 5,
		time: new Date(1970, 0, 1, 1, 30, 0, 0),
		clientId: 4,
	},
	{
		name: 'potato day',
		dayOfWeek: 5,
		time: new Date(1970, 0, 1, 2, 20, 0, 0),
		clientId: 5,
	},
]
async function TrainingProgram() {
	for (let i = 0; i < TrainingProgramData.length; i++) {
		const data = TrainingProgramData[i]
		await prisma.trainingProgram.upsert({
			where: { id: i + 1 },
			update: {},
			create: {
				name: data.name,
				dayOfWeek: data.dayOfWeek,
				time: data.time,
				clientId: data.clientId,
			},
		})
	}
}
const ProgramMachineData = [
	{ trainingProgramId: 1, exerciseMachineId: 1 },
	{ trainingProgramId: 1, exerciseMachineId: 5 },
	{ trainingProgramId: 2, exerciseMachineId: 6 },
	{ trainingProgramId: 2, exerciseMachineId: 5 },
	{ trainingProgramId: 3, exerciseMachineId: 10 },
	{ trainingProgramId: 3, exerciseMachineId: 12 },
	{ trainingProgramId: 3, exerciseMachineId: 15 },
	{ trainingProgramId: 4, exerciseMachineId: 5 },
	{ trainingProgramId: 5, exerciseMachineId: 2 },
]

async function ProgramMachine() {
	for (let i = 0; i < ProgramMachineData.length; i++) {
		const data = ProgramMachineData[i]
		await prisma.programMachine.upsert({
			where: {
				trainingProgramId_exerciseMachineId: {
					trainingProgramId: data.trainingProgramId,
					exerciseMachineId: data.exerciseMachineId,
				},
			},
			update: {},
			create: { trainingProgramId: data.trainingProgramId, exerciseMachineId: data.exerciseMachineId },
		})
	}
}
const ProgramMuscleData = [
	{ trainingProgramId: 1, muscleGroupId: 1 },
	{ trainingProgramId: 1, muscleGroupId: 5 },
	{ trainingProgramId: 2, muscleGroupId: 4 },
	{ trainingProgramId: 2, muscleGroupId: 5 },
	{ trainingProgramId: 3, muscleGroupId: 1 },
	{ trainingProgramId: 1, muscleGroupId: 3 },
	{ trainingProgramId: 5, muscleGroupId: 4 },
	{ trainingProgramId: 2, muscleGroupId: 3 },
	{ trainingProgramId: 5, muscleGroupId: 5 },
	{ trainingProgramId: 4, muscleGroupId: 1 },
]

async function ProgramMuscle() {
	for (let i = 0; i < ProgramMuscleData.length; i++) {
		const data = ProgramMuscleData[i]
		await prisma.programMuscle.upsert({
			where: {
				trainingProgramId_muscleGroupId: {
					trainingProgramId: data.trainingProgramId,
					muscleGroupId: data.muscleGroupId,
				},
			},
			update: {},
			create: { trainingProgramId: data.trainingProgramId, muscleGroupId: data.muscleGroupId },
		})
	}
}

async function main() {
	await exerciseMachines()
	await muscleGroups()
	await Subscription()
	await Trainer()
	await Client()

	await Attendance()
	await TrainingProgram()

	await ProgramMachine()
	await ProgramMuscle()
	await SubscriptionClient()
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

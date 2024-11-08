import { hash } from 'bcrypt'

export async function GeneratePasswordHash(password: string) {
	const saltRounds = 10
	const hashedPassword = await hash(password, saltRounds)
	return hashedPassword
}

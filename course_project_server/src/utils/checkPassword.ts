import { compare } from 'bcrypt'

export async function CheckPassword(password: string, hash: string) {
	const result = await compare(password, hash)
	return result
}

import bcrypt from 'bcrypt'

export async function CheckPassword(password: string, hash: string) {
	const result = await bcrypt.compare(password, hash)
	return result
}

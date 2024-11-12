import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

interface IUserAuthData {
	id: number
	email: string
	passwordHash: string
	role: string
}

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async checkEmail(email: string): Promise<IUserAuthData | null> {
		const client = await this.prisma.client.findUnique({
			where: { email: email },
		})
		if (client) {
			return { id: client.id, email: client.email, passwordHash: client.passwordHash, role: 'client' }
		}

		const trainer = await this.prisma.trainer.findUnique({
			where: { email: email },
		})
		if (trainer) {
			if (trainer.isAdmin) {
				return { id: trainer.id, email: trainer.email, passwordHash: trainer.passwordHash, role: 'admin' }
			}
			return { id: trainer.id, email: trainer.email, passwordHash: trainer.passwordHash, role: 'trainer' }
		}

		return null
	}
}

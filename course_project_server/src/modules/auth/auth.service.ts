import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

interface IUserAuthData {
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
			return { email: client.email, passwordHash: client.passwordHash, role: 'client' }
		}

		const trainer = await this.prisma.trainer.findUnique({
			where: { email: email },
		})
		if (trainer) {
			if (trainer.isAdmin) {
				return { email: trainer.email, passwordHash: trainer.passwordHash, role: 'admin' }
			}
			return { email: trainer.email, passwordHash: trainer.passwordHash, role: 'trainer' }
		}

		return null
	}
}

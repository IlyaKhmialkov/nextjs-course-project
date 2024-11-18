import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common'
import { sign } from 'jsonwebtoken'
import { CheckPassword } from 'src/utils/checkPassword'
import { GeneratePasswordHash } from 'src/utils/generatePasswordHash'
import { ClientsService } from '../clients/clients.service'
import { TrainersService } from '../trainers/trainers.service'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		@Inject(ClientsService)
		private readonly clientsService: ClientsService,
		@Inject(TrainersService)
		private readonly trainersService: TrainersService
	) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() data: { email: string; password: string }) {
		const userData = await this.authService.checkEmail(data.email)

		if (userData && (await CheckPassword(data.password, userData.passwordHash))) {
			const role = userData.role
			const user = { email: data.email, role: role }
			const token = sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
			return { token, role }
		} else {
			return null
		}
	}

	@HttpCode(HttpStatus.CREATED)
	@Post('change-password')
	async changePassword(@Body() data: { email: string; newPassword: string }) {
		const userData = await this.authService.checkEmail(data.email)
		if (userData) {
			const role = userData.role
			const passwordHash = await GeneratePasswordHash(data.newPassword)

			if (role === 'client') {
				await this.clientsService.update(userData.id, {}, passwordHash)
				return true
			}
			if (role === 'trainer' || role === 'admin') {
				await this.trainersService.update(userData.id, {}, passwordHash)
				return true
			}
			return false
		} else {
			return false
		}
	}
}

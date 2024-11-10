import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { sign } from 'jsonwebtoken'
import { CheckPassword } from 'src/utils/checkPassword'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() data: { email: string; password: string }) {
		const userData = await this.authService.checkEmail(data.email)
		const isPasswordCorrect = await CheckPassword(data.password, userData.passwordHash)

		if (userData && isPasswordCorrect) {
			const user = { email: data.email, role: userData.role }
			const token = sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
			return token
		} else {
			return null
		}
	}
}

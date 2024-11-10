import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

@Injectable()
export class JWTMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers['authorization']

		if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
			const token = authHeader.split(' ')[1]

			try {
				const decoded = verify(token, process.env.JWT_SECRET_KEY)
				req['user'] = decoded
			} catch (err) {
				// Обработка ошибки верификации токена
			}
		}

		next()
	}
}

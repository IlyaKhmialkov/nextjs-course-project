import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class TrainerGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		return request['user'].role === 'trainer' || request['user'].role === 'admin'
	}
}

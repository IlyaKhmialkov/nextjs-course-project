import { Injectable } from '@nestjs/common'

@Injectable()
export class ExersiseMachinesService {
	getAll(): string[] {
		return ['banan', 'arbuz']
	}
}

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getExerciseMachines = async () => {
	return await axios.get<IExerciseMachine[]>('http://localhost:4200/api/exercise-machines', {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	})
}

export function useExerciseMachines() {
	const { data, isLoading } = useQuery({
		queryKey: ['exerciseMachines'],
		queryFn: getExerciseMachines,
		select: data => data.data,
		enabled: true,
	})

	return { data, isLoading }
}

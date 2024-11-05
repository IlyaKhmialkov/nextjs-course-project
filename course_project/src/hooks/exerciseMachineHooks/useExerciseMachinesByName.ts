import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getExerciseMachinesByName = async (name: string) => {
	return await axios.get<IExerciseMachine[]>(`http://localhost:4200/api/exercise-machines/name/${name}`, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	})
}

export function useExerciseMachinesByName(name: string) {
	const { data, isLoading } = useQuery({
		queryKey: ['exerciseMachines', name],
		queryFn: () => getExerciseMachinesByName(name),
		select: data => data.data,
		enabled: !!name,
	})

	return { data, isLoading }
}

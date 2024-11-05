import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getExerciseMachinesByMuscleName = async (name: string) => {
	return await axios.get<IExerciseMachine[]>(`http://localhost:4200/api/muscle-groups/machines/${name}`, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	})
}

export function useExerciseMachinesByMuscleName(name: string) {
	const { data, isLoading } = useQuery({
		queryKey: ['exerciseMachines(by muscle)', name],
		queryFn: () => getExerciseMachinesByMuscleName(name),
		select: data => data.data,
		enabled: !!name,
	})

	return { data, isLoading }
}

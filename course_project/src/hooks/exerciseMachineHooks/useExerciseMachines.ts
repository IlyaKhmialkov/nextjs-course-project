import { useQuery } from '@tanstack/react-query'
import axios from '../../utils/axiosConfig'

const getExerciseMachines = async () => {
	return await axios.get<IExerciseMachine[]>('/exercise-machines')
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

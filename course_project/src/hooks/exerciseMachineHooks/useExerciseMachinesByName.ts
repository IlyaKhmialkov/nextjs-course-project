import { useQuery } from '@tanstack/react-query'
import axios from '../../utils/axiosConfig'

const getExerciseMachinesByName = async (name: string) => {
	return await axios.get<IExerciseMachine[]>(`/exercise-machines/name/${name}`)
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

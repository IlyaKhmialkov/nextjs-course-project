import { useQuery } from '@tanstack/react-query'
import axios from '../../utils/axiosConfig'

const getExerciseMachinesByMuscleName = async (name: string) => {
	return await axios.get<IExerciseMachine[]>(`/muscle-groups/machines/${name}`)
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

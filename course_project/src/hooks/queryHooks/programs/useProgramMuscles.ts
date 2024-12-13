import { useQuery } from '@tanstack/react-query'
import axios from '../../../utils/axiosConfig'

interface IProgramMuscleExtended extends IProgramMuscle {
	muscleGroup: IMuscleGroup
}

const getProgramMuscles = async (id: number) => {
	return await axios.get<IProgramMuscleExtended[]>(`/program-muscles/muscles/${id}`)
}

export function useProgramMuscles(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['program-muscles', id],
		queryFn: () => getProgramMuscles(id),
		select: data => data.data,
		enabled: true,
	})

	return { data, isLoading }
}

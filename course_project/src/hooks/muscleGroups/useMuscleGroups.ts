import { useQuery } from '@tanstack/react-query'
import axios from '../../utils/axiosConfig'

const getMuscleGroups = async () => {
	return await axios.get<IMuscleGroup[]>('/muscle-groups')
}

export function useMuscleGroups() {
	const { data, isLoading } = useQuery({
		queryKey: ['muscle-groups'],
		queryFn: getMuscleGroups,
		select: data => data.data,
		enabled: true,
	})

	return { data, isLoading }
}

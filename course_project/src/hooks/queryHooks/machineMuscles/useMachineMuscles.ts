import { useQuery } from '@tanstack/react-query'
import axios from '../../../utils/axiosConfig'

const getMachineMuscles = async () => {
	return await axios.get<IMachineMuscle[]>('/machine-muscles')
}

export function useMachineMuscles() {
	const { data, isLoading } = useQuery({
		queryKey: ['machine-muscles'],
		queryFn: getMachineMuscles,
		select: data => data.data,
		enabled: true,
	})

	return { data, isLoading }
}

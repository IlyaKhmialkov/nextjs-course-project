import { useQuery } from '@tanstack/react-query'
import axios from '../../utils/axiosConfig'

const getTrainers = async () => {
	return await axios.get<ITrainer[]>('/trainers')
}

export function useTrainers() {
	const { data, isLoading } = useQuery({
		queryKey: ['trainers'],
		queryFn: getTrainers,
		select: data => data.data,
		enabled: true,
	})

	return { data, isLoading }
}

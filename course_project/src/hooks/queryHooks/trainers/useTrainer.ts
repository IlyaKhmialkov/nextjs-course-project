import { useQuery } from '@tanstack/react-query'
import axios from '../../../utils/axiosConfig'

const getTrainer = async (id: number) => {
	return await axios.get<ITrainer | undefined>(`/trainers/${id}`)
}

export function useTrainer(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['trainer', id],
		queryFn: () => getTrainer(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}

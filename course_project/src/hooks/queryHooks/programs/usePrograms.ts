import { useQuery } from '@tanstack/react-query'
import axios from '../../../utils/axiosConfig'

const getPrograms = async (id: number) => {
	return await axios.get<ITrainingProgram[]>(`/training-programs/client/${id}`)
}

export function usePrograms(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['programs', id],
		queryFn: () => getPrograms(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}

import { useQuery } from '@tanstack/react-query'
import axios from '../../../utils/axiosConfig'

const getClient = async (id: number) => {
	return await axios.get<IClient | undefined>(`/clients/${id}`)
}

export function useClient(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['client', id],
		queryFn: () => getClient(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}

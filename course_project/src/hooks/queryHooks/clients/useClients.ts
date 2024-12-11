import { useQuery } from '@tanstack/react-query'
import axios from '../../../utils/axiosConfig'

const getClients = async () => {
	return await axios.get<IClient[]>('/clients')
}

export function useClients() {
	const { data, isLoading } = useQuery({
		queryKey: ['clients'],
		queryFn: getClients,
		select: data => data.data,
		enabled: true,
	})

	return { data, isLoading }
}

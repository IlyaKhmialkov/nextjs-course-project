import { useQuery } from '@tanstack/react-query'
import axios from '../../../utils/axiosConfig'

const getSubscription = async () => {
	return await axios.get<ISubscription[]>('/subscriptions')
}

export function useSubscriptions() {
	const { data, isLoading } = useQuery({
		queryKey: ['subscriptions'],
		queryFn: getSubscription,
		select: data => data.data,
		enabled: true,
	})

	return { data, isLoading }
}

import { useQuery } from '@tanstack/react-query'
import axios from '../../../utils/axiosConfig'

interface ISubscriptionClientExtended extends ISubscriptionClient {
	subscription: ISubscription
}

const getSubscriptionClients = async (id: number) => {
	return await axios.get<ISubscriptionClientExtended[]>(`/subscription-clients/subscriptions/${id}`)
}

export function useSubscriptionClients(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['subscriptions-client'],
		queryFn: () => getSubscriptionClients(id),
		select: data => data.data,
		enabled: true,
	})

	return { data, isLoading }
}

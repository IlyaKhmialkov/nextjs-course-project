import { useQuery } from '@tanstack/react-query'
import axios from '../../../utils/axiosConfig'

const getAttendances = async (id: number) => {
	return await axios.get<IAttendance[]>(`/attendances/client/${id}`)
}

export function useAttendances(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['attendances', id],
		queryFn: () => getAttendances(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}

import { useQuery } from '@tanstack/react-query'
import axios from '../../../utils/axiosConfig'

interface IProgramMachineExtended extends IProgramMachine {
	exerciseMachine: IExerciseMachine
}

const getProgramMachines = async (id: number) => {
	return await axios.get<IProgramMachineExtended[]>(`/program-machines/machines/${id}`)
}

export function useProgramMachines(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['program-machines', id],
		queryFn: () => getProgramMachines(id),
		select: data => data.data,
		enabled: true,
	})

	return { data, isLoading }
}

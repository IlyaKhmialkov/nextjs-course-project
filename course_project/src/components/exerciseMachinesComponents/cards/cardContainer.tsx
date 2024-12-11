import { useExerciseMachinesByMuscleName } from '@/hooks/queryHooks/exerciseMachines/useExerciseMachinesByMuscleName'
import { useExerciseMachinesByName } from '@/hooks/queryHooks/exerciseMachines/useExerciseMachinesByName'
import { Card } from './card'
import styles from './card.module.scss'

interface ICardContainerProps {
	input: string
	checkbox: boolean
	exerciseMachines: IExerciseMachine[] | undefined
	isDataLoading: boolean
}

export function CardContainer({ input, checkbox, exerciseMachines, isDataLoading }: ICardContainerProps) {
	const ExerciseMachinesByMuscleName = useExerciseMachinesByMuscleName(input)
	const ExerciseMachinesByName = useExerciseMachinesByName(input)

	const { data, isLoading } =
		input === ''
			? { data: exerciseMachines, isLoading: isDataLoading }
			: checkbox
			? ExerciseMachinesByMuscleName
			: ExerciseMachinesByName

	return (
		<div className={styles.cardContainer}>
			{isLoading ? (
				<>
					<h2>Loading...</h2>
				</>
			) : data?.length ? (
				data.map((exerciseMachine: IExerciseMachine) => (
					<Card key={exerciseMachine.id} exerciseMachine={exerciseMachine} />
				))
			) : (
				<div className={styles.errorDiv}>
					<h2>exercise machines not found</h2>
				</div>
			)}
		</div>
	)
}

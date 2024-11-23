import { useExerciseMachinesByMuscleName } from '@/hooks/exerciseMachines/useExerciseMachinesByMuscleName'
import { useExerciseMachinesByName } from '@/hooks/exerciseMachines/useExerciseMachinesByName'
import { Card } from './card'
import styles from './card.module.scss'

interface ICardContainerProps {
	input: string
	checkbox: boolean
	exerciseMachines: IExerciseMachine[] | undefined
	isDataLoading: boolean
}

export function CardContainer({ input, checkbox, exerciseMachines, isDataLoading }: ICardContainerProps) {
	//  if (input === '') {
	//    { data, isLoading } = useExerciseMachines()  }
	//  if (input === '' && checkbox) {
	//		{ data, isLoading } = useExerciseMachinesByMuscleName()}
	//  if (input === '' && !checkbox) {
	//		{ data, isLoading } = useExerciseMachinesByName()}

	const { data, isLoading } =
		input === ''
			? { data: exerciseMachines, isLoading: isDataLoading }
			: checkbox
			? useExerciseMachinesByMuscleName(input)
			: useExerciseMachinesByName(input)

	//  if (isLoading) {
	//    return 4 empty cards
	//  if (data?.length) {
	//		return cards whith data
	//  if (!data?.length) {
	//		return errorDiv
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

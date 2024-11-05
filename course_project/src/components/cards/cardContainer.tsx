import { useExerciseMachines } from '@/hooks/exerciseMachineHooks/useExerciseMachines'
import { useExerciseMachinesByMuscleName } from '@/hooks/exerciseMachineHooks/useExerciseMachinesByMuscleName'
import { useExerciseMachinesByName } from '@/hooks/exerciseMachineHooks/useExerciseMachinesByName'
import { Card } from './card'
import styles from './card.module.scss'

interface ICardContainerProps {
	input: string
	checkbox: boolean
}

export function CardContainer({ input, checkbox }: ICardContainerProps) {
	//  if (input === '') {
	//    { data, isLoading } = useExerciseMachines()  }
	//  if (input === '' && checkbox) {
	//		{ data, isLoading } = useExerciseMachinesByMuscleName()}
	//  if (input === '' && !checkbox) {
	//		{ data, isLoading } = useExerciseMachinesByName()}

	const { data, isLoading } =
		input === ''
			? useExerciseMachines()
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
					<Card />
					<Card />
					<Card />
					<Card />
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

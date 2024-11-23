import { ExerciseMachines } from '@/components/exerciseMachinesComponents/exerciseMachines/exerciseMachines'
import styles from './exerciseMachines.module.scss'

export function ExerciseMachinesPage() {
	return (
		<>
			<main className={styles.main}>
				<div className={styles.bgImageDiv}>
					<h1>Our exercise machines</h1>
				</div>
				<ExerciseMachines />
			</main>
		</>
	)
}

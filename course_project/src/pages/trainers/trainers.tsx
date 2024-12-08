import { TrainersCards } from '@/components/trainersCards/trainersCards'
import styles from './trainers.module.scss'

export function TrainersPage() {
	return (
		<>
			<main className={styles.main}>
				<h1>Our trainers</h1>
				<TrainersCards />
			</main>
		</>
	)
}

import { Footer } from '@/components/footer/footer'
import { Header } from '@/components/header/header'
import styles from './exerciseMachines.module.scss'

export function ExerciseMachines() {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<h1>List of our exercise machines</h1>
				<div className={styles.cardContainer}>
					<div className={styles.card}>
						<h2>name</h2>
						<img src='tren.jpg' alt='exercise machine photo' />
						<p>manufacturer</p>
						<p>amount: 4</p>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

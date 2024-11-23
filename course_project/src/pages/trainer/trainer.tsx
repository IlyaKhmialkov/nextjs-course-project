'use client'
import setJWTFromCookies from '@/utils/setJWTFromCookies'
import { useEffect } from 'react'
import { ExerciseMachines } from './sections/exerciseMachines'
import { MachineMuscles } from './sections/machineMuscles'
import { MuscleGroups } from './sections/muscleGroups'
import { Users } from './sections/users'
import styles from './trainer.module.scss'

export function Trainer() {
	useEffect(() => {
		setJWTFromCookies()
	}, [])

	return (
		<>
			<main className={styles.main}>
				<h1>u can do smth whith this data</h1>
				<Users />
				<MuscleGroups />
				<ExerciseMachines />
				<MachineMuscles />
			</main>
		</>
	)
}

{
	/*  		
	<section className={styles.section}>
					<h2>exercise machines</h2>
					<div className={styles.buttonsDiv}>
						<button>get</button>
					</div>
				</section>
				<section className={styles.section}>
					<h2>exercise machines and muscle groups</h2>
					<div className={styles.buttonsDiv}>
						<button>get</button>
					</div>
				</section> */
}

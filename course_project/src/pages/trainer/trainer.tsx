'use client'
import { MachineMuscles } from '@/components/trainerSections/machineMuscles'
import { MuscleGroups } from '@/components/trainerSections/muscleGroups'
import { Users } from '@/components/trainerSections/users'
import { useSetJWT } from '@/hooks/useSetJWT'
import { removeCookies } from '@/utils/logOut'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './trainer.module.scss'

export function Trainer() {
	const router = useRouter()
	const role = Cookies.get('role')
	const [isTrainer, setIsTrainer] = useState(true)

	useSetJWT()

	useEffect(() => {
		setIsTrainer(role === 'trainer' || role === 'admin')
	}, [role])

	function logOut() {
		removeCookies()
		router.replace('/')
	}

	return (
		<>
			<main className={styles.main}>
				{isTrainer ? (
					<>
						<h1>Hello, trainer</h1>
						<Users />
						<MuscleGroups />
						<MachineMuscles />
						<div className={styles.trainerDiv}>
							<button onClick={() => logOut()}>log out</button>
						</div>
					</>
				) : (
					<div className={styles.notATrainerDiv}>
						<h1>Error</h1>
						<h2>Sorry, it looks like you are not a trainer of our gym</h2>
						<p>try register as trainer to get access to this page</p>
					</div>
				)}
			</main>
		</>
	)
}

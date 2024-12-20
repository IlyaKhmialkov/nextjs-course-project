'use client'
import { TrainerEditForm } from '@/components/forms/trainerEditForm'
import { MachineMuscles } from '@/components/trainerSections/machineMuscles'
import { MuscleGroups } from '@/components/trainerSections/muscleGroups'
import { Users } from '@/components/trainerSections/users'
import { useTrainer } from '@/hooks/queryHooks/trainers/useTrainer'
import { useSetJWT } from '@/hooks/useSetJWT'
import { removeCookies } from '@/utils/logOut'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './trainer.module.scss'

export function Trainer() {
	const router = useRouter()
	const role = Cookies.get('role')
	const trainerId = role === 'trainer' || role === 'admin' ? Cookies.get('id') ?? 'not a client' : 'not a client'
	const [isTrainer, setIsTrainer] = useState(true)
	const [isDataValid, setDataValid] = useState(false)

	useSetJWT()

	useEffect(() => {
		setIsTrainer(role === 'trainer' || role === 'admin')
	}, [role])

	const trainer = useTrainer(parseInt(trainerId))

	useEffect(() => {
		setDataValid(!trainer.isLoading && !!trainer.data)
	}, [trainer])

	function logOut() {
		removeCookies()
		router.replace('/')
	}

	return (
		<>
			<main className={styles.main}>
				{isTrainer ? (
					isDataValid ? (
						<>
							<div className={styles.infoHeader}>
								<h2>Welcome, {trainer.data?.name}</h2>
								<img
									src={`http://localhost:4200/${trainer.data?.picture}`}
									alt={`Your pfp`}
									className={styles.trainerImage}
								/>
								<p>your age: {trainer.data?.age}</p>
								<p>your email: {trainer.data?.email}</p>
								<p>your gender: {trainer.data?.gender}</p>
								<p>your experience: {trainer.data?.experience}</p>
								<p>your price: {trainer.data?.price} $ per hour</p>
							</div>
							<div className={styles.trainerDiv}>
								<TrainerEditForm trainer={trainer.data} />
								<button onClick={() => logOut()}>log out</button>
							</div>
							<Users />
							<MuscleGroups />
							<MachineMuscles />
						</>
					) : (
						<div className={styles.loadingDiv}>
							<h1>Loading...</h1>
						</div>
					)
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

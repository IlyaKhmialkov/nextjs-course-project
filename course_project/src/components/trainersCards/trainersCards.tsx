'use client'

import { useTrainers } from '@/hooks/trainers/useTrainers'
import { useEffect, useState } from 'react'
import { Slider } from '../emblaCarousel/slider'
import { TrainersReport } from '../reports/trainersReport'
import styles from './trainersCards.module.scss'

export function TrainersCards() {
	const [trainers, setTrainers] = useState<ITrainer[]>([])
	const { data, isLoading } = useTrainers()

	useEffect(() => {
		if (!isLoading && data) {
			setTrainers(data)
		}
	}, [data, isLoading])

	return (
		<div className={styles.trainersCards}>
			{isLoading ? (
				<div className={styles.loadingDiv}>
					<h2>Loading...</h2>
				</div>
			) : trainers.length ? (
				<>
					<Slider>
						<div className={styles.emblaContainer}>
							{trainers.map((trainer: ITrainer) => (
								<div className={styles.emblaSlide} key={trainer.id}>
									<div className={styles.slideContent}>
										<h2>{trainer.name}</h2>
										<img
											src={`http://localhost:4200/${trainer.picture}`}
											alt={`Trainer pfp`}
											className={styles.trainerImage}
										/>
										<div className={styles.trainerData}>
											<p>experience: {trainer.experience} years</p>
											<p>gender: {trainer.gender}</p>
											<p>price: {trainer.price}$ / hour</p>
											<p>
												email: <a href={`mailto:${trainer.email}`}>{trainer.email}</a>
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</Slider>
					<div className={styles.reportsDiv}>
						<TrainersReport trainers={trainers} />
					</div>
				</>
			) : (
				<div className={styles.errorDiv}>
					<h2>Trainers not found</h2>
				</div>
			)}
		</div>
	)
}

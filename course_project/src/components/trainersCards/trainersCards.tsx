'use client'

import { useTrainers } from '@/hooks/trainers/useTrainers'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import { NextButton, PrevButton, usePrevNextButtons } from './sliderArrows'
import styles from './trainersCards.module.scss'

export function TrainersCards() {
	const [trainers, setTrainers] = useState<ITrainer[]>([])
	const { data, isLoading } = useTrainers()
	const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

	useEffect(() => {
		if (!isLoading && data) {
			setTrainers(data)
		}
	}, [data, isLoading])

	return (
		<div className={styles.trainersCards}>
			{isLoading ? (
				<h2>Loading...</h2>
			) : trainers.length ? (
				<div className={styles.embla}>
					<div className={styles.emblaViewport} ref={emblaRef}>
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
											<p>price: {trainer.price}$</p>
											<p>
												email: <a href={`mailto:${trainer.email}`}>{trainer.email}</a>
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className={styles.emblaButtons}>
							<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
							<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
						</div>
					</div>
				</div>
			) : (
				<div className={styles.errorDiv}>
					<h2>Trainers not found</h2>
				</div>
			)}
		</div>
	)
}

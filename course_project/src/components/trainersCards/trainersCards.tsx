'use client'

import { useClient } from '@/hooks/queryHooks/clients/useClient'
import { useTrainers } from '@/hooks/queryHooks/trainers/useTrainers'
import { useSetJWT } from '@/hooks/useSetJWT'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { MdPersonAdd, MdPersonAddDisabled } from 'react-icons/md'
import axios from '../../utils/axiosConfig'
import { Slider } from '../emblaCarousel/slider'
import { TrainersReport } from '../reports/trainersReport'
import styles from './trainersCards.module.scss'

export function TrainersCards() {
	const { data, isLoading } = useTrainers()
	const [isClientIdValid, setClientIdValid] = useState(true)
	const queryClient = useQueryClient()
	const clientId = Cookies.get('clientId') ?? 'not a client'

	useEffect(() => {
		setClientIdValid(!!(clientId && !isNaN(parseInt(clientId)) && isFinite(parseInt(clientId))))
	}, [])

	useSetJWT()
	const client = useClient(parseInt(clientId))

	async function invalidateClientQuery() {
		queryClient.invalidateQueries({ queryKey: ['client', parseInt(clientId)] })
	}

	async function subscribeHandler(trainerId: number) {
		const clientTrainerId = client.data?.trainerId ? client.data.trainerId : null
		let queryTrainerId: null | number = null

		if (clientTrainerId) {
			if (clientTrainerId !== trainerId) {
				alert('you can be subscribed only at one trainer, please unsubscribe your trainer first')
				return
			}
		} else {
			queryTrainerId = trainerId
		}

		const queryData = {
			data: {
				trainerId: queryTrainerId,
			},
		}

		const response = await axios.put(`clients/${client.data?.id}`, queryData)
		if (response.status === 200) {
			invalidateClientQuery()
		} else {
			alert('error')
		}
	}

	return (
		<div className={styles.trainersCards}>
			{isLoading ? (
				<div className={styles.loadingDiv}>
					<h2>Loading...</h2>
				</div>
			) : data && data.length ? (
				<>
					<Slider>
						<div className={styles.emblaContainer}>
							{data.map((trainer: ITrainer) => (
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
										{isClientIdValid && (
											<div className={styles.buttonDiv}>
												<button onClick={() => subscribeHandler(trainer.id)}>
													{client.data?.trainerId === trainer.id ? (
														<MdPersonAddDisabled size={30} />
													) : (
														<MdPersonAdd size={30} />
													)}
												</button>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</Slider>
					<div className={styles.reportsDiv}>
						<TrainersReport trainers={data} />
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

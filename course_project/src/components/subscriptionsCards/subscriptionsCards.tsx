'use client'

import { useSubscriptionClients } from '@/hooks/queryHooks/subscriptions/useSubscriptionClients'
import { useSubscriptions } from '@/hooks/queryHooks/subscriptions/useSubscriptions'
import { useSetJWT } from '@/hooks/useSetJWT'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { MdAttachMoney } from 'react-icons/md'
import axios from '../../utils/axiosConfig'
import { Slider } from '../emblaCarousel/slider'
import styles from './subscriptionsCards.module.scss'

export function SubscriptionsCards() {
	const { data, isLoading } = useSubscriptions()
	const [isClientIdValid, setClientIdValid] = useState(true)
	const queryClient = useQueryClient()
	const clientId = Cookies.get('clientId') ?? 'not a client'

	useEffect(() => {
		setClientIdValid(!!(clientId && !isNaN(parseInt(clientId)) && isFinite(parseInt(clientId))))
	}, [])

	useSetJWT()
	const clientSubscriptions = useSubscriptionClients(parseInt(clientId))

	async function invalidateClientSubscriptionsQuery() {
		queryClient.invalidateQueries({ queryKey: ['subscriptions-client'] })
	}

	async function subscribeHandler(subscriptionId: number, subscriptionDuration: number) {
		let isSubscriptionExists = false
		clientSubscriptions.data?.forEach(clientSubscription => {
			if (clientSubscription.subscriptionId === subscriptionId) {
				isSubscriptionExists = true
				subscriptionDuration += clientSubscription.daysLeft
			}
		})

		const queryData = {
			clientId: parseInt(clientId),
			subscriptionId: subscriptionId,
			daysLeft: subscriptionDuration,
		}

		if (isSubscriptionExists) {
			const response = await axios.put('subscription-clients', queryData)
			if (response.status === 200) {
				invalidateClientSubscriptionsQuery()
			} else {
				alert('query error')
			}
		} else {
			const response = await axios.post('subscription-clients/create', queryData)
			if (response.status === 201) {
				invalidateClientSubscriptionsQuery()
			} else {
				alert('query error')
			}
		}
	}

	return (
		<div className={styles.subscriptionsCards}>
			{isLoading ? (
				<div className={styles.loadingDiv}>
					<h2>Loading...</h2>
				</div>
			) : data && data.length ? (
				<>
					<Slider>
						<div className={styles.emblaContainer}>
							{data.map((subscription: ISubscription) => (
								<div className={styles.emblaSlide} key={subscription.id}>
									<div className={styles.slideContent}>
										<h2>{subscription.name}</h2>
										<div className={styles.subscriptionData}>
											<p>duration: {subscription.duration} days</p>
											<p>price: {subscription.price} $</p>
											<p>price per day: {(subscription.price / subscription.duration).toFixed(2)}</p>
										</div>
										{isClientIdValid && (
											<div className={styles.buttonDiv}>
												<button onClick={() => subscribeHandler(subscription.id, subscription.duration)}>
													<MdAttachMoney size={30} />
												</button>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</Slider>
					{clientSubscriptions.data?.length ? (
						<div className={styles.clientSubscriptions}>
							<h2>yours subscriptions</h2>
							<Slider>
								<div className={styles.emblaContainer}>
									{clientSubscriptions.data.map(subscription => (
										<div className={styles.emblaSlide} key={subscription.subscriptionId}>
											<div className={styles.slideContent}>
												<h2>{subscription.subscription.name}</h2>
												<p>days left: {subscription.daysLeft} days</p>
											</div>
										</div>
									))}
								</div>
							</Slider>
						</div>
					) : isClientIdValid ? (
						<div className={styles.clientSubscriptions}>
							<h2>sorry, but you didn't buy any subscriptions yet</h2>
							<p>or your subscription has expired</p>
						</div>
					) : (
						<div className={styles.clientSubscriptions}>
							<h2>sorry, you aren't client and can't buy any subscriptions</h2>
							<p>try register as client to see yours subscriptions</p>
						</div>
					)}
				</>
			) : (
				<div className={styles.errorDiv}>
					<h2>Subscriptions not found</h2>
				</div>
			)}
		</div>
	)
}

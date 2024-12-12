import { SubscriptionsCards } from '@/components/subscriptionsCards/subscriptionsCards'
import styles from './subscriptions.module.scss'

export function SubscriptionsPage() {
	return (
		<main className={styles.main}>
			<h1>Our subscriptions</h1>
			<SubscriptionsCards />
		</main>
	)
}

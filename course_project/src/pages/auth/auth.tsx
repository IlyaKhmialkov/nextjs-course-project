import { Form } from '@/components/form/form'
import Link from 'next/link'
import styles from './auth.module.scss'

export function Auth() {
	return (
		<main className={`${styles.main}`}>
			<div className={styles.formContainer}>
				<h2>Log in</h2>
				<hr />
				<Form buttonText='Sign in' />
				<hr />
				<div className={styles.regDiv}>
					<p>Don't have an account?</p>
					<Link href='/registration'>sign up</Link>
				</div>
			</div>
		</main>
	)
}

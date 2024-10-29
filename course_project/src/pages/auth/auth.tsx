import { AuthForm } from '@/components/forms/auth.form'
import Link from 'next/link'
import styles from './auth.module.scss'

export function Auth() {
	return (
		<main className={`${styles.main}`}>
			<div className={styles.formContainer}>
				<h2>log in</h2>
				<hr />
				<AuthForm />
				<hr />
				<div className={styles.regDiv}>
					<p>Don't have an account?</p>
					<Link href='/registration'>sign up</Link>
				</div>
			</div>
		</main>
	)
}

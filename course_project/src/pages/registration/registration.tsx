import { Form } from '@/components/form/form'
import Link from 'next/link'
import styles from './registration.module.scss'

export function Registration() {
	return (
		<main className={`${styles.main}`}>
			<div className={styles.formContainer}>
				<h2>Sign up</h2>
				<hr />
				<Form buttonText='Create account' />
				<hr />
				<div className={styles.authDiv}>
					<p>already have an account?</p>
					<Link href='/auth'>log in</Link>
				</div>
			</div>
		</main>
	)
}

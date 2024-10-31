import Link from 'next/link'
import styles from './logo.module.scss'

export function Logo() {
	return (
		<div className={styles.logo}>
			<Link href={'/'} className={styles.logoLink}>
				<h2 className={styles.logoText}>Tren Master</h2>
			</Link>
		</div>
	)
}

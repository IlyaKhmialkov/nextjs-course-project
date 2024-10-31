import { Logo } from '../logo/logo'
import styles from './header.module.scss'
import { Navigation } from './navigation/navigation'

export function Header() {
	return (
		<header className={styles.header}>
			<Logo />
			<Navigation />
		</header>
	)
}

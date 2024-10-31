import { FaGithub, FaPhoneVolume } from 'react-icons/fa'
import { MdOutgoingMail } from 'react-icons/md'
import { Logo } from '../logo/logo'
import styles from './footer.module.scss'

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.contacts}>
				<a href='tel:+123456789'>
					<div>
						<FaPhoneVolume size={30} />
						<p>phone</p>
					</div>
				</a>
				<a href='mailto:example@example.com'>
					<div>
						<MdOutgoingMail size={30} />
						<p>email</p>
					</div>
				</a>
				<a href='https://github.com/IlyaKhmialkov'>
					<div>
						<FaGithub size={30} />
						<p>GitHub</p>
					</div>
				</a>
			</div>
			<div className={styles.logoDiv}>
				<Logo />
			</div>
		</footer>
	)
}

import { FaPerson } from 'react-icons/fa6'
import styles from './inputField.module.scss'

export function NameInputField() {
	return (
		<div className={styles.inputDiv}>
			<label htmlFor='name'>
				<div className={styles.iconDiv}>
					<FaPerson size={20} />
				</div>
			</label>
			<input type='text' id='name' name='name' placeholder='enter your name' autoComplete='on' required />
		</div>
	)
}

import { FaPersonHalfDress } from 'react-icons/fa6'
import styles from './inputField.module.scss'

export function GenderInputField() {
	return (
		<div className={styles.inputDiv}>
			<label htmlFor='gender'>
				<div className={styles.iconDiv}>
					<FaPersonHalfDress size={20} />
				</div>
			</label>
			<input type='text' id='gender' name='gender' placeholder='enter your gender' autoComplete='on' required />
		</div>
	)
}

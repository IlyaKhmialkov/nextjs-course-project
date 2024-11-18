import { FaCalendarDay } from 'react-icons/fa6'
import styles from './inputField.module.scss'

export function AgeInputField() {
	return (
		<div className={styles.inputDiv}>
			<label htmlFor='age'>
				<div className={styles.iconDiv}>
					<FaCalendarDay size={20} />
				</div>
			</label>
			<input type='text' id='age' name='age' placeholder='enter your age' autoComplete='on' required />
		</div>
	)
}

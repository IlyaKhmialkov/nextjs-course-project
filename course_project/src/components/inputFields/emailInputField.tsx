import { IoMail } from 'react-icons/io5'
import styles from './inputField.module.scss'

interface IEmailInputProps {
	id?: string
}

export function EmailInputField({ id }: IEmailInputProps) {
	const inputId = id ? `email${id}` : 'email'
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}>
				<div className={styles.iconDiv}>
					<IoMail size={20} />
				</div>
			</label>
			<input type='text' id={inputId} name='email' placeholder='enter your email' autoComplete='email' required />
		</div>
	)
}

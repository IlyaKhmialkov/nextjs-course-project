import { IoMail } from 'react-icons/io5'
import styles from './inputField.module.scss'

interface IEmailInputProps {
	id?: string
	defVal?: string
}

export function EmailInputField({ id, defVal }: IEmailInputProps) {
	const inputId = id ? `email${id}` : 'email'
	let inputProps = {
		type: 'text',
		id: inputId,
		name: inputId,
		placeholder: 'enter your email',
		autoComplete: 'email',
		required: true,
		defaultValue: '',
	}

	if (defVal) {
		inputProps.defaultValue = defVal
	}

	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}>
				<div className={styles.iconDiv}>
					<IoMail size={20} />
				</div>
			</label>
			<input {...inputProps} />
		</div>
	)
}

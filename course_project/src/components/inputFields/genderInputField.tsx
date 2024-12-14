import { FaPersonHalfDress } from 'react-icons/fa6'
import styles from './inputField.module.scss'

interface IGenderInputProps {
	defVal?: string
}

export function GenderInputField({ defVal }: IGenderInputProps) {
	let inputProps = {
		type: 'text',
		id: 'gender',
		name: 'gender',
		placeholder: 'enter your gender',
		autoComplete: 'on',
		required: true,
		defaultValue: '',
	}

	if (defVal) {
		inputProps.defaultValue = defVal
	}
	return (
		<div className={styles.inputDiv}>
			<label htmlFor='gender'>
				<div className={styles.iconDiv}>
					<FaPersonHalfDress size={20} />
				</div>
			</label>
			<input {...inputProps} />
		</div>
	)
}

import { FaCalendarDay } from 'react-icons/fa6'
import styles from './inputField.module.scss'

interface IAgeInputProps {
	defVal?: number
}

export function AgeInputField({ defVal }: IAgeInputProps) {
	let inputProps = {
		type: 'text',
		id: 'age',
		name: 'age',
		placeholder: 'enter your age',
		autoComplete: 'on',
		required: true,
		defaultValue: 0,
	}

	if (defVal) {
		inputProps.defaultValue = defVal
	}
	return (
		<div className={styles.inputDiv}>
			<label htmlFor='age'>
				<div className={styles.iconDiv}>
					<FaCalendarDay size={20} />
				</div>
			</label>
			<input {...inputProps} />
		</div>
	)
}

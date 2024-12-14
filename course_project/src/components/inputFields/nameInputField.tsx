import { FaPerson } from 'react-icons/fa6'
import styles from './inputField.module.scss'

interface INameInputProps {
	id?: string
	noIcon?: boolean
	defVal?: string
}

export function NameInputField({ id, noIcon, defVal }: INameInputProps) {
	const inputId = id ? `name-${id}` : 'name'
	let inputProps = {
		className: '',
		type: 'text',
		id: inputId,
		name: inputId,
		placeholder: 'enter name',
		autoComplete: 'off',
		required: true,
		defaultValue: '',
	}

	if (noIcon) {
		inputProps.placeholder = 'enter your name'
		inputProps.autoComplete = 'on'
		inputProps.className = styles.simple
	}

	if (defVal) {
		inputProps.defaultValue = defVal
	}

	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}>
				{!noIcon && (
					<div className={styles.iconDiv}>
						<FaPerson size={20} />
					</div>
				)}
			</label>
			<input {...inputProps} />
		</div>
	)
}

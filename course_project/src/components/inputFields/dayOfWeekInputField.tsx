import styles from './inputField.module.scss'

interface IDayOfWeekInputProps {
	id?: string
	defVal?: number
}

export function DayOfWeekInputField({ id, defVal }: IDayOfWeekInputProps) {
	const inputId = id ? `dayOfWeek-${id}` : 'dayOfWeek'

	let inputProps = {
		className: styles.simple,
		type: 'number',
		id: inputId,
		name: inputId,
		placeholder: 'enter day of week',
		autoComplete: 'off',
		required: true,
		defaultValue: 0,
	}

	if (defVal) {
		inputProps.defaultValue = defVal
	}
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input {...inputProps} />
		</div>
	)
}

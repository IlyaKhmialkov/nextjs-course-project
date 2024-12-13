import styles from './inputField.module.scss'

interface IDayOfWeekInputProps {
	id?: string
}

export function DayOfWeekInputField({ id }: IDayOfWeekInputProps) {
	const inputId = id ? `dayOfWeek-${id}` : 'dayOfWeek'
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input
				className={styles.simple}
				type='number'
				id={inputId}
				name={inputId}
				autoComplete='off'
				placeholder='enter day of week...'
				required
			/>
		</div>
	)
}

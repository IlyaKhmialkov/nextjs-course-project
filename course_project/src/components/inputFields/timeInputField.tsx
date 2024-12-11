import styles from './inputField.module.scss'

interface ITimeInputProps {
	id?: string
}

export function TimeInputField({ id }: ITimeInputProps) {
	const inputId = id ? `time-${id}` : 'time'
	const todayTime = new Date()
	const hours = todayTime.getHours().toString().padStart(2, '0')
	const minutes = todayTime.getMinutes().toString().padStart(2, '0')
	const formatedTodayTime = `${hours}:${minutes}`
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input
				className={styles.simple}
				type='time'
				id={inputId}
				name={inputId}
				autoComplete='off'
				placeholder='HH:MM'
				pattern='\d{2}:\d{2}'
				defaultValue={formatedTodayTime}
				required
			/>
		</div>
	)
}
// 2023-11-06T21:00:00.000Z

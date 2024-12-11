import styles from './inputField.module.scss'

interface IDateInputProps {
	id?: string
}

export function DateInputField({ id }: IDateInputProps) {
	const inputId = id ? `date-${id}` : 'date'
	const todayDate = new Date().toLocaleDateString()
	const formatedTodayDate = todayDate.split('/')[2] + '-' + todayDate.split('/')[0] + '-' + todayDate.split('/')[1]
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input
				className={styles.simple}
				type='date'
				id={inputId}
				name={inputId}
				autoComplete='off'
				placeholder='YYYY-MM-DD'
				pattern='\d{4}-\d{2}-\d{2}'
				defaultValue={formatedTodayDate}
				required
			/>
		</div>
	)
}
// 2023-11-06T21:00:00.000Z

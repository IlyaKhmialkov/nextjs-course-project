import { FormEvent } from 'react'
import axios from '../../../../src/utils/axiosConfig'
import { DateInputField } from '../../inputFields/dateInputField'
import { TimeInputField } from '../../inputFields/timeInputField'
import styles from '../form.module.scss'

interface IAttendanceCreateFormProps {
	clientId: number
	invalidateMachinesQuery: () => Promise<void>
}

export function AttendanceCreateForm({ clientId, invalidateMachinesQuery }: IAttendanceCreateFormProps) {
	async function createSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const date = formData.get('date')
		const time = formData.get('time')
		const data = `${date}T${time}:00.000Z`

		const response = await axios.post<IAttendance | undefined>('/attendances/create', {
			date: data,
			clientId: clientId,
		})

		if (response.status === 201) {
			await invalidateMachinesQuery()
		}
	}
	return (
		<div>
			<form className={styles.form} onSubmit={createSubmitHandler}>
				<DateInputField />
				<TimeInputField />
				<button type='submit' className={styles.submitButton}>
					add attendance record
				</button>
			</form>
		</div>
	)
}

import { FormEvent } from 'react'
import axios from '../../../utils/axiosConfig'
import { IdInputField } from '../../inputFields/idInputField'
import styles from '../form.module.scss'

interface IAttendanceDeleteFormProps {
	invalidateMachinesQuery: () => Promise<void>
}

export function AttendanceDeleteForm({ invalidateMachinesQuery }: IAttendanceDeleteFormProps) {
	async function deleteSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const id = formData.get('id')

		const response = await axios.delete<IAttendance | undefined>(`/attendances/${id}`)

		if (response.status === 200) {
			await invalidateMachinesQuery()
		}
	}
	return (
		<div>
			<form className={styles.form} onSubmit={deleteSubmitHandler}>
				<IdInputField />
				<button type='submit' className={styles.submitButton}>
					delete attendance record
				</button>
			</form>
		</div>
	)
}

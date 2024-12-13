import { DayOfWeekInputField } from '@/components/inputFields/dayOfWeekInputField'
import { NameInputField } from '@/components/inputFields/nameInputField'
import { TimeInputField } from '@/components/inputFields/timeInputField'
import { FormEvent } from 'react'
import axios from '../../../utils/axiosConfig'
import styles from '../form.module.scss'

interface IProgramsCreateFormProps {
	clientId: number
	invalidateProgramsQuery: () => Promise<void>
}

export function ProgramsCreateForm({ clientId, invalidateProgramsQuery }: IProgramsCreateFormProps) {
	async function createSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const name = formData.get('name-create')
		const time = `1970-01-01T${formData.get('time-create')}:00.000Z`
		const dayOfWeek = parseInt(formData.get('dayOfWeek-create') as string)

		if (dayOfWeek > 7 || dayOfWeek < 1) {
			alert('day of week must be in range from 1 to 7')
			return
		}

		const response = await axios.post<ITrainingProgram | undefined>('/training-programs/create', {
			name: name as string,
			time: time,
			clientId: clientId,
			dayOfWeek: dayOfWeek,
		})

		if (response.status === 201) {
			await invalidateProgramsQuery()
		}
	}
	return (
		<div>
			<form className={styles.form} onSubmit={createSubmitHandler}>
				<TimeInputField id='create' />
				<NameInputField id='create' noIcon={true} />
				<DayOfWeekInputField id='create' />
				<button type='submit' className={styles.submitButton}>
					add program
				</button>
			</form>
		</div>
	)
}

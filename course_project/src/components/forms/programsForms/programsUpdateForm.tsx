import { DayOfWeekInputField } from '@/components/inputFields/dayOfWeekInputField'
import { NameInputField } from '@/components/inputFields/nameInputField'
import { TimeInputField } from '@/components/inputFields/timeInputField'
import { FormEvent } from 'react'
import axios from '../../../utils/axiosConfig'
import { IdInputField } from '../../inputFields/idInputField'
import styles from '../form.module.scss'

interface IProgramsUpdateFormProps {
	clientId: number
	invalidateProgramsQuery: () => Promise<void>
}

export function ProgramsUpdateForm({ clientId, invalidateProgramsQuery }: IProgramsUpdateFormProps) {
	async function updateSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const programId = formData.get('id-update')
		const name = formData.get('name-update')
		const time = `1970-01-01T${formData.get('time-update')}:00.000Z`
		const dayOfWeek = parseInt(formData.get('dayOfWeek-update') as string)

		if (dayOfWeek > 7 || dayOfWeek < 1) {
			alert('day of week must be in range from 1 to 7')
			return
		}

		const response = await axios.put<ITrainingProgram | undefined>(`/training-programs/${programId}`, {
			name: name as string,
			time: time,
			clientId: clientId,
			dayOfWeek: dayOfWeek,
		})

		if (response.status === 200) {
			await invalidateProgramsQuery()
		}
	}
	return (
		<div>
			<form className={styles.form} onSubmit={updateSubmitHandler}>
				<IdInputField id='update' />
				<TimeInputField id='update' />
				<NameInputField id='update' noIcon={true} />
				<DayOfWeekInputField id='update' />
				<button type='submit' className={styles.submitButton}>
					update program
				</button>
			</form>
		</div>
	)
}

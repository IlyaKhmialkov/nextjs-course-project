import { FormEvent } from 'react'
import axios from '../../../utils/axiosConfig'
import { IdInputField } from '../../inputFields/idInputField'
import styles from '../form.module.scss'

interface IProgramsDeleteFormProps {
	invalidateProgramsQuery: () => Promise<void>
}

export function ProgramsDeleteForm({ invalidateProgramsQuery }: IProgramsDeleteFormProps) {
	async function deleteSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const id = formData.get('id')

		const response = await axios.delete<ITrainingProgram | undefined>(`/training-programs/${id}`)

		if (response.status === 200) {
			await invalidateProgramsQuery()
		}
	}
	return (
		<div>
			<form className={styles.form} onSubmit={deleteSubmitHandler}>
				<IdInputField />
				<button type='submit' className={styles.submitButton}>
					delete program
				</button>
			</form>
		</div>
	)
}

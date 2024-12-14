import { NameInputField } from '@/components/inputFields/nameInputField'
import { useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import axios from '../../utils/axiosConfig'
import { AgeInputField } from '../inputFields/ageInputField'
import { EmailInputField } from '../inputFields/emailInputField'
import { GenderInputField } from '../inputFields/genderInputField'
import { Modal } from '../modal/modal'
import styles from './form.module.scss'

interface IProgramsUpdateFormProps {
	client?: IClient
}

export function ClientEditForm({ client }: IProgramsUpdateFormProps) {
	const [isModalOpen, setModalOpen] = useState(false)
	const queryClient = useQueryClient()

	async function updateSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const email = formData.get('email')
		const name = formData.get('name')
		const age = parseInt(formData.get('age') as string, 10)
		const gender = formData.get('gender')

		const response = await axios.put(`/clients/${client?.id}`, {
			data: {
				email: email,
				name: name,
				age: age,
				gender: gender,
			},
		})

		if (response.status === 200) {
			queryClient.invalidateQueries({ queryKey: ['client', client?.id] })
			setModalOpen(false)
		}
	}
	return (
		<div>
			{isModalOpen && (
				<Modal onClose={() => setModalOpen(false)}>
					<form className={styles.form} onSubmit={updateSubmitHandler}>
						<NameInputField defVal={client?.name} />
						<EmailInputField defVal={client?.email} />
						<AgeInputField defVal={client?.age} />
						<GenderInputField defVal={client?.gender} />
						<button type='submit' className={styles.submitButton}>
							update your data
						</button>
					</form>
				</Modal>
			)}

			<button type='button' className={styles.submitButton} onClick={() => setModalOpen(true)}>
				edit your data
			</button>
		</div>
	)
}

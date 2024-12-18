import { NameInputField } from '@/components/inputFields/nameInputField'
import { useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import axios from '../../utils/axiosConfig'
import { AgeInputField } from '../inputFields/ageInputField'
import { EmailInputField } from '../inputFields/emailInputField'
import { ExperienceInputField } from '../inputFields/experienceInputField'
import { GenderInputField } from '../inputFields/genderInputField'
import { PriceInputField } from '../inputFields/priceInputField'
import { Modal } from '../modal/modal'
import styles from './form.module.scss'

interface ITrainerEditFormProps {
	trainer?: ITrainer
}

export function TrainerEditForm({ trainer }: ITrainerEditFormProps) {
	const [isModalOpen, setModalOpen] = useState(false)
	const queryClient = useQueryClient()

	async function updateSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const email = formData.get('email')
		const name = formData.get('name')
		const age = parseInt(formData.get('age') as string, 10)
		const gender = formData.get('gender')
		const experience = parseInt(formData.get('exp') as string, 10)
		const price = parseInt(formData.get('price') as string, 10)

		const response = await axios.put(`/trainers/${trainer?.id}`, {
			email: email,
			name: name,
			age: age,
			gender: gender,
			experience: experience,
			price: price,
		})

		if (response.status === 200) {
			queryClient.invalidateQueries({ queryKey: ['trainer', trainer?.id] })
			setModalOpen(false)
		}
	}
	return (
		<div>
			{isModalOpen && (
				<Modal onClose={() => setModalOpen(false)}>
					<form className={styles.form} onSubmit={updateSubmitHandler}>
						<NameInputField defVal={trainer?.name} />
						<EmailInputField defVal={trainer?.email} />
						<AgeInputField defVal={trainer?.age} />
						<GenderInputField defVal={trainer?.gender} />
						<ExperienceInputField defVal={trainer?.experience} />
						<PriceInputField defVal={trainer?.price} />
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

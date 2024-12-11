import { SimpleInputField } from '@/components/inputFields/simpleInputField'
import { Modal } from '@/components/modal/modal'
import axios from '@/utils/axiosConfig'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import styles from './exerciseMachinesEdit.module.scss'

interface IEditFormProps {
	setModalVisible: Dispatch<SetStateAction<boolean>>
	id: number
	invalidateMachinesQuery: () => Promise<void>
}

export function EditForm({ setModalVisible, id, invalidateMachinesQuery }: IEditFormProps) {
	async function editSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = {
			name: formData.get('simple-name'),
			amount: parseInt(formData.get('simple-amount') as string, 10),
			description: formData.get('simple-description'),
		}
		const response = await axios.put<IExerciseMachine>(`/exercise-machines/${id}`, data)
		if (response.status === 200) {
			invalidateMachinesQuery()
			setModalVisible(false)
		} else {
			alert('error')
		}
	}

	return (
		<Modal onClose={() => setModalVisible(false)}>
			<h2>Enter new data</h2>
			<form onSubmit={editSubmitHandler}>
				<div>
					<p>exercise machine new name</p>
					<SimpleInputField id='name' />
				</div>
				<div>
					<p>new exercise machine new amount</p>
					<SimpleInputField id='amount' />
				</div>
				<div>
					<p>exercise machine new description</p>
					<SimpleInputField id='description' />
				</div>
				<button className={styles.submitButton}>submit</button>
			</form>
		</Modal>
	)
}

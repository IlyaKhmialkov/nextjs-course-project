import { SimpleInputField } from '@/components/inputFields/simpleInputField'
import { Modal } from '@/components/modal/modal'
import axios from '@/utils/axiosConfig'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import styles from './exerciseMachinesEdit.module.scss'

interface IAddFormProps {
	setModalVisible: Dispatch<SetStateAction<boolean>>
	exerciseMachines: IExerciseMachine[]
	setExerciseMachines: Dispatch<SetStateAction<IExerciseMachine[]>>
}

export function AddForm({ setModalVisible, exerciseMachines, setExerciseMachines }: IAddFormProps) {
	async function addSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const data = {
			name: formData.get('simple-name'),
			amount: parseInt(formData.get('simple-amount') as string, 10),
			pictureLink: formData.get('simple-link'),
			description: formData.get('simple-description'),
		}
		const response = await axios.post<IExerciseMachine>(`/exercise-machines/create`, data)
		if (response.status === 201) {
			setExerciseMachines([...exerciseMachines, response.data])
			setModalVisible(false)
		} else {
			alert('error')
		}
	}

	return (
		<Modal onClose={() => setModalVisible(false)}>
			<h2>Enter data</h2>
			<form onSubmit={addSubmitHandler}>
				<div>
					<p>new exercise machine name</p>
					<SimpleInputField id='name' />
				</div>
				<div>
					<p>new exercise machine amount</p>
					<SimpleInputField id='amount' />
				</div>
				<div>
					<p>new exercise machine picture link</p>
					<SimpleInputField id='link' />
				</div>
				<div>
					<p>new exercise machine description</p>
					<SimpleInputField id='description' />
				</div>
				<button className={styles.submitButton}>submit</button>
			</form>
		</Modal>
	)
}

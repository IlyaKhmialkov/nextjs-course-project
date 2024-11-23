import { SimpleInputField } from '@/components/inputFields/simpleInputField'
import { Modal } from '@/components/modal/modal'
import axios from '@/utils/axiosConfig'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import styles from './exerciseMachinesEdit.module.scss'

interface IEditFormProps {
	setModalVisible: Dispatch<SetStateAction<boolean>>
	id: number
	exerciseMachines: IExerciseMachine[]
	setExerciseMachines: Dispatch<SetStateAction<IExerciseMachine[]>>
}

export function EditForm({ setModalVisible, id, exerciseMachines, setExerciseMachines }: IEditFormProps) {
	async function editSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = {
			name: formData.get('simple-name'),
			amount: parseInt(formData.get('simple-amount') as string, 10),
			pictureLink: formData.get('simple-link'),
			description: formData.get('simple-description'),
		}
		const response = await axios.put<IExerciseMachine>(`/exercise-machines/${id}`, data)
		if (response.status === 200) {
			const updatedExerciseMachines = exerciseMachines.map(machine => {
				if (machine.id === id) {
					return {
						...machine,
						name: data.name as string,
						amount: data.amount,
						pictureLink: data.pictureLink as string,
						description: data.description as string,
					}
				} else {
					return machine
				}
			})
			setExerciseMachines(updatedExerciseMachines)
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
					<p>exercise machine new picture link</p>
					<SimpleInputField id='link' />
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

import { SimpleInputField } from '@/components/inputFields/simpleInputField'
import { Modal } from '@/components/modal/modal'
import { useExerciseMachines } from '@/hooks/queryHooks/exerciseMachines/useExerciseMachines'
import { FormEvent, useEffect, useState } from 'react'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa'
import { IoAddCircleSharp } from 'react-icons/io5'
import axios from '../../../utils/axiosConfig'
import styles from './section.module.scss'

export function ExerciseMachines() {
	const [isModalVisible, setModalVisible] = useState(false)
	const [isEditModalVisible, setEditModalVisible] = useState(false)
	const [isAddModalVisible, setAddModalVisible] = useState(false)
	const [editebleId, setEditebleId] = useState(0)
	const [exerciseMachines, setExerciseMachines] = useState<IExerciseMachine[]>([])
	const { data, isLoading } = useExerciseMachines()

	useEffect(() => {
		if (!isLoading && data) {
			setExerciseMachines(data)
		}
	}, [data, isLoading])

	async function deleteHandler(id: number) {
		try {
			await axios.delete<IExerciseMachine>(`/exercise-machines/${id}`)
			const updatedExerciseMachines = exerciseMachines.filter(machine => machine.id !== id)
			setExerciseMachines(updatedExerciseMachines)
		} catch {
			alert('you should delete all connections related to this machine group')
		}
	}
	async function editHandler(id: number) {
		setEditebleId(id)
		setEditModalVisible(true)
	}

	async function editSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = {
			name: formData.get('simple-name'),
			amount: parseInt(formData.get('simple-amount') as string, 10),
			pictureLink: formData.get('simple-link'),
			description: formData.get('simple-description'),
		}
		const response = await axios.put<IExerciseMachine>(`/exercise-machines/${editebleId}`, data)
		if (response.status === 200) {
			const updatedExerciseMachines = exerciseMachines.map(machine => {
				if (machine.id === editebleId) {
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
			setEditModalVisible(false)
		} else {
			alert('error')
		}
	}

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
			setAddModalVisible(false)
		} else {
			alert('error')
		}
	}

	return (
		<section className={styles.section}>
			<h2>exercise machines</h2>
			<div className={styles.buttonsDiv}>
				<button onClick={() => setModalVisible(true)}>get</button>
			</div>
			{isModalVisible && (
				<Modal onClose={() => setModalVisible(false)}>
					<div className={styles.modalDiv}>
						<h2>exercise machines</h2>
						<ul>
							<li className={styles.machineId}>id</li>
							<li className={styles.machineName}>name</li>
							<li className={styles.machineAmount}>amount</li>
							<li className={styles.machinedescription}>description</li>
							<li className={styles.actionBtn}></li>
							<li className={styles.actionBtn}></li>
						</ul>
						{isLoading ? (
							<h2>loading...</h2>
						) : exerciseMachines?.length ? (
							<>
								{exerciseMachines.map((machine: IExerciseMachine) => (
									<ul key={machine.id}>
										<li className={styles.machineId}>{machine.id}</li>
										<li className={styles.machineName}>{machine.name}</li>
										<li className={styles.machineAmount}>{machine.amount}</li>
										<li className={styles.machinedescription}>{machine.description.substring(0, 100) + '...'}</li>
										<li className={styles.actionBtn}>
											<button onClick={() => editHandler(machine.id)}>
												<FaEdit size={20} color='white' />
											</button>
										</li>
										<li className={styles.actionBtn}>
											<button onClick={() => deleteHandler(machine.id)}>
												<FaRegTrashAlt size={20} color='white' />
											</button>
										</li>
									</ul>
								))}
								<button className={styles.addButton} onClick={() => setAddModalVisible(true)}>
									<IoAddCircleSharp size={20} color='white' />
								</button>
							</>
						) : (
							<h2>Exercise machines not found</h2>
						)}
					</div>
				</Modal>
			)}
			{isEditModalVisible && (
				<Modal onClose={() => setEditModalVisible(false)}>
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
			)}
			{isAddModalVisible && (
				<Modal onClose={() => setAddModalVisible(false)}>
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
			)}
		</section>
	)
}

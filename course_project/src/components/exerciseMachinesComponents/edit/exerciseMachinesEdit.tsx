import { Modal } from '@/components/modal/modal'
import axios from '@/utils/axiosConfig'
import setJWTFromCookies from '@/utils/setJWTFromCookies'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa'
import { IoAddCircleSharp } from 'react-icons/io5'
import { AddForm } from './addForm'
import { EditForm } from './editForm'
import styles from './exerciseMachinesEdit.module.scss'

interface IExerciseMachinesEditProps {
	exerciseMachines: IExerciseMachine[]
	setExerciseMachines: Dispatch<SetStateAction<IExerciseMachine[]>>
}

export function ExerciseMachinesEdit({ exerciseMachines, setExerciseMachines }: IExerciseMachinesEditProps) {
	const [isModalVisible, setModalVisible] = useState(false)
	const [isEditModalVisible, setEditModalVisible] = useState(false)
	const [isAddModalVisible, setAddModalVisible] = useState(false)
	const [editebleId, setEditebleId] = useState(0)

	useEffect(() => {
		setJWTFromCookies()
	}, [])

	async function editHandler(id: number) {
		setEditebleId(id)
		setEditModalVisible(true)
	}

	async function deleteHandler(id: number) {
		try {
			await axios.delete<IExerciseMachine>(`/exercise-machines/${id}`)
			const updatedExerciseMachines = exerciseMachines.filter(machine => machine.id !== id)
			setExerciseMachines(updatedExerciseMachines)
		} catch {
			alert('you should delete all connections related to this machine group')
		}
	}

	return (
		<div className={styles.exerciseMachinesEdit}>
			<button className={styles.modalButton} onClick={() => setModalVisible(true)}>
				get exercise machines list
			</button>
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
						{exerciseMachines?.length ? (
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
				<EditForm
					setModalVisible={setEditModalVisible}
					id={editebleId}
					exerciseMachines={exerciseMachines}
					setExerciseMachines={setExerciseMachines}
				/>
			)}
			{isAddModalVisible && (
				<AddForm
					setModalVisible={setAddModalVisible}
					exerciseMachines={exerciseMachines}
					setExerciseMachines={setExerciseMachines}
				/>
			)}
		</div>
	)
}

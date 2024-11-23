import { SimpleInputField } from '@/components/inputFields/simpleInputField'
import { Modal } from '@/components/modal/modal'
import { useMachineMuscles } from '@/hooks/machineMuscles/useMachineMuscles'
import { FormEvent, useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoAddCircleSharp } from 'react-icons/io5'
import axios from '../../../utils/axiosConfig'
import styles from './section.module.scss'

export function MachineMuscles() {
	const [isModalVisible, setModalVisible] = useState(false)
	const [isAddModalVisible, setAddModalVisible] = useState(false)
	const [machineMuscles, setMachineMuscles] = useState<IMachineMuscle[]>([])
	const { data, isLoading } = useMachineMuscles()

	useEffect(() => {
		if (!isLoading && data) {
			setMachineMuscles(data)
		}
	}, [data, isLoading])

	async function deleteHandler(muscleGroupId: number, exerciseMachineId: number) {
		const data = {
			muscleGroupId: muscleGroupId,
			exerciseMachineId: exerciseMachineId,
		}
		try {
			await axios.delete<IMachineMuscle>(`/machine-muscles`, { data })
			const indexToRemove = machineMuscles.findIndex(
				machinemuscle =>
					machinemuscle.muscleGroupId === muscleGroupId && machinemuscle.exerciseMachineId === exerciseMachineId
			)

			const updatedMachineMuscles = [...machineMuscles]
			updatedMachineMuscles.splice(indexToRemove, 1)

			setMachineMuscles(updatedMachineMuscles)
		} catch (e) {
			console.log(e)
			alert('you should delete all connections related to this machinemachinemuscle')
		}
	}

	async function addSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = {
			muscleGroupId: parseInt(formData.get('simple-MuG') as string, 10),
			exerciseMachineId: parseInt(formData.get('simple-ExM') as string, 10),
		}
		const response = await axios.post<IMachineMuscle>(`/machine-muscles/create`, data)
		if (response.status === 201) {
			setMachineMuscles([...machineMuscles, response.data])
			setAddModalVisible(false)
		} else {
			alert('error')
		}
	}

	return (
		<section className={styles.section}>
			<h2>machinemuscle</h2>
			<div className={styles.buttonsDiv}>
				<button onClick={() => setModalVisible(true)}>get</button>
			</div>
			{isModalVisible && (
				<Modal onClose={() => setModalVisible(false)}>
					<div className={styles.modalDiv}>
						<h2>machinemuscle</h2>
						<ul>
							<li className={styles.MuGId}>muscleGroupId</li>
							<li className={styles.ExMId}>exerciseMachineId</li>
							<li className={styles.actionBtn}></li>
						</ul>
						{isLoading ? (
							<h2>loading...</h2>
						) : machineMuscles?.length ? (
							<>
								{machineMuscles.map((mm: IMachineMuscle) => (
									<ul key={mm.muscleGroupId + ' ' + mm.exerciseMachineId}>
										<li className={styles.MuGId}>{mm.muscleGroupId}</li>
										<li className={styles.ExMId}>{mm.exerciseMachineId}</li>
										<li className={styles.actionBtn}>
											<button onClick={() => deleteHandler(mm.muscleGroupId, mm.exerciseMachineId)}>
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
							<h2>MachineMuscle not found</h2>
						)}
					</div>
				</Modal>
			)}
			{isAddModalVisible && (
				<Modal onClose={() => setAddModalVisible(false)}>
					<h2>Enter data</h2>
					<form onSubmit={addSubmitHandler}>
						<div>
							<p>new muscleGroup id</p>
							<SimpleInputField id='MuG' />
						</div>
						<div>
							<p>new exerciseMachine id</p>
							<SimpleInputField id='ExM' />
						</div>
						<button className={styles.submitButton}>submit</button>
					</form>
				</Modal>
			)}
		</section>
	)
}

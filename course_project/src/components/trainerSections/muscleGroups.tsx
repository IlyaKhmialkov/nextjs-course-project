import { SimpleInputField } from '@/components/inputFields/simpleInputField'
import { Modal } from '@/components/modal/modal'
import { useMuscleGroups } from '@/hooks/queryHooks/muscleGroups/useMuscleGroups'
import { FormEvent, useEffect, useState } from 'react'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa'
import { IoAddCircleSharp } from 'react-icons/io5'
import axios from '../../utils/axiosConfig'
import styles from './section.module.scss'

export function MuscleGroups() {
	const [isModalVisible, setModalVisible] = useState(false)
	const [isEditModalVisible, setEditModalVisible] = useState(false)
	const [isAddModalVisible, setAddModalVisible] = useState(false)
	const [editebleId, setEditebleId] = useState(0)
	const [muscleGroups, setMuscleGroups] = useState<IMuscleGroup[]>([])
	const { data, isLoading } = useMuscleGroups()

	useEffect(() => {
		if (!isLoading && data) {
			setMuscleGroups(data)
		}
	}, [data, isLoading])

	async function deleteHandler(id: number) {
		try {
			await axios.delete<IMuscleGroup>(`/muscle-groups/${id}`)
			const updatedMuscleGroups = muscleGroups.filter(muscle => muscle.id !== id)
			setMuscleGroups(updatedMuscleGroups)
		} catch {
			alert('you should delete all connections related to this muscle group')
		}
	}
	async function editHandler(id: number) {
		setEditebleId(id)
		setEditModalVisible(true)
	}

	async function editSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const name = formData.get('simple')
		const data = {
			name: name,
		}
		const response = await axios.put<IMuscleGroup>(`/muscle-groups/${editebleId}`, data)
		if (response.status === 200) {
			const updatedMuscleGroups = muscleGroups.map(muscleGroup => {
				if (muscleGroup.id === editebleId && name) {
					return { ...muscleGroup, name: name.toString() }
				} else {
					return muscleGroup
				}
			})
			setMuscleGroups(updatedMuscleGroups)
			setEditModalVisible(false)
		} else {
			alert('error')
		}
	}

	async function addSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const name = formData.get('simple')
		const data = {
			name: name,
		}
		const response = await axios.post<IMuscleGroup>(`/muscle-groups/create`, data)
		if (response.status === 201) {
			setMuscleGroups([...muscleGroups, response.data])
			setAddModalVisible(false)
		} else {
			alert('error')
		}
	}

	return (
		<section className={styles.section}>
			<h2>muscle groups</h2>
			<div className={styles.buttonsDiv}>
				<button onClick={() => setModalVisible(true)}>get list</button>
			</div>
			{isModalVisible && (
				<Modal onClose={() => setModalVisible(false)}>
					<div className={styles.modalDiv}>
						<h2>muscle groups</h2>
						<ul>
							<li className={styles.muscleId}>id</li>
							<li className={styles.muscleName}>name</li>
							<li className={styles.actionBtn}></li>
							<li className={styles.actionBtn}></li>
						</ul>
						{isLoading ? (
							<h2>loading...</h2>
						) : muscleGroups?.length ? (
							<>
								{muscleGroups.map((muscle: IMuscleGroup) => (
									<ul key={muscle.id}>
										<li className={styles.muscleId}>{muscle.id}</li>
										<li className={styles.muscleName}>{muscle.name}</li>
										<li className={styles.actionBtn}>
											<button onClick={() => editHandler(muscle.id)}>
												<FaEdit size={20} color='white' />
											</button>
										</li>
										<li className={styles.actionBtn}>
											<button onClick={() => deleteHandler(muscle.id)}>
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
							<h2>Muscle groups not found</h2>
						)}
					</div>
				</Modal>
			)}
			{isEditModalVisible && (
				<Modal onClose={() => setEditModalVisible(false)}>
					<h2>Enter new data</h2>
					<form onSubmit={editSubmitHandler}>
						<div>
							<p>muscle group new name</p>
							<SimpleInputField />
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
							<p>new muscle group name</p>
							<SimpleInputField />
						</div>
						<button className={styles.submitButton}>submit</button>
					</form>
				</Modal>
			)}
		</section>
	)
}

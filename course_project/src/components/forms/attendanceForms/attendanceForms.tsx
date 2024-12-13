import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Modal } from '../../modal/modal'
import styles from '../form.module.scss'
import { AttendanceCreateForm } from './attendanceCreateForm'
import { AttendanceDeleteForm } from './attendanceDeleteForm'

interface IAttendanceFormProps {
	clientId: number
}

export function AttendanceForms({ clientId }: IAttendanceFormProps) {
	const [isCreateModalOpen, setCreateModalOpen] = useState(false)
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
	const queryClient = useQueryClient()

	async function invalidateMachinesQuery() {
		queryClient.invalidateQueries({ queryKey: ['attendances', clientId] })
	}

	return (
		<>
			{isCreateModalOpen && (
				<Modal onClose={() => setCreateModalOpen(false)}>
					<AttendanceCreateForm clientId={clientId} invalidateMachinesQuery={() => invalidateMachinesQuery()} />
				</Modal>
			)}
			<button type='button' className={styles.submitButton} onClick={() => setCreateModalOpen(true)}>
				create new attendance
			</button>

			{isDeleteModalOpen && (
				<Modal onClose={() => setDeleteModalOpen(false)}>
					<AttendanceDeleteForm invalidateMachinesQuery={() => invalidateMachinesQuery()} />
				</Modal>
			)}
			<button type='button' className={styles.submitButton} onClick={() => setDeleteModalOpen(true)}>
				delete program
			</button>
		</>
	)
}

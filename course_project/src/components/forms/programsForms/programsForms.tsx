import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Modal } from '../../modal/modal'
import styles from '../form.module.scss'
import { ProgramsCreateForm } from './programsCreateForm'
import { ProgramsDeleteForm } from './programsDeleteForm'
import { ProgramsUpdateForm } from './programsUpdateForm'

interface IProgramsFormsProps {
	clientId: number
}

export function ProgramsForms({ clientId }: IProgramsFormsProps) {
	const [isCreateModalOpen, setCreateModalOpen] = useState(false)
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
	const queryClient = useQueryClient()

	async function invalidateProgramsQuery() {
		queryClient.invalidateQueries({ queryKey: ['programs', clientId] })
	}

	return (
		<>
			{isCreateModalOpen && (
				<Modal onClose={() => setCreateModalOpen(false)}>
					<ProgramsCreateForm clientId={clientId} invalidateProgramsQuery={() => invalidateProgramsQuery()} />
				</Modal>
			)}
			<button type='button' className={styles.submitButton} onClick={() => setCreateModalOpen(true)}>
				create new program
			</button>

			{isUpdateModalOpen && (
				<Modal onClose={() => setUpdateModalOpen(false)}>
					<ProgramsUpdateForm clientId={clientId} invalidateProgramsQuery={() => invalidateProgramsQuery()} />
				</Modal>
			)}
			<button type='button' className={styles.submitButton} onClick={() => setUpdateModalOpen(true)}>
				update program
			</button>

			{isDeleteModalOpen && (
				<Modal onClose={() => setDeleteModalOpen(false)}>
					<ProgramsDeleteForm invalidateProgramsQuery={() => invalidateProgramsQuery()} />
				</Modal>
			)}
			<button type='button' className={styles.submitButton} onClick={() => setDeleteModalOpen(true)}>
				delete program
			</button>
		</>
	)
}

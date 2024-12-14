import { Modal } from '@/components/modal/modal'
import { useClients } from '@/hooks/queryHooks/clients/useClients'
import { useState } from 'react'
import styles from './section.module.scss'

export function Users() {
	const [isModalVisible, setModalVisible] = useState(false)
	const { data, isLoading } = useClients()

	return (
		<section className={styles.section}>
			<h2>clients</h2>
			<div className={styles.buttonsDiv}>
				<button onClick={() => setModalVisible(true)}>get</button>
			</div>
			{isModalVisible && (
				<Modal onClose={() => setModalVisible(false)}>
					<div className={styles.modalDiv}>
						<ul>
							<li className={styles.clientId}>id</li>
							<li className={styles.clientName}>name</li>
							<li className={styles.clientAge}>age</li>
							<li className={styles.clientGender}>gender</li>
							<li className={styles.clientEmail}>email</li>
							<li className={styles.clientTrainerId}>trainer id</li>
						</ul>
						{isLoading ? (
							<h2>loading...</h2>
						) : data?.length ? (
							data.map((client: IClient) => (
								<ul key={client.id}>
									<li className={styles.clientId}>{client.id}</li>
									<li className={styles.clientName}>{client.name}</li>
									<li className={styles.clientAge}>{client.age}</li>
									<li className={styles.clientGender}>{client.gender}</li>
									<li className={styles.clientEmail}>{client.email}</li>
									<li className={styles.clientTrainerId}>{client.trainerId}</li>
								</ul>
							))
						) : (
							<h2>Clients not found</h2>
						)}
					</div>
				</Modal>
			)}
		</section>
	)
}

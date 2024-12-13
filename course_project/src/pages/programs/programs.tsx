'use client'

import { ProgramsForms } from '@/components/forms/programsForms/programsForms'
import { ProgramsTable } from '@/components/tables/programsTable'
import { useClient } from '@/hooks/queryHooks/clients/useClient'
import { usePrograms } from '@/hooks/queryHooks/programs/usePrograms'
import { useSetJWT } from '@/hooks/useSetJWT'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import styles from './programs.module.scss'

export function ProgramsPage() {
	const [isIdValid, setIdValid] = useState(true)
	const [isDataValid, setDataValid] = useState(false)
	const clientId = Cookies.get('clientId') ?? 'not a client'

	useEffect(() => {
		setIdValid(!!(clientId && !isNaN(parseInt(clientId)) && isFinite(parseInt(clientId))))
	}, [])

	useSetJWT()

	const client = useClient(parseInt(clientId))
	const programs = usePrograms(parseInt(clientId))

	useEffect(() => {
		setDataValid(!(client.isLoading || programs.isLoading))
	}, [client, programs])

	return (
		<main className={styles.main}>
			{isIdValid ? (
				!isDataValid ? (
					<div className={styles.loadingDiv}>
						<h1>Loading...</h1>
					</div>
				) : (
					<div className={styles.infoDiv}>
						<div className={styles.infoHeader}>
							<h2>Welcome, {client.data?.name}</h2>
							<p>Take a look at yours training programs</p>
						</div>
						<div className={styles.attendanceDiv}>
							{programs.data?.length ? (
								<ProgramsTable programs={programs.data} />
							) : (
								<h2>Sorry, but you dont have training programs</h2>
							)}
						</div>
						<ProgramsForms clientId={parseInt(clientId)} />
					</div>
				)
			) : (
				<div className={styles.notAClientDiv}>
					<h1>Error</h1>
					<h2>Sorry, it looks like you are not a client of our gym</h2>
					<p>try register as client to get access to this page</p>
				</div>
			)}
		</main>
	)
}

'use client'

import { AttendanceForms } from '@/components/forms/attendanceForms/attendanceForms'
import { AttendencesTable } from '@/components/tables/attendencesTable'
import { useAttendances } from '@/hooks/queryHooks/attendances/useAttendances'
import { useClient } from '@/hooks/queryHooks/clients/useClient'
import { useSetJWT } from '@/hooks/useSetJWT'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import styles from './attendance.module.scss'

export function AttendancePage() {
	const [isIdValid, setIdValid] = useState(true)
	const [isDataValid, setDataValid] = useState(true)
	const clientId = Cookies.get('clientId') ?? 'not a client'

	useEffect(() => {
		setIdValid(!!(clientId && !isNaN(parseInt(clientId)) && isFinite(parseInt(clientId))))
	}, [])

	useSetJWT()

	const client = useClient(parseInt(clientId))
	const attendances = useAttendances(parseInt(clientId))

	useEffect(() => {
		setDataValid(client.isLoading && attendances.isLoading)
	}, [client.isLoading, attendances.isLoading])

	return (
		<main className={styles.main}>
			{isIdValid ? (
				isDataValid ? (
					<div className={styles.loadingDiv}>
						<h1>Loading...</h1>
					</div>
				) : (
					<div className={styles.infoDiv}>
						<div className={styles.infoHeader}>
							<h2>Welcome, {client.data?.name}</h2>
							<p>Take a look at yours gym attendance</p>
						</div>
						<div className={styles.attendanceDiv}>
							{attendances.data?.length ? (
								<AttendencesTable attendances={attendances.data} />
							) : (
								<h2>Sorry, but you dont have attendance records</h2>
							)}
						</div>
						<AttendanceForms clientId={parseInt(clientId)} />
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

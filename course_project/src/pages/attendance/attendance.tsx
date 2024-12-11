'use client'
import { DateInputField } from '@/components/inputFields/dateInputField'
import { IdInputField } from '@/components/inputFields/idInputField'
import { TimeInputField } from '@/components/inputFields/timeInputField'
import { AttendencesTable } from '@/components/tables/attendencesTable'
import { useAttendances } from '@/hooks/queryHooks/attendances/useAttendances'
import { useClient } from '@/hooks/queryHooks/clients/useClient'
import { useSetJWT } from '@/hooks/useSetJWT'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { FormEvent, useEffect, useState } from 'react'
import axios from '../../../src/utils/axiosConfig'
import styles from './attendance.module.scss'

export function AttendancePage() {
	const [isIdValid, setIdValid] = useState(true)
	const [isDataValid, setDataValid] = useState(true)
	const queryClient = useQueryClient()
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

	async function invalidateMachinesQuery() {
		queryClient.invalidateQueries({ queryKey: ['attendances', parseInt(clientId)] })
	}

	async function createSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const date = formData.get('date')
		const time = formData.get('time')
		const data = `${date}T${time}:00.000Z`

		const response = await axios.post<IAttendance | undefined>('/attendances/create', {
			date: data,
			clientId: parseInt(clientId),
		})

		if (response.status === 201) {
			await invalidateMachinesQuery()
		}
	}
	async function deleteSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const id = formData.get('id')

		const response = await axios.delete<IAttendance | undefined>(`/attendances/${id}`)

		if (response.status === 200) {
			await invalidateMachinesQuery()
		}
	}

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
						<div>
							<form className={styles.form} onSubmit={createSubmitHandler}>
								<div className={styles.formInputs}>
									<DateInputField />
									<TimeInputField />
								</div>
								<button type='submit' className={styles.submitButton}>
									add attendance record
								</button>
							</form>
						</div>
						<div>
							<form className={styles.form} onSubmit={deleteSubmitHandler}>
								<IdInputField />
								<button type='submit' className={styles.submitButton}>
									delete attendance record
								</button>
							</form>
						</div>
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

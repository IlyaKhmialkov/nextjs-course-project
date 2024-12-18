'use client'
import { ClientEditForm } from '@/components/forms/clientEditForm'
import { useClient } from '@/hooks/queryHooks/clients/useClient'
import { useSetJWT } from '@/hooks/useSetJWT'
import { removeCookies } from '@/utils/logOut'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './client.module.scss'

export function Client() {
	const router = useRouter()
	const role = Cookies.get('role')
	const clientId = role === 'client' ? Cookies.get('id') ?? 'not a client' : 'not a client'
	const [isClient, setIsClient] = useState(true)
	const [isDataValid, setDataValid] = useState(false)

	useEffect(() => {
		setIsClient(!!clientId && !isNaN(parseInt(clientId)) && isFinite(parseInt(clientId)))
	}, [role])

	useSetJWT()

	const client = useClient(parseInt(clientId))

	useEffect(() => {
		setDataValid(!client.isLoading && !!client.data)
	}, [client])

	function logOut() {
		removeCookies()
		router.replace('/')
	}

	return (
		<>
			<main className={styles.main}>
				{isClient ? (
					isDataValid ? (
						<div className={styles.infoDiv}>
							<div className={styles.infoHeader}>
								<h2>Welcome, {client.data?.name}</h2>
								<p>your age: {client.data?.age}</p>
								<p>your email: {client.data?.email}</p>
								<p>your gender: {client.data?.gender}</p>
							</div>
							<ClientEditForm client={client.data} />
							<button onClick={() => logOut()}>log out</button>
						</div>
					) : (
						<div className={styles.loadingDiv}>
							<h1>Loading...</h1>
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
		</>
	)
}

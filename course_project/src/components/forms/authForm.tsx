'use client'
import { authSubmitHandler } from '@/utils/queries/authSubmitHandler'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { EmailInputField } from '../inputFields/emailInputField'
import { PasswordInputField } from '../inputFields/passwordInputField'
import styles from './form.module.scss'

interface IResponse {
	error?: string
	token?: string
	role?: string
	id?: string
}

export function Form() {
	const router = useRouter()

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		const responseData: IResponse = JSON.parse(await authSubmitHandler({ e }))
		if (responseData.token && responseData.role) {
			Cookies.set('token', responseData.token, { expires: 30 })
			Cookies.set('role', responseData.role, { expires: 30 })

			responseData.id && Cookies.set('id', responseData.id, { expires: 30 })

			if (responseData.role === 'client') {
				router.replace('/client')
			} else {
				router.replace('/trainer')
			}
		}
		if (responseData.error) {
			alert(responseData.error)
		}
	}

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<EmailInputField />
			<PasswordInputField />
			<button type='submit' className={styles.submitButton}>
				Sign in
			</button>
		</form>
	)
}

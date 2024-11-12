'use client'
import { authSubmitHandler } from '@/utils/authSubmitHandler'
import { setAuthHeader } from '@/utils/axiosConfig'
import { ChangePasswordHandler } from '@/utils/changePasswordHandler'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent, useRef } from 'react'
import { EmailInputField } from '../inputFields/emailInputField'
import { PasswordInputField } from '../inputFields/passwordInputField'
import styles from './form.module.scss'

interface IResponse {
	error?: string
	token?: string
	role?: string
}

export function Form() {
	const emailInput = useRef<HTMLInputElement>(null)
	const passwordInput = useRef<HTMLInputElement>(null)
	const router = useRouter()

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		const responseData: IResponse = JSON.parse(await authSubmitHandler(e))
		if (responseData.token && responseData.role) {
			Cookies.set('token', responseData.token, { expires: 30 })
			Cookies.set('role', responseData.role, { expires: 30 })
			setAuthHeader(responseData.token)

			if (responseData.role === 'client') {
				router.replace('/auth') //                                            REPLACE TO /client
			} else {
				router.replace('/auth') //                                            REPLACE TO /trainer
			}
		}
		if (responseData.error) {
			console.log(responseData.error)
		}
	}

	async function changePasswordHandler() {
		if (emailInput.current && passwordInput.current) {
			const response = await ChangePasswordHandler(emailInput.current?.value, passwordInput.current?.value)
			if (response?.toString() === 'true') {
				alert('password successfully changed')
			}
		} else {
			alert('Error: eamil or password empty')
		}
	}

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<EmailInputField currentRef={emailInput} />

			<PasswordInputField currentRef={passwordInput} />

			<button type='submit' className={styles.submitButton}>
				Sign in
			</button>
			<button type='button' className={styles.changePasswordButton} onClick={changePasswordHandler}>
				Change password
			</button>
		</form>
	)
}

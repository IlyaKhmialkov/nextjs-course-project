'use client'
import { setAuthHeader } from '@/utils/axiosConfig'
import { regSubmitHandler } from '@/utils/queries/regSubmitHandler'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { AgeInputField } from '../inputFields/ageInputField'
import { EmailInputField } from '../inputFields/emailInputField'
import { GenderInputField } from '../inputFields/genderInputField'
import { NameInputField } from '../inputFields/nameInputField'
import { PasswordInputField } from '../inputFields/passwordInputField'
import styles from './form.module.scss'

interface IResponse {
	response?: string
	error?: string
	token?: string
	role?: string
}

export function Form() {
	const router = useRouter()

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		const responseData: IResponse = JSON.parse(await regSubmitHandler(e))
		if (responseData.token && responseData.role) {
			Cookies.set('token', responseData.token, { expires: 30 })
			Cookies.set('role', responseData.role, { expires: 30 })
			setAuthHeader(responseData.token)

			if (responseData.role === 'client') {
				router.replace('/client')
			} else {
				router.replace('/trainer')
			}
		}
		if (responseData.error) {
			console.log(responseData.error)
		}
	}

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<NameInputField />
			<AgeInputField />
			<GenderInputField />
			<EmailInputField />
			<PasswordInputField />

			<button type='submit' className={styles.submitButton}>
				register
			</button>
		</form>
	)
}

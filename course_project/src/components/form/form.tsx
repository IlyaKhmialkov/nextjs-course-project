'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent, useRef } from 'react'
import axios, { setAuthHeader } from '../../utils/axiosConfig'
import { EmailInputField } from '../inputFields/emailInputField'
import { PasswordInputField } from '../inputFields/passwordInputField'
import styles from './form.module.scss'

interface IFormProps {
	buttonText: string
}

export function Form({ buttonText }: IFormProps) {
	const emailInput = useRef<HTMLInputElement>(null)
	const passwordInput = useRef<HTMLInputElement>(null)

	const router = useRouter()

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email')
		const password = formData.get('password')

		const response = await axios.post<string | null>('/auth/login', {
			email: email,
			password: password,
		})

		console.log(response.status)
		console.log(response.data)

		if (response.status === 200) {
			if (response.data) {
				Cookies.set('token', response.data, { expires: 30 })
				setAuthHeader(response.data)
				//router.replace('/profile')
			} else {
				console.log('u invalid') // ДОБАВИТЬ ОБРАБОТКУ СЛУЧАЯ, КОГДА ПОЧТА\ПАРОЛЬ НЕВЕРНЫ
			}
		} else {
			console.log('server error') // ДОБАВИТЬ ОБРАБОТКУ ОШИБКИ СЕРВЕРА
		}
	}

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<EmailInputField currentRef={emailInput} />

			<PasswordInputField currentRef={passwordInput} />

			<button type='submit' className={styles.submitButton}>
				{buttonText}
			</button>
			<button
				type='button'
				onClick={() => {
					Cookies.remove('token')
				}}
			>
				rem cookies
			</button>
		</form>
	)
}

'use client'
import { useRef } from 'react'
import { EmailInputField } from '../inputFields/emailInputField'
import { PasswordInputField } from '../inputFields/passwordInputField'
import styles from './form.module.scss'

interface IFormProps {
	buttonText: string
}

export function Form({ buttonText }: IFormProps) {
	const emailInput = useRef<HTMLInputElement>(null)
	const passwordInput = useRef<HTMLInputElement>(null)

	return (
		<form className={styles.form}>
			<EmailInputField currentRef={emailInput} />

			<PasswordInputField currentRef={passwordInput} />

			<button type='button' className={styles.submitButton}>
				{buttonText}
			</button>
		</form>
	)
}

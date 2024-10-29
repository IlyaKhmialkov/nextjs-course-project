'use client'
import { useRef } from 'react'
import styles from './form.module.scss'

import { EmailInputField } from './inputFields/emailInputField'
import { PasswordInputField } from './inputFields/passwordInputField'

export function AuthForm() {
	const emailInput = useRef<HTMLInputElement>(null)
	const passwordInput = useRef<HTMLInputElement>(null)

	return (
		<form className={styles.form}>
			<EmailInputField currentRef={emailInput} />

			<PasswordInputField currentRef={passwordInput} />

			<button type='button' className={styles.submitButton}>
				Sign in
			</button>
		</form>
	)
}

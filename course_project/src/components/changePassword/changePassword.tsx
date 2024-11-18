import { ChangePasswordHandler } from '@/utils/changePasswordHandler'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { EmailInputField } from '../inputFields/emailInputField'
import { PasswordInputField } from '../inputFields/passwordInputField'
import { Modal } from '../modal/modal'
import styles from './changePassword.module.scss'

interface IChangePasswordProps {
	setModalVisible: Dispatch<SetStateAction<boolean>>
}

export function ChangePassword({ setModalVisible }: IChangePasswordProps) {
	async function changePasswordHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email')
		const password = formData.get('password')

		if (email && password) {
			const response = await ChangePasswordHandler(email.toString(), password.toString())
			if (response?.toString() === 'true') {
				alert('password successfully changed')
				console.log('password successfully changed')
			} else {
				alert('eamil or password is invalid')
				console.log('eamil or password is invalid')
			}
		} else {
			alert('Error: eamil or password empty')
			console.log('Error: eamil or password empty')
		}
	}
	return (
		<Modal onClose={() => setModalVisible(false)}>
			<h2>Change password</h2>
			<hr />
			<form className={styles.form} onSubmit={changePasswordHandler}>
				<EmailInputField id='change' />
				<PasswordInputField id='change' />
				<hr />
				<button type='submit' className={styles.submitButton}>
					change password
				</button>
			</form>
		</Modal>
	)
}

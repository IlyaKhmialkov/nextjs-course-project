import { RefObject, useState } from 'react'
import { BiSolidLock } from 'react-icons/bi'
import { FaEye } from 'react-icons/fa'
import styles from './inputField.module.scss'

interface IInputProps {
	currentRef: RefObject<HTMLInputElement>
}

export function PasswordInputField({ currentRef }: IInputProps) {
	const [isPasswordVisible, setPasswordVisibility] = useState(false)

	const passwordVisibilityHandler = () => {
		if (currentRef.current) {
			currentRef.current.type = isPasswordVisible ? 'password' : 'text'
			setPasswordVisibility(prev => !prev)
		}
	}

	return (
		<div className={styles.inputDiv}>
			<label htmlFor='password'></label>
			<div className={styles.iconDiv}>
				<BiSolidLock size={20} />
			</div>
			<input
				ref={currentRef}
				type={isPasswordVisible ? 'text' : 'password'}
				className={styles.passwordInput}
				id='password'
				placeholder='enter your password'
				required
			/>
			<button type='button' className={`${styles.iconDiv} ${styles.passwordDiv}`} onClick={passwordVisibilityHandler}>
				<FaEye size={20} />
			</button>
		</div>
	)
}

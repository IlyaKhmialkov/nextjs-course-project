import { RefObject, useEffect } from 'react'
import { IoMail } from 'react-icons/io5'
import styles from './inputField.module.scss'

interface IInputProps {
	currentRef: RefObject<HTMLInputElement>
}

export function EmailInputField({ currentRef }: IInputProps) {
	useEffect(() => {
		currentRef.current?.focus()
	})

	return (
		<div className={styles.inputDiv}>
			<label htmlFor='email'>
				<div className={styles.iconDiv}>
					<IoMail size={20} />
				</div>
			</label>
			<input ref={currentRef} type='text' id='email' placeholder='enter your email' required />
		</div>
	)
}

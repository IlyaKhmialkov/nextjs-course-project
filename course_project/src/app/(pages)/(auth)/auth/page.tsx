'use client'

import Link from 'next/link'
import styles from './page.module.scss'

import { KeyboardEvent, RefObject, useEffect, useRef, useState } from 'react'
import { BiSolidLock } from 'react-icons/bi'
import { FaEye } from 'react-icons/fa'
import { IoMail } from 'react-icons/io5'

export default function page() {
	const emailInput = useRef<HTMLInputElement>(null)
	const passwordInput = useRef<HTMLInputElement>(null)
	const submitButton = useRef<HTMLButtonElement>(null)

	const [isPasswordVisible, setPasswordVisibility] = useState(false)

	const passwordVisibilityHandler = () => {
		if (passwordInput.current) {
			passwordInput.current.type = isPasswordVisible ? 'password' : 'text'
			setPasswordVisibility(prev => !prev)
		}
	}

	const inputKeyPressedHandler = (e: KeyboardEvent<HTMLInputElement>, ref: RefObject<HTMLElement> | null) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			if (ref && ref.current) {
				ref.current.focus()
			}
		}
	}

	useEffect(() => {
		emailInput.current?.focus()
	})

	return (
		<main className={`${styles.main}`}>
			<div className={styles.div}>
				<h2 className='oswald'>log in</h2>
				<hr />
				<form className={styles.form}>
					<div className={styles.inputDiv}>
						<label htmlFor='email'></label>
						<div className={styles.iconDiv}>
							<IoMail size={20} />
						</div>
						<input
							ref={emailInput}
							onKeyDown={e => {
								inputKeyPressedHandler(e, passwordInput)
							}}
							type='text'
							id='email'
							placeholder='enter your email'
							required
						/>
					</div>
					<div className={styles.inputDiv}>
						<label htmlFor='password'></label>
						<div className={styles.iconDiv}>
							<BiSolidLock size={20} />
						</div>
						<input
							ref={passwordInput}
							onKeyDown={e => {
								inputKeyPressedHandler(e, submitButton)
							}}
							type={isPasswordVisible ? 'text' : 'password'}
							className={styles.passwordInput}
							id='password'
							placeholder='enter your password'
							required
						/>
						<button
							type='button'
							className={`${styles.iconDiv} ${styles.passwordDiv}`}
							onClick={passwordVisibilityHandler}
						>
							<FaEye size={20} />
						</button>
					</div>
					<button ref={submitButton} type='button' className={styles.submitButton} onClick={() => console.log('fafff')}>
						Sign in
					</button>
				</form>
				<hr />
				<div className={styles.regDiv}>
					<p>Don't have an account?</p>
					<Link href='/registration'>sign up</Link>
				</div>
			</div>
		</main>
	)
}

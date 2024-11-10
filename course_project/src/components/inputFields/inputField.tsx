import { KeyboardEvent, RefObject } from 'react'
import { IoSearchCircle } from 'react-icons/io5'
import styles from './inputField.module.scss'

interface IInputProps {
	currentRef: RefObject<HTMLInputElement>
	onClick: () => void
	onChange: () => void
	onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

export function InputField({ currentRef, onClick, onChange, onKeyDown }: IInputProps) {
	return (
		<div className={styles.inputDiv}>
			<button type='button' className={`${styles.iconDiv}`} onClick={onClick}>
				<IoSearchCircle size={28} />
			</button>
			<label htmlFor='search'></label>
			<input ref={currentRef} type='text' id='search' onChange={onChange} onKeyDown={onKeyDown} />
		</div>
	)
}
